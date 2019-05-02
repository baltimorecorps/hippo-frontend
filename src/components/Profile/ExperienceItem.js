import React from 'react';
import PropTypes from 'prop-types';
import {Button, Icon, Grid} from 'semantic-ui-react'
import {Col, Row} from 'react-bootstrap'
import ExperienceUpdateForm from './ExperienceUpdateForm'
import './profile.css';



class ExperienceItem extends React.Component {
    state = {
      isUser: true,
      displayUpdateForm: false,
      organization: this.props.organization,
      title: this.props.title,
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

    onSubmitEdit = (exp_id, organization, title, date_start, date_end,achievements, type)=>{
      this.props.putData(exp_id, organization, title, date_start, date_end,achievements, type);
      

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

    
    displayOneExperience = ()=>{
      var textStyleSmall={
        fontSize: "20px",
        fontWeight: "300",
        lineHeight: "0.8",
        color: "#5f6163",
      }

        console.log("EXPERIENCE ITEM: this.props.organization:" + this.props.organization);
        return (
          <div style={textStyleSmall}>
            <Grid style={{marginLeft: "20px"}}>
              <Grid.Column floated='left' width={2}>
                <button type="button" className="btn btn-success btn-circle btn-xl"><i className="fa fa-check"> {this.props.organization.charAt(0)} </i></button>
              </Grid.Column>

              <Grid.Column floated='left' width={11} style={{marginTop: "5px"}}>
                <h2> <strong>{this.props.organization}, {this.props.title} </strong> </h2>
                <p>  {this.props.date_start} -- {this.props.date_end} </p>

            
                <div>
                  <p>Achievements:</p>
                  {this.state.achievements.map(item=>{
                      return <p key={item.achievement_order}>{item.achievement_order+1}: {item.description}</p>
                  })}
                </div>

              </Grid.Column>
            </Grid>
          </div>
        );
    }
    render(){
      console.log("render experienceItem")
      console.log("this.state.displayUpdateForm="+this.state.displayUpdateForm)
      return <div>
        <Grid style={{marginTop: "20px"}}>

          <Grid.Column floated='left' width={13}>
            {this.displayOneExperience()}
          </Grid.Column>
          <Grid.Column textAlign='right' floated='right' width={3}>
            <Icon name='edit' onClick={this.onEdit}/>
            <Icon name='delete' onClick={this.onDelete}/>
          </Grid.Column>
        </Grid>


        {this.state.displayUpdateForm?
        <ExperienceUpdateForm displayUpdateForm={this.state.displayUpdateForm}  handleCancel={this.handleCancel} func={this.onSubmitEdit} exp_id={this.props.exp_id} /> : null}


        </div>
    }
  }

ExperienceItem.propTypes = {
  //id: PropTypes.number.isRequired,
  description: PropTypes.string,
  organization: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  degree: PropTypes.oneOf(['High School', 'Associates', 'Undergraduate', 'Masters', 'Doctoral']),
  date_start: PropTypes.string.isRequired,
  date_end: PropTypes.string,
  //date_start: PropTypes.instanceOf(Date).isRequired,
  //date_end: PropTypes.instanceOf(Date),
  type: PropTypes.oneOf(['Work', 'Service', 'Accomplishment', 'Education']).isRequired,
  contact_id: PropTypes.number,
  achievements: PropTypes.array,
}

  export default ExperienceItem;
