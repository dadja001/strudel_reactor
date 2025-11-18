import { useEffect, useRef } from "react";
import * as d3 from "d3";

// D3 bar chart displaying gain/volume waveform
export default function GainGraph({ data }) {
    const svgRef = useRef();
    const maxBars = 50; // Maximum number of bars to display
    const margin = { top: 40, right: 20, bottom: 30, left: 40 };
    const height = 300;

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const width = svgRef.current.clientWidth;
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // Create main group and title only once
        let g = svg.select("g");
        if (g.empty()) {
            svg.selectAll("*").remove();
            g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

            // Y-axis group
            g.append("g").attr("class", "y-axis");

            // Chart title
            svg.append("text")
                .attr("class", "title")
                .attr("x", width / 2)
                .attr("y", margin.top / 2)
                .attr("text-anchor", "middle")
                .attr("font-size", "16px")
                .attr("font-weight", "bold")
                .text("Song Waveform/Gain");
        }

        // Show only the most recent bars
        const displayedData = data.slice(-maxBars);

        // X scale for bar positioning
        const xScale = d3
            .scaleBand()
            .domain(d3.range(displayedData.length))
            .range([0, innerWidth])
            .padding(0.1);

        // Y scale for bar height
        const maxGain = d3.max(displayedData, d => d.gain) || 1;
        const yScale = d3
            .scaleLinear()
            .domain([0, maxGain])
            .range([innerHeight, 0]);

        // Update Y-axis
        g.select(".y-axis").call(d3.axisLeft(yScale).ticks(5));

        // Bind data to bars
        const bars = g.selectAll("rect").data(displayedData, (_, i) => i);

        // Remove old bars
        bars.exit().remove();

        // Add new bars with animation
        bars.enter()
            .append("rect")
            .attr("x", (_, i) => xScale(i))
            .attr("width", xScale.bandwidth())
            .attr("y", innerHeight)
            .attr("height", 0)
            .attr("fill", "#000099")
            .merge(bars) // Merge with existing bars
            .transition()
            .duration(300)
            .attr("x", (_, i) => xScale(i))
            .attr("width", xScale.bandwidth())
            .attr("y", d => yScale(d.gain))
            .attr("height", d => innerHeight - yScale(d.gain));
    }, [data, margin.left, margin.right, margin.top, margin.bottom]);

    return <svg ref={svgRef} style={{ width: "100%", height: `${height}px` }} />;
}