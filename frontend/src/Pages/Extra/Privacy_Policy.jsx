import React from "react";
import Privacy_policyData from "../../DataDetails/Privacy_PolicyData";
import { Col, Container, Row } from "react-bootstrap";

const ParagphBlock=({text})=>{
    
        if(!text) return null;

        return text.includes("•")?
        (
            <ul>
                {text
                .split('•')
                .map((line)=>line.trim())
                .filter((line)=>line.length>0)
                .map((line,idx)=>(<li key={idx}>{line}</li>
                ))}
            </ul>)
                :<p style={{ textAlign: "justify" }}>{text}</p>            
            
}

const Privacy_policy = () => {
  return (
    <>
      <section>
        <Container fluid className="py-5">
          <Row className="justify-content-center py-5">
            <Col md={10}>
              <h1 className="py-4">Privacy Policy Highlights</h1>
              <ol type="1" className="fs-6">
                {Privacy_policyData.map((item, index) => (
                  <li key={index}>
                    <h4 className="py-4">{item.title}</h4>

                    {/* subtitle paragraph */}
                    {item.subtitles && item.subtitles.length > 0 && (
                      <ol type="A" className="fs-6">
                        {item.subtitles.map((item_data, idx) => (
                          <li key={idx}>
                            <h5 className="py-2">{item_data.subtitle}</h5>
                            <ParagphBlock text={item_data.paragraph}/>
                          </li>
                        ))}
                      </ol>
                    )}

                    {/* Main Paragraphs */}
                    <ParagphBlock text={item.paragraphs}/>
                  </li>
                ))}
              </ol>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Privacy_policy;
