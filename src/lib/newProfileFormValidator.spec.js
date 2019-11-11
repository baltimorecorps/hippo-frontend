import {cleanup} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {newProfileValidator} from "./formValidator";

afterEach(cleanup);

test("New Profile Validator: no values ", () => {
  const values = {};
  const expectedErr = {
    firstName_error: "Required",
    lastName_error: "Required",
    email_error: "Required",
    phonePrimary_error: "Required",
  };

  const {isError, err} = newProfileValidator(values);

  expect(isError).toBe(true);
  expect(err).toEqual(expectedErr);
});

describe("First and Last names Validators", () => {
  test("New Profile: Valid names ", () => {
    const values = {
      first_name: "Katniss Everdeen",
      last_name: "Grape-Baby",
      phone_primary: "9990001111",
      email: "bay@gmail.com",
    };
    let expectedErr = {};

    const {isError, err} = newProfileValidator(values);

    expect(isError).toBe(false);
    expect(err).toEqual(expectedErr);
  });
});

describe("Phone Number Validator", () => {
  test("New Profile: string phone number ", () => {
    const values = {
      first_name: "Bay",
      last_name: "C",
      email: "email@email.com",
      phone_primary: "myphoneNumber",
    };
    let expectedErr = {
      phonePrimary_error: "Required",
    };
    let {isError, err} = newProfileValidator(values);

    expect(isError).toBe(true);
    expect(err).toEqual(expectedErr);
  });
});

test("New Profile: invalid phone number (less than six digits)", () => {
  const values = {
    first_name: "Bay",
    last_name: "C",
    email: "email@gmail.com",
    phone_primary: "00099",
  };
  const expectedErr = {
    phonePrimary_error: "Required",
  };

  const {isError, err} = newProfileValidator(values);

  expect(isError).toBe(true);
  expect(err).toEqual(expectedErr);
});

////////// EMAIL VALIDATOR TESTS BELOW /////////////

const values = {
  first_name: "Bay",
  last_name: "C",
  phone_primary: "9990001111",
};

const validEmails = [
  "email@domain.com",
  "firstname.lastname@domain.com",
  "email@subdomain.domain.com",
  "firstname+lastname@domain.com",
  "1234567890@domain.com",
  "email@domain-one.com",
  "_______@domain.com",
  "email%@domain.name",
  "email@domain.co.jp",
  "x@example.com",
  "mailhost!username@example.org",
  "firstname-lastname@domain.com",
  "user%example.com@example.org",
];

const invalidEmails = [
  "#@%^%#$@#$@#.com",
  "@example.com",
  "Joe Smith <email@example.com>",
  "email.example.com",
  "email@example@example.com",
  ".email@example.com",

  "Abc.example.com",
  "あいうえお@example.com",
  "email@example.com (Joe Smith)",
  "email@example",
  'a"b(c)d,e:f;g<h>i[jk]l@example.com',
  "email@-example.com",
  'this still"not\\allowed@example.com',
  'this is"notallowed@example.com',
  'just"not"right@example.com',
  "2345678901234567890123567808889sssssssss0u80008s08888883kkkkkkkkkk4901234+x@example.com",
  "email@111.222.333.44444",
  "email@example..com",
  "A@b@c@example.com",
];

describe("Email Validators", () => {
  test("New Profile: Valid Emails ", () => {
    let expectedErr = {};

    validEmails.map(email => {
      values.email = email;
      const {isError, err} = newProfileValidator(values);

      expect(isError).toBe(false);
      expect(err).toEqual(expectedErr);
    });
  });

  test("New Profile: Invalid Emails ", () => {
    const expectedErr = {email_error: "Invalid email address"};

    invalidEmails.map(email => {
      values.email = email;
      const {isError, err} = newProfileValidator(values);

      expect(isError).toBe(true);
      expect(err).toEqual(expectedErr);
    });
  });
});
