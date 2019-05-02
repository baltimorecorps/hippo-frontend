import React from 'react';
import { Form } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-awesome-modal';
import Autosuggest from 'react-autosuggest';
import './autoSuggest.css';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';

const getSuggestionValue = (suggestion) => suggestion.name;
const all_data = [{ name: 'C', id: 1 }, { name: 'C++', id: 2 }, { name: 'C#', id: 3 }];

// Use your imagination to render suggestions.
const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

class SkillForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUser: true,
      skill: 'Java',
      rank: 'Rank',

      suggestions: [],
      value: '',
    };
    this.createItem = this.createItem.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  selectRank = (eventKey, event) => {
    this.setState({ rank: eventKey });
  };

  getSuggestions = /*async*/ (value) => {
    console.log('in get suggestions');
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    if (inputLength === 0) return [];
    /*
      console.log("in get suggestions2");
      let query = `/search/workshops/keywords/${value}`;
      await fetch(api+query).then(response=>response.json())
      .then(data=>{
          console.log(data);
          let array = [];
          array = data.map(item=>{

              return {name:item.workshop_name, id: item.workshop_id};
          })
          console.log(array);
          this.setState({suggestions: array});
          console.log("suggestions in state:");
          console.log(this.state.suggestions);
          return array;
      });
      */
    return all_data.filter((data) => data.name.toLowerCase().slice(0, inputLength) === inputValue);
  };

  onChange = (event, { newValue }) => {
    //alert("onChange, newValue="+newValue);
    this.setState({
      value: newValue,
      skill: newValue,
    });
  };
  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };
  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  //todo CHANGE
  handleSubmit(event) {
    event.preventDefault();
    //this.setState({shouldDisappear: true});
    //this.props.func(this.state.company, this.state.position, true);
    alert('SkillForm: HandleSubmit: skill=' + this.state.skill + ', rank=' + this.state.rank);
    this.props.func(this.state.skill, this.state.rank);
  }
  handleCancel = (event) => {
    this.props.handleCancel();
  };
  handleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };
  createItem = () => {
    const { value, suggestions } = this.state;
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type to Find A Skill',
      value,
      onChange: this.onChange,
    };
    if (this.props.displayForm === true) {
      return (
        <div>
          <Modal visible="true" width="400" height="300" effect="fadeInUp">
            <div style={{ margin: '20px' }}>
              <h3>Add Skill</h3>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                  <label> </label>
                  {/*<input placeholder='Organization Name'value={this.state.company} onChange={this.handleChangeCompany} />*/}
                  <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                  />
                </Form.Field>

                <Form.Field>
                  <br />
                  <Dropdown as={ButtonGroup}>
                    <Button size="lg" variant="success">
                      {' '}
                      {this.state.rank}
                    </Button>
                    <Dropdown.Toggle split variant="warning" id="dropdown-custom-2" />
                    <Dropdown.Menu className="super-colors">
                      <Dropdown.Item eventKey="Started learning" onSelect={this.selectRank} active>
                        {' '}
                        Started learning{' '}
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="understands" onSelect={this.selectRank}>
                        {' '}
                        Understands{' '}
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="can teach with help" onSelect={this.selectRank}>
                        {' '}
                        Can teach with help{' '}
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="can teach" onSelect={this.selectRank}>
                        {' '}
                        Can teach{' '}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Field>
                <br />

                <p>
                  {' '}
                  <Button type="submit" onClick={this.handleSubmit} value="Save">
                    {' '}
                    Save
                  </Button>{' '}
                  <Button type="button" onClick={this.handleCancel} value="Cancel">
                    Cancel
                  </Button>
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
export default SkillForm;
