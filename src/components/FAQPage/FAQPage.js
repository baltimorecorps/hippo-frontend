import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import QuestionAnswer from './QuestionAnswer';
import Logo from '../../lib/images/b_square.png';

const FAQPage = ({classes}) => {
  const profileAndResume = [
    {
      question: 'Why do I need a profile?',

      answer:
        'Your profile serves as your resume and when you apply to jobs in our portal, it functions as the majority of your application. The information you input into your profile will generate into a well-organized and customizable resume when you apply for a job through our portal. This is the information that employers will see when you apply to jobs. Your profile helps connect you to the right opportunities. Please note that a complete and detailed profile will help you go further in the job search process.',
    },
    {
      question: 'Can I upload my resume?',
      answer:
        'No, you cannot upload a resume. You can create a profile which will populate into a standard, customizable resume in our portal.',
    },
    {
      question: 'Can I copy and paste my resume?',
      answer:
        'You can copy and paste information from an existing resume into the sections of our profile.  For example, you can copy and paste the education information from your resume into our profile or your job experiences into the experiences section. The profile will automatically format the sections for you and populate into a standard resume template.',
    },
    {
      question: 'Why is tagging skills important?',
      answer:
        'Tagging skills is important because it makes your profile stronger. It supports the responsibility and achievement sections of your profile. It helps us find the perfect job for you by matching your skills with our employers’ skills needs.',
    },
    {
      question: 'How to tag skills effectively?',
      answer:
        'Employers often prioritize hard skills over soft skills on applicants’ resumes. Ensure that you highlight you hard skills on your profile. Tag your top skills that you have utilized in your experiences - make sure to think through which skills to prioritize. Tagging too many skills is not helpful. It’s better to pick a couple of solid skills for each responsibility or achievement.',

      subContent: [
        {
          header: 'Tips',
          content: [
            '★ Choose specific skills for specific work experience',
            '★ Choose different skills for each experience',
          ],
        },
      ],
    },
    {
      question:
        'Do I have to fill out my whole profile before the consultation?',
      answer:
        'While it is preferred to have your entire profile filled out before your consultation, it is not required. If you are stuck on a section of your profile, setting up a consultation with our team can be helpful. We do strongly recommend completing your profile before applying for a job in the portal.',
    },
    {
      question:
        'Should I put all my experience in the profile or only relevant experience?',
      answer:
        'We recommend that you add all of your experience to your profile. When you apply to a specific job, you will have the option to customize your profile by selecting which experiences you should like to show or hide.  This will allow you to select relevant experience and tailor your profile for each job opportunity.',
    },
    {
      question:
        'If I create a profile, am I automatically applying and in the applicant pool for the jobs in the portal?',
      answer:
        'No, creating a profile does not automatically apply to jobs for you.  Before you are able to apply to roles in our portal, first, you will need to fill out our brief value alignment questionnaire. We use this questionnaire to ensure our candidates’ values align with Baltimore Corps. The submitted questionnaire will be reviewed by a Baltimore Corps staff member. If approved, you will be notified and then you will be required to schedule a free one-to-one job consultation.  After the job consultation is completed, you will be provided full access to our job portal and at that point, you will be able to use your profile to apply to jobs.',
    },
    {
      question: 'How does the progress bar work?',
      answer:
        'As you tag more skills to your experience, the progress bar will increase. The more your progress bar increases, the stronger your profile becomes.',
    },
    {
      question: 'Tips for a strong profile that turns into a powerful resume',
      answer: '',
      subContent: [
        {
          header:
            '★ Professional email handles such as your first and last name with a number',
          content: ['- Example: John_Doe3388'],
        },
        {
          header:
            '★ You should tag at least 5 skills - be honest, and of course, add skills if not listed.',
          content: [
            '- Examples: *** See the question above on How to tag skills effectively ***',
          ],
        },
        {
          header:
            '★ Be specific and detailed in the experience section to effectively communicate your capabilities and past work.',
          content: [''],
        },
      ],
    },
  ];

  const applyingForARole = [
    {
      question: 'What is the application process? (Start to end)',

      answer:
        'There are a few steps in the application process. Below is a breakdown of each step:',

      subContent: [
        {
          header: '1. Create an Account',
          content: [
            '   The first step is Creating An Account in Place for Purpose. This involves completing a brief questionnaire to help us understand who you are, what your interests and goals are, and how your values align with Baltimore Corps. Once you submit your questionnaire, your application will be reviewed based on Values Alignment with Baltimore Corps (link to values). When your application has been approved, you will receive an email to schedule a Consultation with our team.',
          ],
        },
        {
          header: '2. Build a Profile',
          content: [
            'Your Profile captures your skills, capabilities and experiences (see Creating a Profile and Resume above) and we use it along with your Interest Statements (see below) to assess your qualifications for specific roles. Think of it as a more holistic resume to help us get a complete picture of your background and experience. We encourage you to use this as a master document to capture all of your amazing experiences so make sure to tag your capabilities, to showcase your contributions and impact in past and current roles.You can add to this Profile at any time and customize your Profile to share for specific positions. ',
          ],
        },
        {
          header: '3. Schedule a Consultation',
          content: [
            'The Consultation is our opportunity to learn more about your interests and goals, to orient you to applying for roles in Place for Purpose, to learn how we can support you with your Profile, and to answer any questions about the system or process. Your profile does not need to be finished to schedule a Consultation. However, we recommend having it started and as complete as possible so we can help with specific questions. What is the difference between applying for a role and expressing interest?',
          ],
        },
        {
          header: '4. Apply for Opportunities',
          content: [
            'After your Consultation, you will have access to open roles in the Place for Purpose. Login to your account and click on the Opportunities tab to see what is currently available. We will also post opportunities at https://www.baltimorecorps.org/careers. Select the “Apply” button. Then, customize your Profile for the position by selecting  the experiences on your Profile you want to share for this position.  All other experiences on your profile will be hidden.  Next, draft an Interest Statement (see below) to attach with your customized resume for each position. This should be 1-2 paragraphs stating why you would be a great fit for the role. You can hit the “Preview Resume” to see how your Profile will populate into a standard resume template - this is what the hiring manager will see before you submit. Hit Submit!',
          ],
        },
        {
          header: '5. Internal Review and Recommendation',
          content: [
            'Baltimore Corps staff will review all submitted applications to roles (Profiles/Interest Statements) to recommend candidates for the position.  Recommended candidates will be sent to the organization’s hiring manager to review.  The hiring managers  will reach out directly to schedule interviews with their top candidates. ',
          ],
        },
        {
          header: '6. Interview and Selection',
          content: [
            'There may be multiple interviews depending on the organization’s hiring practices. Once interviews are complete, Baltimore Corps will notify you of the status of your application. If you are selected as the top candidate, an offer will be made by the organization. ',
          ],
        },
        {
          header: '',
          content: [
            'Throughout the process, the Baltimore Corps team is available to help answer questions, support with developing your Profile, and assist with interviewing. We know applying for jobs is complicated and stressful so let us know how we can be here for you. ',
          ],
        },
      ],
    },
    {
      question: 'How to write a strong Interest Statement?',
      answer:
        'A strong Interest Statement clearly and concisely grabs the attention of the reviewer. Length is not as important as content. Think about how your experiences have prepared you for this role and what you bring to the job and organization. Think of this as a mini cover letter.  Write a few sentences that express why you are interested in the position and how your experiences and abilities make you a good fit for the position. It is important to make the connection between your skills and capabilities and the job description. Remember to proof for grammar, typos and spelling because your Interest Statement serves as a writing sample.',
    },
    {
      question: 'Why do I need a customized resume?',
      answer:
        'A customized resume helps you highlight relevant experience and skills for each specific job that you apply for. This will help connect you to job opportunities that are a great fit for your skills and interests. ',
    },
    {
      question: 'How to customize a resume effectively?',

      answer: '',
      subContent: [
        {
          header: '',
          content: [
            '1. Choose the relevant experience that aligns with the job description',
            '2. Choose related responsibilities and achievements that support the experience you’ve selected.',
            '3. Choose skills that complement the job that you’re applying for.',
            '4. Make sure your education and/or Work Products/Portfolio are updated.',
          ],
        },
      ],
    },
  ];

  const otherQuestions = [
    {
      question: 'Who are we?',
      answer:
        'Baltimore Corps is a nonprofit organization committed to supporting career pathways into the nonprofit, social impact and social enterprise sector through a variety of programs and services. Place for Purpose is our mission-driven placement service created to support values-aligned organizations looking to find exceptional talent to fill critical roles in the social impact sector. We’ve created a Web App designed to mitigate bias in the hiring process and to create a more equitable process for applicants to showcase their experiences and background when applying to job opportunities. Place for Purpose is a service for nonprofits looking to fill full-time roles and to participate in our leadership development program, Baltimore Corps Fellowship. ',
    },
  ];

  return (
    <Paper className={classes.paper}>
      <div className={classes.headerContainer}>
        <img src={Logo} className={classes.logo} alt="Baltimore Corps Logo" />{' '}
        <Typography variant="h1" component="h1" className={classes.header}>
          Frequently Asked Questions
        </Typography>
      </div>

      <div className={classes.sectionContainer}>
        <Typography variant="h2" component="h2" className={classes.sections}>
          Profile and Resume
        </Typography>
        {profileAndResume.map((each, index) => (
          <QuestionAnswer
            question={each.question}
            answer={each.answer}
            key={index}
            subContent={each.subContent}
          />
        ))}
      </div>

      <div className={classes.sectionContainer}>
        <Typography variant="h2" component="h2" className={classes.sections}>
          Applying for a Role
        </Typography>
        {applyingForARole.map((each, index) => (
          <QuestionAnswer
            question={each.question}
            answer={each.answer}
            key={index}
            subContent={each.subContent}
          />
        ))}
      </div>
      <div className={classes.sectionContainer}>
        <Typography variant="h2" component="h2" className={classes.sections}>
          Others
        </Typography>
        {otherQuestions.map((each, index) => (
          <QuestionAnswer
            question={each.question}
            answer={each.answer}
            key={index}
            subContent={each.subContent}
          />
        ))}
      </div>
      <div className={classes.sectionContainer}>
        <Typography variant="h2" component="h2" className={classes.sections}>
          Have more questions ?
        </Typography>
        <Typography variant="body1" component="p" className={classes.bodyText}>
          <a
            href="https://www.tfaforms.com/4602493"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}
          >
            Click here
          </a>{' '}
          to let us know if you have any questions or any technical issues.
        </Typography>
      </div>
    </Paper>
  );
};

FAQPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  paper: {
    flexGrow: 1,
    [breakpoints.up('sm')]: {
      flexBasis: '83.333333%',
      maxWidth: '83.333333%',
      padding: spacing(3, 6),
      margin: spacing(2, 0),
    },
    [breakpoints.up('md')]: {
      flexBasis: '66.666667%',
      maxWidth: '66.666667%',
    },
    [breakpoints.up('xl')]: {
      flexBasis: '50%',
      maxWidth: '50%',
    },
    width: '100%',
    height: '50%',
    padding: spacing(2, 3),
    margin: spacing(0),

    display: 'flex',
    flexDirection: 'column',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: spacing(1, 0, 2, 0),
    [breakpoints.up('sm')]: {
      margin: spacing(2, 0, 3, 0),
    },
  },
  logo: {
    marginRight: '10px',
    height: '30px',
    width: '30px',
    [breakpoints.up('sm')]: {
      height: '45px',
      width: '45px',
    },
  },
  header: {
    textAlign: 'center',
    fontSize: '22px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [breakpoints.up('sm')]: {
      fontSize: '30px',
    },
  },
  sectionContainer: {
    marginBottom: spacing(2.5),
  },
  sections: {
    fontSize: '20px',
    marginBottom: spacing(1.5),
    [breakpoints.up('sm')]: {
      fontSize: '28px',
    },
  },
  link: {
    color: palette.primary.link,
    textDecoration: 'underline',
  },
});

export default withStyles(styles)(FAQPage);
