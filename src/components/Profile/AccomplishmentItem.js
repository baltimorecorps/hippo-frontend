import React from 'react';
import {Icon, Grid} from 'semantic-ui-react';
import AccomplishmentUpdateForm from './AccomplishmentUpdateForm'
import './profile.css';

class AccomplishmentItem extends React.Component {
    state = {
      isUser: true,
      displayUpdateForm: false,
      organization: this.props.organization,
      title: this.props.title,
      date_start: this.props.date_start,
      date_end: this.props.date_end,
      //achievements: this.props.achievements,
      description: this.props.description,
      type: this.props.type,
    };



    onEdit = (e) => {
      e.preventDefault();
      this.setState({
        displayUpdateForm: true,
      })
      console.log("OnEDit");
    }

    onSubmitEdit = (exp_id, organization, title, date_start, date_end,description, type)=>{
      this.props.putData(exp_id, organization, title, date_start, date_end,description, type);


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
                <button type="button" className="btn btn-primary btn-circle btn-xl"><i className="fa fa-check"> {this.props.organization.charAt(0)} </i></button>
              </Grid.Column>

              <Grid.Column floated='left' width={11} style={{marginTop: "5px"}}>
                <h2> <strong>{this.props.organization}, {this.props.title} </strong> </h2>
                <p>  Date Issued: {this.props.date_start} </p>
                <p>  {this.props.description} </p>




              </Grid.Column>
            </Grid>
          </div>
        );
    }
    render(){
      //console.log("render experienceItem")
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
        <AccomplishmentUpdateForm displayUpdateForm={this.state.displayUpdateForm}  handleCancel={this.handleCancel} func={this.onSubmitEdit} exp_id={this.props.exp_id} /> : null}


        </div>
    }
  }
  export default AccomplishmentItem;
