function ObjectToggler() {
    return(
        <div>
                <input class="object__toggle" type="checkbox" name="object-toggler" id="object-toggler" />
    <label class="object__opener object--abs" for="object-toggler"></label>
    <aside class="object__wrapper object--abs">
      <h2 class="object__heading">
        Objects
        <label class="object__closer" for="object-toggler"></label>
      </h2>

      <div class="object__list">
        <div class="object__inner"></div>
      </div>
    </aside>
        </div>
    )
}

export default ObjectToggler