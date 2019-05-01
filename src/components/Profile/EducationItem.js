import React from 'react';
import {Button, Icon, Grid, Item} from 'semantic-ui-react'
import {Col, Row} from 'react-bootstrap'
import EducationUpdateForm from './EducationUpdateForm'
import './profile.css';



class EducationItem extends React.Component {
    state = {
      isUser: true,
      displayUpdateForm: false,
      organization: this.props.organization,
      degree: this.props.degree,
      description: this.props.description,
      date_start: this.props.date_start,
      date_end: this.props.date_end,
      
      achievements: this.props.achievements,
      type: this.props.type,
    };
    onEdit = (e) => {
      e.preventDefault();
      this.setState({
        displayUpdateForm: true,
      })
      console.log("OnEDit");
    }
    //TODO field is not enough
    onSubmitEdit = (exp_id, organization, degree, description, date_start, date_end,achievements,  type)=>{
      this.props.putData(exp_id, organization, degree, description, date_start, date_end, achievements, type);

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

    getInitial = () => {
      if (this.props.organization !== null 
          && this.props.organization !== undefined) {
        return this.props.organization.charAt(0);
      } else {
        return ' ';
      }
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
                <button type="button" className="btn btn-primary btn-circle btn-xl">
                  <i className="fa fa-check"> {this.getInitial()} </i>
                </button>

              </Grid.Column>

              <Grid.Column floated='left' width={11} style={{marginTop: "5px"}}>
                <h2> <strong>{this.props.organization}, {this.props.degree} </strong> </h2>
                <p>{ this.props.description} </p>
                <p>{this.props.date_start} -- {this.props.date_end}</p>
                <div>
                  <p>Achievements:</p>
                  {this.props.achievements.map(item=>
                      <p key={item.achievement_order} > {item.achievement_order+1}: {item.description} </p>
                  )}
                  
                </div>
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
        <EducationUpdateForm displayUpdateForm={this.state.displayUpdateForm} type={this.state.type} handleCancel={this.handleCancel} func={this.onSubmitEdit} exp_id={this.props.exp_id} /> : null}


        </div>
    }
  }

  export default EducationItem;
