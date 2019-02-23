"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TileAnimation =
/*#__PURE__*/
function () {
  function TileAnimation(canvas, postSrcs) {
    _classCallCheck(this, TileAnimation);

    this.loadedCount = 0;
    this.images = [];
    this.index = 0;
    this.postSrcs = postSrcs;
    this.DOM = {
      canvas: canvas
    };
    this.DOM.ctx = canvas.getContext('2d');
    this.resizeCanvas = this.resizeCanvas.bind(this);
    this.resizeCanvas();
    this.loadPosts();
    window.addEventListener('resize', this.resizeCanvas);
  }

  _createClass(TileAnimation, [{
    key: "resizeCanvas",
    value: function resizeCanvas() {
      this.DOM.canvas.width = window.innerWidth;
      this.DOM.canvas.height = window.innerHeight - (this.DOM.canvas.getBoundingClientRect().top + window.pageYOffset);
    }
  }, {
    key: "loadPosts",
    value: function loadPosts() {
      var _this = this;

      //loads posts
      var postSrcs = this.postSrcs;
      postSrcs.forEach(function (src) {
        var img = new Image();
        img.src = src;

        _this.images.push(img);

        img.onload = function () {
          _this.loadedCount += 1;

          if (_this.loadedCount === _this.postSrcs.length) {
            _this.startAnimation();
          }
        };
      });
    }
  }, {
    key: "startAnimation",
    value: function startAnimation() {
      var image = this.images[this.index];
      var _this$DOM = this.DOM,
          canvas = _this$DOM.canvas,
          ctx = _this$DOM.ctx;
      var numColumns = 25;
      var squareSizeCanvas = canvas.width / numColumns;
      var numRows = canvas.height / squareSizeCanvas;
      var ratio = canvas.width / image.width;
      var imageScaledHeight = image.height / ratio;
      var squareSizeImage = squareSizeCanvas / ratio; //ctx.drawImage(image, 0, 0, image.width, imageScaledHeight, 0, 0, canvas.width, canvas.height);

      var x = 0;
      var y = 0;

      function drawTile() {
        console.log(x);

        if (x >= numColumns) {
          x = 0;
          y += 1;
        }

        if (y >= numRows) {
          return;
        }

        ctx.drawImage(image, x * squareSizeImage, y * squareSizeImage, (x + 1) * squareSizeImage, (y + 1) * squareSizeImage, x * squareSizeCanvas, y * squareSizeCanvas, (x + 1) * squareSizeCanvas, (y + 1) * squareSizeCanvas);
        x += 1;
        requestAnimationFrame(function () {
          drawTile();
        });
      }

      drawTile();
    }
  }]);

  return TileAnimation;
}();

var posts = ['images/interactive/surf.jpeg']; //const tileAnim = new TileAnimation(document.getElementById('banner-canvas'), posts);