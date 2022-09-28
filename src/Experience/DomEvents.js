import Experience from ".";
import objects from "./objects";

export default class DomEvents {
  constructor() {
    this.experience = new Experience();

    this.renderObjects();
    this.dragEvent();
    this.centralizeCamera();

    document.getElementById("visualizer").addEventListener("change", (e) => this.toggleView(e, true))
    document.getElementById("text-editor").addEventListener("change", (e) => this.toggleDetail(e, true))
    document.getElementById("info-modal").addEventListener("change", (e) => this.openEditModal(e))
    document.getElementById("info-submit").addEventListener("click", () => this.saveDetails())
  }

  toggleView(e, triggered) {
    this.viewOnly = e.target.checked;
    document.body.classList.toggle("view-only");
    this.experience.world.transformControl.controls.detach()
    this.experience.world.transformControl.toggle(this.viewOnly)

    if (triggered) {
      const textEditor = { target: document.querySelector("#text-editor") }
      textEditor.target.checked = !e.target.checked
      this.toggleDetail(textEditor)
    }
  }

  renderObjects() {
    document.querySelector(".object__list").innerHTML = '';
    document.querySelector(".object__heading").setAttribute("data-limit", `(${objects.length})`)

    objects.forEach((val, id) => {
      document.querySelector(".object__list").innerHTML += `
        <div class="object__item">
          <img class="object__img" src="${val.url}" alt="${val.name}">
        </div>
    `
    })
  }

  dragEvent() {
    let counter = 0;
    document.querySelectorAll(".object__img").forEach((element, id) => {
      element.addEventListener("dragend", (e) => {
        const mouseMove = (e) => {
          const x = e.clientX, y = e.clientY,
            elementMouseIsOver = document.elementFromPoint(x, y);

          if (elementMouseIsOver === this.experience.canvas) {
            if (!counter)
              this.experience.world.loadModal(objects[id].name, objects[id].model, objects[id].type)
            counter++
          }
        }

        window.addEventListener("mousemove", mouseMove);
        setTimeout(() => {
          window.removeEventListener("mousemove", mouseMove);
          counter = 0;
        }, 50);
      })
    });
  }

  centralizeCamera() {
    window.addEventListener("keydown", (e) => {
      if (e.shiftKey && e.code === "KeyC") {
        this.experience.camera.instance.controls.target.set(0, 0, 0)
      }
    })
  }

  toggleDetail(e, triggered) {
    if (!e.target.checked) this.experience.points.current = null;

    this.experience.points.toggleDetail();

    if (triggered) {
      const visualizer = { target: document.querySelector("#visualizer") }
      visualizer.target.checked = !e.target.checked
      this.toggleView(visualizer)
    }
  }

  openEditModal(e) {
    if (e.target.checked) {
      const point = this.experience.points.current;
      document.querySelector(".info__input.title").value = point.title;
      document.querySelector(".info__input.description").value = point.description;
    }
  }

  saveDetails() {
    const point = this.experience.points.current;

    point.title = document.querySelector(".info__input.title").value;
    point.description = document.querySelector(".info__input.description").value
    document.querySelector(point.element).setAttribute("data-title", point.title);

    document.querySelector(".info__title span").textContent = point.title || "Enter your title";
    document.querySelector(".info__description").textContent = point.description || "Enter your description";

    this.experience.points.instance.map(val => {
      if (val.id === point.id) {
        val.title = point.title;
        val.description = point.description;
      }
      return val;
    })
  }
}
