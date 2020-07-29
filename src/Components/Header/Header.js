import React from 'react';
import './Header.css';
import SearchBox from './SearchBox'

const header = (props) => {
    return (
        <div className='headerContainer'>
            <div className='headerContainerSecondColumn'>
                <SearchBox {...props}/>
            </div>
        </div>
    )
}

export default header
