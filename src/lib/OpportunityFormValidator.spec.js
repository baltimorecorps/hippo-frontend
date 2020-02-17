import {cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {opportunityValidator, interestValidator} from './formValidator';

afterEach(cleanup);

const text897characters =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem at adipisci placeat dicta culpa amet porro, esse, eligendi molestiae saepe dolor quaerat modi illum provident, fuga explicabo ex voluptatibus nihil! Assumenda beatae a est obcaecati quod iure, debitis maxime sit saepe reprehenderit distinctio labore optio eaque facere nemo et! Nulla alias modi mollitia molestiae adipisci rerum nostrum. Sapiente odit porro ex fugit illum pariatur eligendi consectetur. Quis, dicta recusandae illo quibusdam eius quas, ea eligendi sequi, repudiandae corporis mollitia magni! Delectus sit recusandae tempora, sint repellat perferendis quidem molestias consequatur architecto laboriosam qui officia suscipit dolorem, possimus rerum iste soluta, assumenda commodi minima velit enim id. Corporis repudiandae veniam officiis, labore ut reprehenderit praesentium. Impedit ullam aperiam labore esse sequi.';

const text2100characters =
  'Lorem ipsum dolor, sit erunt minus? Strum sapiente as temporibus voluptas officiis facere! Quia maiores eos aspernatur quasi iste voluptatibus laboriosam quod corrupti architecto numquam, sapiente saepe illum aut ipsa repudiandae delectus voluptatum obcaecati omnis? Ea natus earum veniam repellendus rerum reprehenderit officiis, explicabo, enim eveniet minus laudantium! Error quae repellat officia minus eum mollitia ea magni impedit, delectus reiciendis tempora quis numquam nam soluta? Veritatis possimus ipsum quae in quia vitae nisi, quaerat animi eaque, ut dicta laboriosam tempora porro, ducimus nulla repudiandae ex facilis? Facilis itaque eius velit, ipsum, distinctio ullam nemo in at hic aliquam enim sint alias quos officiis, perferendis amet rem quam. Aliquid aliquam aperiam assumenda quas amet quam, soluta beatae quia explicabo suscipit ab facere praesentium, repellat maxime consectetur, reiciendis expedita consequuntur sunt veritatis repudiandae. Cupiditate iusto pariatur est dolor, repellendus consequuntur porro minima ullam incidunt voluptas excepturi repudiandae quibusdam unde neque atque vitae, quos ipsum omnis labore consequatur maiores cumque. Libero cumque alias ea vero quis, necessitatibus, tempora voluptatem corrupti, repudiandae expedita sit atque beatae. Atque consequatur sequi blanditiis adipisci nesciunt iste alias repellendus. Repellendus voluptas qui sint soluta distinctio amet ab, doloribus minima atque quisquam esse reprehenderit? Illum molestiae nihil, dicta culpa, provident quidem error eveniet quam sapiente voluptate obcaecati itaque accusantium iusto ex totam, earum unde ullam neque quae illo aut repellendus. Pariatur tempore placeat, omnis aspernatur, facere enim, eveniet cupiditate eligendi necessitatibus dolor illo nostrum recusandae quasi odio odit eius. Repudiandae nostrum exercitationem atque enim similique commodi hic, officiis quos numquam consequatur, fugit, qui voluptate. Eaque animi perspiciatis a atque explicabo doloribus nostrum numquam saepe dolorum, excepturi ab ipsum iure molestiae cumque eos quis hic quod ratione optio.';

const validLink =
  'https://docs.google.com/document/d/10z6KhUw604pC_7E_A11igTZvbMERKc30YFbGg_5_bxI/';

const validLinkButTooLong =
  'https://docs.google.com/document/d/10z6KhUw604pC_7E_A11igTZvbMERKc30YFbGg_5_bxI/10z6KhUw604pC_7E_A11igTZvbMERKc30YFbGg_5_bxI/10z6KhUw604pC_7E_A11igTZvbMERKc30YFbGg_5_bxI/10z6KhUw604pC_7E_A11igTZvbMERKc30YFbGg_5_bxI/10z6KhUw604pC_7E_A11igTZvbMERKc30YFbGg_5_bxI/10z6KhUw604pC_7E_A11igTZvbMERKc30YFbGg_5_bxI/10z6KhUw604pC_7E_A11igTZvbMERKc30YFbGg_5_bxI/10z6KhUw604pC_7E_A11igTZvbMERKc30YFbGg_5_bxI/10z6KhUw604pC_7E_A11igTZvbMERKc30YFbGg_5_bxI/';

const invalidLink = 'GoogleDoc.com';

describe('Opportunity Form Validators', () => {
  test('Empty values ', () => {
    const values = {};
    const expectedErr = {
      // organization_error: 'Required',
      title_error: 'Required',
      shortDescription_error: 'Required',
      link_error: 'Required',
    };

    const {isError, err} = opportunityValidator(values);

    expect(isError).toBe(true);
    expect(err).toEqual(expectedErr);
  });

  test('Valid and completed values', () => {
    const values = {
      //   organization: 'Baltimore Corps',
      title: 'Web Developer',
      short_description: text897characters,
      gdoc_link: validLink,
    };
    let expectedErr = {};

    const {isError, err} = opportunityValidator(values);

    expect(isError).toBe(false);
    expect(err).toEqual(expectedErr);
  });

  test('Invalid Google Doc link', () => {
    const values = {
      //   organization: 'Baltimore Corps',
      title: 'Web Developer',
      short_description: text897characters,
      gdoc_link: invalidLink,
    };
    let expectedErr = {
      link_error: 'Link must start with "https://docs.google.com/document/d/"',
    };

    const {isError, err} = opportunityValidator(values);

    expect(isError).toBe(true);
    expect(err).toEqual(expectedErr);
  });

  test('Valid Google Doc link but too long', () => {
    const values = {
      //   organization: 'Baltimore Corps',
      title: 'Web Developer',
      short_description: text897characters,
      gdoc_link: validLinkButTooLong,
    };
    let expectedErr = {
      link_error: 'Link must be less than 200 characters',
    };

    const {isError, err} = opportunityValidator(values);

    expect(isError).toBe(true);
    expect(err).toEqual(expectedErr);
  });

  test('Title/organization with too many characters', () => {
    const values = {
      //   organization: text897characters,
      title: text897characters,
      short_description: text897characters,
      gdoc_link: validLink,
    };
    let expectedErr = {
      //   organization_error: 'Organization name must be less than 200 characters',
      title_error: 'Job title must be less than 200 characters',
    };

    const {isError, err} = opportunityValidator(values);

    expect(isError).toBe(true);
    expect(err).toEqual(expectedErr);
  });

  test('Short Description with too many characters', () => {
    const values = {
      //   organization: "Baltimore Corps",
      title: 'Web Developer',
      short_description: text2100characters,
      gdoc_link: validLink,
    };
    let expectedErr = {
      shortDescription_error:
        'Short description must be less than 2,000 characters',
    };

    const {isError, err} = opportunityValidator(values);

    expect(isError).toBe(true);
    expect(err).toEqual(expectedErr);
  });
});

describe('Interest Form Validators', () => {
  test('Empty values ', () => {
    const interestText = '';
    const expectedErr = {
      interestText_error: 'Required',
    };

    const {isError, err} = interestValidator(interestText);

    expect(isError).toBe(true);
    expect(err).toEqual(expectedErr);
  });
  test('Valid values ', () => {
    const interestText = text897characters;
    const expectedErr = {};

    const {isError, err} = interestValidator(interestText);

    expect(isError).toBe(false);
    expect(err).toEqual(expectedErr);
  });

  test('Valid values ', () => {
    const interestText = text2100characters;
    const expectedErr = {
      interestText_error:
        'Interest statement must be less than 2,000 characters',
    };

    const {isError, err} = interestValidator(interestText);

    expect(isError).toBe(true);
    expect(err).toEqual(expectedErr);
  });
});
