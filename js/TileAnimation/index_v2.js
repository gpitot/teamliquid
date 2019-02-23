"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TileAnimation =
/*#__PURE__*/
function () {
  function TileAnimation(el, postSrcs) {
    _classCallCheck(this, TileAnimation);

    this.loadedCount = 0;
    this.images = [];
    this.index = 0;
    this.postSrcs = postSrcs;
    this.DOM = {
      el: el
    };
    this.animationTime = 800;
    this.resizeCanvas = this.resizeCanvas.bind(this);
    this.changeImages = this.changeImages.bind(this);
    this.resizeCanvas();
    this.loadPosts();
    this.DOM.el.addEventListener('click', this.changeImages);
    window.addEventListener('resize', this.resizeCanvas);
  }

  _createClass(TileAnimation, [{
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
    key: "resizeCanvas",
    value: function resizeCanvas() {
      this.DOM.width = this.DOM.el.getBoundingClientRect().width;
      this.DOM.height = window.innerHeight - (this.DOM.el.getBoundingClientRect().top + window.pageYOffset);
      this.DOM.el.style.maxHeight = this.DOM.height + 'px';
    }
  }, {
    key: "changeImages",
    value: function changeImages() {
      var _this2 = this;

      this.index += 1;

      if (this.index >= this.images.length) {
        this.index = 0;
      }

      var el = this.DOM.el;

      for (var i = 0; i < el.children.length; i++) {
        el.children[i].style.transform = "scale(0)";
      }

      setTimeout(function () {
        while (el.firstChild) {
          el.removeChild(el.firstChild);
        }

        _this2.startAnimation();
      }, this.animationTime);
    }
  }, {
    key: "startAnimation",
    value: function startAnimation() {
      var imageSrc = this.postSrcs[this.index];
      var image = this.images[this.index];
      var _this$DOM = this.DOM,
          el = _this$DOM.el,
          width = _this$DOM.width,
          height = _this$DOM.height;
      var numColumns = 25;
      var squareSize = width / numColumns;
      var numRows = Math.ceil(height / squareSize); //for each col/ row make a div in it with correct layout
      //set background-position
      //then set scale to 1

      var x = 0;
      var y = 0;

      function drawTile() {
        if (x >= numColumns) {
          x = 0;
          y += 1;
        }

        if (y >= numRows) {
          setTimeout(function () {
            animate();
          }, 500);
          return;
        }

        ;
        var square = document.createElement('div');
        square.classList.add('square');
        square.style.backgroundImage = "url(".concat(imageSrc, ")");
        square.style.height = squareSize + 'px';
        square.style.width = squareSize + 'px';
        square.style.backgroundPositionX = -(x * squareSize) + 'px';
        square.style.backgroundPositionY = -(y * squareSize) + 'px';
        square.style.backgroundSize = width + 'px';
        el.appendChild(square);
        x += 1;
        drawTile();
      }

      drawTile();

      function animate() {
        for (var i = 0; i < el.children.length; i++) {
          el.children[i].style.transform = "scale(1)";
        }
      }
    }
  }]);

  return TileAnimation;
}();

var posts = ['images/interactive/surf.jpeg', 'images/interactive/surf2.jpeg', 'images/interactive/lake.jpeg', 'images/interactive/mountain.jpeg', 'images/interactive/mountain2.jpeg', 'images/interactive/doubleliftheader.png'];
var tileAnim = new TileAnimation(document.getElementById('interactive-banner'), posts);