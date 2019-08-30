import React from 'react';
import CardGroup from 'components/CardGroup';
import cardGroupItems from './cardGroupItems';

class SearchContact extends React.Component {
  render() {
    return (
      <div className="ui container" style={{ marginTop: '10px' }}>
        <div style={{ margin: '10px' }}>
          All Contacts:
        </div>
        <CardGroup items={cardGroupItems} />
      </div>
    );
  }
}
export default SearchContact;
