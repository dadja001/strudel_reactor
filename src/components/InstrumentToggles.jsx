// Component for toggling instruments and selecting synth sounds
function InstrumentToggles({ checkedInstruments, onChange, bassSound, onBassSoundChange, arpSound, onArpSoundChange, soundOptions }) {
    const handleChange = (event) => {
        const { id, checked } = event.target;
        onChange(id, checked);
    };

    return (
        <div>
            {/* Instrument On/Off Checkboxes */}
            <div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="bassline" checked={checkedInstruments.bassline} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="bassline">
                        bassline
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="main_arp" checked={checkedInstruments.main_arp} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="main_arp">
                        main_arp
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="drums" checked={checkedInstruments.drums} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="drums">
                        drums
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="drums2" checked={checkedInstruments.drums2} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="drums2">
                        drums2
                    </label>
                </div>
            </div>

            {/* Sound Selection Dropdowns */}
            <div className="row mt-3">
                <div className="col">
                    <h6 className="mb-2">Bassline Sound</h6>
                    <select
                        id="basslineSound"
                        className="form-select w-100"
                        value={bassSound}
                        onChange={(e) => onBassSoundChange(e.target.value)}
                    >
                        {soundOptions.map(name => (
                            <option key={name} value={name}>{name}</option>
                        ))}
                    </select>
                </div>

                <div className="col">
                    <h6 className="mb-2">Arp Sound</h6>
                    <select
                        id="arpSound"
                        className="form-select w-100"
                        value={arpSound}
                        onChange={(e) => onArpSoundChange(e.target.value)}
                    >
                        {soundOptions.map(name => (
                            <option key={name} value={name}>{name}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default InstrumentToggles;