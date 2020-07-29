import React from 'react';
import './FooterKitCreator.css'
import equalIcon from '../../assets/images/equal_icon.svg';
import temperatureIcon from '../../assets/images/temperature.svg';
import humidityIcon from '../../assets/images/humidity.svg';
import pm2Icon from '../../assets/images/pm2.5.png'
import pm10Icon from '../../assets/images/pm2.5.png'
import WindSpeedIcon from '../../assets/images/windspeed.png'
import PressureIcon from '../../assets/images/pressure.svg';
import o3Icon from '../../assets/images/o3.png';
import coIcon from '../../assets/images/co.svg';
import so2Icon from '../../assets/images/so2.png';
import no2Icon from '../../assets/images/no2.png';

import arrowUpIcon from '../../assets/images/arrow_up_icon.svg'
import arrowDownIcon from '../../assets/images/arrow_down_icon_new.svg'

import WindDirectionIcon from '../../assets/images/winddirection.png'



import { GiMagnetBlast } from "react-icons/gi";

let icon = null;
let UofM = null;
let UofMSign;
let opac={};
const FooterKitCreator = (inputString, result,uofmSign,status) => {
    if (result === null){
        result = "NA"
        opac={opacity:'0.5'};
    }
    else
    {
        opac={opacity:'1'};
    }
    let sign;
    if(uofmSign === "smaller")
        sign = arrowDownIcon
    else if(uofmSign === "greater")
        sign = arrowUpIcon
    else
         sign = equalIcon

    if(inputString === 'Temperature'){
        icon = <img className='FooterKitIcon' src={temperatureIcon} />
        UofM = 'ºC'
        UofMSign = sign
    }
    else if(inputString === 'PM2.5'){
        icon = icon = <img className='FooterKitIcon' src={pm2Icon} />
        UofM = 'ug/m3'
        UofMSign = equalIcon
    }
    else if(inputString === 'PM10'){
        icon = icon = <img className='FooterKitIcon' src={pm10Icon} />
        UofM = 'ug/m3'
        UofMSign = equalIcon
    }
    else if(inputString === 'WindSpeed'){
        icon = icon = <img className='FooterKitIcon' src={WindSpeedIcon} />
        UofM = 'm/s'
        UofMSign = equalIcon
    }
    else if(inputString === 'WindDirection'){
        icon = icon = <img className='FooterKitIcon' src={WindDirectionIcon} />
        UofM = 'deg'
        UofMSign = equalIcon
    }
    else if(inputString === 'Humidity'){
        icon = icon = <img className='FooterKitIcon' src={humidityIcon} />
        UofM = '%'
        UofMSign = sign
    }
    else if(inputString === 'Pressure'){
        icon = <img className='FooterKitIcon' src={PressureIcon} />
        UofM = 'mBar'
        UofMSign = equalIcon
    }
    else if(inputString === 'O3'){
        icon = <img className='FooterKitIcon' src={o3Icon} />
        UofM = 'ppm'
        UofMSign = equalIcon
    }
    else if(inputString === 'CO'){
        icon = <img className='FooterKitIcon' src={coIcon} />
        UofM = 'ppm'
        UofMSign = equalIcon
    }
    else if(inputString === 'NO2'){
        icon = <img className='FooterKitIcon' src={no2Icon} />
        UofM = 'ppm'
        UofMSign = equalIcon
    }
    else if(inputString === 'SO2'){
        icon = <img className='FooterKitIcon' src={so2Icon} />
        UofM = 'ppm'
        UofMSign = equalIcon
    }

    return(
        <div className='FooterKitBox' style={opac}>
            <div className='FooterKitFirstRow'>
                <div style={{width:"20%",marginBottom:"auto"}}>
                    <span>{icon}</span>
                </div>
                <div style={{width:"60%",marginBottom:"auto"}}>
                    <span className='FooterKitSecondColumn' >{result}</span>
                </div>

                <div className='FooterKitBoxUofM' style={{textAlign:"center"}} >
                    <div className='FooterKitFirstRow' style={{marginLeft:"5px",marginTop:"5px"}}>
                        <span style={{marginBottom:"0"}} >{UofM}</span>
                    </div>
                    <div style={{width:"100%",textAlign:"center"}}>
                        <img src={UofMSign} style={{width:"15px",height:"15px",textAlign:"center",marginBottom:"10px",marginTop:"-16px"}}/>
                    </div>
                </div>
            </div>


            <div style={{width:"100%",textAlign:"center"}}>
                    <span style={{marginBottom:"30px",textAlign:"center",width:"100%"}}>{inputString}</span>
            </div>
        </div>
    )
}
export default FooterKitCreator;
