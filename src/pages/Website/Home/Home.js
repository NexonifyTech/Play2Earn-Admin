import React from 'react';
import { Container, Row, Col, Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import playstore from "../../../assets/images/play-store-badge-.webp";
import HomeImage from "../../../assets/images/Sport family-amico.svg";
const Home = () => {
  return (
    <div className=' bg-custom hero-header '>
<Container >
  <Row>
<Col xs={12} lg={6} className="text-center text-lg-start mt-5 ">
                 <h1 className="text-white mb-4 animated zoomIn mt-5" style={{ fontSize: '45px' }}>
                 A simpler method<br /> to organize your<br />gaming!
                </h1>
                <p className="text-white pb-3 animated zoomIn"style={{ fontSize: '20px' }}>
                "Manage your trips easily and enjoy betting on <br/>all your favorite games and sports with our app."
                </p>
                <a href='https://play.google.com/store/apps/details?id=com.trainsonwheels.trainsonwheelsandroidapp' target='blank'>
            <img
              src={playstore}
              alt="MeetInGround Google Play"
              title="MeetInGround Google Play"
              style={{ Width: "40px", height: "40px" }}
            />
          </a>
              </Col>
              <Col xs={12} lg={6} className="text-center text-lg-start">
                <Image fluid style={{height:"auto",width:"auto"}} src={HomeImage} alt="App preview" className="animated zoomIn" />
              </Col>
              </Row>
</Container>
    </div>
  );
}
export default Home;