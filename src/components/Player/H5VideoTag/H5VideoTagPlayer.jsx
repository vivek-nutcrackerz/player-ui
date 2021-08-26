// @flow

import { h, Component } from 'preact'
import classNames from 'classnames';

/* eslint-disable import/no-webpack-loader-syntax,import/no-unresolved */
import '!style-loader!css-loader!video.js/dist/video-js.css'
import '!style-loader!css-loader!videojs-ima/dist/videojs.ima.css'
import '!style-loader!css-loader!videojs-contrib-ads/dist/videojs-contrib-ads.css'
import Player from '../Player'

export type VideoPlayerProps = {
  options: {
    autoplay?: boolean,
    controls?: boolean,
    sources?: Array<{ src: string, type: string }>
  }
}

export default class VideoPlayer extends Player {
  constructor(...props) {
    super(...props)
    this.handleReady = this.handleReady.bind(this)
    this.handleRef = this.handleRef.bind(this)
  }

  componentDidMount() {
    this.player = this.videoNode;
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  props: VideoPlayerProps

  handleReady() {
  }

  handleRef(node) {
    this.videoNode = node
  }

  render() {
    const { fluid } = this.props;

    const props = {
      ...this.props,
      video: this.video ? this.video.video : null
    };
    const children = this.getChildren(props);

    return (
      <div 
        className={classNames(
          {
            'video-controls-enabled': true,
            // 'video-has-started': hasStarted,
            // 'video-paused': paused,
            // 'video-playing': !paused,
            // 'video-waiting': waiting,
            // 'video-seeking': seeking,
            // 'video-fluid': fluid,
            // 'video-fullscreen': isFullscreen,
            // 'video-user-inactive': !userActivity,
            // 'video-user-active': userActivity,
            // 'video-workinghover': !browser.IS_IOS
          },
          'video-preact',
          this.props.className
        )}
        style={this.getStyle()}
        ref={c => {
          this.rootElement = c;
        }}
        role="region"
        onTouchStart={this.handleMouseDown}
        onMouseDown={this.handleMouseDown}
        onTouchMove={this.handleMouseMove}
        onMouseMove={this.handleMouseMove}
        onKeyDown={this.handleKeyDown}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        tabIndex="-1"
      >
        <video
            height="480"
            id="test-player"
            ref={this.handleRef}
            width="640"
          />
      </div>
    );
  }
}
