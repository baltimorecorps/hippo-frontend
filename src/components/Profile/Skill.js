import React from 'react'
import { Button, Divider, Icon} from 'semantic-ui-react'
import {Col, Row} from 'react-bootstrap'
import SkillForm from './SkillForm'
import SkillItem from './SkillItem'
import './profile.css'


//todo: check how to write if/else in render/function
//todo: check how to write clickable icon


class Skill extends React.Component {

        state = {
          isUser: true,
          add: false,
          display: false,
          displayForm: false,
          experiences: [],
          skill: '',
          length: '',
          expNum: 1,
          date_end: "1999-09-09",
          date_start: "1990-01-01",
          description: "this is description.....",
          type: "Skill",
          //id: 16,
        }
//The following four functions are for communicating with the backend
        addData = (skill, rank) => {
          this.setState({
            displayForm: false,
          });

          const url = 'http://127.0.0.1:5000/api/contacts/1/experiences/';
          fetch(url, {
            method: 'POST',
            mode :'cors',
            body: JSON.stringify({
              tag: skill,
              score: rank,
            }),
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              //'Access-Control-Allow-Credentials':true,
              'Access-Control-Allow-Origin':true
            },

          })
          .then(response => response.json())
          .then((json) => {
            console.log("response from POST data method:", json);
            //fetch data again so that the added data can be displayed
            this.fetchData();
          })
        }


        fetchData = () =>{
          fetch('http://127.0.0.1:5000/api/contacts/1/experiences/')
          .then(res=>res.json())
          .then(data=>
            {console.log("!!Fetchdata:" , data);
            this.setState({
              experiences: data.data,
            }) }
          )
        }

        async putData (exp_id, institution, degree) {
          console.log("!!PUT data ");
          const url = 'http://127.0.0.1:5000/api/contacts/1/experiences/' + exp_id;

          const response = await fetch(url, {
            method: 'PUT',
            mode :'cors',
            body: JSON.stringify({
              host: institution,
              title: degree,
              date_start: "1999-01-01",
              date_end: "2000-01-01",
              "description": "update update",
              "id": exp_id,
              "type": "Work",
            }),
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              //'Access-Control-Allow-Credentials':true,
              'Access-Control-Allow-Origin':true
            },
          })
          const json = await response.json();
          console.log("response from PUT Skill:", json);

          this.fetchData();


        }
        deleteData = (exp_id) =>{
          fetch('http://127.0.0.1:5000/api/contacts/1/experiences/'+ exp_id, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: exp_id})
          })
          .then(res => res.json())
          .then(res =>
            {console.log("Delete,", res);
            this.fetchData();
            })
        }

        handleClick(e){
          e.preventDefault();
          this.setState({
            //add: true,
            displayForm: true,
          });
        }

        handleCancel = ()=>{
          this.setState({
            displayForm: false,
          });
        }

        

        componentDidMount(){
          this.fetchData();
        }


//TODO: fields need to change
        displayPastSkill = ()=>{
          const res = this.state.experiences.map(item=>{
            return (
              <div key={item.id} style={{marginLeft:"20px"}} className={item}>
                <SkillItem putData={this.putData.bind(this)} displayUpdateForm={this.state.displayUpdateForm}
                deleteData={this.deleteData} exp_id={item.id} institution={item.host} degree={item.degree} descrition={item.descrition}
                date_start={item.date_start} date_end={item.date_end} />
              </div>
            );
          });

          return res;
        }

        displayFunctions= ()=>{
          //TODO

          return <div style={{marginLeft:"20px"}}>
            <SkillItem putData={this.putData.bind(this)} displayUpdateForm={this.state.displayUpdateForm}
                deleteData={this.deleteData} exp_id={this.state.id} skill="Data Architecture" rank="Understands"
                 />
          </div>
        }

        displayTopics = ()=>{

          return <div style={{marginLeft:"20px"}}>
            <SkillItem putData={this.putData.bind(this)} displayUpdateForm={this.state.displayUpdateForm}
                deleteData={this.deleteData} exp_id={this.state.id} skill="Public Health" rank="Can teach"
                 />
          </div>

        }
        displaySkills = ()=>{

          return <div style={{marginLeft:"20px"}}>
            <SkillItem putData={this.putData.bind(this)} displayUpdateForm={this.state.displayUpdateForm}
                deleteData={this.deleteData} exp_id={this.state.id} skill="C++" rank="Understands"
                 />
          </div>

        }

        render(){
          var textStyle={
            fontSize: "26px",
            fontWeight: "300",
            lineHeight: "0.8",
            color: "#5f6163",
          }
          var textStyleSmall={
            fontSize: "20px",
            fontWeight: "300",
            lineHeight: "0.8",
            color: "#5f6163",
          }

          return (
            <div style={{marginTop: "10px", backgroundColor:"white", padding:"15px"}}>
              <Row>
                  <Col xs md lg="4">
                    <div style={textStyle}>Skills and Abilities</div>
                    {/*<Button onClick={this.fetchData}> Click to see details </Button> */}
                  </Col>
                  <Col  xs md lg="8">

                      <button style={{display:'inline-block', float:"right" ,border: "none", backgroundColor:"transparent"}}onClick ={this.handleClick.bind(this)} >

                        <Icon style={{display:'inline-block'}} name='plus'/>
                        {this.state.showHint? <p> Click plus sign to add new Skill </p>: null}
                      </button>
                  </Col>
              </Row>
              <Divider/>
              <Row >
                <div style={{marginLeft: "27px", marginTop: "27px"}}>
                <div style={textStyleSmall}>Functions I've performed</div>
                </div>

              </Row>
              <Row>
                  <Col xs md lg="8">
                      {/*{this.displayNewSkill()}
                      {this.displayPastSkill()}*/}

                      {this.displayFunctions()}

                  </Col>
                  <Col xs md lg="2">
                    <div stype={{marginTop: "20px"}}>
                      <SkillForm displayForm = {this.state.displayForm}  func={this.addData} handleCancel ={this.handleCancel} />
                    </div>
                  </Col>
              </Row>


              <Row >
                <div style={{marginLeft: "27px", marginTop: "27px"}}>
                  <div style={textStyleSmall}>Topics I've pursued</div>
                </div>

              </Row>
              <Row>
                  <Col xs md lg="8">
                      {/*{this.displayNewSkill()}
                      {this.displayPastSkill()}*/}

                      {this.displayTopics()}

                  </Col>
                  {/*}
                  <Col xs md lg="2">
                    <div stype={{marginTop: "20px"}}>
                      <SkillForm displayForm = {this.state.displayForm}  func={this.addData} handleCancel ={this.handleCancel} />
                    </div>
                  </Col>*/}
              </Row>

              <Row >
                <div style={{marginLeft: "27px", marginTop: "27px"}}>
                  <div style={textStyleSmall}>Skills I've developed</div>
                </div>

              </Row>
              <Row>
                  <Col xs md lg="8">


                      {this.displaySkills()}

                  </Col>
                  {/*}
                  <Col xs md lg="2">
                    <div stype={{marginTop: "20px"}}>
                      <SkillForm displayForm = {this.state.displayForm}  func={this.addData} handleCancel ={this.handleCancel} />
                    </div>
                  </Col>*/}
              </Row>




            </div>
          );
        }
      };
      export default Skill;

/*import React from 'react'
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
    displayFunctions= ()=>{

        return (
          <div style={{marginLeft:"20px"}}>
            <Row>
              <SkillItem skill="Data Architecture" length="3 years" expNum= "4"/>
            </Row>
          </div>
        );
    }
    displayTopics = ()=>{

        return (
          <div style={{marginLeft:"20px"}}>
            <Row>
              <SkillItem skill="Public Health" length="2 years" expNum= "4 experiences"/>
            </Row>
          </div>
        );

    }
    displaySkills = ()=>{

        return (
          <div style={{marginLeft:"20px"}}>
            <Row>
              <SkillItem skill="Java" length="2 years" expNum= "4"/>
            </Row>
          </div>
        );
    }
    onHover=()=>{
      this.setState({showHint: true});
    }

    render(){

      return (
        <div style={{margin: "10px", backgroundColor:"#e7f4e3", padding:"15px"}}>
          <Row>
            <Col xs md lg="2">
              <h3>Skills and Abilities </h3>
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
              {this.displayFunctions()}
              {this.displayTopics()}
              {this.displaySkills()}
            </Col>
            <Col>
              <SkillForm display = {this.state.display} add = {this.state.add} func={this.addSkill}/>
            </Col>
          </Row>

        </div>
      );
    }
  }
  export default Skill;*/
