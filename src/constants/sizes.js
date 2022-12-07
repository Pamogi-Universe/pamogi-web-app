const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  aspect: function () {
    return this.width / this.height
  }
}

export default sizes