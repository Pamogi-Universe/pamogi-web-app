function Visualizer() {

    return(
        <div>
            <input type="checkbox" name="visualizer" id="visualizer" />
            <label className="visualizer" for="visualizer" title="Toggle View/Edit"></label>
            <input type="checkbox" name="text-editor" id="text-editor" checked />
            <label className="text__editor" for="text-editor" title="Toggle Text Edit/View Only"></label>
        </div>

    )


}

export default Visualizer