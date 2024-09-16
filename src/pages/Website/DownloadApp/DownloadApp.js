import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Downloadimage from "../../../assets/images/mobileimages.webp";
import Ratings from "../../../assets/images/Ratings.webp";
import playstore from "../../../assets/images/play-store-badge-.webp";


const DownloadAppSection = () => {
  return (
    <>
      <Container className="mt-4 mb-4">
        <Row>
          <Col
            xs={12}
            xl={6}
            sm={12}
            xxl={6}
            md={6}
            lg={6}
            className="fade-in-up mt-4"
            data-wow-delay="0.1s "
          >
            {" "}
            <img
              className="img-fluid wow zoomIn"
              data-wow-delay="0.5s"
              src={Downloadimage}
              alt="Flawk"
            />
          </Col>
          <Col
            xs={12}
            xl={6}
            sm={12}
            xxl={6}
            md={6}
            lg={6}
            className="fade-in-up mt-4"
            data-wow-delay="0.1s "
          >
            {" "}
            <div className="section-title position-relative mb-4 pb-2">
              <h1 className="mt-2">
                <br />
                <br />
                Download Our App
              </h1>
            </div>
            <p className="mb-4"style={{ fontSize: '20px' }}>
              Wherever you're going, we're right there with you
            </p>
            <p style={{ fontSize: '20px' }}>
              "Download the Bet and Play app today. Get access to trusted,
              authentic, and real-time information about sports events, game
              schedules, betting odds, player stats, and more at your
              fingertips."
            </p>
            <img
              src={playstore}
              alt="playstore"
              srcSet=""
              style={{ Width: "40px", height: "40px" }}
            />
            <img
              src={Ratings}
              alt="Ratings"
              srcSet=""
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default DownloadAppSection;