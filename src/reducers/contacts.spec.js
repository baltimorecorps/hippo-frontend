import {contactsReducer} from "./contacts";

/* eslint-disable no-unused-vars */
import {ALL_CONTACTS, ALL_CONTACTS_API} from "../actions/contacts";
import {CREATE_RESUME_API} from "../actions/resume";
/* eslint-enable no-unused-vars */

describe("Contacts state", () => {
  const initialState = {};
  test("inital state", () => {
    const newState = contactsReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });
  test("Fetch all contacts", () => {
    const contacts = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];
    const newState = contactsReducer(undefined, {
      type: ALL_CONTACTS_API.RESOLVE,
      body: {status: "success", data: contacts},
    });
    expect(newState).toEqual({
      1: {id: 1},
      2: {id: 2},
      3: {id: 3},
      4: {id: 4},
    });
  });
  test("Replace existing contacts", () => {
    const contacts = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];
    const newState = contactsReducer(
      {
        5: {id: 5},
      },
      {
        type: ALL_CONTACTS_API.RESOLVE,
        body: {status: "success", data: contacts},
      }
    );
    expect(newState).toEqual({
      1: {id: 1},
      2: {id: 2},
      3: {id: 3},
      4: {id: 4},
    });
  });

  test("Contacts - Create new resume - request resolved", () => {
    const newState = contactsReducer(
      {5: {id: 5}},
      {
        type: CREATE_RESUME_API.RESOLVE,
        body: {
          data: {
            other_stuff: "blah",
            contact: {
              id: 5678,
              other_stuff: "blah",
            },
            id: 1234,
          },
        },
      }
    );
    expect(newState).toEqual({
      5: {id: 5},
      5678: {id: 5678, other_stuff: "blah"},
    });
  });
});
