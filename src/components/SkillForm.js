import React from 'react';


class SkillForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isUser: true,
      //add: false,
      skill: '',
      length: '',
      shouldDisappear : false,
    };
    this.createItem = this.createItem.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeSkill = this.handleChangeSkill.bind(this);
    this.handleChangeLength = this.handleChangeLength.bind(this);
    //this.handleChangeLength = this.handleChangeLength.bind(this);
  }
  handleSubmit(event){
    event.preventDefault();
    this.setState({shouldDisappear: true});
    console.log("in handleSubmit");
    this.props.func(this.state.skill, this.state.length, true);
  }
  handleCancel=(event)=>{
    this.setState({shouldDisappear: true});
    console.log("in handleCancel");
  }
  handleChangeSkill(event){
    event.preventDefault();
    this.setState({skill: event.target.value});
  }
  /*handleChangeLength(event){
    event.preventDefault();
    this.setState({length: event.target.value});
  }*/

  handleChangeLength(event){
    event.preventDefault();
    this.setState({length: event.target.value});
  }

  createItem = ()=>{
    if (this.props.add == true && this.state.shouldDisappear==false){
      return (
        <div >
          <form onSubmit={this.handleSubmit}>
            <label>
              skill:
              <input value={this.state.skill} onChange={this.handleChangeSkill} />
            </label>
            <label>
              length:
              <input value={this.state.length} onChange={this.handleChangeLength} />
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
  export default SkillForm;
