import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

const TalentBasicInfo = ({firstName, lastName, email, phone}) => {
  var textStyle = {
    fontSize: '35px',
    fontWeight: '300',
    lineHeight: '0.8',
    color: '#5f6163',
    marginTop: '5px',
  };
  var textStyleSmall = {
    fontSize: '20px',
    fontWeight: '300',
    lineHeight: '0.8',
    color: '#5f6163',
    marginTop: '15px',
  };

  return (
    <div style={{ padding: '10px', width: '100%' }}>
      <div style={{ float: 'left', marginLeft: '30px' }}>
        <div style={textStyle}>{firstName} {lastName}</div>
        <div style={textStyleSmall}>
          <Icon name="envelope outline" />{email}
        </div>
        <p style={textStyleSmall}>
          <Icon name="phone" />{phone}
        </p>
      </div>
    </div>
  );
};

TalentBasicInfo.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
}

export default TalentBasicInfo;
