import { FunctionalComponent, h } from "preact";
import style from "./style.css";
import Player from "../../components/player";

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
      <Player {...videoJsOptions} />
    </div>
  );
};

export default Home;
