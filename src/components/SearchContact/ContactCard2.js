import React from "react";
import { Card } from "semantic-ui-react";
//import { Card} from 'react-bootstrap'

class ContactCard2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { name, email, phone, id, picture } = this.props.item;
    return (
      <Card style={{ width: "180px", height: "330px" }}>
        <img
          src={picture.medium}
          style={{ borderRadius: "50%" }}
          alt="profile"
        />
        <Card.Content>
          <Card.Header>
            {name.last}, {name.first}{" "}
          </Card.Header>
          <Card.Meta>
            <span className="date">id: {id.value}</span>
          </Card.Meta>
          <Card.Description>{email}</Card.Description>
          <Card.Description>{phone}</Card.Description>
        </Card.Content>
      </Card>
    );
  }
}
export default ContactCard2;
