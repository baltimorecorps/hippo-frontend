import React from 'react'
import { Button, Divider, Icon} from 'semantic-ui-react'
import {Col, Row} from 'react-bootstrap'
import EducationForm from './EducationForm'
import EducationItem from './EducationItem'


//todo: check how to write if/else in render/function
//todo: check how to write clickable icon


class Education extends React.Component {

    state = {
      isUser: true,
      add: false,
      school: '',
      degree: '',
      display: false,
      showHint: false,
    }
    handleClick(e){
      e.preventDefault();
      this.setState({add: true});
      console.log("handle click");
    }
    addEducation = (s, d, b)=> {
      this.setState({school:s, degree: d, display: true});
    }

    displayPastEducation = ()=>{
      return (
        <div style={{marginLeft:"20px"}}>
          <Row>
            <EducationItem school="Boston College" degree="BS"/>
          </Row>

          <Row>
            <EducationItem school="MIT" degree="MS"/>
          </Row>

        </div>
      );

    }
    displayEducation = ()=>{
      if (this.state.display){
        return (
          <div style={{marginLeft:"20px"}}>
            <Row>
              <EducationItem school={this.state.school} degree={this.state.degree}/>
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
        <div style={{margin: "10px", backgroundColor: "#e3f4f1",  padding:"15px" }}>
          <Row>
            <Col xs md lg="2" >
              <h3>Education </h3>
            </Col>
            <Col  xs md lg="8">
                <button style={{display:'inline-block', float:"right" ,border: "none", backgroundColor:"transparent"}}onClick ={this.handleClick.bind(this)} >

                  <Icon style={{display:'inline-block'}} name='plus'/>
                  {this.state.showHint? <p> Click plus sign to add new Education </p>: null}
                </button>
            </Col>
          </Row>
          <Divider/>
          
          <Row >
            <Col>
              {this.displayPastEducation()}
              {this.displayEducation()}
            </Col>
            <Col>               
              <EducationForm display = {this.state.display} add = {this.state.add} func={this.addEducation}/>    
            </Col>        
          </Row>
          
        </div>
      );
    }
  }
  export default Education;
