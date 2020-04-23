import React, { useEffect } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import * as d3 from "d3";

const Tops = props => {
    const { tops } = props;

    useEffect(() => {
        if (tops.length > 0) {
            const data = tops.map(top => {
                top.expense = Math.abs(top.expense);
                return top;
            }).reverse();
            const width = 424.5;
            const height = 120;

            let svg = d3.select("#d3-top-categories svg");

            let keys = data.map(d=>d._id);
            
            keys.forEach(key => {
                svg.append("g")
                .attr("name", key);
            });

            let dataset = d3.stack()
                .keys(["income", "expense"])
                .order(d3.stackOrderReverse)(data);

            let y = d3.scaleBand()
                .domain(data.map(d => d._id))
                .range([height, 0])
                .padding(0.4);

            let x = d3.scaleLinear()
                .domain([0, d3.max(dataset, d => d3.max(d, d => d[1]))])
                .rangeRound([0,width]);

            let color = d3.scaleOrdinal()
                .domain(dataset.map(d => d.key))
                .range(["blue", "red"]);
                
            dataset.forEach(d=>{
                d.forEach(e=>{
                    svg.select("g[name="+e.data._id+"]").append("rect")
                    .attr("x", x(e[0]))
                    .attr("y", y(e.data._id))
                    .attr("width", x(e[1])-x(e[0]))
                    .attr("height", y.bandwidth())
                    .attr("fill", color(d.key))
                    .append("title")
                    .text(e.data._id+" ("+d.key+"): "+e.data[d.key]+" $");
                })
            });
            // svg.append("g")
            //     .selectAll("g")
            //     .data(dataset)
            //     .join("g")
            //     .attr("fill", d => color(d.key))
            //     .selectAll("rect")
            //     .data(d => d)
            //     .join("rect")
            //     .attr("y", (d, i) => y(d.data._id))
            //     .attr("x", d => x(d[1]))
            //     .attr("height", d => x(d[0]) - x(d[1]))
            //     .attr("width", y.bandwidth())
            //     .append("title")
            //     .text(d => `${d.data._id} ${d.key}
            // ${d.data[d.key]}`);
        }
    }, [tops]);

    return (
        <Segment id="d3-top-categories">
            <Header as="h3" content="Top Categories In Last 30 Days" />
            <svg></svg>
        </Segment>
    );
}

export default Tops;