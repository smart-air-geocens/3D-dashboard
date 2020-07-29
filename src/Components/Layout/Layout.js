import React, {Component} from 'react';
import Classes from './Layout.css';
import Maplayer from "../MapLayer/MapLayer";
import Auxiliary from '../hoc/Auxiliary';
import WithClass from '../hoc/WithClass';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


class layout extends Component {
    state = {
        activeDrags: 0,
    };

    render() {

        return (
            <Auxiliary id='List-container'>
                <div className='Header'>
                    <Header {...this.props} /></div>

                <div>
                    <div className='MapLayout'>
                        <Maplayer {...this.props} /></div>
                </div>
                <div>
                    <
                        Footer {...this.props}
                               clickedThingObs={this.props.datastreamVals}
                    /></div>
            </Auxiliary>
        )
    }
}

export default WithClass(layout, Classes.container);
