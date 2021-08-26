// @flow

import { h, Component } from 'preact'
import classNames from 'classnames';
import videojs from 'video.js'
import 'videojs-contrib-ads'
import 'videojs-contrib-hls'
import 'videojs-ima'

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
    this.player = videojs(this.videoNode, this.props.options, this.handleReady)
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  props: VideoPlayerProps

  handleReady() {
    this.player.ima({
      id: 'test-player',
      adTagUrl:
        'http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&impl=s&gdfp_req=1&env=vp&output=xml_vmap1&unviewed_position_start=1&cust_params=sample_ar%3Dpremidpostpod%26deployment%3Dgmf-js&cmsid=496&vid=short_onecue&correlator='
    })
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
      <div data-vjs-player
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
            className="video-js"
            height="480"
            id="test-player"
            ref={this.handleRef}
            width="640"
          />
      </div>
    );
  }
}
