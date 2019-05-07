import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { Icon, Grid, List } from "semantic-ui-react";
import ExperienceUpdateForm from "./ExperienceUpdateForm";
import EducationUpdateForm from "./EducationUpdateForm";
import "./profile.css";

const ExperienceItem = ({ experience, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);

  const getInitial = () => {
    if (experience.host && experience.host.length > 0) {
      return experience.host.charAt(0);
    } else {
      return " ";
    }
  };

  const getTitle = () => {
    if (experience.type === "Education") {
      return `${experience.host}, ${experience.degree} in ${experience.title}`;
    } else {
      return `${experience.host}, ${experience.title}`;
    }
  };

  const submitUpdate = async function(values) {
    await onUpdate(values);
    setEditing(false);
  };

  const displayOneExperience = () => {
    var textStyleSmall = {
      fontSize: "20px",
      fontWeight: "300",
      lineHeight: "0.8",
      color: "#5f6163"
    };

    return (
      <div style={textStyleSmall}>
        <Grid style={{ marginLeft: "20px" }}>
          <Grid.Column floated="left" width={2}>
            <button type="button" className="btn btn-success btn-circle btn-xl">
              <i className="fa fa-check"> {getInitial()} </i>
            </button>
          </Grid.Column>

          <Grid.Column floated="left" width={11} style={{ marginTop: "5px" }}>
            <h2>
              {" "}
              <strong>{getTitle()}</strong>{" "}
            </h2>
            <p>
              {" "}
              {experience.date_start} &ndash; {experience.date_end}{" "}
            </p>

            <div>
              <p>Achievements:</p>
              <List bulleted>
                {experience.achievements.map(item => {
                  return (
                    <List.Item key={item.achievement_order}>
                      {item.description}
                    </List.Item>
                  );
                })}
              </List>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  };

  return (
    <div>
      <Grid style={{ marginTop: "20px" }}>
        <Grid.Column floated="left" width={13}>
          {displayOneExperience()}
        </Grid.Column>
        <Grid.Column textAlign="right" floated="right" width={3}>
          <Icon name="edit" onClick={() => setEditing(true)} />
          <Icon name="delete" onClick={() => onDelete(experience)} />
        </Grid.Column>
      </Grid>

      {editing ? (
        experience.type === "Education" ? (
          <EducationUpdateForm
            handleCancel={() => setEditing(false)}
            onSubmit={submitUpdate}
            experience={experience}
          />
        ) : (
          <ExperienceUpdateForm
            handleCancel={() => setEditing(false)}
            onSubmit={submitUpdate}
            experience={experience}
          />
        )
      ) : null}
    </div>
  );
};

ExperienceItem.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  experience: PropTypes.shape({
    id: PropTypes.number.isRequired,
    host: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    degree: PropTypes.oneOf([
      "High School",
      "Associates",
      "Undergraduate",
      "Masters",
      "Doctoral"
    ]),
    date_start: PropTypes.instanceOf(Date).isRequired,
    date_end: PropTypes.instanceOf(Date),
    type: PropTypes.oneOf(["Work", "Service", "Accomplishment", "Education"])
      .isRequired,
    contact_id: PropTypes.number.isRequired,
    achievements: PropTypes.array,
    description: PropTypes.string
  })
};

export default ExperienceItem;
