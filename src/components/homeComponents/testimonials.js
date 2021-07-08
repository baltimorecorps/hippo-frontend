import React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import TestimonialCard from './testimonial.card'
import LoginAction from './logIn'



const useStyles = makeStyles({
    main: {
        marginTop: 0,
        padding: "1rem 1rem 2rem 1rem"
    },
    title: {
        fontSize: "20px",
        margin: "5px",
        '@media only screen and (min-width: 600px)': {
            fontSize: "30px",
            margin: "18px"
        },
        '@media only screen and (min-width: 960px)': {
            fontSize: "35px",
            margin: "20px"
        },
    }
})

const testimonials = [
    {
        image:'/images/testimoniala-min.jpg',
        quote:'Quote Here',
        author:'author',
        id: 1

    },
    {
        image:'/images/testimonialb-min.jpg',
        quote:'Quote Here',
        author:'author',
        id: 2

    },
    {
        image: '/images/testimonialc-min.jpg',
        quote:'Quote Here',
        author:'author',
        id: 3

    },
    {
        image:'/images/testimoniald-min.jpg',
        quote:'Quote Here',
        author:'author',
        id: 4

    }
 
]

function Testimonials() {
    const styles = useStyles()
    return (
        <Box width={"100%"} mt={3} bgcolor="primary.offWhite" className={styles.main}>
            <Typography color="inherit" align="center" gutterBottom variant="h5" component="h2" className={styles.title}>
                Testimonials 
            </Typography>

            <Grid container justify="center" spacing={3}>
                {testimonials.map((testimonial) => (
                <Grid item key={testimonial.id} xs={12} sm={6} lg={3}>
                    <TestimonialCard 
                        image={testimonial.image}
                        quote={testimonial.quote}
                        author={testimonial.author}
                    />
                </Grid>
                ))}
               
            </Grid>
            
        <LoginAction text="Sign In Today"/>
        </Box>
    )
}

export default Testimonials