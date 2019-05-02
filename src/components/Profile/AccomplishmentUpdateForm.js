import React from 'react';
import { Form, TextArea } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-awesome-modal';
import { Button, Divider } from 'semantic-ui-react';

class AccomplishmentUpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUser: true,

      organization: '',
      title: '',
      date_start: new Date(),
      date_end: new Date(),
      //achievements: [{description: ''}],
      description: '',
      type: 'Accomplishment',
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
      this.state.description,
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
    this.setState({
      date_end: date,
      date_start: date,
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
                    <h3>Role: </h3>
                    <input
                      placeholder="Role Name"
                      value={this.state.title}
                      name="title"
                      onChange={this.handleChange}
                    />
                  </label>
                </Form.Field>

                <div className="comp_ezw">
                  <h3>Date Issued </h3>
                  <DatePicker
                    selected={this.state.date_start}
                    selectsStart
                    date_start={this.state.date_start}
                    onChange={this.handleChangeDateStart}
                    dateFormat="dd-MM-YYYY"
                    className="ezw_datepicker"
                  />
                </div>
                <br />
                <Form.Field>
                  <label>
                    <h3> Description:</h3>
                    <TextArea />
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
export default AccomplishmentUpdateForm;
