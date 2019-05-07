import React from "react";
import profile from "./profile.jpeg";
import { Icon } from "semantic-ui-react";
class TalentBasicInfo extends React.Component {
  state = {
    isUser: true
  };
  render() {
    var textStyle = {
      fontSize: "35px",
      fontWeight: "300",
      lineHeight: "0.8",
      color: "#5f6163",
      marginTop: "5px"
    };
    var textStyleSmall = {
      fontSize: "20px",
      fontWeight: "300",
      lineHeight: "0.8",
      color: "#5f6163",
      marginTop: "15px"
    };
    return (
      <div style={{ padding: "10px", width: "100%" }}>
        <img
          style={{ float: "left", borderRadius: "50%" }}
          width="120px"
          height="120px"
          src={profile}
          alt="profile"
        />
        <div style={{ float: "left", marginLeft: "30px" }}>
          <div style={textStyle}>Cathy Lee</div>
          <div style={textStyleSmall}>
            {" "}
            <Icon name="envelope outline" /> cathy@baltimorecorps.com
          </div>
          <p style={textStyleSmall}>
            {" "}
            <Icon name="phone" /> (123)888-1234
          </p>
        </div>
      </div>
    );
  }
}
export default TalentBasicInfo;
