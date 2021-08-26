import PropTypes from 'prop-types';
import { Component } from 'preact';
import classNames from 'classnames';
import EVENTS from '../../events/PlayerEvents';

const propTypes = {
  children: PropTypes.any,

  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fluid: PropTypes.bool,
  muted: PropTypes.bool,
  playsInline: PropTypes.bool,
  aspectRatio: PropTypes.string,
  className: PropTypes.string,
  videoId: PropTypes.string,

  startTime: PropTypes.number,
  loop: PropTypes.bool,
  autoPlay: PropTypes.bool,
  src: PropTypes.string,
  poster: PropTypes.string,
  preload: PropTypes.oneOf(['auto', 'metadata', 'none']),

};

const defaultProps = {
  fluid: true,
  muted: false,
  playsInline: false,
  preload: 'auto',
  aspectRatio: 'auto'
};

export default class Player extends Component {
  constructor(props) {
    super(props);

    this.controlsHideTimer = null;
    this.video = null; // the Video component
    this.getStyle = this.getStyle.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.getChildren = this.getChildren.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.startControlsTimer = this.startControlsTimer.bind(this);
    this.handleFullScreenChange = this.handleFullScreenChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
    fullscreen.addEventListener(this.handleFullScreenChange);
    if (this.overrideCDM) {
        this.overrideCDM();
    }
  }

  componentWillUnmount() {
    // Remove event listener
    window.removeEventListener('resize', this.handleResize);
    fullscreen.removeEventListener(this.handleFullScreenChange);
    if (this.controlsHideTimer) {
      window.clearTimeout(this.controlsHideTimer);
    }
  }

  getDefaultChildren(originalChildren) {
    return [
      <Video
        ref={c => {
          this.video = c;
          this.manager.video = this.video;
        }}
        key="video"
        order={0.0}
      >
        {originalChildren}
      </Video>,
      <PosterImage key="poster-image" order={1.0} />,
      <LoadingSpinner key="loading-spinner" order={2.0} />,
      <Bezel key="bezel" order={3.0} />,
      <BigPlayButton key="big-play-button" order={4.0} />,
      <ControlBar key="control-bar" order={5.0} />,
      <Shortcut key="shortcut" order={99.0} />
    ];
  }

  getChildren(props) {
    const {
      className: _, // remove className
      children: originalChildren,
      ...propsWithoutChildren
    } = props;
    return [];
  }

  setWidthOrHeight(style, name, value) {
    let styleVal;
    if (typeof value === 'string') {
      if (value === 'auto') {
        styleVal = 'auto';
      } else if (value.match(/\d+%/)) {
        styleVal = value;
      }
    } else if (typeof value === 'number') {
      styleVal = `${value}px`;
    }
    Object.assign(style, {
      [name]: styleVal
    });
  }

  getStyle() {
    return {};
  }
  get playbackRate() {
    return this.video.playbackRate;
  }
  set playbackRate(rate) {
    this.video.playbackRate = rate;
  }
  get muted() {
    return this.video.muted;
  }
  set muted(val) {
    this.video.muted = val;
  }
  get volume() {
    return this.video.volume;
  }
  set volume(val) {
    this.video.volume = val;
  }
  get videoWidth() {
    return this.video.videoWidth;
  }
  get videoHeight() {
    return this.video.videoHeight;
  }
  play() {
    this.video.play();
  }
  pause() {
    this.video.pause();
  }
  load() {
    this.video.load();
  }
  addTextTrack(...args) {
    this.video.addTextTrack(...args);
  }
  canPlayType(...args) {
    this.video.canPlayType(...args);
  }
  seek(time) {
    this.video.seek(time);
  }
  forward(seconds) {
    this.video.forward(seconds);
  }
  replay(seconds) {
    this.video.replay(seconds);
  }
  toggleFullscreen() {
    this.video.toggleFullscreen();
  }
  subscribeToStateChange(listener) {
    return this.manager.subscribeToPlayerStateChange(listener);
  }
  handleResize() {}

  handleFullScreenChange(event) {
    if (event.target === this.manager.rootElement) {
      this.actions.handleFullscreenChange(fullscreen.isFullscreen);
    }
  }

  handleMouseDown() {
    this.startControlsTimer();
  }

  handleMouseMove() {
    this.startControlsTimer();
  }

  handleKeyDown() {
    this.startControlsTimer();
  }

  startControlsTimer() {
    let controlBarActiveTime = 3000;
    React.Children.forEach(this.props.children, element => {
      if (!React.isValidElement(element) || element.type !== ControlBar) {
        return;
      }

      const { autoHideTime } = element.props;
      if (typeof autoHideTime === 'number') {
        controlBarActiveTime = autoHideTime;
      }
    });

    this.actions.userActivate(true);
    clearTimeout(this.controlsHideTimer);
    this.controlsHideTimer = setTimeout(() => {
      this.actions.userActivate(false);
    }, controlBarActiveTime);
  }

  handleStateChange(state, prevState) {
    if (state.isFullscreen !== prevState.isFullscreen) {
      this.handleResize();
      // focus root when switching fullscreen mode to avoid confusion #276
      focusNode(this.manager.rootElement);
    }
    this.forceUpdate(); // re-render
  }

  handleFocus() {
    this.actions.activate(true);
  }

  handleBlur() {
    this.actions.activate(false);
  }


}

Player.contextTypes = { store: PropTypes.object };
Player.propTypes = propTypes;
Player.defaultProps = defaultProps;
Player.displayName = 'Player';