// This class is defined to render the Infobox on a clicked device on the Cesium

import React from 'react'
import './InfoBox.css';
import { FaRegClock,FaMapMarkerAlt } from "react-icons/fa";


class InfoBox extends React.Component {

    render() {
        let color;
        let fontColor;

        // Setting the label color and font color based on the status of the clicked device
        if(this.props.thingInfo.thingStatus === 'online'){
            fontColor = '#2e2e2e'
            color = '#ffd44d'
        }
        else {
            color = '#2E2E2E'
            fontColor = 'white'
        }

        return (
            <div className='infoBoxCustomized' style={{left:this.props.position[0] - 150 ,top: this.props.position[1] - 170  }}>
                <div className='infoBoxCustomizedTop'>{this.props.thingInfo.thingDescription}</div>
                <div className='infoBoxCustomizedTopDescription'>OGC SensorThings API</div>
                <div className='infoBoxCustomizedTimeUpdate'>
                    <div className="timeUpdateLeft">
                        <FaRegClock/>
                    </div>
                    <div className="timeUpdateRight">{this.props.thingInfo.latestUpdate} ago</div>
                </div>
                {/*<div className='infoBoxCustomizedDescription'>*/}
                {/*    <div style={{float: "left", width:"5%", marginLeft:"-2px"}}>*/}
                {/*        <FaMapMarkerAlt/>*/}
                {/*    </div>*/}
                {/*    <div className="timeUpdateRight" style={{marginLeft:"5px"}}>{this.props.thingInfo.thingCity}</div>*/}
                {/*</div>*/}
                <div className='infoBoxCustomizedLabels'>
                    <span style={{backgroundColor:color,color: fontColor}} className='infoBoxCustomizedLabel'>{this.props.thingInfo.thingStatus}</span>
                    {/*<span className='infoBoxCustomizedLabel'>outdoor</span>*/}
                </div>
            </div>
        );
    }
}

export default InfoBox;
