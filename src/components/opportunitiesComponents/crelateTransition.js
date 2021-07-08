import React, {useEffect} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import OpportunitiesNav from './opportunitiesNav';
import EachOpportunity from './EachOpportunity';

const CrelateTransition = ({
  classes,
  page,
}) => {



  let renderedOpportunities = [
    {
    gdoc_link: "https://docs.google.com/document/d/1_SGqNsZpg_9qAg0I1SF_YMRTFcl4tOdEJ6dE8IoTlCU/edit?usp=sharing",
    id: 1,
    is_active: true,
    org_name: "Baltimore Corps",
    program_id: 1,
    program_name: "Place for Purpose",
    short_description: "Baltimore Corps seeks a detail-oriented, proactive finance or accounting professional to serve as the organizational Accountant. Reporting to the Director of Finance and Operations, the person in this role will lead Baltimore Corps’ day-to-day financial activities.",
    title: "Accountant",
    url:'https://jobs.crelate.com/portal/baltimorecorps/job/hjrfjyog83dfjzfuog3sytduse'
    },
    {
    gdoc_link: "https://drive.google.com/file/d/1GDlAyyCVhFoVewvlDeTbr9l7h_PsND5v/view?usp=sharing",
    id: 2,
    is_active: true,
    org_name: "MERIT",
    program_id: 1,
    program_name: "Place for Purpose",
    short_description: "MERIT Health Leadership Academy is a non-profit organization working to ensure that tomorrow’s health workforce will mirror the diversity of the communities it serves. MERIT’s mission is to educate and empower students from underrepresented backgrounds to become health professionals and change agents who advance equity. The College Success Manager (CSM) position will work to engage and support MERIT Scholars beyond high school as they head to college and work towards their career goals. The CSM will spend a large portion of their time individually communicating with and counseling MERIT Alumni. The CSM will also plan events and other initiatives to bring the alumni community together. In partnership with the Executive Director (ED) the CSM will develop and strengthen partnerships with colleges, specialized programs, and internship opportunities.",
    title: "College Success Manager",
    url:'https://jobs.crelate.com/portal/baltimorecorps/job/a4mjo847pgk9ttyd539gb9spfe'
    },
    {
    gdoc_link: "https://docs.google.com/document/d/1ispJHlnTMc8xJNX1Fx9CmcDGsKRyi_ICh62Mi3a5gAU/edit?usp=sharing",
    id: 3,
    is_active: true,
    org_name: "Mayor's Office of Homeless Services",
    program_id: 1,
    program_name: "Place for Purpose",
    short_description: "Baltimore City Mayor's Office of Homeless Services (MOHS) is the designated lead agency for the Continuum of Care and works to implement federal, state, and local policy and best practices in addition to administering and monitoring homeless services grants. MOHS administers approximately $48 million annually for programs that include street outreach, emergency shelter, transitional housing, rapid rehousing, permanent supportive housing, Housing Opportunities for Persons With AIDS (HOPWA), meal programs and eviction prevention. Each year, through a network of partner providers, the homeless services program delivers housing and supportive services to over 25,000 individuals and families. MOHS is seeking a dynamic contractual professional to oversee the COVID-19 activities and enforce program compliance for the Emergency Solutions Grant (ESG) Program. This position reports to the Program Compliance Supervisor.",
    title: "Program Compliance Officer II",
    url:'https://jobs.crelate.com/portal/baltimorecorps/job/g5chd9y5q8rxk7ydinwc9o9kdc'    
    },
    {
    gdoc_link: "https://docs.google.com/document/d/1qzdyNWKhr0fJGEGNdJl0QmOGvpfSeCrbPRbDmfF90UE/edit?usp=sharing",
    id: 4,
    is_active: true,
    org_name: "Baltimore Corps",
    program_id: 1,
    program_name: "Place for Purpose",
    short_description: "Baltimore Corps is seeking a self-motivated, experienced and innovative professional to lead in the planning, development and implementation of a productive talent acquisition and development strategy for our programs and initiatives including Place for Purpose, Baltimore Corps Fellowship, Public Allies, Elevation Awards, and other programs and hiring initiatives.",
    title: "Deputy Director, Talent Acquisition & Development",
    url:"https://jobs.crelate.com/portal/baltimorecorps/job/7os8y5noqdqmjsyiipadmimo3e"
    },
    {
    gdoc_link: "https://drive.google.com/file/d/10eGYiq2ZySGHhb5ZnZFsPSOXAfmf73R7/view?usp=sharing",
    id: 5,
    is_active: true,
    org_name: "MERIT",
    program_id: 1,
    program_name: "Place for Purpose",
    short_description: "MERIT Health Leadership Academy is a non-profit organization working to ensure that tomorrow’s health workforce will mirror the diversity of the communities it serves. MERIT’s mission is to educate and empower students from underrepresented backgrounds to become health professionals and change agents who advance equity. The High School Success Program Director (PD) position will serve as a key member of MERIT’s leadership team, along with the Executive Director and the College Success Program Director. The PD will lead the High School Success Team responsible for planning and implementing programming for MERIT Scholars from 9th grade through 11th grade. The PD will lead the planning of MERIT’s Saturday curriculum, scholar support, family engagement, special events and summer internships, with support of a Program Manager (PM) and Program Coordinator (PC).",
    title: "Program Director",
    url:'https://jobs.crelate.com/portal/baltimorecorps/job/ufjrbt9x6mngt4xpe6ca5be1ar'
    },
    {
    gdoc_link: "https://docs.google.com/document/d/FfF",
    id: 6,
    is_active: true,
    org_name: "Baltimore Corps",
    program_id: 1,
    program_name: "Place for Purpose",
    short_description: "Baltimore Corps is seeking a Programs Manager to lead and manage the organization's Social Innovation and Entrepreneurship programs. The SIE Programs Manager will work closely with a dynamic team and partner organizations across the following key priority areas: coaching around their business acumen; investing in their organization development; and building and strengthening the equity and racial justice focus of Baltimore Corps through social innovators.",
    title: "Social Innovation & Entrepreneurship Sr. Programs Manager",
    url:'https://jobs.crelate.com/portal/baltimorecorps/job/7m7xpwr5kj5chqp7dpnbnxhtfc'
    },
    
];

  if (!renderedOpportunities || renderedOpportunities.length === 0)
    return <div>loading...</div>;

  return (
    <div className={classes.container}>
      <OpportunitiesNav program={page} />
      

      {renderedOpportunities.map(
        (opportunity, index) =>
          opportunity.is_active === true && (
            <EachOpportunity
              opportunity={opportunity}
            //   contact={contact}
            //   submittedIds={submittedIds}
            //   key={index}
            //   index={index}
            //   onClickViewAppButton={onClickViewAppButton}
            //   onClickApplyButton={onClickApplyButton}
              audience="candidates"
            />
          )
      )}
    </div>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: spacing(1),
    flexGrow: 1,
    [breakpoints.up('sm')]: {
      flexBasis: '83.333333%',
      maxWidth: '83.333333%',
    },
    [breakpoints.up('md')]: {
      flexBasis: '66.666667%',
      maxWidth: '66.666667%',
    },
    [breakpoints.up('xl')]: {
      flexBasis: '50%',
      maxWidth: '50%',
    },
  },
  header: {
    textAlign: 'center',
  },
  headerPaper: {
    width: '100%',
    padding: spacing(2, 3, 3),
    marginBottom: spacing(2),
  },
  spacer: {
    display: 'none',

    [breakpoints.up(1340)]: {
      width: '100%',
      display: 'block',

      marginBottom: spacing(2),
      marginTop: spacing(2),
    },
  },
});

export default withStyles(styles)(CrelateTransition)