# Audio Preprocessor and Player

A React-based music application that uses Strudel (a live coding music environment) to preprocess and play audio patterns with customizable instruments and parameters.

## Important Notes

- **Browser Focus Required**: The song may lag or stop playing when the browser tab or window is not focused. This is due to browser performance throttling of background tabs.
- **Refresh May Be Needed**: If playback becomes unresponsive or behaves unexpectedly, try refreshing or reloading the page to reset the audio context.

## Video
[View Video](https://youtu.be/xb-T_XKpUIk)

---

## Controls Overview

### Settings Buttons (Top Right)

#### Export Settings
- **Purpose**: Downloads your current configuration as a JSON file
- **What it saves**: CPS, volume, pattern complexity, bass complexity, arpeggiator selection, sound choices, and instrument toggles
- **Use case**: Save your favorite configurations to load later or share with others

#### Import Settings
- **Purpose**: Loads a previously saved settings JSON file
- **How to use**: Click the button, select a `settings.json` file from your computer
- **Effect**: Instantly applies all saved settings to the application

---

### Process Buttons

#### Preprocess
- **Purpose**: Processes the raw song text and updates the Strudel REPL editor
- **What it does**: Replaces all placeholders (like `&CPS&`, `&BASS_SOUND&`, etc.) with your selected values
- **When to use**: After making changes to controls or the text area, before playing

#### Process & Play
- **Purpose**: Combines preprocessing and playback in one action
- **What it does**: First preprocesses the song text, then immediately starts playing
- **When to use**: Quick workflow to hear your changes instantly

---

### Play Buttons

#### Play
- **Purpose**: Starts playback of the current code in the Strudel REPL
- **Note**: Only plays whatever is currently in the REPL editor (you may need to preprocess first)

#### Stop
- **Purpose**: Stops all audio playback immediately

---

### Controls Section

#### Set CPS (Cycles Per Second)
- **Range**: 0-400
- **Default**: 140
- **Purpose**: Controls the tempo/speed of the music
- **Effect**: Higher values = faster tempo, lower values = slower tempo
- **Reset Button**: Returns CPS to the default value of 140

#### Volume
- **Range**: 0% - 200%
- **Default**: 100%
- **Purpose**: Adjusts the overall volume/gain of all instruments
- **Effect**: Multiplies all gain values in the song
- **Note**: 0% mutes all audio, 200% doubles the volume

#### Pattern Complexity
- **Options**: Simple / Moderate / Complex
- **Purpose**: Selects different melodic pattern variations
- **Effect**: Changes the `&PATTERN_INDEX&` placeholder (0, 1, or 2)

#### Arpeggiator
- **Options**: 1 / 2
- **Purpose**: Switches between two different arpeggiator patterns
- **Effect**: Changes the `&ARP_PLAYED&` placeholder (arpeggiator1 or arpeggiator2)

#### Bassline Complexity
- **Options**: Simple / Complex
- **Purpose**: Chooses between two bassline pattern variations
- **Effect**: Changes the `&BASS_INDEX&` placeholder (0 or 1)

---

### Toggle Instruments

#### Instrument Checkboxes
- **Available Instruments**: bassline, main_arp, drums, drums2
- **Purpose**: Enable or disable individual instruments in the mix
- **Effect**: 
  - Checked = instrument plays (placeholder replaced with empty string)
  - Unchecked = instrument is silenced (placeholder replaced with `_`)

#### Bassline Sound
- **Options**: supersaw, sine, square, triangle, pulse, organ, piano
- **Purpose**: Selects the synthesizer sound for the bassline
- **Effect**: Changes the `&BASS_SOUND&` placeholder

#### Arp Sound
- **Options**: supersaw, sine, square, triangle, pulse, organ, piano
- **Purpose**: Selects the synthesizer sound for the arpeggiator
- **Effect**: Changes the `&ARP_SOUND&` placeholder

---

### Waveform Graph

- **Purpose**: Visual representation of the song's gain/volume over time
- **Display**: Shows the most recent 50 bars of audio data
- **Updates**: Real-time as the song plays

---

### Text Areas

#### Preprocess Editable Area (Left)
- **Purpose**: Raw song code with placeholders that you can edit
- **Placeholders**: Special markers like `&CPS&`, `&BASS_SOUND&`, `&BASSLINE&`, etc.
- **Editing**: You can modify the code structure, add patterns, or change sequences
- **Note**: Changes here require preprocessing before they take effect

#### Strudel REPL (Right)
- **Purpose**: The actual code that gets executed by Strudel
- **Content**: Shows the processed version after placeholders are replaced
- **Auto-generated**: Automatically updated when you click "Preprocess" or "Process & Play"
- **Note**: This is what actually plays when you hit the Play button

---

## Typical Workflow

1. **Adjust Controls**: Set your desired CPS, volume, pattern complexity, etc.
2. **Toggle Instruments**: Enable/disable instruments as desired
3. **Select Sounds**: Choose synth sounds for bass and arp
4. **Edit Text** (optional): Modify the raw song code if desired
5. **Process & Play**: Click to preprocess and start playback
6. **Stop**: Click Stop when finished
7. **Save Settings** (optional): Export your configuration for later use

---

## Troubleshooting

- **No Sound**: Check that volume is not at 0% and at least one instrument is enabled
- **Playback Stops**: Bring the browser tab back into focus; consider refreshing the page
- **Changes Not Heard**: Make sure to click "Preprocess" or "Process & Play" after making changes
- **Invalid CPS Error**: Ensure CPS value is between 0 and 400
