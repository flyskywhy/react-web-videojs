var assign = require('object-assign');
var cx = require('classnames');
var blacklist = require('blacklist');
var React = require('react');
var videojs = require('video.js');
var createClass = require('create-react-class');
require('!style-loader!css-loader!video.js/dist/video-js.min.css');

module.exports = createClass({
  displayName: 'VideoJS',

  componentDidMount() {
    var self = this;
    var player = videojs(this.refs.video, this.props.options).ready(function() {
      self.player = this;
      self.player.on('play', self.handlePlay);
    });
    if (this.props.onPlayerInit) {
      this.props.onPlayerInit(player);
    }
  },

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  },

  handlePlay: function() {
    if (this.props.onPlay) {
      this.props.onPlay(this.player);
    }
  },

  render() {
    var props = blacklist(this.props, 'children', 'className', 'src', 'type', 'onPlay', 'onPlayerInit');
    props.className = cx(this.props.className, 'videojs', 'video-js vjs-default-skin');

    assign(props, {
      ref: 'video',
      controls: true
    });

    return (
      <div>
        <video {... props}>
          <source src={this.props.src} type={this.props.type}/>
        </video>
      </div>
    );
  }
});
