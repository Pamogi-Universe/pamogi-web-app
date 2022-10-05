import gsap from "gsap";
import Experience from ".";
import objects from "./objects";

export default class DomEvents {
  constructor() {
    this.__experience = new Experience();
    this.viewOnly = false;

    this.renderObjects();
    this.dragEvent();
    this.centralizeCamera();

    document.getElementById("visualizer").addEventListener("change", (e) => this.toggleView(e, true))
    document.getElementById("text-editor").addEventListener("change", (e) => this.toggleDetail(e, true))
    document.getElementById("info-modal").addEventListener("change", (e) => this.openEditModal(e))
    document.getElementById("info-submit").addEventListener("click", () => this.saveDetails())
    document.querySelectorAll(".state__item").forEach((val, id) => val.addEventListener("click", () => this.toggleModelState(id + 1)))
  }

  toggleView(e, triggered) {
    this.viewOnly = e.target.checked;
    document.body.classList.toggle("view-only");
    this.__experience.world.transformControl.controls.detach()
    this.__experience.world.transformControl.toggle(this.viewOnly)

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
        ${val.title ? `<h3>${val.title}</h3>` : ""}
        ${val.description ? `<p>${val.description}</p>` : ""}
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

          if (elementMouseIsOver === this.__experience.canvas) {
            if (!counter)
              this.__experience.world.loadModal(objects[id].name, objects[id].model, objects[id].type)
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
        gsap.to(this.__experience.camera.controls.target, {
          duration: 1,
          x: 0,
          y: 0,
          z: 0, // maybe adding even more offset depending on your model
          onUpdate: () => {
            // this.camera.instance.position.set(center.x, center.y + 5, center.z)
            // this.camera.instance.lookAt(center);
            // this.camera.controls.target.set(...center);
          }
        });
        // this.__experience.camera.controls.target.set(0, 0, 0)
        // this.__experience.camera.instance.position.set(- 3, 6, 6);
      }
    })
  }

  toggleDetail(e, triggered) {
    this.__experience.points.toggleDetail();

    if (triggered) {
      const visualizer = { target: document.querySelector("#visualizer") }
      visualizer.target.checked = !e.target.checked
      this.toggleView(visualizer)
    }
  }

  openEditModal(e) {
    if (e.target.checked) {
      const point = this.__experience.points.current;
      document.querySelector(".info__input.title").value = point?.title;
      document.querySelector(".info__input.description").value = point?.description;
    }
  }

  saveDetails() {
    const point = this.__experience.points.current;

    point.title = document.querySelector(".info__input.title").value;
    point.description = document.querySelector(".info__input.description").value
    document.querySelector(point.element).setAttribute("data-title", point.title);

    document.querySelector(".info__title span").textContent = point.title || "Enter your title";
    document.querySelector(".info__description").textContent = point.description || "Enter your description";

    this.__experience.points.instance.map(val => {
      if (val.id === point.id) {
        val.title = point.title;
        val.description = point.description;
      }
      return val;
    })
  }

  toggleModelState(id) {
    const point = this.__experience.points.current;
    this.__experience.world.disposeCurrentModel()
    this.__experience.world.loadModal(`Tree${id}`,`/models/Tree${id}.glb`, point.position, point)
  }
}
