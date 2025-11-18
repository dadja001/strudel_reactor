import './App.css';
import { useState, useEffect, useRef, useCallback } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick, getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch from './console-monkey-patch';

import { processSongText } from "./utils/preprocess";
import { exportSettings, importSettings } from "./utils/settings";

import PreprocessTextArea from './components/PreprocessTextArea';
import ProcessButtons from './components/ProcessButtons';
import PlayButtonsGroup from './components/PlayButtonsGroup';
import ControlsSection from './components/ControlsSection';
import InstrumentToggles from './components/InstrumentToggles';
import SettingsButtons from './components/SettingsButtons';
import GainGraph from './components/D3Graph';

let globalEditor = null;

export default function StrudelDemo() {
    const hasRun = useRef(false);

    const [d3Data, setD3Data] = useState([]);

    const handleD3Data = (event) => {
        // take last 50 entries to avoid excessive speed/repetition
        const recentLogs = event.detail.slice(-50);

        const parsed = recentLogs.map(line => {
            const gainMatch = line.match(/gain:([0-9.]+)/);
            return {
                raw: line,
                gain: gainMatch ? parseFloat(gainMatch[1]) : 0
            };
        });

        setD3Data(parsed);
    };

    const soundOptions = [
        "supersaw",
        "sine",
        "square",
        "triangle",
        "pulse",
        "organ",
        "piano",
    ];

    // Initial/default values
    const initialCPS = 140;
    const initialPatternIndex = 0;
    const initialBassIndex = 0;
    const initialArpeggiator = "arpeggiator1";
    const initialSound = "supersaw";

    // States
    const [songText, setSongText] = useState(stranger_tune);
    const [checkedInstruments, setCheckedInstruments] = useState({
        bassline: true,
        main_arp: true,
        drums: true,
        drums2: true
    });
    const [CPS, setCPS] = useState(initialCPS);
    const [volumeMultiplier, setVolumeMultiplier] = useState(1);
    const [patternIndex, setPatternIndex] = useState(initialPatternIndex);
    const [bassIndex, setBassIndex] = useState(initialBassIndex);
    const [arpeggiator, setArpeggiator] = useState(initialArpeggiator);
    const [basslineSound, setBasslineSound] = useState(initialSound);
    const [arpSound, setArpSound] = useState(initialSound);

    // Starts the REPL
    const handlePlay = useCallback(() => {
        if (globalEditor) globalEditor.evaluate();
    }, []);

    // Stops the REPL
    const handleStop = useCallback(() => {
        if (globalEditor) globalEditor.stop();
    }, []);

    const handleInstrumentChange = useCallback((instrument, checked) => {
        setCheckedInstruments(prev => ({
            ...prev,
            [instrument]: checked
        }));
    }, []);

    const runPreprocessing = useCallback(() => {
        return processSongText(
            songText,
            checkedInstruments,
            CPS,
            volumeMultiplier,
            patternIndex,
            bassIndex,
            arpeggiator,
            basslineSound,
            arpSound
        );
    }, [songText, checkedInstruments, CPS, volumeMultiplier, patternIndex, bassIndex, arpeggiator, basslineSound, arpSound]);

    const handleProcess = useCallback(() => {
        if (globalEditor) {
            const processedText = runPreprocessing();
            globalEditor.setCode(processedText);
        }
    }, [runPreprocessing]);

    const processAndPlay = useCallback(() => {
        handleProcess();
        handlePlay();
    }, [handleProcess, handlePlay]);

    const settings = {
        CPS,
        volume: volumeMultiplier,
        pattern: patternIndex,
        bass: bassIndex,
        arp: arpeggiator,
        bassSound: basslineSound,
        arpSound: arpSound,
        checkedInstruments,
    };

    // Wrap export and alert
    const handleExportSettings = () => {
        exportSettings(settings);
        alert("Settings exported successfully!");
    };

    // Wrap import to update state and alert
    const handleImportSettings = async (event) => {
        try {
            const loaded = await importSettings(event);
            if (loaded.CPS !== undefined) setCPS(loaded.CPS);
            if (loaded.volume !== undefined) setVolumeMultiplier(loaded.volume);
            if (loaded.pattern !== undefined) setPatternIndex(loaded.pattern);
            if (loaded.bass !== undefined) setBassIndex(loaded.bass);
            if (loaded.arp !== undefined) setArpeggiator(loaded.arp);
            if (loaded.bassSound !== undefined) setBasslineSound(loaded.bassSound);
            if (loaded.arpSound !== undefined) setArpSound(loaded.arpSound);
            if (loaded.checkedInstruments) setCheckedInstruments(loaded.checkedInstruments);

            alert("Settings imported successfully!");
        } catch (err) {
            console.error(err);
            alert("Invalid settings file.");
        }
    };

    useEffect(() => {
        if (!hasRun.current) {
            document.addEventListener("d3Data", handleD3Data);
            console_monkey_patch();

            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2];

            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick();
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });

            hasRun.current = true;
        }

        if (globalEditor) {
            globalEditor.setCode(songText);
        }
    }, [songText]);

    return (
        <div>
            <div className="position-relative mt-2 mb-3">
                <h2 className="text-center">Audio Preprocessor and Player</h2>
                <SettingsButtons exportSettings={handleExportSettings} importSettings={handleImportSettings} />
            </div>

            <hr />

            <main>
                <div className="container-fluid">

                    {/* PROCESS + PLAY */}
                    <div className="row mb-3">
                        <div className="col-3">
                            <h3 className="text-center">Process</h3>
                            <ProcessButtons
                                handleProcess={handleProcess}
                                processAndPlay={processAndPlay}
                            />

                            <h3 className="text-center mt-3">Play</h3>
                            <PlayButtonsGroup onPlay={handlePlay} onStop={handleStop} />
                        </div>

                        <div className="col-5">
                            <h3 className="text-center">Controls</h3>
                            <ControlsSection
                                CPS={CPS} onChange={setCPS}
                                volume={volumeMultiplier} onVolumeChange={setVolumeMultiplier}
                                pattern={patternIndex} onPatternChange={setPatternIndex}
                                bass={bassIndex} onBassChange={setBassIndex}
                                arp={arpeggiator} onArpChange={setArpeggiator}
                            />
                        </div>

                        <div className="col-4">
                            <h3 className="text-center">Toggle Instruments</h3>
                            <InstrumentToggles
                                checkedInstruments={checkedInstruments} onChange={handleInstrumentChange}
                                bassSound={basslineSound} onBassSoundChange={setBasslineSound}
                                arpSound={arpSound} onArpSoundChange={setArpSound}
                                soundOptions={soundOptions}
                            />
                        </div>
                    </div>

                    {/* D3 GRAPH */}
                    <div className="border border-primary m-3">
                        <GainGraph data={d3Data} />
                    </div>

                    {/* TEXT AREA + REPL */}
                    <div className="row">
                        <div className="col-6">
                            <h3 className="text-center">Preprocess Editable Area</h3>
                            <PreprocessTextArea
                                defaultValue={songText}
                                onChange={e => setSongText(e.target.value)}
                            />
                        </div>

                        <div className="col-6">
                            <h3 className="text-center">Strudel REPL</h3>
                            <div style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                                <div id="editor" />
                                <div id="output" />
                            </div>
                        </div>
                    </div>

                    <canvas id="roll"></canvas>
                </div>
            </main>
        </div>
    );
}
