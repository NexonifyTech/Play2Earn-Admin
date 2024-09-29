import React from 'react';
import Home from "../Home/Home";
import Choose from "../Choose/Choose";
import {GetStarted }from "../GetStarted/GetStarted"; 
import { SportsLike } from "../SportLike/SportLike";
import DownloadApp from "../DownloadApp/DownloadApp";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


const Play2Earn = () => {
  return (
    <>
      <Header/>
      <Home/>
      {/* <Choose/>
      <GetStarted/> 
      <SportsLike/> */}
      <DownloadApp/>
      <Footer/>
   
    </>
  );
};

export default Play2Earn;
