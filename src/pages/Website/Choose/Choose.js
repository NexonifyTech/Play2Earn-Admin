import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Chooseimage from "../../../assets/images/chooseimgss.webp";
import "animate.css/animate.min.css";
const Choose = () => {
  return (
  <>
   <Container className="mt-2 mb-2">
        <Row>

        <Col xs={12} xl={6} sm={12} xxl={6} md={6} lg={6}>
            <img
              class="img-fluid animated zoomIn justify-content-end align-items-end"
              data-wow-delay="0.5s"
              src={Chooseimage}
            />
          </Col>
          <Col
            xs={12}
            xl={6}
            sm={12}
            xxl={6}
            md={6}
            lg={6}
            className="fade-in-up"
            data-wow-delay="0.1s "
          >
            <div className="mb-4 pb-2 ">
              <h2 className="mt-2 mt-4 ">
                <br />
                Why Choose Us
              </h2>
            </div>
            <p class="mb-4"style={{ fontSize: '20px' }}>
                <b>MeetInGround:</b> "Your Ultimate Companion for Games and
                Sports - Seamlessly place bets, play your favorite games, track
                live updates, and earn rewards, all in one convenient app."
              </p>
          </Col>
          
        </Row>
      </Container>
  </>
  )
}
export default Choose