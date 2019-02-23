"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Gallery =
/*#__PURE__*/
function () {
  function Gallery(el, postSrcs) {
    _classCallCheck(this, Gallery);

    this.DOM = {
      el: el
    };
    this.NAV = el.parentElement.getElementsByClassName('navigation')[0];
    this.postSrcs = postSrcs;
    this.posts = [];
    this.loadedCount = 0;
    this.loaded = false;
    this.reached = false;
    this.animating = false;
    this.index = 1;
    this.loadPosts = this.loadPosts.bind(this);
    this.showGallery = this.showGallery.bind(this);
    this.generatePost = this.generatePost.bind(this);
    this.displayPost = this.displayPost.bind(this);
    this.changePost = this.changePost.bind(this);
    this.loadPosts();
  }

  _createClass(Gallery, [{
    key: "loadPosts",
    value: function loadPosts() {
      var _this = this;

      //loads posts
      var postSrcs = this.postSrcs;
      postSrcs.forEach(function (src) {
        var img = new Image();
        img.src = src;

        _this.posts.push(img);

        img.onload = function () {
          _this.loadedCount += 1;

          if (_this.loadedCount === _this.postSrcs.length) {
            _this.loaded = true;

            _this.showGallery();
          }
        };
      });
    }
  }, {
    key: "displayGallery",
    value: function displayGallery() {
      console.log(this.reached, this.loaded);

      if (this.reached && this.loaded) {
        this.DOM.el.style.opacity = '1';
      }
    }
  }, {
    key: "showGallery",
    value: function showGallery() {
      var _this2 = this;

      //add posts to DOM
      this.posts.forEach(function (img) {
        var post = document.createElement('div');
        post.classList.add('post');
        post.appendChild(img);
      });
      this.DOM.el.appendChild(this.generatePost(this.posts[0]));
      this.DOM.el.appendChild(this.generatePost(this.posts[1]));
      this.DOM.el.appendChild(this.generatePost(this.posts[2]));
      var nav = this.NAV.querySelectorAll('.nav');
      nav[0].addEventListener('click', function () {
        _this2.changePost(-1);
      });
      nav[1].addEventListener('click', function () {
        _this2.changePost(1);
      });
      this.displayGallery();
    }
  }, {
    key: "changePost",
    value: function changePost(d) {
      var _this3 = this;

      if (this.animating) return;
      var newIndex = this.index + d;

      if (newIndex >= this.posts.length) {
        newIndex = 0;
      } else if (newIndex < 0) {
        newIndex = this.posts.length - 1;
      }

      this.index = newIndex;
      var loadingBar = this.NAV.querySelector('.loading-bar');
      loadingBar.classList.add('animating');
      this.animating = true;
      setTimeout(function () {
        loadingBar.classList.remove('animating');

        _this3.displayPost(d);

        _this3.animating = false;
      }, 800);
    }
  }, {
    key: "displayPost",
    value: function displayPost(d) {
      var currentPosts = this.DOM.el.children;
      var nextPost = this.index + d;

      if (nextPost >= this.posts.length) {
        nextPost = 0;
      } else if (nextPost < 0) {
        nextPost = this.posts.length - 1;
      }

      if (d > 0) {
        this.DOM.el.removeChild(currentPosts[0]); //append new post    to end of list

        this.DOM.el.appendChild(this.generatePost(this.posts[nextPost]));
      } else if (d < 0) {
        this.DOM.el.removeChild(currentPosts[2]);
        this.DOM.el.prepend(this.generatePost(this.posts[nextPost]));
      }
    }
  }, {
    key: "generatePost",
    value: function generatePost(img) {
      var post = document.createElement('div');
      post.classList.add('post');
      post.classList.add('current');
      post.appendChild(img);
      return post;
    }
  }]);

  return Gallery;
}();

var gallery_posts = ['https://i.imgur.com/akLELLk.jpg', 'https://i.pinimg.com/736x/3e/2e/8c/3e2e8c6fa626636eb4e8bdfe78edab3b--redhead-girl-beautiful-redhead.jpg', 'https://media.glamour.com/photos/5978ff1b73aedb63556f3a04/1:1/w_1683,h_1683,c_limit/dakota-johnson-beauty-river.jpg', 'https://profoto.azureedge.net/cdn/04a371f/contentassets/7784c9eed38149edb9a6029cede7a9ff/profoto-d2-rossella-vanon-final-setup-3-001.jpg', 'https://www.shutterbug.com/images/styles/600_wide/public/Promobl6618.jpg'];
var gallery_1 = new Gallery(document.getElementById('gallery-1'), gallery_posts);