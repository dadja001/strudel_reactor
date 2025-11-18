function SettingsButtons({ exportSettings, importSettings }) {
    return (
        <div className="position-absolute top-0 end-0">
            <button
                className="btn btn-secondary me-2"
                onClick={exportSettings}
            >
                Export Settings
            </button>

            <input
                type="file"
                accept="application/json"
                id="settingsFileInput"
                style={{ display: "none" }}
                onChange={importSettings}
            />

            <button
                className="btn btn-secondary me-2"
                onClick={() => document.getElementById("settingsFileInput").click()}
            >
                Import Settings
            </button>
        </div>
    );
}

export default SettingsButtons;
