import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

const LocationTextField = ({
  value,
  handleLocationChange,
  name,
  classes,
  className,
  label,
}) => {
  const handleChange = address => {
    handleLocationChange(address);
  };
  const handleSelect = address => {
    handleLocationChange(address);
  };
  const searchOptions = {
    types: ['(cities)'],
  };

  const inputLabelProps = {
    classes: {
      root: classes.labelRoot,
      focused: classes.labelFocused,
    },
  };

  const inputProps = {classes: {input: classes.resize}};

  const handleError = (status, clearSuggestions) => {
    console.log('Google Maps API returned error with status: ', status);
    clearSuggestions();
  };
  return (
    <PlacesAutocomplete
      onError={handleError}
      value={value}
      onChange={handleChange}
      onSelect={handleSelect}
      searchOptions={searchOptions}
    >
      {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
        <div>
          <TextField
            required
            InputProps={inputProps}
            InputLabelProps={inputLabelProps}
            {...getInputProps({
              className: `location-search-input ${className}`,
              id: 'location',
              label: label,
              name: name,
              style: {width: '100%'},
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              const style = suggestion.active
                ? {
                    backgroundColor: '#fafafa',
                    cursor: 'pointer',
                    fontFamily: 'Lato',
                  }
                : {
                    backgroundColor: '#ffffff',
                    cursor: 'pointer',
                    fontFamily: 'Lato',
                  };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

LocationTextField.propTypes = {
  value: PropTypes.string.isRequired,
  handleLocationChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  formControl: {
    width: '100%',
    marginTop: spacing(0),
  },
  resize: {
    fontSize: 16,
  },
  labelRoot: {
    fontSize: 17,
  },
  labelFocused: {
    fontSize: 19,
  },
});

export default withStyles(styles)(LocationTextField);
