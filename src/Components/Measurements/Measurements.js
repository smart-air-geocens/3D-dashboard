import React from 'react';
import './Measurements.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh, faCloudRain, faSmog } from '@fortawesome/free-solid-svg-icons';
import WithClass from '../hoc/WithClass';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

class measurandCard extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        let selectedIcon;
        let unitOfMeasurement;

        if (this.props.measurand === 'temperature'){
            selectedIcon = <FontAwesomeIcon icon={faTemperatureHigh} className='Icon'/>
            // unitOfMeasurement = {&#8451};
        } else if (this.props.measurand === 'Humidity'){
            selectedIcon = <FontAwesomeIcon icon={faCloudRain} className='Icon'/>
        } else if (this.props.measurand === 'Pressure'){
            selectedIcon = <FontAwesomeIcon icon={faSmog} className='Icon'/>
        }

        return(
            <Container>
                <Row className="justify-content-md-center">
                    <Col className='Col'>
                        {this.props.measurand + ' '}
                        {selectedIcon}
                    </Col>
                    <Col className='SensorTextStyle Col'>{this.props.value}</Col>
                    <Col className='Col'>3</Col>
                </Row>
            </Container>
        )
    }
}

export default WithClass(measurandCard);
