import React from 'react';
import {Form} from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-awesome-modal';


class ExperienceUpdateForm extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        isUser: true,
        company: '',
        position: '',
        date_start: new Date(),
        date_end: new Date(),
        description: '',
        type: 'Work',

        exp_id: this.props.exp_id,

      };
      this.createItem = this.createItem.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      //this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChangeCompany = this.handleChangeCompany.bind(this);
      this.handleChangePosition = this.handleChangePosition.bind(this);
    }

    handleSubmit(event){
      event.preventDefault();
      //this.setState({shouldDisappear: true});
      console.log("in handleSubmit");
      //this.props.func(this.state.company, this.state.position, true);
      this.props.func(this.props.exp_id, this.state.company, this.state.position, this.state.date_start, this.state.date_end, this.state.description,
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
      console.log("in create Item");
      return (
        <div>
          <Modal visible="true" width="400" height="550" effect="fadeInUp" >
            <div style={{ margin:"20px"}}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                   <label> Organization: </label>
                   <input placeholder='Organization Name'value={this.state.company} onChange={this.handleChangeCompany} />
                </Form.Field>

                <Form.Field>
                  <label>
                    Title:
                    <input placeholder='Title Name' value={this.state.position} onChange={this.handleChangePosition} />
                  </label>
                </Form.Field>

                  <div className="comp_ezw">
                    <div>Start Date </div>
                    <DatePicker
                    selected={this.state.date_start}
                    selectsStart
                    date_start={this.state.date_start}
                    date_end={this.state.date_end}
                    onChange={this.handleChangeDateStart}
                    dateFormat="dd-MM-YYYY"
                    className="ezw_datepicker"
                    />
                    <div className="ezw_to">End Date </div>
                    <DatePicker
                    selected={this.state.date_end}
                    selectsEnd
                    date_start={this.state.date_start}
                    date_end={this.state.date_end}
                    onChange={this.handleChangeDateEnd}
                    dateFormat="dd-MM-YYYY"
                    className="ezw_datepicker"
                    />
                </div>

                <Form.Field>
                  <label>
                    Achievement:
                    <textarea value={this.state.achivement} onChange={this.handleChangeAchievement} />
                  </label>
                </Form.Field>

                <p> <input type="submit" value="Save" /> <input type="button" onClick={this.handleCancel} value="Cancel" /></p>
              </Form>

            </div>
          </Modal>
      </div>);
    };


    render(){
      return <div>
        {this.createItem()}
      </div>;
    }
  }
  export default ExperienceUpdateForm;
