import { h, Component } from "preact";
import VideojsPlayer from "./basePlayer/videojs";
import Html5VideoPlayer from "./basePlayer/html5-video";

const videoJsOptions = {
  autoplay: true,
  controls: true,
  sources: [
    {
      src: "https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8",
      type: "application/x-mpegURL",
    },
  ],
};

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = { player: "video.js", canPlayHls: true };
  }

  componentDidMount() {
    // instantiate video.js
  }

  // destroy player on unmount
  componentWillUnmount() {}

  handleChange = (event) => {
    this.setState({ player: event.target.value });
    if(event.target.value == "html5video"){
      videoJsOptions.sources.[0].src = "https://multiplatform-f.akamaihd.net/i/multi/april11/sintel/sintel-hd_,512x288_450_b,640x360_700_b,768x432_1000_b,1024x576_1400_m,.mp4.csmil/master.m3u8"
    }else{
      videoJsOptions.sources.[0].src = "https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8"
    }
    
  };

  render() {
    return (
      <div>
        <div>
          <form>
            <label>
              Select Player:
              <select value={this.state.value} onChange={this.handleChange}>
                <option selected value="video.js">
                  Video.js
                </option>
                <option value="html5video">HTML5 Video</option>
              </select>
            </label>
          </form>
        </div>
        <div>
          {this.state.player == "video.js" && (
            <VideojsPlayer {...videoJsOptions} />
          )}
          {this.state.player == "html5video" && (
            <Html5VideoPlayer {...videoJsOptions} />
          )}
        </div>
      </div>
    );
  }
}
