import React from 'react';
import { Icon, Grid } from 'semantic-ui-react';
import SkillUpdateForm from './SkillUpdateForm';
import './profile.css';

class SkillItem extends React.Component {
  state = {
    isUser: true,
    displayUpdateForm: false,

    skill: this.props.skill,
    rank: this.props.rank,
    type: 'Skill',
  };

  onEdit = (e) => {
    e.preventDefault();
    this.setState({
      displayUpdateForm: true,
    });
  };

  onSubmitEdit = (id, skill, rank) => {
    this.props.putData(id, skill, rank); //TODO: check for endpoint in backend
    this.setState({
      displayUpdateForm: false,
    });
  };
  handleCancel = () => {
    this.setState({
      displayUpdateForm: false,
    });
  };

  onDelete = (e) => {
    const id = this.props.id;
    this.props.deleteData(id);
  };

  displayOneSkill = () => {
    var textStyleSmall = {
      fontSize: '20px',
      fontWeight: '300',
      lineHeight: '0.8',
      color: '#5f6163',
    };
    return (
      <div style={textStyleSmall}>
        <Grid style={{ marginLeft: '20px' }}>
          <Grid.Column floated="left" width={2}>
            <button type="button" className="btn btn-warning btn-circle btn-xl">
              <i className="fa fa-check"> {this.props.skill.charAt(0)} </i>
            </button>
          </Grid.Column>

          <Grid.Column floated="left" width={11} style={{ marginTop: '5px' }}>
            <h3>
              {' '}
              <strong>{this.props.skill} </strong>{' '}
            </h3>
            <p>Rank: {this.props.rank}</p>
          </Grid.Column>
        </Grid>
      </div>
    );
  };

  render() {
    //console.log("render SkillItem")
    return (
      <div>
        <Grid style={{ marginTop: '20px' }}>
          <Grid.Column floated="left" width={13}>
            {this.displayOneSkill()}
          </Grid.Column>
          <Grid.Column textAlign="right" floated="right" width={3}>
            <Icon name="edit" onClick={this.onEdit} />
            <Icon name="delete" onClick={this.onDelete} />
          </Grid.Column>
        </Grid>

        {this.state.displayUpdateForm ? (
          <SkillUpdateForm
            displayUpdateForm={this.state.displayUpdateForm}
            handleCancel={this.handleCancel}
            func={this.onSubmitEdit}
            id={this.props.id}
          />
        ) : null}
      </div>
    );
  }
}
export default SkillItem;
