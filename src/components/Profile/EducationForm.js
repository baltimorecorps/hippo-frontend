import React from 'react';
import { Form } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-awesome-modal';
import { Icon, Button, Divider, Dropdown } from 'semantic-ui-react';

class EducationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUser: true,

      organization: '',
      degree: '',
      title: '', //field of study
      degreeOptions: [
        { key: 'high_school', text: 'high_school', value: 'high_school' },
        { key: 'associates', text: 'associates', value: 'associates' },
        { key: 'undergraduate', text: 'undergraduate', value: 'undergraduate' },
        { key: 'masters', text: 'masters', value: 'masters' },
        { key: 'doctoral', text: 'doctoral', value: 'doctoral' },
      ],
      date_start: new Date(),
      date_end: new Date(),
      achievements: [{ description: '' }],
      //description: '',
      type: this.props.type,
    };
  }
  handleClick = (evt) => {
    console.log('handel click dropdown button:' + evt.target.name + evt.target.value);
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('in handleSubmit');
    this.props.func(
      this.state.organization,
      this.state.degree,
      this.state.title,
      this.state.date_start,
      this.state.date_end,
      this.state.achievements,
      this.state.type,
    );
    alert(`handleSubmit`);
  };
  handleCancel = (event) => {
    this.props.handleCancel();
  };
  handleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  //TODO
  handleChangeDateStart = (date) => {
    if (date > this.state.date_end) {
      this.setState({
        date_end: date,
      });
    }

    this.setState({
      date_start: date,
    });
  };

  handleChangeDateEnd = (date) => {
    if (date < this.state.date_start) {
      this.setState({
        date_start: date,
      });
    }

    this.setState({
      date_end: date,
    });
  };
  handleChangeDescription = (idx) => (evt) => {
    const newAchievements = this.state.achievements.map((achievement, sidx) => {
      if (idx !== sidx) return achievement;
      return { ...achievement, description: evt.target.value };
    });
    this.setState({ achievements: newAchievements });
  };

  handleRemove = (idx) => (evt) => {
    this.setState({
      achievements: this.state.achievements.filter((s, sidx) => idx !== sidx),
    });
    console.log('achievements:');
    console.log(this.state.achievements);
  };

  handleAdd = () => {
    this.setState({
      achievements: this.state.achievements.concat([{ description: '' }]),
    });
  };

  createItem = () => {
    if (this.props.displayForm === true) {
      return (
        <div>
          <Modal visible="true" width="400" minHeight="750" effect="fadeInUp">
            <div style={{ margin: '20px' }}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                  <label>
                    {' '}
                    <h3> Institution:</h3>{' '}
                  </label>
                  <input
                    placeholder="Institution Name"
                    value={this.state.organization}
                    name="organization"
                    onChange={this.handleChange}
                  />
                </Form.Field>

                <Form.Field>
                  <label>
                    <h3>Degree: </h3>
                    {/*<input placeholder='Degree Name' value={this.state.degree} name="degree" onChange={this.handleChange} />*/}
                    <Dropdown
                      name="degree"
                      onClick={this.handleClick}
                      placeholder="Select Degree"
                      fluid
                      selection
                      options={this.state.degreeOptions}
                    />
                  </label>
                </Form.Field>

                <Form.Field>
                  <label>
                    <h3>Field of Study </h3>
                    <input
                      placeholder="Field of Study"
                      value={this.state.title}
                      name="title"
                      onChange={this.handleChange}
                    />
                  </label>
                </Form.Field>

                <div className="comp_ezw">
                  <h3>Start Date </h3>
                  <DatePicker
                    selected={this.state.date_start}
                    selectsStart
                    date_start={this.state.date_start}
                    date_end={this.state.date_end}
                    onChange={this.handleChangeDateStart}
                    dateFormat="dd-MM-YYYY"
                    className="ezw_datepicker"
                  />

                  <h3>End Date </h3>
                  <DatePicker
                    selected={this.state.date_end}
                    selectsEnd
                    date_start={this.state.date_start}
                    date_end={this.state.date_end}
                    onChange={this.handleChangeDateEnd}
                    dateFormat="dd-MM-YYYY"
                    className="ezw_datepicker"
                  />
                </div>
                <br />
                <Form.Field>
                  <label>
                    <h3> Achievements:</h3>

                    {this.state.achievements.map((achievement, idx) => (
                      <div style={{ display: 'flex', direction: 'row', alignItems: 'center' }}>
                        <input
                          width="50%"
                          type="text"
                          placeholder={`Achievement #${idx + 1}`}
                          value={achievement.description}
                          onChange={this.handleChangeDescription(idx)}
                        />
                        <Button type="button" className="small" onClick={this.handleRemove(idx)}>
                          {' '}
                          <Icon name="delete" />{' '}
                        </Button>
                      </div>
                    ))}

                    <br />
                    <Button type="button" onClick={this.handleAdd} className="small">
                      Add Achievement
                    </Button>
                  </label>
                </Form.Field>
                <Divider />

                <p>
                  {' '}
                  <Button size="large" type="submit" value="Save" onClick={this.handleSubmit}>
                    {' '}
                    Save
                  </Button>{' '}
                  <Button type="button" onClick={this.handleCancel} value="Cancel">
                    Cancel
                  </Button>{' '}
                </p>
              </Form>
            </div>
          </Modal>
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    return <div>{this.createItem()}</div>;
  }
}
export default EducationForm;
