import React from 'react'
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'

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
}

function P4PCarousel(props) {
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
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
          deviceType={props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          <div style={{width: "30%"}}><img style={{width: "100%"}} src={process1} alt='' /></div>
          <div style={{width: "30%"}}><img style={{width: "100%"}} src={process2} alt='' /></div>
          <div style={{width: "30%"}}><img style={{width: "100%"}} src={process3} alt='' /></div>
          <div style={{width: "30%"}}><img style={{width: "100%"}} src={process4} alt='' /></div>
          <div style={{width: "30%"}}><img style={{width: "100%"}} src={process5} alt='' /></div>
          <div style={{width: "30%"}}><img style={{width: "100%"}} src={process6} alt='' /></div>

        </Carousel>
      </div>
    )
}

export default P4PCarousel