import React from 'react';
import {Form} from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-awesome-modal';
import Autosuggest from 'react-autosuggest';
import './autoSuggest.css'


const getSuggestionValue = suggestion => suggestion.name;
const all_data =[{name: "C", id: 1}, {name:"C++", id:2}, {name:"C#", id:3}];

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (  
        <div>             
            {suggestion.name}   
        </div> 
);

class SkillForm extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        isUser: true,
        skill: "Java",
        years: 5,
        expNum: 4,
        //date_start: new Date(),
        //date_end: new Date(),
        //description: '',
        //type: 'Skill',
        suggestions:[],
        value:'',
      };
      this.createItem = this.createItem.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      //this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChangeCompany = this.handleChangeCompany.bind(this);
      this.handleChangePosition = this.handleChangePosition.bind(this);
      console.log("start date: "+this.state.date_start);
    }

    getSuggestions = /*async*/ value =>{

      console.log("in get suggestions");
      const inputValue = value.trim().toLowerCase();
      const inputLength = inputValue.length;
      if (inputLength === 0) return [];
      /*
      console.log("in get suggestions2");
      let query = `/search/workshops/keywords/${value}`;
      await fetch(api+query).then(response=>response.json())
      .then(data=>{
          console.log(data);
          let array = [];
          array = data.map(item=>{
              
              return {name:item.workshop_name, id: item.workshop_id};
          })
          console.log(array);
          this.setState({suggestions: array});
          console.log("suggestions in state:");
          console.log(this.state.suggestions);
          return array;
      });
      */
      console.log("all data");
      console.log(all_data);
      console.log("inputValue="+ inputValue);
      return all_data.filter(data=>data.name.toLowerCase().slice(0, inputLength)===inputValue);
    };

    onChange = (event, {newValue})=>{
      this.setState({
          value: newValue
      });
  };
  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
      this.setState({
          suggestions: this.getSuggestions(value)
      });
  };
  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
      this.setState({
      suggestions: []
      });
  };




    handleSubmit(event){
      event.preventDefault();
      //this.setState({shouldDisappear: true});
      console.log("in handleSubmit");
      //this.props.func(this.state.company, this.state.position, true);
      this.props.func(this.state.company, this.state.position, this.state.date_start, this.state.date_end, this.state.description,
        this.state.type);
    }
    handleCancel=(event)=>{
      this.props.handleCancel();
    }
    handleChangeCompany(event){
      event.preventDefault();
      this.setState({company: event.target.value});
    }
    handleChangePosition(event){
      event.preventDefault();
      this.setState({position: event.target.value});
    }
    //TODO
    handleChangeDateStart =(date)=>{
      if (date > this.state.date_end)
        {
            this.setState({
                date_end: date
              });
        }

        this.setState({
          date_start: date
        });
    }


    handleChangeDateEnd =(date)=>{
      if (date < this.state.date_start)
        {
            this.setState({
                date_start: date
              });
        }

        this.setState({
            date_end: date
        });
    }

    handleChangeDescription = (event)=>{
      event.preventDefault();
      this.setState({description: event.target.value});
    }
    handleChangeType = (event)=>{
      event.preventDefault();
      this.setState({type: event.target.value});
    }


    createItem = ()=>{
        const {value, suggestions} = this.state;
        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Type to Find A Skill',
            value,
            onChange: this.onChange
        };



      if (this.props.displayForm === true){
        return (
          <div  >
            <Modal visible="true" width="400" height="300" effect="fadeInUp" >
              <div style={{ margin:"20px"}}>
              <h3>Add Skill</h3>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                     <label> </label>
                     {/*<input placeholder='Organization Name'value={this.state.company} onChange={this.handleChangeCompany} />*/}
                     <Autosuggest
                                suggestions= {suggestions}
                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                getSuggestionValue={getSuggestionValue}
                                renderSuggestion={renderSuggestion}
                                inputProps={inputProps}
                            />
                  </Form.Field>

                  <Form.Field>
                    <label>
                      Length:
                      <input placeholder='e.g., 1 year' value={this.state.position} onChange={this.handleChangePosition} />
                    </label>
                  </Form.Field>

                    
                 

                  

                  <p> <input type="submit" value="Save" /> <input type="button" onClick={this.handleCancel} value="Cancel" /></p>
                </Form>

              </div>
            </Modal>
        </div>);
      } else {
        return null;
      }
    }

    render(){
      return <div>
        {this.createItem()}
      </div>;
    }
  }
  export default SkillForm;