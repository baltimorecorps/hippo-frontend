import React from 'react'
import { Divider, Icon} from 'semantic-ui-react'
import {Col, Row} from 'react-bootstrap'
import EducationForm from './EducationForm'
import EducationItem from './EducationItem'
import './profile.css'


//todo: check how to write if/else in render/function
//todo: check how to write clickable icon


class Education extends React.Component {

        state = {
          isUser: true,
          add: false,
          display: false,
          displayForm: false,
          showHint: false,

          experiences: [],
          organization: 'Syracuse University',
          degree: 'Master',

          description: 'Computer Science',
          date_end: "1999-09-09",
          date_start: "1990-01-01",

          achievements: [{id: 0, description: "My achievement is....", achievement_order: 0}, {id: 1, description: "My achievement is ...", achievement_order: 1}],
          type: "Education",
          //id: 0,
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

//below 4 functions are for communicating with backend
    //POST
        addData = (organization, degree, description,date_start, date_end, achievements, type) => {
          const url = 'http://127.0.0.1:5000/api/contacts/1/experiences/';
          fetch(url, {
            method: 'POST',
            mode :'cors',
            body: JSON.stringify({

              host: organization,
              degree: degree,
              description: description,
              date_start: date_start,
              date_end: date_end,
              //description: descrition;
              achievements:achievements,

              type: this.state.type,
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
            this.setState({
              displayForm: false,
              //id: new_id + 1,
            })
            //fetch data again so that the added data can be displayed
            this.fetchData();
          })
        }

   //GET
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

        //PUT
        async putData (exp_id, organization, degree, description, date_start, date_end, achievements, type) {
          console.log("!!PUT data ");
          const url = 'http://127.0.0.1:5000/api/contacts/1/experiences/' + exp_id;

          const response = await fetch(url, {
            method: 'PUT',
            mode :'cors',
            body: JSON.stringify({
              host: organization,
              degree: degree,
              description: description,
              date_start: date_start,
              date_end: date_end,   //"2000-01-01",
              achievements: achievements,
              id: exp_id,
              type: type,
            }),
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              //'Access-Control-Allow-Credentials':true,
              'Access-Control-Allow-Origin':true
            },
          })
          const json = await response.json();
          console.log("response from PUT Education:", json);

          this.fetchData();
        }

        //DELETE
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
//====================================================================//

        componentDidMount(){
          this.fetchData();
        }



        displayPastEducation = ()=>{
          const res = this.state.experiences.map(item=>{
            return (
              <div key={item.id} style={{marginLeft:"20px"}} className={item}>
                <EducationItem putData={this.putData.bind(this)} displayUpdateForm={this.state.displayUpdateForm}
                deleteData={this.deleteData} exp_id={item.id} organization={item.organization} degree={item.degree}
                description={item.description} achievements={item.achievements}
                date_start={item.date_start} date_end={item.date_end} type={item.type} />
              </div>
            );
          });

          return res;
        }

        displayNewEducation =() =>{
          return <div style={{marginLeft:"20px"}}>
            <EducationItem putData={this.putData.bind(this)} displayUpdateForm={this.state.displayUpdateForm}
                deleteData={this.deleteData} exp_id={this.state.id} organization={this.state.organization} degree={this.state.degree}
                description={this.state.description} achievements={this.state.achievements}
                date_start={this.state.date_start} date_end={this.state.date_end} type={this.state.type}  />
          </div>
        }





/*
        onHover=()=>{
          this.setState({showHint: true});
        }*/

        render(){
          var textStyle={
            fontSize: "26px",
            fontWeight: "300",
            lineHeight: "0.8",
            color: "#5f6163",
          }

          return (
            <div style={{marginTop: "0px", backgroundColor:"white", padding:"15px"}}>
              <Row>
                  <Col xs md lg="4">
                    <div style={textStyle}>Education </div>
                    {/*<Button onClick={this.fetchData}> Click to see details </Button> */}
                  </Col>
                  <Col  xs md lg="8">

                      <button style={{display:'inline-block', float:"right" ,border: "none", backgroundColor:"transparent"}}onClick ={this.handleClick.bind(this)} >

                        <Icon style={{display:'inline-block'}} name='plus'/>
                        {this.state.showHint? <p> Click plus sign to add new Education </p>: null}
                      </button>
                  </Col>
              </Row>
              <Divider/>
              <Row>
                  <Col xs md lg="8">
                      {this.displayNewEducation()}
                      {this.displayPastEducation()}
                  </Col>
                  <Col xs md lg="2">
                    <div stype={{marginTop: "20px"}}>
                      <EducationForm type={this.state.type} displayForm = {this.state.displayForm}  func={this.addData} handleCancel ={this.handleCancel} />
                    </div>
                  </Col>
              </Row>

            </div>
          );
        }
      };
      export default Education;

    /*
    handleClick(e){
      e.preventDefault();
      this.setState({add: true});
      console.log("handle click");
    }
    addEducation = (s, d, b)=> {
      this.setState({organization:s, degree: d, display: true});
    }

    displayPastEducation = ()=>{
      return (
        <div style={{marginLeft:"20px"}}>
          <Row>
            <EducationItem organization="Boston College" degree="Master"/>
          </Row>


        </div>
      );

    }
    displayEducation = ()=>{
      if (this.state.display){
        return (
          <div style={{marginLeft:"20px"}}>
            <Row>
              <EducationItem organization={this.state.organization} degree={this.state.degree}, fieldOfStudy={this.state.fieldOfStudy} date_start={this.state.date_start} />
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
  }*/
