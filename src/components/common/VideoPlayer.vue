<template>
  <div>
    <video ref="videoPlayer" class="video-js vjs-default-skin vjs-big-play-centered vjs-16-9" controls="controls" autoplay></video>
  </div>
</template>

<script>
import videojs from "video.js";
import "videojs-flash";
import "video.js/dist/video-js.css";

export default {
  name: "VideoPlayer",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      player: null
    };
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
      console.log("onPlayerReady", this);
      this.play();
    });
    this.player.ready(function() {
      console.log("onPlayerReady2", this);
      this.play();
    });
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
};
</script>
