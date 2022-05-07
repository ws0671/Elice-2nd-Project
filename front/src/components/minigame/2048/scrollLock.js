$("#game2048").on("scroll touchmove mousewheel", (event) => {
  event.preventDefault();
  event.stopPropagation();
  return false;
});
