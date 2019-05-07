import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import TalentBasicInfo from "./TalentBasicInfo";
import Experience from "./Experience.container";
import Skill from "./Skill.container";
import Resume from "./Resume";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Icon, Button } from "semantic-ui-react";

class TalentProfile extends React.Component {
  printDocument = () => {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      //pdf.fromHTML(ReactDOMServer.renderToStaticMarkup(this.render()));
      pdf.save("resume.pdf");
    });
  };

  pdfToHTML = () => {
    var pdf = new jsPDF("p", "pt", "letter");
    var source = document.getElementById("divToPrint");
    var specialElementHandlers = {
      "#bypassme": function(element, renderer) {
        return true;
      }
    };

    var margins = {
      top: 50,
      left: 60,
      width: 545
    };

    pdf.fromHTML(
      source, // HTML string or DOM elem ref.
      margins.left, // x coord
      margins.top, // y coord
      {
        width: margins.width, // max width of content on PDF
        elementHandlers: specialElementHandlers
      },
      function(dispose) {
        // dispose: object with X, Y of the last line add to the PDF
        // this allow the insertion of new lines after html
        pdf.save("html2pdf.pdf");
      }
    );
  };

  render() {
    const textStyle = {
      fontSize: "26px",
      fontWeight: "300",
      lineHeight: "0.8",
      color: "#5f6163"
    };
    return (
      <div style={{ backgroundColor: "#dee2e8" }}>
        <Container>
          <div id="divToPrint">
            <Row
              style={{
                backgroundColor: "lightblue",
                padding: "30px",
                height: "180px"
              }}
            >
              <TalentBasicInfo />
            </Row>
            <Row>
              <br />
            </Row>
            <Row>
              <Col>
                <Experience
                  contactId={this.props.match.params.contactId}
                  experienceType="Work"
                />
                <Experience
                  contactId={this.props.match.params.contactId}
                  experienceType="Education"
                />
                <Experience
                  contactId={this.props.match.params.contactId}
                  experienceType="Service"
                />
                <Experience
                  contactId={this.props.match.params.contactId}
                  experienceType="Accomplishment"
                />
                <div
                  style={{
                    marginTop: "10px",
                    backgroundColor: "white",
                    padding: "15px"
                  }}
                >
                  <Row>
                    <Col xs md lg="4">
                      <div style={textStyle}>Skills and Abilities</div>
                    </Col>
                  </Row>

                  <Skill
                    contactId={this.props.match.params.contactId}
                    tagType="Function"
                  />
                  <Skill
                    contactId={this.props.match.params.contactId}
                    tagType="Skill"
                  />
                  <Skill
                    contactId={this.props.match.params.contactId}
                    tagType="Topic"
                  />
                </div>
                <Resume />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "30px",
                    marginBottom: "80px"
                  }}
                >
                  <Button color="green" onClick={this.pdfToHTML}>
                    {" "}
                    <Icon name="download" /> Download Resume
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}
TalentProfile.propTypes = {
  match: PropTypes.object
};

export default TalentProfile;
