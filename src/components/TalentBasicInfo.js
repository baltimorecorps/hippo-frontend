import React from 'react';
import profile from './profile.jpeg'
class TalentBasicInfo extends React.Component {
    state = {
      isUser: true,
    };
    render(){
      return(
        <div style={{padding: '10px', width: '100%'}}>
          <img style={{float: 'left', borderRadius:'50%'}} width="120px" height="120px" src={profile} alt="profile"></img>
          <div style={{float: 'left', margin: '15px'}}>
            <h1>Cathy Lee</h1>
            <p>billy_daly@baltimorecorps.com</p>
            <p>(123)888-1234</p>
          </div>
          
        </div>
      );
    }
  }
  export default TalentBasicInfo;
