import React from 'react';



class SkillItem extends React.Component {
    state = {
      isUser: true,

    };
    /*
    createItem = ()=>{
      if (this.props.add == true){
        return <SkillForm/>
      } else {
        return null;
      }
    }*/

    displayOneSkill = ()=>{

        return (<div style={{marginTop: "20px"}}>
          <p> <strong> skill:  {this.props.skill} </strong> </p>
          <p> length:  {this.props.length} </p>
        </div>);
    }
    render(){

      return <div>

        {this.displayOneSkill()}
      </div>;
    }
  }
  export default SkillItem;
