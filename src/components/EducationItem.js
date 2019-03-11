import React from 'react';



class EducationItem extends React.Component {
    state = {
      isUser: true,

    };
    /*
    createItem = ()=>{
      if (this.props.add == true){
        return <EducationForm/>
      } else {
        return null;
      }
    }*/

    displayOneEducation = ()=>{

        return (<div style={{marginTop: "20px"}}>
          <p> <strong> school:  {this.props.school} </strong> </p>
          <p> degree:  {this.props.degree} </p>
        </div>);
    }
    render(){

      return <div>

        {this.displayOneEducation()}
      </div>;
    }
  }
  export default EducationItem;
