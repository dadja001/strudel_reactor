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

    // Replace instrument placeholders
    for (const [instrument, isChecked] of Object.entries(checkedInstruments)) {
        const placeholder = `&${instrument.toUpperCase()}&`;
        const replacement = isChecked ? "" : "_"; // unchecked = "_", checked = ""
        processed = processed.replaceAll(placeholder, replacement);
    }

    // Replace CPS
    if (processed.includes("&CPS&")) {
        processed = processed.replaceAll("&CPS&", CPS);
    }

    // Replace Pattern
    if (processed.includes("&PATTERN_INDEX&")) {
        processed = processed.replaceAll("&PATTERN_INDEX&", patternIndex);
    }

    // Replace Bass
    if (processed.includes("&BASS_INDEX&")) {
        processed = processed.replaceAll("&BASS_INDEX&", bassIndex);
    }

    // Replace Arpeggiator
    if (processed.includes("&ARP_PLAYED&")) {
        processed = processed.replaceAll("&ARP_PLAYED&", arpeggiator);
    }

    // Replace Sounds
    if (processed.includes("&BASS_SOUND&")) {
        processed = processed.replaceAll("&BASS_SOUND&", basslineSound);
    }
    if (processed.includes("&ARP_SOUND&")) {
        processed = processed.replaceAll("&ARP_SOUND&", arpSound);
    }

    // Multiply gain_patterns numbers
    processed = processed.replace(
        /const\s+gain_patterns\s*=\s*\[([\s\S]*?)\]/,
        (match, content) => {
            const newContent = content.replace(/[\d.]+/g, num => {
                return parseFloat(num) * volumeMultiplier;
            });
            return `const gain_patterns = [${newContent}]`;
        }
    );

    // Multiply hardcoded .gain(NUM)
    processed = processed.replace(/\.gain\(([\d.]+)\)/g, (match, num) => {
        return match.includes("pick(gain_patterns")
            ? match
            : `.gain(${parseFloat(num) * volumeMultiplier})`;
    });

    return processed;
};