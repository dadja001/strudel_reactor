// Processes song text by replacing placeholders with actual values
export const processSongText = (
    songText,
    checkedInstruments,
    CPS,
    volumeMultiplier,
    patternIndex,
    bassIndex,
    arpeggiator,
    basslineSound,
    arpSound
) => {
    let processed = songText;

    // Replace instrument placeholders with "_" (off) or "" (on)
    for (const [instrument, isChecked] of Object.entries(checkedInstruments)) {
        const placeholder = `&${instrument.toUpperCase()}&`;
        const replacement = isChecked ? "" : "_"; // unchecked = "_", checked = ""
        processed = processed.replaceAll(placeholder, replacement);
    }

    // Replace CPS (cycles per second / tempo)
    if (processed.includes("&CPS&")) {
        processed = processed.replaceAll("&CPS&", CPS);
    }

    // Replace pattern complexity index
    if (processed.includes("&PATTERN_INDEX&")) {
        processed = processed.replaceAll("&PATTERN_INDEX&", patternIndex);
    }

    // Replace bass complexity index
    if (processed.includes("&BASS_INDEX&")) {
        processed = processed.replaceAll("&BASS_INDEX&", bassIndex);
    }

    // Replace arpeggiator selection
    if (processed.includes("&ARP_PLAYED&")) {
        processed = processed.replaceAll("&ARP_PLAYED&", arpeggiator);
    }

    // Replace sound selections
    if (processed.includes("&BASS_SOUND&")) {
        processed = processed.replaceAll("&BASS_SOUND&", basslineSound);
    }
    if (processed.includes("&ARP_SOUND&")) {
        processed = processed.replaceAll("&ARP_SOUND&", arpSound);
    }

    // Multiply all numbers in the gain_patterns array by volume multiplier
    processed = processed.replace(
        /const\s+gain_patterns\s*=\s*\[([\s\S]*?)\]/,
        (match, content) => {
            const newContent = content.replace(/[\d.]+/g, num => {
                return parseFloat(num) * volumeMultiplier;
            });
            return `const gain_patterns = [${newContent}]`;
        }
    );

    // Multiply hardcoded .gain() values (except those using pick(gain_patterns))
    processed = processed.replace(/\.gain\(([\d.]+)\)/g, (match, num) => {
        return match.includes("pick(gain_patterns")
            ? match
            : `.gain(${parseFloat(num) * volumeMultiplier})`;
    });

    return processed;
};