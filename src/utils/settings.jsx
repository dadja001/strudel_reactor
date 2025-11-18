export function exportSettings(settings) {
    const blob = new Blob([JSON.stringify(settings, null, 2)], {
        type: "application/json"
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "settings.json";
    a.click();

    URL.revokeObjectURL(url);
}

export function importSettings(event) {
    return new Promise((resolve, reject) => {
        const file = event.target.files[0];
        if (!file) return reject("No file selected");

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const loaded = JSON.parse(e.target.result);
                resolve(loaded); // resolve the loaded settings
            } catch (err) {
                reject(err);
            }
        };
        reader.readAsText(file);
    });
}