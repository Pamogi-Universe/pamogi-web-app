export default class Points {
  constructor() {
    this.instance = [];
  }

  push(val) {
    document.querySelector(".points").innerHTML += `
      <div class="point point-${val.id}" data-title="${val.title}"></div>`
    // <span class="label">o</span>
    // <p class="text">${val.title}</p>
    this.instance.push({ ...val, element: `.point-${val.id}` });
  }

  delete(object) {
    this.instance = this.instance.filter(val => {
      if (val.id !== object.dataKey) return val;
      document.querySelector(val.element).remove();
      return "";
    })
  }

  update(camera, sizes) {
    for (const point of this.instance) {
      const screenPosition = point.position.clone()
      screenPosition.project(camera);

      const translateX = screenPosition.x * sizes.width * 0.5;
      const translateY = - screenPosition.y * sizes.height * 0.5;

      document.querySelector(point.element).style.transform = `translateX(${translateX}px) translateY(${translateY}px)`

      if (camera.position.distanceTo(point.position) >= 20) {
        document.querySelector(point.element).classList.add("away");
      } else {
        document.querySelector(point.element).classList.remove("away");
      }
    }
  }
}
