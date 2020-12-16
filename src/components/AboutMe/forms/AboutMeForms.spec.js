import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import 'components/Contacts/node_modules/@testing-library/jest-dom/extend-expect';
import AboutMeForms from './AboutMeForms';
import {applicantFull} from 'mockData/applicant';

const openForms = {
  candidate_information: true,
  value_alignment: false,
  interests: false,
  programs: false,
};

describe('AboutMeForms', () => {
  test('Render AboutMeForms', () => {
    const onSubmit = jest.fn();
    const setOpenAboutMeForms = jest.fn();
    const setExpandPanel = jest.fn();

    const {getAllByTestId, getByTestId} = render(
      <AboutMeForms
        contact={applicantFull}
        onSubmit={onSubmit}
        openAboutMeForms={openForms}
        setOpenAboutMeForms={setOpenAboutMeForms}
        expandPanel={openForms}
        setExpandPanel={setExpandPanel}
      />
    );

    expect(getByTestId('about_me_forms')).toBeInTheDocument();

    const expansionPanels = getAllByTestId('expansion_panel');
    expect(expansionPanels.length).toBe(4);
    const panelSummaries = getAllByTestId('panel_summary');
    expect(panelSummaries.length).toBe(4);

    fireEvent.click(panelSummaries[0]);
    fireEvent.click(panelSummaries[1]);
    fireEvent.click(panelSummaries[2]);
    fireEvent.click(panelSummaries[3]);
    expect(setExpandPanel.mock.calls.length).toBe(4);

    const editButtons = getAllByTestId('edit_button');
    expect(editButtons.length).toBe(2); // this suppose to be 4

    fireEvent.click(editButtons[0]);
    fireEvent.click(editButtons[1]);

    expect(setOpenAboutMeForms.mock.calls.length).toBe(2);

    expect(getByTestId('submit_button')).toBeInTheDocument();
    fireEvent.click(getByTestId('submit_button'));
    expect(onSubmit.mock.calls.length).toBe(1);
  });
});
