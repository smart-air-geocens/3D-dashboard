import React from "react";
import'./FooterHeader.css'


const lastReading = 'JANUARY 24, 2020 - 19:22';

class FooterHeader extends React.Component {

    render() {
        return (
            <div className= 'header'>
                <p>{lastReading}</p>
            </div>
        )
    }
}

export default FooterHeader;
