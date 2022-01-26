import Stats from "./Stats";
import "./App.css";
import svg from "../assets/logo.svg";
import wave from "../assets/wave.png";
//@ts-ignore
import video from "../assets/Cymotive_Homepage.mp4";
export default function App() {
  return (
    <div>
      <header>
        <img id="logo" src={svg} alt="cymotive logo" />
        <p id="headline">
          Get Statistics About <br />
          The Future
          <br />
          of Mobility
        </p>
        <div id="videoDiv">
          <video autoPlay loop playsInline muted>
            <source src={video} type="video/mp4" />
            <source src={video} type="video/ogg" />
          </video>
        </div>
        <img id="wave" src={wave} alt="wave" />
      </header>
      <Stats />
    </div>
  );
}
