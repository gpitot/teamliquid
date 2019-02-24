"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Scroller =
/*#__PURE__*/
function () {
  function Scroller() {
    _classCallCheck(this, Scroller);

    this.points = [];
    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.handleScroll);
  }

  _createClass(Scroller, [{
    key: "addPoint",
    value: function addPoint(point) {
      /*
      {
          element : 
          removeOnReached : true/false,
          fn : function () {occurs when reached}
      }
      */
      point.offsetTop = point.element.getBoundingClientRect().top + window.pageYOffset;
      this.points.push(point); //.getBoundingClientRect().top + window.pageYOffset
      //order points by y point (REVERSE ORDER SO CAN REMOVE IN LOOP LATER)

      this.points = this.points.sort(function (a, b) {
        return point.offsetTop < b.offsetTop ? 1 : -1;
      });
      this.handleScroll();
    }
  }, {
    key: "handleScroll",
    value: function handleScroll(e) {
      var points = this.points;
      var offset = window.pageYOffset;

      if (points.length === 0) {
        window.removeEventListener('scroll', this.handleScroll);
      }

      for (var i = 0; i < points.length; i += 1) {
        //need this incase doc height has changed
        var point = points[i];
        var currentOffset = point.element.getBoundingClientRect().top + window.pageYOffset + window.innerHeight * points[i].offset;

        if (currentOffset > offset && currentOffset < offset + window.innerHeight) {
          console.log(currentOffset);
          point.fn();

          if (point.removeOnReached) {
            points.splice(i, 1);
          }
        }
      }
    }
  }]);

  return Scroller;
}();

var scroller = new Scroller();
var galleryEl = document.getElementById('gallery-1');
console.log(galleryEl);
scroller.addPoint({
  element: galleryEl,
  offset: 0.2,
  removeOnReached: true,
  fn: function fn() {
    gallery_1.reached = true;
    gallery_1.displayGallery();
  }
});
var headings = document.querySelectorAll('.heading');
var marginLeft = window.innerWidth > 1450 ? '-75px' : '0';
headings.forEach(function (heading) {
  scroller.addPoint({
    element: heading,
    offset: 0.25,
    removeOnReached: true,
    fn: function fn() {
      heading.style.opacity = "1";
      heading.style.marginLeft = marginLeft;
    }
  });
});
var bannerCopy = document.querySelector('.banner h1');
bannerCopy.style.opacity = "1";