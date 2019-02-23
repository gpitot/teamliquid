"use strict";

(function () {
  var squadLetters = document.querySelector('.banner h1');
  var squadLettersSpans = squadLetters.querySelectorAll('span');
  squadLetters.addEventListener('mousemove', mouseMove);
  squadLetters.addEventListener('mouseout', mouseOut);
  console.log(squadLettersSpans);

  function mouseMove(e) {
    if (e.target.nodeName === 'SPAN') {
      clearLetters();
      e.target.classList.add('squad-hover');
    }
  }

  function mouseOut(e) {
    clearLetters();
  }

  function clearLetters() {
    squadLettersSpans.forEach(function (letter) {
      letter.classList.remove('squad-hover');
    });
  }
})();