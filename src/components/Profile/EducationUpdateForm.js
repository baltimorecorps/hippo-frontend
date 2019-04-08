import React from 'react';


class EducationUpdateForm extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        isUser: true,
        institution: '',
        degree: '',
        exp_id: this.props.exp_id,

      };
      this.createItem = this.createItem.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      //this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChangeInstitution = this.handleChangeInstitution.bind(this);
      this.handleChangeDegree = this.handleChangeDegree.bind(this);
    }

    handleSubmit(event){

      event.preventDefault();
      //this.setState({shouldDisappear: true});
      console.log("in handleSubmit");
      //this.props.func(this.state.institution, this.state.degree, true);
      this.props.func(this.props.exp_id, this.state.institution, this.state.degree);
      console.log("ExperienceForm, institution, degree: ", this.state.institution, this.state.degree);
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

    createItem = ()=>{
        console.log("in create Item");

        return (
          <div >
            <form onSubmit={this.handleSubmit}>
            <br></br>
              <label>
                Institution Name:
                <input value={this.state.institution} onChange={this.handleChangeInstitution} />
              </label>
              <label>
                Degree level:
                <input value={this.state.degree} onChange={this.handleChangeDegree} />
              </label>
              <p> <input type="submit" value="Submit" /> <input type="button" onClick={this.handleCancel} value="Cancel" /></p>
          </form>
        </div>);
    }


    render(){
      return <div>
        {this.createItem()}
      </div>;
    }
  }
  export default EducationUpdateForm;
