import React from 'react';
import {Form} from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-awesome-modal';


class EducationForm extends React.Component {
    constructor(props){
      super(props);
      //TODO
      this.state = {
        isUser: true,
        institution: '',
        degree: '',
        fieldOfStudy: '',
        date_start: new Date(),
        date_end: new Date(),
        description: '',
        type: 'Work',
      };
      this.createItem = this.createItem.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      //this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChangeInstitution = this.handleChangeInstitution.bind(this);
      this.handleChangeDegree = this.handleChangeDegree.bind(this);
      console.log("start date: "+this.state.date_start);
    }
    //TODO
    handleSubmit(event){
      event.preventDefault();
      //TODO may need to add fieldOfStudy
      this.props.func(this.state.institution, this.state.degree, this.state.date_start, this.state.date_end, this.state.description,
        this.state.type);
      console.log("EducationForm, institution, degree: ", this.state.institution, this.state.degree);
    }
    handleCancel=(event)=>{
      //this.setState({shouldDisappear: true});
      this.props.handleCancel();
      console.log("in handleCancel");
    }
    handleChangeInstitution(event){
      event.preventDefault();
      this.setState({institution: event.target.value});
    }
    handleChangeDegree(event){
      event.preventDefault();
      this.setState({degree: event.target.value});
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
      if (this.props.displayForm === true){
        return (
          <div  >
            <Modal visible="true" width="400" height="550" effect="fadeInUp" >
              <div style={{ margin:"20px"}}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                     <label> Institution: </label>
                     <input placeholder='Institution Name'value={this.state.institution} onChange={this.handleChangeInstitution} />
                  </Form.Field>

                  <Form.Field>
                    <label>
                      Degree:
                      <input placeholder='Degree level' value={this.state.degree} onChange={this.handleChangeDegree} />
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
  export default EducationForm;


/*import React from 'react';


class EducationForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isUser: true,
      //add: false,
      school: '',
      degree: '',
      shouldDisappear : false,
    };
    this.createItem = this.createItem.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeSchool = this.handleChangeSchool.bind(this);
    this.handleChangeDegree = this.handleChangeDegree.bind(this);
  }
  handleSubmit(event){
    event.preventDefault();
    this.setState({shouldDisappear: true});
    console.log("in handleSubmit");
    this.props.func(this.state.school, this.state.degree, true);
  }
  handleCancel=(event)=>{
    this.setState({shouldDisappear: true});
    console.log("in handleCancel");
  }
  handleChangeSchool(event){
    event.preventDefault();
    this.setState({school: event.target.value});
  }
  handleChangeDegree(event){
    event.preventDefault();
    this.setState({degree: event.target.value});
  }

  createItem = ()=>{
    if (this.props.add == true && this.state.shouldDisappear==false){
      return (
        <div >
          <form onSubmit={this.handleSubmit}>
            <label>
              School:
              <input value={this.state.school} onChange={this.handleChangeSchool} />
            </label>
            <label>
              Degree:
              <input value={this.state.degree} onChange={this.handleChangeDegree} />
            </label>
            <p> <input type="submit" value="Submit" /> <input type="button" onClick={this.handleCancel} value="Cancel" /></p>
        </form>
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
  export default EducationForm;*/
