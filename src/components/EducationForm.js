import React from 'react';


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
  export default EducationForm;
