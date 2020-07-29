// This component is responsible for representation of real-time observations on the map

import React from 'react';
import styles from './MapLayer.css';
import { Color, EntityCluster } from "cesium";
import { Cartesian3, GeocoderService,ScreenSpaceEventType } from "cesium";
import { Viewer, Entity, Billboard, EntityDescription, CameraFlyTo, CustomDataSource, GeoJsonDataSource } from "resium";
import { hot } from "react-hot-loader/root";
import Auxiliary from '../hoc/Auxiliary';
import InfoBox from '../Footer/InfoBox';


class MapLayer extends React.Component {
    camera;
    popup;
    selectedEntity;

    constructor(props) {
        super(props);
        this.camera = <CameraFlyTo duration={1} destination={Cartesian3.fromDegrees(-114.584656, 51.096623, 120000)}/>; // Define the scalle for the first map initialization
        this.state = {
            thingsLocations: null,
            clickedX: null,
            clickedY: null,
            popupOpen: false,
            thingCity: null,
            thingStatus: null,
            latestUpdate:null,
            thingDescription: null,
            inputSelectedLocation: null,
            selectedBoundaryWidth: null,
        }
    }

    // This method is called for clear the interval
    componentWillUnmount() {
        clearInterval(this.interval); // Stop sending request for the latest observations
    }

    // Here we want to check if the status of devices have been changed and also if user select a device from the searchbar
    async componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.thingsInfo && nextProps.thingsInfo[0] && nextProps.thingsInfo !== this.state.thingsLocations) {
            await this.setState({ thingsLocations: nextProps.thingsInfo })
            for (let i = 0; i < nextProps.thingsInfo.length; i++) {
                if (nextProps.thingsInfo[i].thingStatus !== this.state.thingsLocations[i].thingStatus) {
                    this.setState({ thingsLocations: nextProps.thingsInfo })
                    break
                }
            }

        }
        if (nextProps.searchedSelectedLocation && nextProps.searchedSelectedLocation.length > 1 && nextProps.searchedSelectedLocation !== this.state.inputSelectedLocation) {
            this.camera = <CameraFlyTo duration={2}
                                       destination={Cartesian3.fromDegrees(nextProps.searchedSelectedLocation[0], nextProps.searchedSelectedLocation[1], 1000)}/>;
            this.setState({inputSelectedLocation: nextProps.searchedSelectedLocation})
        }
    }

    // To remove the infobox if user click another device or move outside the device
    backdropClickHandler = () => {
        this.setState({popupOpen: false})
    };

    // If user click a device how to show animation and open the infobox
    thingClickHandler = (e, thingID, description, city, i, status,latestUpdate) => {
        clearInterval(this.interval);
        this.interval = setInterval(async () => {
            this.selectedEntity =
                <Entity
                    key={thingID}
                    position={Cartesian3.fromDegrees(this.state.thingsLocations[i].longitude, this.state.thingsLocations[i].latitude, 0)}
                    point={{
                        pixelSize: 24,
                        color: (this.state.thingsLocations[i].thingStatus === 'online') ? new Color.fromAlpha(Color.MOCCASIN, 0.8) : new Color.fromAlpha(Color.GRAY, 0.5),
                        outlineWidth: (this.state.selectedBoundaryWidth !== null) ? this.state.selectedBoundaryWidth : 0,
                        outlineColor: (this.state.thingsLocations[i].thingStatus === 'online') ? new Color.fromAlpha(Color.GOLDENROD, (21 - this.state.selectedBoundaryWidth) / 20) : new Color.fromAlpha(Color.BLACK, (21 - this.state.selectedBoundaryWidth) / 20)
                    }}
                    onClick={(e) => this.thingClickHandler(e, this.state.thingsLocations[i].thingID, this.state.thingsLocations[i].thingDescription, this.state.thingsLocations[i].city, i, this.state.thingsLocations[i].thingStatus,this.state.thingsLocations[i].latestUpdate)}
                    onMouseLeave={this.thingLeaveHandler}
                />
            //This is where we control showing the animation for the seleced devivce
                if (this.state.selectedBoundaryWidth === null)
                this.setState({selectedBoundaryWidth: 0})
            else if (this.state.selectedBoundaryWidth > 20)
                this.setState({selectedBoundaryWidth: 0})
            else
                this.setState({selectedBoundaryWidth: this.state.selectedBoundaryWidth + 1})
        }, 100);

        this.props.clicked(thingID)
        let absoluteX = e.position.x;
        let absoluteY = e.position.y;
        this.setState({
            popupOpen: true,
            thingDescription: description,
            thingStatus: status,
            thingCity: city,
            latestUpdate:latestUpdate,
            clickedX: absoluteX,
            clickedY: absoluteY
        })
    }

    clusterHandler = (e) => {
        console.log(e)
    }

    // Define onMouseLeave event listener to close the opened infoBox
    thingLeaveHandler = (e) => {
        this.setState({
            popupOpen: false
        })
        this.backdropClickHandler()
    }

    render() {
        let backdrop;
        let array;
        if (this.state.thingsLocations) {
            array = new Array(this.state.thingsLocations.length).fill(0).map((_, i) => (
                    <Entity
                        key={this.state.thingsLocations[i].thingID}
                        name={this.state.thingsLocations[i].thingName}
                        position={Cartesian3.fromDegrees(this.state.thingsLocations[i].longitude, this.state.thingsLocations[i].latitude, 0)}
                        point={{
                            pixelSize: 24,
                            color: (this.state.thingsLocations[i].thingStatus === 'online') ? new Color.fromAlpha(Color.MOCCASIN, 0.8) : new Color.fromAlpha(Color.GRAY, 0.5),
                            outlineWidth: 2,
                            outlineColor: (this.state.thingsLocations[i].thingStatus === 'online') ? new Color.fromAlpha(Color.GOLDENROD, 1) : new Color.fromAlpha(Color.BLACK, 0.8)
                        }}
                        onClick={(e) => this.thingClickHandler(e, this.state.thingsLocations[i].thingID, this.state.thingsLocations[i].thingDescription, this.state.thingsLocations[i].city, i, this.state.thingsLocations[i].thingStatus,this.state.thingsLocations[i].latestUpdate)}
                        onMouseLeave={this.thingLeaveHandler}
                    />
                )
            );
        }

        // if (this.state.popupOpen) {
        //     backdrop = <Backdrop click={this.backdropClickHandler}/>;
        // }

        let thingEntities = <div>
            <CustomDataSource
                clustering={
                    new EntityCluster({
                        enabled: true,
                        pixelRange: 20,
                        minimumClusterSize: 2,
                        clusterPoints: true,
                        clusterLabels: true
                    })
                }
                name='clusterLocations'>
                {array}
            </CustomDataSource>
        </div>

        return (
            <Auxiliary>
                <Viewer className='viewer'
                        geocoder={GeocoderService()}
                        homeButton={false}
                        onMouseMove={this.backdropClickHandler}
                        onWheel={this.backdropClickHandler}
                >
                    {(this.selectedEntity) ? this.selectedEntity : null}
                    {backdrop}
                    {this.state.popupOpen ? <InfoBox onClick={this.backdropClickHandler}
                                                     position={[this.state.clickedX, this.state.clickedY]}
                                                     thingInfo={{
                                                         "thingDescription": this.state.thingDescription,
                                                         "thingCity": this.state.thingCity,
                                                         "latestUpdate":this.state.latestUpdate,
                                                         "thingStatus": this.state.thingStatus
                                                     }}
                    /> : null}
                    {this.camera}
                    {thingEntities}
                </Viewer>
            </Auxiliary>
        );
    }
}

export default hot(MapLayer);
