//This component is responsible for Graph time queries
//It includes date picker, move right, move left
//and last date picker (1 hour ago, 1 day ago, 1 month ago)
import React, { Component } from 'react';
import Auxiliary from '../hoc/Auxiliary';
import { Row } from "react-bootstrap";
import { Col } from 'react-bootstrap';
import 'react-day-picker/lib/style.css';
import { Input, Tooltip } from 'reactstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';

class FooterGraphQueries extends Component {
    state = {
        activeDrags: 0,
        FromDate: new Date(),
        ToDate: new Date(),
        tooltipOpenLeft: false,
        tooltipOpenRight: false,
        movingScale: 60 * 60 * 1000,
        widgetsEnabling: true,
        lastSelectVal: '',
        isLastReceive: false
    };
    //initialize From and To date of the DatePicker
    componentDidMount() {
        let observations = this.props.datastreamVals;
        if (observations != null) {
            if (observations['0'] != null) {
                let obsN = observations['0']['time'];
                let obs1 = observations[observations.length - 1]['time'];
                let firstObs = new Date(obs1);
                let lastObs = new Date(obsN);
                this.setState({ FromDate: firstObs, ToDate: lastObs });
                // console.log(lastObs);
            }
        }
    }
    //By any changes of the date, From/To values of
    //the DatePicker will be changed
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.datastreamVals && this.props.datastreamVals &&
            prevProps.datastreamVals != this.props.datastreamVals) {
            let observations = this.props.datastreamVals;
            if (!this.state.isLastReceive)
                this.setState({ lastSelectVal: 'LAST DATA RECEIVED' })
            this.setState({ isLastReceive: false })
            if (observations != null) {
                if (observations['0'] != null) {
                    let obsN = observations['0']['time'];
                    let obs1 = observations[observations.length - 1]['time'];
                    let firstObs = new Date(obs1);
                    let lastObs = new Date(obsN);
                    this.setState({ FromDate: firstObs, ToDate: lastObs, widgetsEnabling: true });
                }
                else {
                    this.setState({ widgetsEnabling: false });
                }
            }
        }
    }
    //Handle the moving left button toolTip event
    TooltiptoggleLeft = (e) => {
        this.setState({ tooltipOpenLeft: !this.state.tooltipOpenLeft })
    }
    //Handle the moving right button toolTip event
    TooltiptoggleRight = (e) => {
        this.setState({ tooltipOpenRight: !this.state.tooltipOpenRight })
    }
    //Handle the last change date event
    lastDateChange = (evt) => {
        let targetValue = evt.target.value;
        this.setState({ lastSelectVal: evt.target.value, isLastReceive: true })
        let toTime = new Date();
        let fromTime;
        if (targetValue == '60 MINUTES') {
            fromTime = toTime - 60 * 60 * 1000;
            this.setState({ movingScale: 60 * 60 * 1000 });
        }
        else if (targetValue == 'DAY') {
            fromTime = toTime - 60 * 60 * 1000 * 24;
            this.setState({ movingScale: 60 * 60 * 1000 * 24 });
        }
        else if (targetValue == 'MONTH') {
            fromTime = toTime - 60 * 60 * 1000 * 24 * 30;
            this.setState({ movingScale: 60 * 60 * 1000 * 24 * 30 });
        }
        else {
            fromTime = toTime - 60 * 60 * 1000;
            this.setState({ movingScale: 60 * 60 * 1000 });
        }
        let FromIso = new Date(fromTime).toISOString();
        let ToIso = toTime.toISOString();
        this.props.updateDateChart(this.props.clickedID, FromIso, ToIso);
    }
    //Handle the moving left event
    MoveDateLeft = (e) => {
        this.setState({ isLastReceive: false });
        let observations = this.props.datastreamVals;
        console.log(observations)
        console.log(this.props.shiferDS)
        let obsN = this.props.shiferDS.to;//observations['0']['time'];
        let obs1 = this.props.shiferDS.from;//observations[observations.length - 1]['time'];
        let firstObs = new Date(obs1);
        let lastObs = new Date(obsN);
        firstObs = new Date(Number(firstObs) - this.state.movingScale);
        lastObs = new Date(Number(lastObs) - this.state.movingScale);
        let FromIso = firstObs.toISOString();
        let ToIso = lastObs.toISOString();
        this.props.updateShift(this.props.clickedID, FromIso, ToIso);
    }
    //Handle the moving right event
    MoveDateRight = (e) => {
        this.setState({ isLastReceive: false });
        let observations = this.props.datastreamVals;
        console.log(this.props.shiferDS, observations)
        console.log(this.props.shiferDS)
        let obsN = this.props.shiferDS.to;//observations['0']['time'];
        let obs1 = this.props.shiferDS.from;//observations[observations.length - 1]['time'];
        let firstObs = new Date(obs1);
        let lastObs = new Date(obsN);
        lastObs = new Date(Number(lastObs) + this.state.movingScale);
        firstObs = new Date(Number(firstObs) + this.state.movingScale);
        let FromIso = firstObs.toISOString();
        let ToIso = lastObs.toISOString();
        this.props.updateShift(this.props.clickedID, FromIso, ToIso);
    }
    //Handle the date picker from date event
    handleDayChangeFrom = (selectedDay, modifiers, dayPickerInput) => {
        this.setState({ isLastReceive: false });
        let pickedDate = new Date(dayPickerInput.state.value);
        let FromIso = pickedDate.toISOString();
        let ToIso = this.state.ToDate.toISOString();
        this.props.updateDateChart(this.props.clickedID, FromIso, ToIso);
    }
    //Handle the date picker to date event
    handleDayChangeTo = (selectedDay, modifiers, dayPickerInput) => {
        this.setState({ isLastReceive: false });
        let pickedDate = new Date(dayPickerInput.state.value);
        let ToIso = pickedDate.toISOString();
        let FromIso = this.state.FromDate.toISOString();
        this.setState({ ToDate: pickedDate })
        this.props.updateDateChart(this.props.clickedID, FromIso, ToIso);
    }
    render() {
        return (
            <Auxiliary>
                <Row className='justify-content-md-center' style={{
                    float: 'right',
                    marginBottom: '5px', marginTop: '5px', marginRight: '20px'
                }}>
                    <Col md='auto'>
                        {
                            <Input type="select" name="select" onChange={this.lastDateChange} value={this.state.lastSelectVal}
                                style={{
                                    fontSize: '14px', borderRadius: '0px', backgroundColor: 'rgb(255, 255, 255)'
                                    , marginTop: '0px', borderBottom: '1px solid rgb(143, 146, 148)',
                                    borderTop: '0px', borderRight: '0px', borderLeft: '0px', height: '40px', opacity: '0.6'
                                }}>
                                {//In case we want to define an unselectable default value
                                    <option defaultValue='true' style={{ display: 'none', fontSize: '10px' }}>LAST DATA RECEIVED</option>}
                                <option style={{ fontSize: '14px', marginTop: '4px' }}>60 MINUTES</option>
                                <option style={{ fontSize: '14px', marginTop: '4px' }}>DAY</option>
                                <option style={{ fontSize: '14px', marginTop: '4px' }}>MONTH</option>
                            </Input>}
                    </Col>
                    <Col md='auto'>
                        <span style={{ fontSize: '10px', marginRight: '2px' }}> From:{' '}</span>  <DayPickerInput
                            style={{ fontSize: '13px', height: '40px' }}
                            value={this.state.FromDate}
                            onDayChange={this.handleDayChangeFrom.bind(this)}
                            //In case you want to disable calander by having null datastreams
                            //You might need to uncomment the following line
                            //inputProps={{ disabled: !this.state.widgetsEnabling }}
                            dayPickerProps={{
                                month: new Date(),
                                showWeekNumbers: true,
                                todayButton: 'Today',
                                disabledDays: {
                                    after: this.state.ToDate,
                                }
                            }}
                        />
                    </Col>
                    <Col md='auto'>
                        <span style={{ fontSize: '10px', marginRight: '2px' }}> To: </span> <DayPickerInput
                            style={{ fontSize: '13px', height: '20px' }}
                            value={this.state.ToDate}
                            //In case you want to disable calander by having null datastreams
                            //You might need to uncomment the following line
                            //  inputProps={{ disabled: !this.state.widgetsEnabling }}
                            disabledDays={day => day > (new Date())}
                            onDayChange={this.handleDayChangeTo.bind(this)}
                            dayPickerProps={{
                                readOnly: true,
                                month: new Date(),
                                showWeekNumbers: true,
                                todayButton: 'Today',
                                disabledDays: {
                                    after: new Date(),
                                    before: this.state.FromDate,
                                }
                            }}
                        />
                    </Col>
                    <Col md='auto'>
                        <button id="TooltipLeft" onClick={this.MoveDateLeft} style={{
                            marginRight: '0px',
                            height: '30px', width: '75px', backgroundColor: 'rgb(249,249,251)'
                        }}>
                            <img src={require('../../assets/images/arrow_left_icon.svg')} />
                            <Tooltip style={{ fontSize: '10px' }} placement="top" isOpen={this.state.tooltipOpenLeft}
                                target="TooltipLeft" toggle={this.TooltiptoggleLeft}>
                                Move chart Left!
      </Tooltip>
                        </button>
                        <button id="TooltipRight" onClick={this.MoveDateRight} style={{
                            marginleft: '0px',
                            height: '30px', width: '75px', backgroundColor: 'rgb(249,249,251)'
                        }}>
                            <img style={{ float: 'center' }} src={require('../../assets/images/arrow_right_icon.svg')} />
                            <Tooltip style={{ fontSize: '10px' }} placement="top" isOpen={this.state.tooltipOpenRight}
                                target="TooltipRight" toggle={this.TooltiptoggleRight}>
                                Move chart Right!
      </Tooltip>
                        </button>
                    </Col>
                </Row>
            </Auxiliary>
        )
    }
}

export default FooterGraphQueries;
