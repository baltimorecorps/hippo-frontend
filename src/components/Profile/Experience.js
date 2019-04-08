import React from 'react'
import { Button, Divider, Icon, AccordionTitle} from 'semantic-ui-react'
import {Col, Row} from 'react-bootstrap'
import ExperienceForm from './ExperienceForm'
import ExperienceItem from './ExperienceItem'
import './profile.css'


//todo: check how to write if/else in render/function
//todo: check how to write clickable icon


class Experience extends React.Component {

    state = {
      isUser: true,
      add: false,
      display: false,
      displayForm: false,
      //displayUpdateForm: false,
      showHint: false,
      experiences: [],

      organization: "google", //host
      title: "sde",  //title
      date_end: "1999-09-09",
      date_start: "1990-01-01",
      description: "working as a sde",
      type: "Work",
      id: 16,  
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

    addData = (organization, title, date_start, date_end, description) => {

      const url = 'http://127.0.0.1:5000/api/contacts/1/experiences/';
      fetch(url, {
        method: 'POST',
        mode :'cors',
        body: JSON.stringify({
          
          host: organization,         
          title: title,
          date_start: date_start,
          date_end: date_end,
          description: description,
          id: this.state.id+1,         
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
        // handle success
        //this.setState({
          //experiences: json.data,
        //})
        console.log("response from POST data method:", json);
        
        //change add state, so that the form would disappear 
        const new_id = this.state.id;
        this.setState({
          displayForm: false,
          id: new_id + 1,
        })
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

    componentDidMount(){
      this.fetchData();
    }

        

    displayPastExperience = ()=>{    
      const res = this.state.experiences.map(item=>{
        return (
          <div key={item.id} style={{marginLeft:"20px"}} className={item}>
            <ExperienceItem putData={this.putData.bind(this)} displayUpdateForm={this.state.displayUpdateForm}  
            deleteData={this.deleteData} exp_id={item.id} organization={item.host} title={item.title} descrition={item.descrition} 
            date_start={item.date_start} date_end={item.date_end} />
          </div>
        );
      });
      
      return res;
    }
    
    displayNewExperience =() =>{
      return <div style={{marginLeft:"20px"}}>
        <ExperienceItem putData={this.putData.bind(this)} displayUpdateForm={this.state.displayUpdateForm}  
            deleteData={this.deleteData} exp_id={this.state.id} organization="Baltimore Corps" title="Software Engineer" descrition="Managed a budget ......"
            date_start="Sept 2015" date_end="Sept 2018" />
      </div>
    }


    async putData (exp_id, organization, title) {
      console.log("!!PUT data ");
      const url = 'http://127.0.0.1:5000/api/contacts/1/experiences/' + exp_id;

      const response = await fetch(url, {
        method: 'PUT',
        mode :'cors',
        body: JSON.stringify({
          host: organization,
          title: title,
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
      console.log("response from PUT EXPERIENCE:", json);
      
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
              
     


    
    onHover=()=>{
      this.setState({showHint: true});
    }

    render(){
      var textStyle={
        fontSize: "26px",
        fontWeight: "300",
        lineHeight: "0.8",
        color: "#5f6163",
      }
      return (
        <div style={{marginTop: "10px", backgroundColor:"white", padding:"15px"}}>
          <Row>
              <Col xs md lg="4">
                <div style={textStyle}>Experience </div>
                {/*<Button onClick={this.fetchData}> Click to see details </Button> */}
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
              <Col xs md lg="8">
                  {this.displayNewExperience()}
                  {this.displayPastExperience()}                  
              </Col>
              <Col xs md lg="2">
                <div stype={{marginTop: "20px"}}>
                  <ExperienceForm displayForm = {this.state.displayForm}  func={this.addData} handleCancel ={this.handleCancel} />
                </div>
              </Col>
          </Row>
          
        </div>
      );
    }
  };
  export default Experience;
