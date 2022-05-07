$("#game2048").on("scroll touchmove mousewheel", function (event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
});
