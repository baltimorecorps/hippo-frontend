import React from 'react';
import {Container, Row, Col} from "react-bootstrap";
import TalentBasicInfo from "./TalentBasicInfo";
import Experience from "./Experience";
import Education from "./Education";
import Service from "./Service";
import Accomplishment from "./Accomplishment";
import Skill from "./Skill";
import Resume from "./Resume";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Icon, Button } from 'semantic-ui-react';

class TalentProfile extends React.Component {

    printDocument = () =>{
      const input = document.getElementById('divToPrint');
      html2canvas(input)
        .then((canvas) =>{
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          pdf.addImage(imgData, 'JPEG', 0, 0);
          //pdf.fromHTML(ReactDOMServer.renderToStaticMarkup(this.render()));
          pdf.save("resume.pdf");

        });
    }

    pdfToHTML = () => {
      var pdf = new jsPDF('p', 'pt', 'letter');
      var source = document.getElementById('divToPrint');
      var specialElementHandlers = {
        '#bypassme': function(element, renderer) {
          return true
        }
      };

      var margins = {
        top: 50,
        left: 60,
        width: 545
      };

      pdf.fromHTML (
        source // HTML string or DOM elem ref.
        , margins.left // x coord
        , margins.top // y coord
        , {
            'width': margins.width // max width of content on PDF
            , 'elementHandlers': specialElementHandlers
          },
        function (dispose) {
          // dispose: object with X, Y of the last line add to the PDF
          // this allow the insertion of new lines after html
          pdf.save('html2pdf.pdf');
        }
      )
    }



    render(){
      return(
        <div style={{ backgroundColor: "#dee2e8"}} >
          <Container  >


              <div id='divToPrint' >
                <Row style={{backgroundColor:"lightblue",  padding: "30px", height:"180px"}}>
                  <TalentBasicInfo />
                </Row>
                <Row>
                  <br></br>
                </Row>
                <Row >
                  <Col >
                    <Experience />
                    <Education/>
                    <Service/>
                    <Accomplishment/>
                    <Skill/>
                    <Resume />
                    {/*}
                    <div style={{display:"flex", justifyContent: 'center'}}>
                      <Button onClick={this.printDocument}>Download Resume</Button>

                    </div>*/}

                    <div style={{display:"flex", justifyContent: 'center', marginTop:"30px", marginBottom:"80px"}}>
                      <Button color='green' onClick={this.pdfToHTML}> <Icon name="download"/> Download Resume</Button>
                    </div>
                  </Col>
                </Row>

            </div>
          </Container>
        </div>

      );
    }
  }
  export default TalentProfile;
