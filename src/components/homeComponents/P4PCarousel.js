import React from 'react'
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

import process1 from '../../assets/images/process1.png'
import process2 from '../../assets/images/process2.png'
import process3 from '../../assets/images/process3.png'
import process4 from '../../assets/images/process4.png'
import process5 from '../../assets/images/process5.png'
import process6 from '../../assets/images/process6.png'

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

    return (
      <div style={{width: "100vw"}}>
        <p>CAROUSEL</p>
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