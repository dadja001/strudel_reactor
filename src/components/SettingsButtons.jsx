// Buttons for exporting/importing settings as JSON
function SettingsButtons({ exportSettings, importSettings }) {
    return (
        <div className="position-absolute top-0 end-0">
            {/* Export settings to file */}
            <button
                className="btn btn-secondary me-2"
                onClick={exportSettings}
            >
                Export Settings
            </button>

            {/* Hidden file input for importing */}
            <input
                type="file"
                accept="application/json"
                id="settingsFileInput"
                style={{ display: "none" }}
                onChange={importSettings}
            />

            {/* Import settings from file */}
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