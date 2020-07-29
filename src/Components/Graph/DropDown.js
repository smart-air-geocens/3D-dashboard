// This Component handle Drop Down Evenets for sending and receiving data parents
// and children. By choosing each of them you can select the data sgtream type and
//then compare their observations on the graph
import React from 'react';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import Classes from './DropDown.css';
import WithClass from '../hoc/WithClass';

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}
let existingDS = ['Temperature', 'Humidity', 'Pressure', 'SO2', 'NO2', 'CO', 'O3', 'PM2.5', 'PM10', 'WindSpeed', 'WindDirection'];

class DropDownCostum extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.state = {
            dropDownValueText: this.props.firstGraphText,
            dropDownValueImage: null,
            dropdownOpen: false,
            setDropdownOpen: false,
            textList: null
        };
    }

    //Bind the toggle event for DropDown widgets
    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    //Change the drop down toggle regarding the
    //current selected datastream name bt widgets
    componentDidUpdate(prevProps, prevState, snapshot) {
        /* if(this.props.firstGraphText &&
          prevProps.firstGraphText !== this.props.firstGraphText&&this.props.firstGraphText.localeCompare(this.props.secondGraphText))
         {if (this.props.secondG)
          this.setState({dropDownValueText:'None',dropDownValueImage:''})  ;
         }*/
        if ((this.props.selectedDSNumber &&
            prevProps.selectedDSNumber !== this.props.selectedDSNumber) || prevProps.firstGraphText !== this.props.firstGraphText ||
            this.props.footerDS != prevProps.footerDS || this.props.clickedID != prevProps.clickedID) {

            existingDS = this.props.footerDS.map(value => value.name.toLowerCase());

            // existingDS = existingDS.splice(-2 - 1, existingDS.length);
            // console.log("Drop2",existingDS)
            /* if(this.props.clickedID!=prevProps.clickedID)
              this.setState({dropDownValueText:this.props.firstGraphText});*/
            let dsValues = [];
            if (this.props.secondG) {
                for (var i = 0; i < this.props.footerDS.length; i++) {
                    let checkValue = this.props.footerDS[i].name.toLowerCase();
                    for (let j in existingDS) {
                        if (checkValue.includes(existingDS[j])
                            && !this.props.firstGraphText.toLowerCase().includes(existingDS[j]))
                            dsValues.push(capitalize(existingDS[j]));
                    }
                }
                this.setState({textList: dsValues})
                if (this.props.secondData == null) {
                    this.setState({dropDownValueText: 'None', dropDownValueImage: ''});
                }
            } else {
                for (var i = 0; i < this.props.footerDS.length; i++) {
                    let checkValue = this.props.footerDS[i].name.toLowerCase();
                    for (let j in existingDS) {
                        if (checkValue.includes(existingDS[j]))
                            dsValues.push(capitalize(existingDS[j]));
                    }
                }
                this.setState({textList: dsValues});
            }
        }
    }

    //Handle the default value of the DropDown values
    //and itmes of the second DropDown by changes.
    componentWillUpdate(nextProps, nextState, context) {
        if (this.props.firstGraphText && nextProps.firstGraphText != this.props.firstGraphText) {
            let defaultValue = nextProps.firstGraphText.toLowerCase();
            if (!this.props.secondG) {
                for (let j in existingDS) {
                    if (defaultValue.includes(existingDS[j])) {
                        defaultValue = capitalize(existingDS[j]);

                        let imgAddress = require('../../assets/images/' + this.IconFinder(defaultValue.toLowerCase()) + '.png');
                        this.setState({dropDownValueText: defaultValue, dropDownValueImage: imgAddress});
                        break;
                    }
                }
            }
        }
    }

    //Initialize the drop down values and togle
    IconFinder = (DSName) => {
        let iconNames = ['temperature', 'humidity', 'pressure', 'so2', 'no2', 'co', 'o3', 'pm2.5', 'pm10', 'windspeed', 'winddirection'];
        let selectedIcon;
        for (let i in iconNames)
            if (DSName.includes(iconNames[i]))
                selectedIcon = iconNames[i];
        return selectedIcon;
    }

    componentDidMount() {
        let dsValues = [];
        let defaultValue;
        existingDS = this.props.footerDS.map(value => value.name.toLowerCase());
        existingDS = existingDS.splice(-2 - 1, existingDS.length);
        let num = this.props.selectedDSNumber;
        if (num != null && this.props.footerDS != null) {
            if (this.props.footerDS[num] != null) {
                defaultValue = this.props.footerDS[num]['name'].toLowerCase();
            }
        }
        if (!this.props.secondG) {
            this.setState({textList: dsValues})
            for (let j in existingDS) {
                if (defaultValue.includes(existingDS[j])) {
                    defaultValue = capitalize(existingDS[j]);
                    break;
                }
            }
            this.setState({dropDownValueImage: require('../../assets/images/temperature.png')});
        } else {
            defaultValue = 'None';
            this.setState({dropDownValueImage: null});
        }
        for (var i = 0; i < this.props.footerDS.length; i++) {
            let checkValue = this.props.footerDS[i].name.toLowerCase();
            let k;
            if (this.props.secondG)
                k = existingDS.length - 2;
            else
                k = existingDS.length - 1;
            for (let j = k; j >= 0; j--) {
                if (checkValue.includes(existingDS[j]))
                    dsValues.push(capitalize(existingDS[j]));
            }
        }
        this.setState({dropDownValueText: defaultValue, textList: dsValues});
    }

    //Trigger pushing data by dropdown item clicking to the graph component
    changeValue = (e) => {
        const txt = e.currentTarget.textContent;
        //Preparing to get selectem item image address
        const imgAddressDoc = (new DOMParser().parseFromString(e.currentTarget.innerHTML, 'text/html'));
        const imgAddressImg = imgAddressDoc.getElementsByTagName("img")[0];
        const imgAddressAtt = imgAddressImg.getAttribute("src");
        this.setState({dropDownValueImage: imgAddressAtt, dropDownValueText: txt});
        let observations = this.props.datastreamVals;
        //Getting the last time observations from the app memory
        if (observations != null) {
            if (observations['0'] != null) {
                let obsN = observations['0']['time'];
                let obs1 = observations[observations.length - 1]['time'];
                let FisrtObs = new Date(obs1);
                let LastObs = new Date(obsN);
                let FromIso = FisrtObs.toISOString();
                let ToIso = LastObs.toISOString();
                if (this.props.secondG) {
                    this.props.secondGraph(txt, true, this.props.clickedID, FromIso, ToIso);
                } else {
                    this.props.secondGraph(txt, false, this.props.clickedID, FromIso, ToIso);
                }
            }
        }
    }

    //Items are hard coded as Datastreams are not available and icons are limited.
    render() {
        let itemsValues = [];
        for (var j in this.state.textList) {
            itemsValues.push(<DropdownItem key={j}>
                    <Row onClick={this.changeValue}>
                        <Col style={{float: 'left'}}>
                            <img style={{height: '25px', width: '25px'}}
                                 src={(this.IconFinder(this.state.textList[j].toLowerCase()) != null) ? require('../../assets/images/' + this.IconFinder(this.state.textList[j].toLowerCase()) + '.png') : null}/>
                            {' '}{this.state.textList[j]}
                        </Col>
                    </Row>
                </DropdownItem>
            );
        }

        return (
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle size="sm"
                                tag="div"
                                aria-expanded={this.state.dropdownOpen}
                                onToggle={this.toggle}
                >
                    <div style={{
                        borderRadius: '0px', backgroundColor: 'rgb(255, 255, 255)'
                        , marginTop: '5px', borderBottom: '1px solid rgb(143, 146, 148)',
                        borderTop: '0px', borderRight: '0px', borderLeft: '0px', width: '100%'
                    }}>
                        <div>{this.state.dropDownValue}</div>
                        <Row>
                            <Col style={{float: 'left'}}>
                                <span style={{float: 'left', marginLeft: '6px'}}>
                  {' '}{this.state.dropDownValueText}
                </span>
                                <img style={{float: 'right', marginTop: '15px'}}
                                     src={require('../../assets/images/arrow_down_icon.svg')}/>
                            </Col>
                        </Row></div>
                </DropdownToggle>
                <DropdownMenu style={{width: '100%'}}>
                    {itemsValues}
                </DropdownMenu>
            </Dropdown>
        );
    }
}

export default WithClass(DropDownCostum, Classes.container);
