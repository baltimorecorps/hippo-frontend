import React from 'react';
import { Form } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-awesome-modal';
import { Icon, Button, Divider } from 'semantic-ui-react';

class ExperienceUpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUser: true,
      organization: '',
      title: '',
      date_start: new Date(),
      date_end: new Date(),
      achievements: [{ description: '' }],
      //description: '',
      type: 'Work',
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('in handleSubmit');
    this.props.func(
      this.props.exp_id,
      this.state.organization,
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
    if (this.props.displayUpdateForm === true) {
      return (
        <div>
          <Modal visible="true" width="400" minHeight="750" effect="fadeInUp">
            <div style={{ margin: '20px' }}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                  <label>
                    {' '}
                    <h3> Organization:</h3>{' '}
                  </label>
                  <input
                    placeholder="Organization Name"
                    value={this.state.organization}
                    name="organization"
                    onChange={this.handleChange}
                  />
                </Form.Field>

                <Form.Field>
                  <label>
                    <h3>Title: </h3>
                    <input
                      placeholder="Title Name"
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
                    {console.log(this.state.achievements)}
                    {this.state.achievements.map((achievement, idx) => (
                      <div
                        key={idx}
                        style={{ display: 'flex', direction: 'row', alignItems: 'center' }}
                      >
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
export default ExperienceUpdateForm;

/*import React from 'react';
import {Form} from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-awesome-modal';


class ExperienceUpdateForm extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        isUser: true,
        company: '',
        position: '',
        date_start: new Date(),
        date_end: new Date(),
        description: '',
        type: 'Work',

        exp_id: this.props.exp_id,

      };
      this.createItem = this.createItem.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      //this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChangeCompany = this.handleChangeCompany.bind(this);
      this.handleChangePosition = this.handleChangePosition.bind(this);
    }

    handleSubmit(event){
      event.preventDefault();
      //this.setState({shouldDisappear: true});
      console.log("in handleSubmit");
      //this.props.func(this.state.company, this.state.position, true);
      this.props.func(this.props.exp_id, this.state.company, this.state.position, this.state.date_start, this.state.date_end, this.state.description,
        this.state.type);
    }
    handleCancel=(event)=>{
      this.props.handleCancel();
    }
    handleChangeCompany(event){
      event.preventDefault();
      this.setState({company: event.target.value});
    }
    handleChangePosition(event){
      event.preventDefault();
      this.setState({position: event.target.value});
    }
    handleChangeDateStart =(date)=>{
      if (date > this.state.date_end)
        {
            this.setState({
                date_end: date
              });
        }

        this.setState({
          date_start: date
        });
    }


    handleChangeDateEnd =(date)=>{
      if (date < this.state.date_start)
        {
            this.setState({
                date_start: date
              });
        }

        this.setState({
            date_end: date
        });
    }

    handleChangeDescription = (event)=>{
      event.preventDefault();
      this.setState({description: event.target.value});
    }
    handleChangeType = (event)=>{
      event.preventDefault();
      this.setState({type: event.target.value});
    }









    createItem = ()=>{
      console.log("in create Item");
      return (
        <div>
          <Modal visible="true" width="400" height="550" effect="fadeInUp" >
            <div style={{ margin:"20px"}}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                   <label> Organization: </label>
                   <input placeholder='Organization Name'value={this.state.company} onChange={this.handleChangeCompany} />
                </Form.Field>

                <Form.Field>
                  <label>
                    Title:
                    <input placeholder='Title Name' value={this.state.position} onChange={this.handleChangePosition} />
                  </label>
                </Form.Field>

                  <div className="comp_ezw">
                    <div>Start Date </div>
                    <DatePicker
                    selected={this.state.date_start}
                    selectsStart
                    date_start={this.state.date_start}
                    date_end={this.state.date_end}
                    onChange={this.handleChangeDateStart}
                    dateFormat="dd-MM-YYYY"
                    className="ezw_datepicker"
                    />
                    <div className="ezw_to">End Date </div>
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

                <Form.Field>
                  <label>
                    Achievement:
                    <textarea value={this.state.achivement} onChange={this.handleChangeAchievement} />
                  </label>
                </Form.Field>

                <p> <input type="submit" value="Save" /> <input type="button" onClick={this.handleCancel} value="Cancel" /></p>
              </Form>

            </div>
          </Modal>
      </div>);
    };


    render(){
      return <div>
        {this.createItem()}
      </div>;
    }
  }
  export default ExperienceUpdateForm;
*/
