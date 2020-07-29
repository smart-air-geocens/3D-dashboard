import React, { Component } from 'react';
import Auxiliary from '../hoc/Auxiliary';
import WithClass from '../hoc/WithClass';
import '../Footer/HeadFooter.css';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import sensorOnline from '../../assets/images/sensor_icon.svg'
import sensorOffline from '../../assets/images/sensor_icon_gray.svg'

const lastReading = 'JANUARY 24, 2020 - 19:22';

class HeadFooter extends Component {
    state = {
        activeDrags: 0,
    };

    goToLocationHandler = (thingName) => {
        this.props.inputSelectedName(thingName)
    }


    render() {
        var observations = this.props.results;
        var current_time_num;
        if (observations != null) {
            if (observations['0'] != null) {
                if (observations['0']['data'] != null) {
                    if (observations['0']['data']['0'] != null) {
                        current_time_num = observations['0']['data']['0']['0'];
                    }
                }
            }
        }
        var dttm = new Date(current_time_num);
        var local_time = dttm.toLocaleString();//.toUTCString();
        var thing_name = ''
        let statusIcon;
        for (var i = 0; i < this.props.thingsInfo.length; i++) {
            if (this.props.thingsInfo[i].thingID == this.props.clickedID) {
                thing_name = this.props.thingsInfo[i].thingName
                if(this.props.thingsInfo[i].thingStatus === 'online')
                    statusIcon = sensorOnline
                else
                    statusIcon = sensorOffline
            }
        }


        return (
            <div className="footerHeaderContainer">
                <div className='footerHeaderFirstCol'>
                    <div onClick={() => this.goToLocationHandler(thing_name)} className='footerHeaderFirstColFirstColumn'>
                        <span style={{fontFamily:"Roboto Condensed", marginLeft:"5px"}}> <b> Selected Device: </b></span>
                        <img  style={{width:"18px",height:"18px",marginBottom:"3px", marginLeft:"5px"}} src={statusIcon} />
                        <span style={{fontFamily:"Roboto Condensed"}}> {thing_name}  </span>
                    </div>
                    <div className='footerHeaderFirstColSecondColumn'>
                        {/*<img  style={{width:"18px",height:"18px",marginBottom:"3px",marginLeft:"25px"}} src='https://smartcitizen.s3.amazonaws.com/avatars/default.svg' />*/}
                        {/*<span>  citizenCalgary  </span>*/}
                    </div>
                    <div className='footerHeaderFirstColThirdColumn'>
                        {/*<img  style={{width:"18px",height:"18px",marginBottom:"3px"}} src={require('../../assets/images/battery_icon.svg')} />*/}
                        {/*<span>  100%  </span>*/}
                    </div>
                </div>
                <div className='footerHeaderSecondCol'>
                    <span style={{fontFamily:"Roboto Condensed"}}>LAST DATA RECEIVED: {local_time}  </span>
                </div>
                <div className='footerHeaderThirdCol'>
                    <div className='footerHeaderThirdColFirstColumn'>
                        {/*<img style={{width:"18px",height:"18px"}} src={require('../../assets/images/chart_icon.svg')} />*/}
                    </div>
                    <div className='footerHeaderThirdColSecondColumn'>
                        {/*<img style={{width:"18px",height:"18px"}} src={require('../../assets/images/kit_details_icon_light.svg')} />*/}
                    </div>
                    <div className='footerHeaderThirdColThirdColumn'>
                        {/*<img  style={{width:"18px",height:"18px"}} src={require('../../assets/images/user_details_icon.svg')} />*/}
                    </div>
                </div>
            </div>
        )
    }
}

export default HeadFooter;
