import React from 'react';
import './Home.css';
import { Segment, Container, Icon, Card, Image, Button, Header } from 'semantic-ui-react'

const src2 = require('../images/organization.jpeg');
const CardExampleCard = () => (
    <div className="block ">
    <Segment basic >

        <Card.Group  >
            <Card href='/LogInSignUp'>

                <Image style={{'height':200}} size='medium' src={require('../images/talent.jpeg')}  size ='medium' circular  />
                    
                <Card.Content>
                    <Card.Header>Talent</Card.Header>
                        
                    <Card.Description>Join as a talent, you can find numerous positions/opportunities in NGO here. </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button basic color='green'>
                        LogIn / SignUp
                    </Button>
                </Card.Content>
            </Card>

            <Card href='/LogInSignUp'>
                <Image style={{'height':200}} size='medium' src={src2}   circular/>
                
                <Card.Content>
                    <Card.Header>Organization</Card.Header>
                    <Card.Description>Join as an organization, you can find numerous talents for your organization. </Card.Description>
                </Card.Content>
                <Card.Content extra>
                <Button basic color='green'>
                            LogIn / SignUp
                        </Button>
                </Card.Content>
            </Card>

            <Card href='/LogInSignUp'>
                <Image style={{'height':200}} size='large' src={require('../images/bc.jpeg')}  />
                
                <Card.Content>
                    <Card.Header>Baltimore Corps Staff</Card.Header>
                    <Card.Description>As a Baltimore Staff, you can access data stored in database.</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    
                        <Button basic color='green'>
                            LogIn / SignUp
                        </Button>
                        
                </Card.Content>
            </Card>
        </Card.Group>
    </Segment>
    </div>
    
  )

class Home extends React.Component {
    
    render () {
        return (
            <Container>

                    <br></br>
                <div>
                    <Segment basic textAlign='center' >
                        <Header style ={{textAlign:'center', whiteSpace: 'pre-wrap'}} as='h3'>
                            BALTIMORE CORPS Talent Matching
                    
                        </Header>
                    </Segment>

                </div>
                
                <br></br>
                <div >
                        <CardExampleCard />
                </div>    
            </Container>
        );
    }
}
export default Home;