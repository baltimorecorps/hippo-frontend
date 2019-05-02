import React from 'react';
import { Divider, Icon } from 'semantic-ui-react';
import { Col, Row } from 'react-bootstrap';
import './profile.css';
import { Card } from 'semantic-ui-react';

class Resume extends React.Component {
  state = {
    resumeCards: [
      { id: 1, name: 'resume1', description: 'this resume is for Baltimore corps' },
      { id: 2, name: 'resume2', description: 'this resume is for .....' },
      { id: 3, name: 'resume3', description: 'this resume is for Baltimore corps' },
      { id: 4, name: 'resume4', description: 'this resume is for .....' },
    ],
  };

  displayResumeCards = (resumeCards) => {
    const cards = resumeCards.map((resume) => {
      return this.displayResumeCard(resume);
    });
    return <Card.Group itemsPerRow={3}> {cards} </Card.Group>;
  };
  displayResumeCard = (resume) => {
    return (
      <Card key={resume.id} style={{ height: '200px' }}>
        <Card.Content>
          <a href={`/resume`}>{resume.name}</a>
          <p />
          {resume.description}
        </Card.Content>
      </Card>
    );
  };
  handleAddResume = () => {
    return <p>hello</p>;
  };

  render() {
    var textStyle = {
      fontSize: '26px',
      fontWeight: '300',
      lineHeight: '0.8',
      color: '#5f6163',
    };
    return (
      <div
        style={{ minHeight: '550px', marginTop: '20px', backgroundColor: 'white', padding: '15px' }}
      >
        <Row>
          <Col xs md lg="4">
            <div style={textStyle}>Resume </div>
          </Col>
          <Col xs md lg="8">
            <button
              style={{
                display: 'inline-block',
                float: 'right',
                border: 'none',
                backgroundColor: 'transparent',
              }}
              onClick={this.handleAddResume}
            >
              <Icon style={{ display: 'inline-block' }} name="plus" />
            </button>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col xs md lg="8">
            {this.displayResumeCards(this.state.resumeCards)}
          </Col>
        </Row>
      </div>
    );
  }
}
export default Resume;
