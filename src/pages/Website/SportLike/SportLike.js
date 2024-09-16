import React from "react";
import Cricket from "../../../assets/images/Crickets.webp";
import Volleyball from "../../../assets/images/Volleyball.webp";
import Football from "../../../assets/images/Football.webp";
import Basketball from "../../../assets/images/basketball.webp";
import { Container, Col, Row } from "react-bootstrap";
export const SportsLike = () => {
  return (
    <>
     <Container className="mt-4 mb-4">
        <Row>
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
              <h2 className="mt-2">Sports Like...</h2>
            </div>
          </Col>
          <Col
            xs={12}
            xl={3}
            sm={12}
            xxl={3}
            md={3}
            lg={3}
            className="fade-in-up mt-4"
            data-wow-delay="0.1s "
          >
            <div className="card" style={{ borderRadius: "15px" }}>
              <img
                src={Cricket}
                className="card-img-top"
                alt="Bangalore"
                width="900px"
                height="195px"
              />
              <div className="card-body">
                <h5 className="card-title text-center">Cricket</h5>
              </div>
            </div>
          </Col>
          <Col
            xs={12}
            xl={3}
            sm={12}
            xxl={3}
            md={3}
            lg={3}
            className="fade-in-up mt-4"
            data-wow-delay="0.1s "
          >
            <div className="card" style={{ borderRadius: "15px" }}>
              <img
                src={Volleyball}
                className="card-img-top"
                alt="Hyderabad"
                width="311px"
                height="195px"
              />
              <div className="card-body">
                <h5 className="card-title text-center">Volleyball</h5>
              </div>
            </div>
          </Col>
          <Col
            xs={12}
            xl={3}
            sm={12}
            xxl={3}
            md={3}
            lg={3}
            className="fade-in-up mt-4"
            data-wow-delay="0.1s "
          >
            <div className="card" style={{ borderRadius: "15px" }}>
              <img
                src={Football}
                className="card-img-top"
                alt="Bangalore"
                width="311px"
                height="195px"
              />
              <div className="card-body">
                <h5 className="card-title text-center">Football</h5>
              </div>
            </div>
          </Col>
          <Col
            xs={12}
            xl={3}
            sm={12}
            xxl={3}
            md={3}
            lg={3}
            className="fade-in-up mt-4"
            data-wow-delay="0.1s "
          >
            <div className="card" style={{ borderRadius: "15px" }}>
              <img
                src={Basketball}
                className="card-img-top"
                alt="Hyderabad"
                width="311px"
                height="195px"
              />
              <div className="card-body">
                <h5 className="card-title text-center">Basketball</h5>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}