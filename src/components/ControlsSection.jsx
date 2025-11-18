import { useRef, useState, useEffect } from "react";

// Controls section for CPS, volume, and music parameters
function ControlsSection({ CPS, onChange, volume, onVolumeChange, pattern, onPatternChange, bass, onBassChange, arp, onArpChange }) {
    const initialCPS = useRef(CPS);
    const [inputValue, setInputValue] = useState(CPS);

    // Handle CPS input with validation
    const handleCPSChange = e => {
        const val = e.target.value;
        setInputValue(val);

        const num = parseInt(val, 10);
        if (!isNaN(num) && num >= e.target.min && num <= e.target.max) {
            onChange(num);
        } else {
            alert("Minimum is 0, and Maximum is 400. Please enter a valid value within these parameters.");
        }
    };

    // Sync input value when CPS changes externally
    useEffect(() => {
        setInputValue(CPS.toString());
    }, [CPS]);

    // Reset CPS to initial value
    const reset = () => {
        setInputValue(initialCPS.current);
        onChange(initialCPS.current);
    }

    const handleVolumeChange = e => {
        const val = parseFloat(e.target.value);
        onVolumeChange(val);
    };

    const handlePatternChange = e => {
        const index = parseInt(e.target.value, 10);
        onPatternChange(index);
    };

    const handleBassChange = e => {
        const index = parseInt(e.target.value, 10);
        onBassChange(index);
    };

    const handleArpChange = e => {
        const index = e.target.value.toString();
        onArpChange(index);
    };

    return (
        <>
            {/* CPS Control */}
            <div className="mb-3">
                <div className="input-group">
                    <span className="input-group-text" id="cps_label">Set CPS</span>
                    <input
                        type="number"
                        className="form-control"
                        value={inputValue}
                        min="0"
                        max="400"
                        placeholder="CPS (cycles per second) e.g. 140"
                        onChange={handleCPSChange}
                    />
                    <button type="button" className="btn btn-outline-warning" onClick={reset}>Reset to Default</button>
                </div>
                <div className="d-flex justify-content-between">
                    <p className="text-muted small">Current Set Value: {CPS}</p>
                    <p className="text-muted small">Default: {initialCPS.current}</p>
                </div>
            </div>

            {/* Volume Control */}
            <div className="mb-3">
                <label htmlFor="volume_range" className="form-label">
                    Volume: {(volume * 100).toFixed(0)}%{volume === 0 ? " (MUTED)" : ""}
                </label>
                <div className="d-flex align-items-center">
                    <span className="me-2">Lower</span>
                    <input
                        type="range"
                        className="form-range flex-grow-1"
                        min="0"
                        max="2"
                        step="0.01"
                        id="volume_range"
                        value={volume}
                        onChange={handleVolumeChange}
                    />
                    <span className="ms-2">Higher</span>
                </div>
            </div>

            {/* Pattern, Arpeggiator, and Bass Complexity Controls */}
            <div className="mb-3 d-flex justify-content-between align-items-start">
                <div>
                    <h6>Pattern Complexity</h6>
                    <div className="d-flex" style={{ gap: '1.5rem' }}>
                        <label>
                            <input type="radio" name="pattern" value="0" checked={pattern === 0} onChange={handlePatternChange} /> Simple
                        </label>
                        <label>
                            <input type="radio" name="pattern" value="1" checked={pattern === 1} onChange={handlePatternChange} /> Moderate
                        </label>
                        <label>
                            <input type="radio" name="pattern" value="2" checked={pattern === 2} onChange={handlePatternChange} /> Complex
                        </label>
                    </div>
                </div>

                <div>
                    <h6>Arpeggiator</h6>
                    <div className="d-flex" style={{ gap: '1.5rem' }}>
                        <label>
                            <input type="radio" name="arp" value="arpeggiator1" checked={arp === "arpeggiator1"} onChange={handleArpChange} /> 1
                        </label>
                        <label>
                            <input type="radio" name="arp" value="arpeggiator2" checked={arp === "arpeggiator2"} onChange={handleArpChange} /> 2
                        </label>
                    </div>
                </div>

                <div>
                    <h6>Bassline Complexity</h6>
                    <div className="d-flex" style={{ gap: '1.5rem' }}>
                        <label>
                            <input type="radio" name="bass" value="0" checked={bass === 0} onChange={handleBassChange} /> Simple
                        </label>
                        <label>
                            <input type="radio" name="bass" value="1" checked={bass === 1} onChange={handleBassChange} /> Complex
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ControlsSection;