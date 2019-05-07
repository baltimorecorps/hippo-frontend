import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-awesome-modal";
import { Button, Divider } from "semantic-ui-react";

import Achievements from "./Achievements";

const useForm = (initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues || {});

  const update = name => value => {
    setValues(values => ({
      ...values,
      [name]: value
    }));
  };

  const handlers = {
    handleChange: event => {
      event.persist();
      update(event.target.name)(event.target.value);
    },
    handleChangeDateStart: date => {
      if (date > values.date_end) {
        update("date_end")(date);
      }
      update("date_start")(date);
    },

    handleChangeDateEnd: date => {
      if (date < values.date_start) {
        update("date_start")(date);
      }
      update("date_end")(date);
    },

    handleSubmit: () => {
      onSubmit(values);
    },
    handleAchievements: update("achievements")
  };

  return [values, handlers];
};

const ExperienceUpdateForm = ({ experience, onSubmit, handleCancel }) => {
  const [
    values,
    {
      handleChange,
      handleChangeDateStart,
      handleChangeDateEnd,
      handleSubmit,
      handleAchievements
    }
  ] = useForm(experience, onSubmit);

  const handleChangeDescription = idx => evt => {
    const newAchievements = this.state.achievements.map((achievement, sidx) => {
      if (idx !== sidx) return achievement;
      return { ...achievement, description: evt.target.value };
    });
    this.setState({ achievements: newAchievements });
  };

  return (
    <div>
      <Modal visible="true" width="400" minHeight="750" effect="fadeInUp">
        <div style={{ margin: "20px" }}>
          <Form>
            <Form.Field>
              <label>
                {" "}
                <h3> Organization:</h3>{" "}
              </label>
              <input
                placeholder="Organization Name"
                value={values.host}
                name="host"
                onChange={handleChange}
              />
            </Form.Field>

            <Form.Field>
              <label>
                <h3>Title: </h3>
                <input
                  placeholder="Title Name"
                  value={values.title}
                  name="title"
                  onChange={handleChange}
                />
              </label>
            </Form.Field>

            <div className="comp_ezw">
              <h3>Start Date </h3>
              <DatePicker
                selected={values.date_start}
                selectsStart
                date_start={values.date_start}
                date_end={values.date_end}
                onChange={handleChangeDateStart}
                dateFormat="dd-MM-YYYY"
                className="ezw_datepicker"
              />

              <h3>End Date </h3>
              <DatePicker
                selected={values.date_end}
                selectsEnd
                date_start={values.date_start}
                date_end={values.date_end}
                onChange={handleChangeDateEnd}
                dateFormat="dd-MM-YYYY"
                className="ezw_datepicker"
              />
            </div>
            <br />
            <Achievements
              contactId={experience.contact_id}
              achievements={values.achievements}
              onChange={handleAchievements}
            />
            <Divider />

            <p>
              {" "}
              <Button
                size="large"
                type="submit"
                value="Save"
                onClick={handleSubmit}
              >
                {" "}
                Save
              </Button>{" "}
              <Button type="button" onClick={handleCancel} value="Cancel">
                Cancel
              </Button>{" "}
            </p>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

ExperienceUpdateForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  experience: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string,
    organization: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    degree: PropTypes.oneOf([
      "High School",
      "Associates",
      "Undergraduate",
      "Masters",
      "Doctoral"
    ]),
    date_start: PropTypes.string.isRequired,
    date_end: PropTypes.string,
    type: PropTypes.oneOf(["Work", "Service", "Accomplishment", "Education"])
      .isRequired,
    contact_id: PropTypes.number,
    achievements: PropTypes.array
  }).isRequired
};
export default ExperienceUpdateForm;
