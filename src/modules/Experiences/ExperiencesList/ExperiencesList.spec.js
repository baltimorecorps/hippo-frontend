import React from "react";
import {render, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ExperiencesList from "./ExperiencesList";

describe("ExperiencesList", () => {
  const contactId = 1234;
  const experience = {
    id: 4444,
    description: "Test description",
    host: "Test host",
    title: "Test Title",
    location_city: "Baltimore",
    location_state: "Maryland",
    start_month: "January",
    start_year: 2015,
    end_month: "August",
    end_year: 2017,
    is_current: false,

    type: "Work",
    contact_id: contactId,
    achievements: [],
  };

  test("integration - test selection", () => {
    const selectFn = jest.fn();
    const deselectFn = jest.fn();
    const {getByRole} = render(
      <ExperiencesList
        contactId={contactId}
        experienceType="Work"
        experiences={[experience]}
        addNewExperience={jest.fn()}
        refreshExperiences={jest.fn()}
        updateExperience={jest.fn()}
        deleteExperience={jest.fn()}
        selectExperience={selectFn}
        deselectExperience={deselectFn}
        inSelectMode={true}
      />
    );

    const checkbox = getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(selectFn.mock.calls.length).toBe(1);
    expect(selectFn.mock.calls[0][0]).toEqual(experience);
    expect(deselectFn.mock.calls.length).toBe(0);

    fireEvent.click(checkbox);
    expect(deselectFn.mock.calls.length).toBe(1);
    expect(selectFn.mock.calls.length).toBe(1);
    expect(deselectFn.mock.calls[0][0]).toEqual(experience);
  });

  test("integration - test selection", () => {
    const selectFn = jest.fn();
    const deselectFn = jest.fn();
    const {getByRole} = render(
      <ExperiencesList
        contactId={contactId}
        experienceType="Work"
        experiences={[experience]}
        addNewExperience={jest.fn()}
        refreshExperiences={jest.fn()}
        updateExperience={jest.fn()}
        deleteExperience={jest.fn()}
        selectExperience={selectFn}
        deselectExperience={deselectFn}
        inSelectMode={true}
      />
    );

    const checkbox = getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(selectFn.mock.calls.length).toBe(1);
    expect(selectFn.mock.calls[0][0]).toEqual(experience);
    expect(deselectFn.mock.calls.length).toBe(0);

    fireEvent.click(checkbox);
    expect(deselectFn.mock.calls.length).toBe(1);
    expect(selectFn.mock.calls.length).toBe(1);
    expect(deselectFn.mock.calls[0][0]).toEqual(experience);
  });
});
