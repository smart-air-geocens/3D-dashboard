import React, {Component} from 'react';
import Classes from './MenuSlider.css';
import Maplayer from "../MapLayer/MapLayer";
import Auxiliary from '../hoc/Auxiliary';
import WithClass from '../hoc/WithClass';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './MenuSlider.css';
import {Row} from "react-bootstrap";
import {Col} from 'react-bootstrap';
import FooterKitCreator from "./FooterKitCreator";
import arrowRight from '../../assets/images/arrow_right_icon.svg';
import arrowLeft from '../../assets/images/arrow_left_icon.svg';
import temperatureIcon from "../../assets/images/temperature.svg";
import PropTypes from "prop-types";


const lastReading = 'JANUARY 24, 2020 - 19:22';
let sensorValues = {"preValue": null, "curValue":null}
let sensorReadings = [];
let sensorValueList={};
const list = [];

const MenuItem = ({ text, selected,results,status}) => {

    let uofmSign;


    for(let i=0 ;i < sensorReadings.length ; i ++){
        if(sensorReadings[i]["name"] === text){
            if(sensorReadings[i]['curValue'] && results !== sensorReadings[i]['curValue']){
                sensorReadings[i]['preValue'] = sensorReadings[i]['curValue']
                sensorReadings[i]['curValue'] = results;
            }
            if(sensorReadings[i]['curValue'] === null){
                sensorReadings[i]['curValue'] = results;
            }

            if(sensorReadings[i]['curValue'] === sensorReadings[i]['preValue'])
                uofmSign = "equal";
            else if (sensorReadings[i]['curValue'] > sensorReadings[i]['preValue'])
                uofmSign = "greater";
            else if (sensorReadings[i]['curValue'] < sensorReadings[i]['preValue'])
                uofmSign = "smaller";
        }
    }


    return (
       //<div className={results ? 'menu-item' : 'menu-item inactive'} >
        <div className='menu-item'>
            {FooterKitCreator(text,results,uofmSign,status)}
        </div>
    )
};

export const Menu = (list, selected,sensorKitResults) =>
    list.map(el => {
        const { name } = el;

        let value;
        Object.keys(sensorKitResults).forEach(element => {
            if (sensorReadings.length === 0 || sensorReadings.length < list.length){
                let object={};
                object["name"] = element
                object['preValue'] = null;
                object['curValue'] = null;
                sensorReadings.push(object)
            }


            if(element === name)
            {
                value = sensorKitResults[element];
                sensorValueList[element] = value;
            }
        })

        return (
            <MenuItem text={name} key={name} selected={selected} results={value} status={value?'active':'inactive'}/>
        );

    });

const Arrow = ({ text, className }) => {
    let arrow;
    if (text === 'right')
        arrow = arrowRight
    else
        arrow = arrowLeft
    return (
        <div className={className} style={{width: "30px", borderRadius: "5px", height: "80px", marginTop: "0px"}}>
            <img style={{width: "24px", height: "24px", margin: "18px 15px 0px -9px", color: "#B2B2B4"}} src={arrow}/>
        </div>
    );
};
Arrow.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string
};
export const ArrowLeft = Arrow({ text: "left", className: "arrow-prev" });
export const ArrowRight = Arrow({ text: "right", className: "arrow-next" });

class FooterSensorKit extends Component {
    state = {
        dsList:[],
        alignCenter: true,
        clickWhenDrag: false,
        dragging: true,
        hideArrows: true,
        hideSingleArrow: true,
        itemsCount: list.length,
        selected: "temperature",
        data:null,
        sensorKitUpdated: null,
        translate: 0,
        transition: 0.3,
        wheel: true,
    };

    constructor(props) {
        super(props);
        this.menu = null;
        this.menuItems = Menu(list.slice(0, list.length), this.state.selected);
    }

    onUpdate = ({ translate }) => {
        // console.log(`onUpdate: translate: ${translate}`);
        this.setState({ translate });
    };

    onSelect = key => {
        if( sensorValueList[key]!=null)
        {
        this.setState({ selected: key });
        this.props.selectedSensorKit(key);
        }
    };

    componentDidUpdate(prevProps, prevState) {
        const { alignCenter } = prevState;
        const { alignCenter: alignCenterNew } = this.state;
        if (alignCenter !== alignCenterNew) {
            this.menu.setInitial();
        }
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.sensorKits && nextProps.sensorKits !== this.state.sensorKitUpdated) {
            if(nextProps.datastreamListofClickedDevice.length !== sensorReadings.length) sensorReadings = []
            this.setState({sensorKitUpdated: nextProps.sensorKits,dsList:nextProps.datastreamListofClickedDevice})
        }
    }

    setItemsCount = ev => {
        const { itemsCount = list.length, selected } = this.state;
        const val = +ev.target.value;
        const itemsCountNew =
            !isNaN(val) && val <= list.length && val >= 0
                ? +ev.target.value
                : list.length;
        const itemsCountChanged = itemsCount !== itemsCountNew;

        if (itemsCountChanged) {
            this.menuItems = Menu(list.slice(0, itemsCountNew), selected);
            this.setState({
                itemsCount: itemsCountNew
            });
        }
    };

    render() {

        const {
            alignCenter,
            clickWhenDrag,
            hideArrows,
            dragging,
            hideSingleArrow,
            itemsCount,
            selected,
            translate,
            transition,
            wheel
        } = this.state;

        let menu;

        if (this.state.sensorKitUpdated){
            // Object.keys(this..state.sensorKitUpdated).forEach(key => {
            //     let object = {};
            //     object["name"] = key;
            //     let updatedSensorReadings = sensorReadings;
            //     if (updatedSensorReadings && updatedSensorReadings.length > 0){
            //         for (let i = 0; i < updatedSensorReadings.length ; i++){
            //             if(updatedSensorReadings[i]["name"] === key){
            //                 updatedSensorReadings[i]["curValue"] = this.state.sensorKitUpdated[key]
            //             }else {
            //                 object["curValue"] = this.state.sensorKitUpdated[key]
            //                 updatedSensorReadings.push(object)
            //             }
            //         }
            //     }
            //     else updatedSensorReadings.push(object)
            //     sensorReadings = updatedSensorReadings
            // })
            //
            // console.log(sensorReadings)
            menu = Menu(this.state.dsList.slice(0, this.state.dsList.length), this.selected,this.state.sensorKitUpdated);
        }


        // else
        //     menu = Menu(list.slice(0, list.length), this.selected,null);
        return (
            <div className="App">

                <ScrollMenu
                    ref={el => (this.menu = el)}
                    data={menu}
                    arrowLeft={ArrowLeft}
                    arrowRight={ArrowRight}
                    hideArrows={hideArrows}
                    hideSingleArrow={hideSingleArrow}
                    transition={+transition}
                    onUpdate={this.onUpdate}
                    onSelect={this.onSelect}
                    selected={selected}
                    translate={translate}
                    alignCenter={alignCenter}
                    scrollToSelected={true}
                    dragging={dragging}
                    clickWhenDrag={clickWhenDrag}
                    wheel={wheel}
                />
            </div>
        );
    }
}

export default FooterSensorKit;
