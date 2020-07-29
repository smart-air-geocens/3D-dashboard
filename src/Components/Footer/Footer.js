//This component includes all footer components
//Also handle the first page event by clicking
//a point on the map and go to my location event
import React from 'react';
import './Footer.css';
import Graph from '../Graph/Graph';
import HeadFooter from '../Footer/HeadFooter';
import FooterSensorKit from './FooterSensorKit';
import { Row } from "react-bootstrap";
import { Col } from 'react-bootstrap';
import 'react-day-picker/lib/style.css';
import FooterGraphDescription from './FooterGraphDescription';
import FooterGraphQueries from './FooterGraphQueries';
import SponsorsInfo from "./SponsorsInfo";

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DateData: null
        }
    }
    //Handle go to location event if user clicks the blue button
    geoloc_Click = (e) => {
        var gr = this;
        function loc_success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            let loc = { lon: longitude, lat: latitude };
            gr.props.clickedGoTo(loc);
        }
        function loc_error() {
            console.log("Cannot find your location!");
        }
        navigator.geolocation.getCurrentPosition(loc_success, loc_error);
    }
    render() {
        //fill series for the headfooter component.
        let finalSeries = [];
        let clickedObs = null;
        if (this.props.datastreamVals != null) {
            if (this.props.datastreamVals[0] != null) {
                clickedObs = this.props.datastreamVals[0]['result'];
            }
            else {
                clickedObs = {};
            }
            let series = [];
            for (var i in this.props.datastreamVals) {
                let chartObject = [];
                var localtime = Date.parse(this.props.datastreamVals[i]['time']);
                chartObject.push(localtime);
                chartObject.push(this.props.datastreamVals[i]['result']);
                series.push(chartObject);
            }
            let finalJson = { "data": series };
            finalSeries.push(finalJson);
        }
        else {
            clickedObs = null;
        }
        //If there is no observations for the first attemp the window shows the hand symbol and locate me button
        if (!this.props.pointHasValue) {
            return (
                <div className='Footer'>
                    <h2 className="title">
                        <br></br>
                        No sensor selected
                        <span>
                            👆
                        </span>
                    </h2>
                    <div>
                        <br></br><br></br>
                        <div>
                            We can also take you to your nearest online kit by letting us know your location.
                            </div>
                        <br></br>
                        <button className="btn btn-round md-button md-ink-ripple"
                            style={{ borderRadius: '50px', color: 'rgb(255,255,255)', backgroundColor: 'rgb(32,54,252)' }}
                            type="button" onClick={() => this.geoloc_Click()}>Locate me<div className="md-ripple-container">
                            </div>
                        </button>
                    </div>
                </div>
            );
        }
        //Otherwise the main application part comes up and shows the related graphics
        else {
            return (
                <div>
                    <div className='Footer'>
                        <div>
                            <HeadFooter className='headerFooter' results={finalSeries} {...this.props} />
                        </div>
                        <div>
                            <FooterSensorKit className='SensorKitFooter' {...this.props} />
                        </div>
                        <div >
                            <div style={{ marginTop: "50px", height: "381px" }} className="row">

                                <div className="column1">
                                    <div>
                                        <FooterGraphDescription {...this.props} />
                                    </div>
                                </div>
                                <div className="column2">
                                    <Row style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }}>
                                        <Col>
                                            <FooterGraphQueries {...this.props} />
                                        </Col>
                                    </Row>
                                    <Row style={{ width: '100%' }}>
                                        <Col>
                                            <Graph {...this.props} style={{ width: '100%' }} />
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                        <div>
                            <SponsorsInfo className='sponsorInfo' {...this.props} />
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Footer;
