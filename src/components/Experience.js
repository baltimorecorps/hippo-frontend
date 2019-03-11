import React from 'react'
import { Button, Divider, Icon} from 'semantic-ui-react'
import {Col, Row} from 'react-bootstrap'
import ExperienceForm from './ExperienceForm'
import ExperienceItem from './ExperienceItem'


//todo: check how to write if/else in render/function
//todo: check how to write clickable icon


class Experience extends React.Component {

    state = {
      isUser: true,
      add: false,
      company: '',
      position: '',
      display: false,
      showHint: false,
    }
    handleClick(e){
      e.preventDefault();
      this.setState({add: true});
      console.log("handle click");
    }
    addExperience = (c, p, b)=> {
      this.setState({company:c, position: p, display: true});
    }
/*
    addExperience(){
      if (this.state.add== true){
        this.state.add = false;
        return <ExperienceItem/>;
      }
      return null;

    }*/

/*var experienceItem = "hello experienceItem default";
if (this.state.add){
  console.log("this state add == true");
  experienceItem = <ExperienceItem />;
} else {
  experienceItem = null;
} */
    displayPastExperience = ()=>{
      return (
        <div style={{marginLeft:"20px"}}>
          <Row>
            <ExperienceItem company="Google" position="SDE"/>
          </Row>

          <Row>
            <ExperienceItem company="Amazon" position="PM"/>
          </Row>

        </div>
      );

    }
    displayExperience = ()=>{
      if (this.state.display){
        return (
          <div style={{marginLeft:"20px"}}>
            <Row>
              <ExperienceItem company={this.state.company} position={this.state.position}/>
            </Row>
          </div>
        );
      }
    }
    onHover=()=>{
      this.setState({showHint: true});
    }

    render(){

      return (
        <div style={{margin: "10px", backgroundColor:"#f2f0d5", padding:"15px"}}>
          <Row>
              <Col xs md lg="2">
                <h3>Experience </h3>
              </Col>
              <Col  xs md lg="8">

                  <button style={{display:'inline-block', float:"right" ,border: "none", backgroundColor:"transparent"}}onClick ={this.handleClick.bind(this)} >

                    <Icon style={{display:'inline-block'}} name='plus'/>
                    {this.state.showHint? <p> Click plus sign to add new experience </p>: null}
                  </button>
              </Col>
          </Row>
          <Divider/>
          <Row> 
              <Col>
                  {this.displayPastExperience()}
                  {this.displayExperience()}
              </Col>
              <Col>
                <div stype={{marginTop: "20px"}}>
                  <ExperienceForm display = {this.state.display} add = {this.state.add} func={this.addExperience}/>
                </div>
              </Col>
          </Row>
          
        </div>
      );
    }
  }
  export default Experience;
