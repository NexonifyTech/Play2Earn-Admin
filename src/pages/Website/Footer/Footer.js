import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import '@fortawesome/fontawesome-free/css/all.css';
const Footer = () => {
  return (
    <>
      <div className="bg-custom">
        <Container>
          <Row >
            <Col
              md={6}
              lg={5}
              className="fade-in-up mt-5 text-light"
              data-wow-delay="0.1s "
            >
               <h5 className="text-white mb-4">Get In Touch</h5>
    <p><i className="fas fa-map-marker-alt me-3"></i>Chennai,Tamil Nadu 600032</p>
    <p><i className="fa-solid fa-phone me-3"></i>+91 9876543210</p>
    <i className="fas fa-envelope me-3"></i><a className='text-white' href="mailto:help.meetinground@gmail.com">play2earn@gmail.com</a>
    <div className="d-flex pt-2 mt-3">
        <a className="btn btn-outline-light btn-social m-1" href="#"><i className="fab fa-twitter"></i></a>
        <a className="btn btn-outline-light btn-social m-1" href="#"><i className="fab fa-facebook-f"></i></a>
        <a className="btn btn-outline-light btn-social m-1" href="#"><i className="fab fa-youtube"></i></a>
        <a className="btn btn-outline-light btn-social m-1" href="#"><i className="fab fa-instagram"></i></a>
        <a className="btn btn-outline-light btn-social m-1" href="#"><i className="fab fa-linkedin-in"></i></a>
    </div>

            </Col>
            <Col
              md={6}
              lg={4}
              className="fade-in-up mt-5"
              data-wow-delay="0.1s "
            >
              {" "}
              <h5 className="text-white mb-4 mx-2">Useful Link</h5>
              {/* <a className="btn text-white" href="about-us">
                About Us
              </a>
              <br />
              <a className="btn text-white" href="faq">
                Faq
              </a>
              <br /> */}
              <a className="btn text-white" href="privacy-policy">
                Privacy Policy
              </a>
              <br />
              <a className="btn text-white" href="terms-condition">
                Terms & Condition
              </a>
            </Col>
            <Col
              sm={12}
              md={6}
              lg={3}
              className="fade-in-up mt-5"
              data-wow-delay="0.1s "
            >
              <h5 className="text-white mb-4">For Play2Earn</h5>
              <p className="text-white">
              "Gain instant access to real-time updates on your favorite games. Play, compete, and earn money easily while staying informed about live events, schedules, and more, all through our app!"
              </p>
            </Col>
          </Row>
        </Container>
        <Container className="" >
            <div className="copyright">
                <Row className="">
                <div className="col-md-12 text-center  mt-5 mb-5">
                            <p className="text-white" >Copyright © 2024 -Play2Earn<br/> </p>
                            <p className="text-white" >All rights Reserved </p>
                        </div>
                </Row>
            </div>
        </Container>
      </div>
    </>
  );
};
export default Footer;