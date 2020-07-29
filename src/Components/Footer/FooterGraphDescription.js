//This component handles the Descirption part of the app
//It includes two drop downs, descriptiona of the Datastream
//and The last updated value
import React, { Component } from 'react';
import Auxiliary from '../hoc/Auxiliary';
import { Row } from "react-bootstrap";
import { Col } from 'react-bootstrap';
import DropDownCostum from '../Graph/DropDown';
import '../../assets/Coda-Heavy.ttf';
import '../Layout/Heavy_Font.css';

class FooterGraphDescription extends Component {
    //The symbol and description values should be updated by
    //defining new datastreams
    state = {
        activeDrags: 0,
        lastSymbol: this.props.footerDS[this.props.selectedDSNumber]['uom'],
        LastDesc: this.props.footerDS[this.props.selectedDSNumber]['description']
    };
    render() {

        let lastValue = null;
        if (this.props.clickedThingObs != null) {
            if (this.props.clickedThingObs[0] != null) {
                lastValue = this.props.clickedThingObs[0]['result'].toFixed(2);
            }
        }
        else {
            lastValue = null;
        }
        //Get the datastream the UofM, descriptiona, and the name
        let num = this.props.selectedDSNumber;
        let symb = null;
        let descp = null;
        let name = null;
        if (num != null && this.props.footerDS != null) {
            if (this.props.footerDS[num] != null) {
                symb = this.props.footerDS[num]['uom'];
                descp = this.props.footerDS[num]['description'];
                name = this.props.footerDS[num]['name'];
            }
        }
        return (
            <Auxiliary>
                <Row style={{ marginLeft: '30px', marginTop: '40px' }}>
                    <span style={{ fontFamily: 'Coda-Heavy', fontSize: '40px' }}>{lastValue}</span>
                    {symb}
                </Row>
                <Row style={{ marginLeft: '20px', width: '100%', marginTop: '30px' }}>
                    <Col style={{ width: '100%', fontSize: '14.4px' }}>
                        <DropDownCostum {...this.props} secondG={false} defValue={name} />
                    </Col>
                </Row>
                <Row style={{ marginLeft: '20px' }}>
                    <Col>
                        <div style={{ marginLeft: '5px', textAlign: 'left', fontWeight: '700', fontSize: '12.06px', marginTop: '20px' }}>
                            {name}
                        </div>
                        <div style={{ marginLeft: '0px', textAlign: 'left', fontSize: '14px', marginTop: '0px' }}>
                            {descp}
                        </div>
                    </Col>
                </Row>
                <Row style={{ marginLeft: '20px', float: 'left', width: '100%', alignSelf: 'stretch' }}>
                    <Col md='auto' style={{ fontSize: '14.4px', marginTop: '6px' }}>
                        Compare with{' '}
                    </Col>
                    <Col style={{ alignSelf: 'stretch', width: '100%', fontSize: '14.4px' }}>
                        <DropDownCostum {...this.props} secondG={true} />
                    </Col>
                </Row>
            </Auxiliary>
        )
    }
}

export default FooterGraphDescription;
