import React from "react";
import svg from "../assets/logo.svg";
import wave from "../assets/wave.png";
//@ts-ignore
import video from "../assets/Cymotive_Homepage.mp4";
function Header() {
  return (
    <header id="pageHeader">
      <img id="logo" src={svg} alt="cymotive logo" />
      <p id="headline">
        Get Statistics About <br />
        The Future
        <br />
        of Mobility
      </p>
      <div id="videoDiv">
        <video id="carVideo" autoPlay loop playsInline muted>
          <source src={video} type="video/mp4" />
          <source src={video} type="video/ogg" />
        </video>
        <img id="wave" src={wave} alt="wave" />
      </div>
    </header>
  );
}
export default React.memo(Header);
