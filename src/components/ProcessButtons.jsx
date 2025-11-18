// Buttons for preprocessing the song text
function ProcessButtons({ handleProcess, processAndPlay }) {
    return (
        <div className="text-center">
            {/* Preprocess only */}
            <button id="process" className="btn btn-outline-primary" onClick={handleProcess}>
                Preprocess
            </button>

            {/* Preprocess and immediately play */}
            <button id="process_play" className="btn btn-outline-primary" onClick={processAndPlay}>
                Process & Play
            </button>
        </div>
    );
}

export default ProcessButtons;