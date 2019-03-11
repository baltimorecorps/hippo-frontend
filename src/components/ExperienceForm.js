import React from 'react';


class ExperienceForm extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        isUser: true,
        //add: false,
        company: '',
        position: '',
        shouldDisappear : false,
      };
      this.createItem = this.createItem.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      //this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChangeCompany = this.handleChangeCompany.bind(this);
      this.handleChangePosition = this.handleChangePosition.bind(this);
    }
    handleSubmit(event){
      
      event.preventDefault();
      this.setState({shouldDisappear: true});
      console.log("in handleSubmit");
      this.props.func(this.state.company, this.state.position, true);
    }
    handleCancel=(event)=>{
      this.setState({shouldDisappear: true});
      console.log("in handleCancel");
    }
    handleChangeCompany(event){
      event.preventDefault();
      this.setState({company: event.target.value});
    }
    handleChangePosition(event){
      event.preventDefault();
      this.setState({position: event.target.value});
    }

    createItem = ()=>{
      if (this.props.add == true && this.state.shouldDisappear==false){
        return (
          <div >
            <form onSubmit={this.handleSubmit}>
              <label>
                Company Name:
                <input value={this.state.company} onChange={this.handleChangeCompany} />
              </label>
              <label>
                Position:
                <input value={this.state.position} onChange={this.handleChangePosition} />
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
  export default ExperienceForm;
