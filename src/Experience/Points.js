export default class Points {
  constructor() {
    this.instance = [];
  }

  push(val) {
    document.querySelector(".points").innerHTML += `
      <div class="point point-${val.id}" title="Click to see description" data-title="${val.title ?? ""}"></div>`
    // <span class="label">o</span>
    // <p class="text">${val.title}</p>

    this.instance.push({ ...val, element: `.point-${val.id}` });

    this.click();
  }

  delete(object) {
    this.instance = this.instance.filter(val => {
      if (val.id !== object.userData.key) return val;
      document.querySelector(val.element).remove();
      return "";
    })
    this.current = null
  }

  triggerClick(element) {
    document.querySelector(element).click();
  }

  click() {
    for (const point of this.instance) {
      document.querySelector(point.element).addEventListener("click", (e) => {
        for (const current of this.instance) {
          current.isCurrent = false;
        }
        point.isCurrent = true;
        this.current = point;
        this.toggleDetail();

        // console.log("set point")

        document.querySelector(".info__toggle").checked = true
        document.querySelector(".info__title span").textContent = point.title || "Enter your title";
        document.querySelector(".info__description").textContent = point.description || "Enter your description";

        const display = point.states ? "flex" : "none";
        document.querySelector(".state").style.display = display;
      })
    }
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

  toggleDetail() {
    const pointLength = this.instance.filter(val => val.isCurrent)
    const classType = !document.getElementById("text-editor").checked && !!pointLength.length ? "add" : "remove";
    document.querySelector(".info__opener").classList[classType]("active");
    document.querySelector(".info__wrapper").classList[classType]("active");
  }
}
