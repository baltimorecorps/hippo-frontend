const PFPProgramAppInterested = {
  decision_date: null,
  id: 271,
  is_approved: false,
  is_interested: true,
  status: 'Wait for approval',
  program: {id: 1, name: 'Place for Purpose'},
};

const FellowshipProgramAppInterested = {
  decision_date: null,
  id: 273,
  is_approved: false,
  is_interested: true,
  status: 'Waiting for approval',
  program: {id: 3, name: 'Fellowship'},
};

const PFPProgramApp = {
  decision_date: null,
  id: 271,
  is_approved: false,
  is_interested: false,
  status: 'Not interested',
  program: {id: 1, name: 'Place for Purpose'},
};

const MFProgramApp = {
  decision_date: null,
  id: 272,
  is_approved: false,
  is_interested: false,
  status: 'Not interested',
  program: {id: 2, name: 'Mayoral Fellowship'},
};

const FellowshipProgram = {
  decision_date: null,
  id: 273,
  is_approved: false,
  is_interested: false,
  status: 'Not interested',
  program: {id: 3, name: 'Fellowship'},
};

const PAProgramApp = {
  decision_date: null,
  id: 274,
  is_approved: false,
  is_interested: false,
  status: 'Not interested',
  program: {id: 4, name: 'Public Allies'},
};

const JHUProgramApp = {
  decision_date: null,
  id: 275,
  is_approved: false,
  is_interested: false,
  status: 'Not interested',
  program: {id: 5, name: 'JHU Carey Humanities Fellowship'},
};

const program_apps_two_Interested = [
  PFPProgramAppInterested,
  FellowshipProgramAppInterested,
  MFProgramApp,
  PAProgramApp,
  JHUProgramApp,
];

const program_apps_not_interested = [
  PFPProgramApp,
  MFProgramApp,
  FellowshipProgram,
  PAProgramApp,
  JHUProgramApp,
];

export {program_apps_two_Interested, program_apps_not_interested};
