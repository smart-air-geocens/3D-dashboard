import React from "react";
import './SponsorsInfo.css'
import AlbertaPacific from '../../assets/images/Alberta_Pacific.png'
import Cenovus from '../../assets/images/cenovus-logo_o.jpg'
import Conocophillips from '../../assets/images/conocophillips.png'
import Devon from '../../assets/images/devon-energy.jpg'
import NSERC from '../../assets/images/NSERC.jpg'

const SponsorsInfo = () => {
    return (
        <div className='sponsorsContainer'>
            <div className="sponsorsContainerFirstRow">
                <span className="sponsorsContainerFirstRowSpan">Funders / Industry Partners</span>
            </div>
            <div className="sponsorsContainerSecondRow">

                {/*<a href='https://alpac.ca/'>*/}
                {/*    <img className='imgSponsors' src={AlbertaPacific} alt={'The image cannot be shown in this browser'}/>*/}
                {/*</a>*/}
                {/*<a href='https://www.cenovus.com/'>*/}
                {/*    <img className='imgSponsors' src={Cenovus} alt={'The image cannot be shown in this browser'}/>*/}
                {/*</a>*/}
                {/*<a href='https://www.nserc-crsng.gc.ca/'>*/}
                {/*    <img className='imgSponsors' src={NSERC} alt={'The image cannot be shown in this browser'}/>*/}
                {/*</a>*/}
                {/*<a href='http://www.conocophillips.ca/'>*/}
                {/*    <img className='imgSponsors' src={Conocophillips} alt={'The image cannot be shown in this browser'}/>*/}
                {/*</a>*/}
                {/*<a href='https://www.devonenergy.com/'>*/}
                {/*    <img className='imgSponsors' src={Devon} alt={'The image cannot be shown in this browser'}/>*/}
                {/*</a>*/}


            </div>
            <div className="sponsorsContainerThirdRow">
                <span className="sponsorsContainerThirdRowSpan">This 3D dashboard is developed by the GeoSensorWeb Lab, The University of Calgary</span>
            </div>
        </div>
    );
}
export default SponsorsInfo
