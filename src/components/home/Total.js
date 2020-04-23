import React from 'react';
import { Header, Segment, Statistic } from 'semantic-ui-react';
import * as d3 from "d3";

const Total = props => {

    const { total, days } = props;
    if (days.length !== 0) {
        const count = days.length;
        var svg = d3.select("#d3-30-days svg");

        var x = d3.scaleLinear()
            .domain([0, count - 1])
            .range([0, svg.node().getBoundingClientRect().width]);

        var y = d3.scaleLinear()
            .domain(d3.extent(days, (d, i) => {
                return d.total;
            }))
            .range([150, 0]);

        var line = d3.line()
            .x((d, i) => x(i))
            .y(d => y(d.total))
            .curve(d3.curveBasis);

        svg.append("path")
            .attr("class", "line plus")
            .attr("d", line(days));
        svg.append("linearGradient")
            .attr("id", "line-gradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", 0).attr("y1", y(-500))
            .attr("x2", 0).attr("y2", y(500))
            .selectAll("stop")
            .data([
                {offset: "0%", color: "#ff668c"},
                {offset: "100%", color: "#8ac9e2"}
            ])
            .enter()
            .append("stop")
            .attr("offset", d=>d.offset)
            .attr("stop-color", d=>d.color);
    }

    return (
        <>
            <Header as="h4" content="CASH" className="fade" />
            <Segment id="d3-30-days">
                <svg></svg>
                {/* total chart begins here */}

                {/* total chart ends here */}
                <Statistic color={total > 0 ? 'blue' : 'red'}>
                    <Statistic.Value>{total}$</Statistic.Value>
                </Statistic>
            </Segment>
        </>
    );
}

export default Total;