import React from 'react';
import './SearchBox.css';
import Autosuggest from 'react-autosuggest';
import searchIcon from '../../assets/images/search_icon_white.svg'

const names = [];

const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getSuggestions = value => {
    const escapedValue = escapeRegexCharacters(value.trim());
    if (escapedValue === '') {
        return [];
    }
    const regex = new RegExp('^' + escapedValue, 'i');
    return names.filter(name => regex.test(name));
}

const getSuggestionValue = suggestion => suggestion;

const renderSuggestion = suggestion => suggestion

const renderInputComponent = inputProps => (
    <div className="inputContainer">
        <img className="icon" src={searchIcon}/>
        <input {...inputProps} />
    </div>
);

const renderSuggestionsContainer = ({ containerProps, children, query }) => (
    <div {...containerProps} >
        {children}
    </div>
);

class SearchBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            suggestions: [],
            thingsInfo: null
        };
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.thingsInfo && nextProps.thingsInfo.length > 0 && nextProps.thingsInfo !== this.state.thingsInfo) {
            for (let i=0 ; i < nextProps.thingsInfo.length ; i++){
                names[i] = nextProps.thingsInfo[i].thingName
            }
            this.setState({thingsInfo:nextProps.thingsInfo})
        }
    }

    onChange = (event, {newValue, method}) => {
        this.setState({
            value: newValue
        });

    };

    onSuggestionsFetchRequested = ({value}) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onSelectedHandler = async (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
        let selectedThingName = await suggestionValue;
        this.props.inputSelectedName(selectedThingName)
    }

    render() {
        const {value, suggestions} = this.state;
        const inputProps = {
            placeholder: "Search devices...",
            value,
            onChange: this.onChange
        };

        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                renderInputComponent={renderInputComponent}
                renderSuggestionsContainer={renderSuggestionsContainer}
                onSuggestionSelected={this.onSelectedHandler}
            />
        );
    }
}

export default SearchBox
