import Experience from ".";
import objects from "./objects";

export default class DomEvents {
  constructor() {
    this.experience = new Experience();

    this.toggleView();
    this.renderObjects();
    this.dragEvent();
    this.centralizeCamera();
  }

  toggleView() {
    document.getElementById("visualizer").addEventListener("change", (e) => {
      this.viewOnly = e.target.checked;
      document.body.classList.toggle("view-only");
      this.experience.world.transformControl.controls.detach()
      this.experience.world.transformControl.toggle(this.viewOnly)
    })
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

  toggleDetail() {
    const display = !document.querySelector("#text-editor").checked && !!this.experience.world.objects.current ? "block" : "none";
    document.querySelector(".info__opener").style.display = display;
  }
}
