import React from 'react';

import unsplash from '../../api/unsplash';
import SearchBar from './SearchBar';
import ContactList from './ContactList';
import ContactListFromApi from './ContactListFromApi';

class SearchContact extends React.Component {
  state = { images: [] };

  onSearchSubmit = async (term) => {
    const response = await unsplash.get('/search/photos', {
      params: { query: term },
    });
    this.setState({ images: response.data.results });
  };

  render() {
    return (
      <div className="ui container" style={{ marginTop: '10px' }}>
        <SearchBar onSubmit={this.onSearchSubmit} />
        <ContactListFromApi images={this.state.images} />
        <div style={{ margin: '10px' }}>All Contacts:</div>
        <ContactList images={this.state.images} />
      </div>
    );
  }
}
export default SearchContact;
