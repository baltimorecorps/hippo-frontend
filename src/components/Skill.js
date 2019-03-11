import React from 'react'
import { Button, Divider, Icon} from 'semantic-ui-react'
import {Col, Row} from 'react-bootstrap'
import SkillForm from './SkillForm'
import SkillItem from './SkillItem'


//todo: check how to write if/else in render/function
//todo: check how to write clickable icon


class Skill extends React.Component {

    state = {
      isUser: true,
      add: false,
      skill: '',
      length: '',
      display: false,
      showHint: false,
    }
    handleClick(e){
      e.preventDefault();
      this.setState({add: true});
      console.log("handle click");
    }
    addSkill = (s, d, b)=> {
      this.setState({skill:s, length: d, display: true});
    }

    displayPastSkill = ()=>{
      return (
        <div style={{marginLeft:"20px"}}>
          <Row>
            <SkillItem skill="Java" length="3 years"/>
          </Row>

          <Row>
            <SkillItem skill="Python" length="2 years"/>
          </Row>

        </div>
      );

    }
    displaySkill = ()=>{
      if (this.state.display){
        return (
          <div style={{marginLeft:"20px"}}>
            <Row>
              <SkillItem skill={this.state.skill} length={this.state.length}/>
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
        <div style={{margin: "10px", backgroundColor:"#e7f4e3", padding:"15px"}}>
          <Row>
            <Col xs md lg="2">
              <h3>Skill </h3>
            </Col>
            <Col  xs md lg="8">

                <button style={{display:'inline-block', float:"right" ,border: "none", backgroundColor:"transparent"}}onClick ={this.handleClick.bind(this)} >
                  <Icon style={{display:'inline-block'}} name='plus'/>
                  {this.state.showHint? <p> Click plus sign to add new skill </p>: null}
                </button>
            </Col>
          </Row>
          <Divider/>
          
          <Row>
            <Col>
              {this.displayPastSkill()}
              {this.displaySkill()}
            </Col>
            <Col>
              <SkillForm display = {this.state.display} add = {this.state.add} func={this.addSkill}/>
            </Col>         
          </Row>
         
        </div>
      );
    }
  }
  export default Skill;
