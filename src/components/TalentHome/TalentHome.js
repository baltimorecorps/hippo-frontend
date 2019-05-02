import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, Col,  } from "react-bootstrap";
import { Divider, Button } from 'semantic-ui-react'
import OpportunityCardProps from "./OpportunityCardProps"
import ApplicationCardProps from "./ApplicationCardProps"
import TalentCardProps from "./TalentCardProps";

class TalentHome extends React.Component {
    state = {
      isUser: true,
    };
    render(){
      return(
        <div style={{marginTop: "25px"}}>
          <Container  >
            <Row style={{backgroundColor:"lightblue", height:"150px"}}>
              <Col style={{padding: "20px"}}>
                  <h1>Billy Daly</h1>
                  <p><Link to="/TalentProfile"> <Button >View Your Profile-></Button> </Link></p>
              </Col>
              <Col>

              </Col>

              <Col style={{marginTop:"20px"}}>
                <Link to="/TalentProfile"><Button >+Update Education</Button></Link>
                  <Divider />
                  <Link to="/TalentProfile"><Button>+Update Work Experience</Button></Link>

              </Col>
            </Row>
            <Row style={{backgroundColor:"white", height:"200px", marginTop:"20px"}}>
              <div >
                <h2>Opportunities Recommended for You</h2>
                <div style={{marginLeft:"100px"}}>
                <OpportunityCardProps/>
                </div>
              </div>

            </Row>
            <Row style={{backgroundColor:"white", height:"200px"}}>
                <div>
                    <h2>Your Applications</h2>
                    <div style={{marginLeft:"100px"}}>
                        <ApplicationCardProps/>
                    </div>
                </div>
            </Row>
            <Row style={{ height:"200px"}}>
                <div>
                    <h2>You may want to connect with</h2>
                    <div style={{marginLeft:"100px"}}>
                        <TalentCardProps/>
                    </div>
                </div>
            </Row>
          </Container>
        </div>
      );
    }
  }
  export default TalentHome;
