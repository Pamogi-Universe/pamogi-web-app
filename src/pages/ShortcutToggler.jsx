export default function ShortcutToggler() {
    return(
        <div>
            <label class="shortcut__opener" for="shortcut-toggler">?</label>
    <input class="shortcut__toggle" type="checkbox" name="shortcut-toggler" id="shortcut-toggler" />

    <div class="shortcut__modal">
      <label class="shortcut__modal-overlay" for="shortcut-toggler"></label>
      <div class="shortcut__modal-wrapper">
        <h2 class="shortcut__heading">
          Keyboard Shortcuts

          <label class="shortcut__closer" for="shortcut-toggler"></label>
        </h2>

        <div class="shortcut__body">
          <div class="shortcut__item">
            Toggle transform controls

            <span class="shortcut__key">T</span>
          </div>

          <div class="shortcut__item">
            Toggle rotate controls

            <span class="shortcut__key">R</span>
          </div>

          <div class="shortcut__item">
            Toggle scale controls

            <span class="shortcut__key">S</span>
          </div>

          <div class="shortcut__item">
            Snap to grid

            <span class="shortcut__key">Ctrl</span>
          </div>

          <div class="shortcut__item">
            Delete object

            <span class="shortcut__key">D</span>
          </div>

          <div class="shortcut__item">
            Increase control size

            <span class="shortcut__key">+</span>
          </div>

          <div class="shortcut__item">
            Decrease control size

            <span class="shortcut__key">-</span>
          </div>

          <div class="shortcut__item">
            Toggle X control

            <span class="shortcut__key">X</span>
          </div>

          <div class="shortcut__item">
            Toggle Y control

            <span class="shortcut__key">Y</span>
          </div>

          <div class="shortcut__item">
            Toggle Z control

            <span class="shortcut__key">Z</span>
          </div>

          <div class="shortcut__item">
            Enable/disable controls

            <span class="shortcut__key">Spacebar</span>
          </div>

          <div class="shortcut__item">
            Focus the selected object

            <span class="shortcut__key">F</span>
          </div>

          <div class="shortcut__item">
            Centralize the camera

            <span class="shortcut__key">Shift</span>
            <span class="shortcut__key">C</span>
          </div>

          <div class="shortcut__item">
            Reset current transform

            <span class="shortcut__key">Esc</span>
          </div>
        </div>
      </div>
    </div>

    <input class="info__toggle" type="checkbox" name="info-toggler" id="info-toggler" />
    <label class="info__opener" for="info-toggler"></label>

    <div class="info__wrapper">
      <h3 class="info__title">
        <span>Object title</span>
      </h3>
      <p class="info__description">
        Object description. Select an object to display its title and description here.
      </p>

      <div class="state"></div>

      <div class="info__footer">
        <label class="info__btn" for="info-modal">Edit</label>
        <label class="info__btn" for="info-toggler">Close</label>
      </div>
    </div>

    <input class="info__toggle" type="checkbox" name="info-modal" id="info-modal" />

    <div class="info__modal">
      <label class="info__modal-overlay" for="info-modal"></label>
      <div class="info__modal-wrapper">
        <h2 class="info__heading">
          Object Description

          <label class="info__closer" for="info-modal"></label>
        </h2>

        <div class="info__body">
          <input type="text" class="info__input title" placeholder="Enter title here" />

          <textarea cols="30" rows="10" class="info__input description" placeholder="Enter description here..."></textarea>

          <label class="info__submit" id="info-submit" for="info-modal">Save</label>
        </div>
      </div>
    </div>

    <div class="points"></div>
        </div>
    )
}