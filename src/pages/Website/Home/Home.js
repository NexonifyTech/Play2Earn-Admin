import React from 'react';
import { Container, Row, Col, Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import playstore from "../../../assets/images/play-store-badge-.webp";
import HomeImage from "../../../assets/images/play2earns.png";
const Home = () => {
  return (
    <div className=' bg-custom hero-header '>
<Container >
  <Row>
<Col xs={12} lg={6} className="text-center text-lg-start mt-5 mb-5 ">
                 <h1 className="text-white mb-4 animated zoomIn mt-5" style={{ fontSize: '45px' }}>
                 You can play games <br /> and earn money!
                </h1>
                <p className="text-white pb-3 animated zoomIn"style={{ fontSize: '20px' }}>
                "Easily manage your trips and enjoy playing <br />  games to earn money, all with our app!"
                </p>
                <a href=''>
            <img
              src={playstore}
              alt="play2earn"
              title="play2earn"
              style={{ Width: "40px", height: "40px" }}
            />
          </a>
              </Col>
              <Col xs={12} lg={6} className="text-end text-lg-end mt-5">
                <Image fluid style={{height:"300px",width:"500px"}} src={HomeImage} alt="App preview" className="animated zoomIn" />
              </Col>
              </Row>
</Container>
    </div>
  );
}
export default Home;