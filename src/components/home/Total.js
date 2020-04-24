import React, { useEffect } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import * as d3 from "d3";

const Total = props => {

    const { total, days } = props;

    useEffect(() => {
        if (days.length > 0) {
            const count = days.length;
            var svg = d3.select("#d3-30-days svg");

            var x = d3.scaleLinear()
                .domain([0, count - 1])
                .range([0, svg.node().getBoundingClientRect().width + 2]);

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

        }
    }, [days]);

    return (
        <Segment id="d3-30-days" >
            <Header as="h3" content="Total Cash" />
            <svg></svg>
            <p>{total} $</p>
        </Segment>
    );
}

export default Total;