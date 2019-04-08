import React from 'react';
import {Button, Icon, Grid} from 'semantic-ui-react'
import {Col, Row} from 'react-bootstrap'
import EducationUpdateForm from './EducationUpdateForm'
import './profile.css';



class EducationItem extends React.Component {
    state = {
      isUser: true,
      displayUpdateForm: false,
      institution: this.props.institution,
      degree: this.props.title,
      fieldOfStudy: this.props.fieldOfStudy,
      date_start: this.props.date_start,
      date_end: this.props.date_end,
      description: this.props.description,
      type: 'Education',
    };
    onEdit = (e) => {
      e.preventDefault();
      this.setState({
        displayUpdateForm: true,
      })
      console.log("OnEDit");
    }
    //TODO field is not enough
    onSubmitEdit = (exp_id, institution, title, date_start, date_end, description, type)=>{


      this.props.putData(exp_id, institution, title, date_start, date_end, description, type);

      this.setState({
        displayUpdateForm: false,
      })
    }
    handleCancel =()=>{
      this.setState({
        displayUpdateForm: false,
      })
    }

    onDelete = (e) => {
      const exp_id = this.props.exp_id;
      this.props.deleteData(exp_id);

    }


    displayOneEducation = ()=>{
      var textStyleSmall={
        fontSize: "20px",
        fontWeight: "300",
        lineHeight: "0.8",
        color: "#5f6163",
      }
        return (
          <div style={textStyleSmall}>
            <Grid style={{marginLeft: "20px"}}>
              <Grid.Column floated='left' width={2}>
                <button type="button" className="btn btn-primary btn-circle btn-xl"><i className="fa fa-check"> {this.props.institution.charAt(0)} </i></button>

              </Grid.Column>

              <Grid.Column floated='left' width={11} style={{marginTop: "5px"}}>
                <h3> <strong>{this.props.institution}, {this.props.degree} </strong> </h3>
                <p> {this.props.date_start} - {this.props.date_end} </p>
                <p> {this.props.description} </p>
              </Grid.Column>
            </Grid>
          </div>
        );
    }
    render(){
      //console.log("render EducationItem")
      return <div>
        <Grid style={{marginTop: "20px"}}>

          <Grid.Column floated='left' width={13}>
            {this.displayOneEducation()}
          </Grid.Column>
          <Grid.Column textAlign='right' floated='right' width={3}>
            <Icon name='edit' onClick={this.onEdit}/>
            <Icon name='delete' onClick={this.onDelete}/>
          </Grid.Column>
        </Grid>


        {this.state.displayUpdateForm?
        <EducationUpdateForm handleCancel={this.handleCancel} func={this.onSubmitEdit} exp_id={this.props.exp_id} /> : null}


        </div>
    }
  }

  export default EducationItem;
