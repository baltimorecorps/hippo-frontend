import React from 'react';
import {Container, Grid, Row, Col} from "react-bootstrap";
import TalentBasicInfo from "./TalentBasicInfo";
import Experience from "./Experience";
import Education from "./Education";
import Skill from "./Skill";
import ApplicationPortal from "./ApplicationPortal";

class TalentProfile extends React.Component {
    state = {
      isUser: true,

    };
    render(){
      return(
        <div style={{marginTop: "25px"}}>
          <Container  >
            <Row style={{backgroundColor:"lightblue", height:"150px"}}>
              <TalentBasicInfo />
            </Row>
            <Row >
              <Col >
                <Experience/>
                <Education/>
                <Skill/>
              </Col>
             
              {/*<Col style={{backgroundColor:"#c9ccc7"}}>
                <ApplicationPortal/>
              </Col>*/}
            </Row>
          </Container>
        </div>
      );
    }
  }
  export default TalentProfile;
