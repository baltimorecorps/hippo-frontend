import React from 'react';
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Button, Divider, Icon} from 'semantic-ui-react';
import {Col, Row} from 'react-bootstrap';
import SkillUpdateForm from './SkillUpdateForm.container';
import SkillItem from './SkillItem';
import './profile.css';

const Skill = ({
  tags,
  tagItems,
  tagType,
  contactId,
  refreshTags,
  addTagItem,
  deleteTagItem,
  updateTagItem,
  refreshTagItems,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [showHint, setShowHint] = useState(false);


  useEffect(() => {
    tags.length === 0 && refreshTags();
  }, []);

  useEffect(() => {
    tagItems.length === 0 && refreshTagItems();
  }, []);

  const displaySkills = () => {
    return tagItems.map(tag => (
      <div style={{marginLeft: '20px'}}>
        <SkillItem
          key={tag.tag_id}
          tag={tag}
          onSubmit={updateTagItem}
          onDelete={deleteTagItem}
        />
      </div>
    ));
  };

  const textStyleSmall = {
    fontSize: '20px',
    fontWeight: '300',
    lineHeight: '0.8',
    color: '#5f6163',
  };

  const getTitle = () => {
    if (tagType === 'Function') {
      return "Functions I've performed";
    } else if (tagType === 'Skill') {
      return "Skills I've developed";
    } else if (tagType === 'Topic') {
      return "Topics I've addressed";
    }
  };

  const blankTag = {
    name: '',
    contact_id: contactId,
    type: tagType,
  };
  return (
    <React.Fragment>
      <Row style={{marginTop: '20px', marginLeft: '5px'}}>
        <Col xs md lg="10">
          <span style={textStyleSmall}>{getTitle()}</span>
        </Col>
        <Col xs md lg="2">
          <button
            style={{
              display: 'inline-block',
              float: 'right',
              border: 'none',
              backgroundColor: 'transparent',
            }}
            onClick={() => setShowForm(true)}>
            <Icon style={{display: 'inline-block'}} name="plus" />
            {showHint ? <p> Click plus sign to add new Skill </p> : null}
          </button>
        </Col>
      </Row>
      <Row>
        <Col xs md lg="8">
          {displaySkills()}
        </Col>
        {showForm ? (
          <Col xs md lg="2">
            <SkillUpdateForm
              tag={() => Object.assign({}, blankTag)}
              tagType={tagType}
              onSubmit={tagItem => {
                addTagItem(tagItem).then(setShowForm(false));
              }}
              onCancel={() => setShowForm(false)}
            />
          </Col>
        ) : null}
      </Row>
    </React.Fragment>
  );
};

Skill.propTypes = {
  contactId: PropTypes.number.isRequired,
  tagType: PropTypes.oneOf(['Function', 'Skill', 'Topic']).isRequired,
  tags: PropTypes.array.isRequired,
  addTagItem: PropTypes.func.isRequired,
  deleteTagItem: PropTypes.func.isRequired,
  updateTagItem: PropTypes.func.isRequired,
  refreshTagItems: PropTypes.func.isRequired,
};

export default Skill;
