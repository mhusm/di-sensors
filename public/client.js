var app = new Vue({
  el: '#app',
  data: {
    acceleration: { x: 0, y: 0, z: 0 },
    orientation: { alpha: 0, beta: 0, gamma: 0 },
    shakeCounter: 0
  },
  watch: {


  },
  methods: {
    deviceMotionHandler: function (event) {
      this.acceleration.x = Math.round(event.acceleration.x * 10) / 10;
      this.acceleration.y = Math.round(event.acceleration.y * 10) / 10;
      this.acceleration.z = Math.round(event.acceleration.z * 10) / 10;
 //     console.log(event);
    },
    deviceOrientationHandler: function (event) {
      this.orientation.alpha = Math.round(event.alpha * 10) / 10;
      this.orientation.beta = Math.round(event.beta * 10) / 10;
      this.orientation.gamma = Math.round(event.gamma * 10) / 10;
 //     console.log(event);
    },

    handleShake: function (event) {
      this.shakeCounter ++;
   //   console.log(event);
    },

    handleClick: function() {
      window.navigator.vibrate([200, 100, 200]);
    }
  },
  mounted: function () {

    // https://developers.google.com/web/fundamentals/native-hardware/device-orientation/
    // https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', this.deviceMotionHandler.bind(this));
    } else {
      console.log("DeviceMotionEvent not supported")
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', this.deviceOrientationHandler.bind(this));
    } else {
      console.log("DeviceOrientationEvent not supported")
    }

    let myShakeEvent = new Shake({
      threshold: 8, // optional shake strength threshold
      timeout: 500 // optional, determines the frequency of event generation
    });

    myShakeEvent.start();

    window.addEventListener('shake', this.handleShake.bind(this), false);

  }

});
