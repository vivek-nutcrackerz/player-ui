import { FunctionalComponent, h } from "preact";
import style from "./style.css";
import Videoplayer from "../../components/videoplayer";

const videoJsOptions = {
  autoplay: true,
  controls: true,
  sources: [
    {
      src: "http://vjs.zencdn.net/v/oceans.mp4",
      type: "video/mp4",
    },
  ],
};

const Home: FunctionalComponent = () => {
  return (
    <div class={style.home}>
      <h1>Home</h1>
      <Videoplayer {...videoJsOptions} />
    </div>
  );
};

export default Home;
