import React from 'react'
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'

import process1 from '../../assets/images/process1.png'
import process2 from '../../assets/images/process2.png'
import process3 from '../../assets/images/process3.png'
import process4 from '../../assets/images/process4.png'
import process5 from '../../assets/images/process5.png'
import process6 from '../../assets/images/process6.png'

const styles = {
  pageHeader: {
    fontSize: '35px',
    margin: '20px ',

    // [breakpoints.down('sm')]: {
    //   fontSize: '30px',
    //   margin: '18px ',
    // },
    // [breakpoints.down('xs')]: {
    //   fontSize: '20px',
    //   margin: '15px 15px 5px 15px',
    // },
  },
  card: {
    padding: '20px 16px',
    fontSize: '25px',
    maxWidth: '345',
    minHeight: '450',
    // height: '30vh',

    // [breakpoints.down('xs')]: {
    //   margin: '10px',
    //   padding: '6px 6px 12px 6px',
    //   fontSize: '18px',
    // },
  },
  cardContent: {
    padding: '0px 10px',
    height:'350px'
  },
  cardContentHeader: {
    fontSize: '23px',
    margin: '10px',

    // [breakpoints.down('xs')]: {
    //   margin: '5px',
    //   fontSize: '20px',
    // },
  },
  cardContentMedia:{
    width:'40%',
    height:'30%',
    minHeight:'150px'
  },
  P4PButton: {
    marginTop: '3rem'
  }
}

const data = [
  {
    header: 'Create an Account',
    description: 'The first step is Creating An Account in Place for Purpose. This involves completing a brief questionnaire to help us understand who you are, what your interests and goals are, and how your values align with Baltimore Corps. Once you submit your questionnaire, your application will be reviewed based on Values Alignment with Baltimore Corps.',
    imageName: process1,
  },
  {
    header: 'Build a Profile',
    description: 'Your Profile captures your skills, capabilities and experiences and we use it along with your Interest Statements to assess your qualifications for specific roles. Think of it as a more holistic resume to help us get a complete picture of your background and experience. ',
    imageName: process2,
  },
  {
    header: 'Schedule a Consultation',
    description: 'The Consultation is our opportunity to learn more about your interests and goals, to orient you to applying for roles in Place for Purpose, to learn how we can support you with your Profile, and to answer any questions about the system or process. Your profile does not need to be finished to schedule a Consultation.',
    imageName: process3,
  },
  {
    header: 'Apply for Opportunities',
    description: 'Once approved for the Place for Purpose Job Portal, login and apply for roles that peak your interest. You will have the ability to customize your resume for each position and add an interest statement explaining why you are the best candidate for the job.',
    imageName: process4,
  },
  {
    header: 'Review & Recommendation',
    description: 'Baltimore Corps staff will review all submitted applications to roles (Profiles/Interest Statements) to recommend candidates for the position. Recommended candidates will be sent to the organization’s hiring manager to review. The hiring managers will reach out directly to schedule interviews with their top candidates.',
    imageName: process5,
  },
  {
    header: 'Interview & Selection',
    description: 'There may be multiple interviews depending on the organization’s hiring practices. Once interviews are complete, Baltimore Corps will notify you of the status of your application. If you are selected as the top candidate, an offer will be made by the organization. The Baltimore Corps team is available to help answer questions, support with developing your Profile, and assist with interviewing.',
    imageName: process6,
  }
]

function P4PCarousel({props, onClickLogInHandler}) {
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1151 },
          items: 3,
          slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1150, min: 769 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 768, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
    }

    function ProcessCard(props) {
      return (
        <Card  
          className={styles.card}
          style={{ display: 'block',
          width: '350px',
          transitionDuration: '0.3s',
          height: '450px'}}
        >

          <CardContent className={styles.cardContent}>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              className={styles.cardContentHeader}
            >
              {props.header}
            </Typography><br/>
            <CardMedia
              component="img"
              src={props.imageName}
              className={styles.cardContentMedia}
              title={props.header}
              style={{width: '10vw', margin:"2% 0", width:'40%'}}
            /><br/>
            <Typography
              gutterTop
              gutterBottom
              variant="body1"
              component="p"
              align="justify"
            >
              {props.description}
            </Typography>
          </CardContent>

        </Card>
      )
    }

    return (
      <div style={{width: "100vw"}}>
        <Typography
          gutterBottom
          variant="h5"
          component="h1"
          style={styles.pageHeader}
        >
          The Process        
        </Typography>

        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          // autoPlay={props.deviceType !== "mobile" ? true : false}
          // autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          // deviceType={props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {data.map((item) => (<ProcessCard header={item.header} description={item.description} imageName={item.imageName} />))}
        </Carousel>

        <Button
          variant="contained"
          color="primary"
          onClick={onClickLogInHandler}
          style={styles.P4PButton}
        >
          Start the Process Today! 
        </Button>
      </div>
    )
}

export default P4PCarousel