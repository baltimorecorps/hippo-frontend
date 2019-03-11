import React from 'react';



class ExperienceItem extends React.Component {
    state = {
      isUser: true,

    };
    /*
    createItem = ()=>{
      if (this.props.add == true){
        return <ExperienceForm/>
      } else {
        return null;
      }
    }*/

    displayOneExperience = ()=>{

        return (<div style={{marginTop: "20px"}}>
          <p> <strong> Company:  {this.props.company} </strong> </p>
          <p> Position:  {this.props.position} </p>
        </div>);
    }
    render(){

      return <div>

        {this.displayOneExperience()}
      </div>;
    }
  }
  export default ExperienceItem;
