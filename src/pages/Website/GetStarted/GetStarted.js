import React from "react";
import Login from "../../../assets/images/loginimg.png";
import Post from "../../../assets/images/postimg.png";
import Play from "../../../assets/images/playimg.png";
import Workstep from "../../../assets/images/workmaps.png";
import { Container, Col, Row } from "react-bootstrap";
export const GetStarted = () => {
  return (
    <Container className="mt-2 mb-2">
    <Col
      xs={12}
      xl={12}
      sm={12}
      xxl={12}
      md={12}
      lg={12}
      className="fade-in-up"
      data-wow-delay="0.1s "
    >
      <div
        className=" text-center  pb-2 wow fadeInUp"
        data-wow-delay="0.1s"
      >
        <h2 className="mt-2">Get Started</h2>
      </div>
      <div className="row text-center justify-content-center">
        <img
          className="img-fluid flex-shrink-0"
          src={Workstep}
          style={{
            width: "65%",
            height: "70px",
            objectFit: "contain",
            marginBottom: "30px",
          }}
        />
      </div>
    </Col>
    <Row>
      <Col
        xs={12}
        xl={4}
        sm={12}
        xxl={4}
        md={4}
        lg={4}
        className="fade-in-up"
        data-wow-delay="0.1s "
      >
        <div className="service-item d-flex flex-column justify-content-center text-center rounded mt-2">
          <div className="flex-shrink-0 ">
            <img
              className="img-fluid flex-shrink-0"
              src={Login}
              style={{
                width: "70px",
                height: "70px",
                objectFit: "contain",
                marginBottom: "30px",
              }}
            />
          </div>
          <h5 className="mb-3">Step 1: Login</h5>
          <p style={{ fontSize: '20px' }}>
          "Download from the Play Store and log in to start betting."


          </p>
        </div>
      </Col>
      <Col
        xs={12}
        xl={4}
        sm={12}
        xxl={4}
        md={4}
        lg={4}
        className="fade-in-up"
        data-wow-delay="0.1s "
      >
        <div className="service-item d-flex flex-column justify-content-center text-center rounded mt-2 ">
          <div className="flex-shrink-0 pb-4">
            <img
              className="img-fluid flex-shrink-0"
              src={Post}
              style={{
                width: "70px",
                height: "70px",
                objectFit: "contain",
                marginBottom: "30px",
              }}
            />
          </div>
          <h5 className="mb-3">Step 2: Post</h5>
          <p style={{ fontSize: '20px' }}>
          "Continue your betting journey by making your posts and sharing your predictions."
          </p>
        </div>
      </Col>
      <Col
        xs={12}
        xl={4}
        sm={12}
        xxl={4}
        md={4}
        lg={4}
        className="fade-in-up"
        data-wow-delay="0.1s "
      >
        <div className="service-item d-flex flex-column justify-content-center text-center rounded mt-2 ">
          <div className="flex-shrink-0 pb-4">
            <img
              className="img-fluid flex-shrink-0"
              src={Play}
              style={{
                width: "70px",
                height: "70px",
                objectFit: "contain",
                marginBottom: "30px",
              }}
            />
          </div>
          <h5 className="mb-3">Step 3: Play</h5>
          <p style={{ fontSize: '20px' }}>
          "Make every move count with our Bet and Play app, ensuring a smooth path to victory."
          </p>
        </div>
      </Col>
    </Row>
  </Container>
  );
};







