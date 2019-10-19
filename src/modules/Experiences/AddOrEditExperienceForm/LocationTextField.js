import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import TextField from '@material-ui/core/TextField';

const LocationTextField = ({ value, handleLocationChange, name }) => {
  const handleChange = (address) => {
    handleLocationChange(address);
  };
  const handleSelect = (address) => {
    handleLocationChange(address);
  };
  const searchOptions = {
    types: ['(cities)'],
  };

  return (
    <PlacesAutocomplete
      value={value}
      onChange={handleChange}
      onSelect={handleSelect}
      searchOptions={searchOptions}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <TextField
            {...getInputProps({
              className: 'location-search-input',
              id: 'location',
              label: 'Location',
              name: 'location_city',
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
              const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer', fontFamily: 'Lato' }
                : { backgroundColor: '#ffffff', cursor: 'pointer', fontFamily: 'Lato' };
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

export default LocationTextField;
