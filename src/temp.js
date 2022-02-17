import React, { useRef, useEffect, useState } from "react";
import { select, svg } from "d3";
import * as d3 from "d3";

import "./App.css";


// let Line = null,
// Node = null;
function App() {
  const svgRef = useRef();
  const [newElement, seNewElement] = useState();
  const [data, setData] = useState({
    nodes: [
      {
        x: 300,
        y: 100,
        r: 40,
        label: "Node 1",
        color1: "#de4",
        color2: "pink",
        id: 1,
      },
      {
        x: 200,
        y: 150,
        r: 60,
        label: "Node 2",
        color1: "blue",
        color2: "red",
        id: 2,
      },
      {
        x: 280,
        y: 200,
        r: 20,
        label: "Node 3",
        color1: "#09c",
        color2: "green",
        id: 3,
      },
      {
        x: 280,
        y: 200,
        r: 20,
        label: "Node 3",
        color1: "#09c",
        color2: "green",
        id: 4,
      },
    ],
    links: [
      { source: 0, target: 1 },
      { source: 0, target: 2 },
      { source: 2, target: 3 },
    ],
  });

  useEffect(() => {
    const svg = select(svgRef.current);
    let Width = svg.attr("width");
    let Height = svg.attr("height");

    console.log("svg==> ", svg, Width, Height);

    let link = svg
      .append("g")
      .selectAll("line")
      .data(data.links)
      .enter()
      .append("line")
      .attr("stroke-width", function (d) {
        return 3;
      })
      .style("stroke", "pink");

    let node = svg
      .append("g")
      .selectAll("circle")
      .data(data.nodes)
      .enter()
      .append("circle")
      .attr("r", 8)
      .attr("fill", function (d) {
        return "orange";
      })
      .attr("stroke", "yellow")
      .call(
        d3
          .drag()
          .on("start", function (d) {
            if (!d3.event.active) simulation.alphaTarget(0.3);
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", function (d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
          })
          .on("end", function (d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );
    let texts = svg
      .append("g")
      .selectAll("text")
      .data(data.nodes)
      .enter()
      .append("text")
      .text((d) => d.label);
    let simulation = d3
      .forceSimulation(data.nodes)
      // .force("link", d3.forceLink(data.links))
      .force("charge", d3.forceManyBody().strength(-30))
      // .force("center", d3.forceCenter(Width / 2, Height / 2))
      .on("tick", () => {
        // texts.attr("x", function (d) {
        //   return d.x;
        // });
        // texts.attr("y", function (d) {
        //   return d.y;
        // });
        link
          .attr("x1", function (d) {
            return d.source.x;
          })
          .attr("y1", function (d) {
            return d.source.y;
          })
          .attr("x2", function (d) {
            return d.target.x;
          })
          .attr("y2", function (d) {
            return d.target.y;
          });

        node
          .attr("cx", function (d) {
            return d.x;
          })
          .attr("cy", function (d) {
            return d.y;
          });
      });
  }, [data]);

  useEffect(() => {
    // const svg = select(svgRef.current);
    // let svgDefs = svg.append("defs");
    // let mainGradient = svgDefs
    //   .append("linearGradient")
    //   .attr("id", "mainGradient");
    // mainGradient
    //   .append("stop")
    //   .attr("stop-color", "#3f51b5")
    //   .attr("offset", "0");
    // mainGradient.append("stop").attr("class", "stop-right").attr("offset", "1");
    // let Node = svg
    //   .selectAll("g")
    //   .data(data.nodes)
    //   .join((enter) => enter.append("g"))
    //   .append("circle")
    //   .attr("class", "new")
    //   .classed("filled", true)
    //   .attr("r", (value) => value.r / 2)
    //   .attr("cx", (value) => value.x)
    //   .attr("cy", (value) => 0)
    //   .transition()
    //   .duration(2100)
    //   .attr("r", (value) => value.r)
    //   .attr("cy", (value) => value.y)
    //   .attr("cx", (value) => value.x);
    // let Line = svg
    //   .selectAll("g")
    //   .selectAll("line")
    //   .data(data.links)
    //   .enter()
    //   .append("line")
    //   .attr("stroke-width", 3)
    //   .style("stroke", "pink")
    //   .attr("x1", (value) => value.source.x)
    //   .attr("y1", (value) => value.source.y)
    //   .attr("x2", (value) => value.target.x)
    //   .attr("y2", (value) => value.target.y);
    // svg
    //   .selectAll("g")
    //   .data(data.nodes)
    //   .join((enter) => enter.append("g"))
    //   .append("text")
    //   .text(function (d) {
    //     return d.label;
    //   })
    //   .attr("font-family", "sans-serif")
    //   .attr("font-size", "0px")
    //   .attr("x", function (d) {
    //     return d.x;
    //   })
    //   .attr("y", function (d) {
    //     return 0;
    //   })
    //   .transition()
    //   .duration(2100)
    //   .attr("font-size", "20px")
    //   .attr("x", function (d) {
    //     return d.x;
    //   })
    //   .attr("y", function (d) {
    //     return d.y;
    //   });
    // const simUlation = d3
    //   .forceSimulation(data.nodes)
    //   .force("charge", d3.forceManyBody().strength(-30))
    //   .force("collide", forceCollide(30))
    //   .force("link", d3.forceLink(data.links))
    //   .on("tick", () => {
    //     console.log("current force", simUlation.alpha());
    //     Line.attr("x1", function (d) {
    //       return d.source.x;
    //     })
    //       .attr("y1", function (d) {
    //         return d.source.y;
    //       })
    //       .attr("x2", function (d) {
    //         return d.target.x;
    //       })
    //       .attr("y2", function (d) {
    //         return d.target.y;
    //       });
    //     svg
    //       .selectAll("g")
    //       .data(data.nodes)
    //       .attr("cx", function (d) {
    //         return d.x;
    //       })
    //       .attr("cy", function (d) {
    //         return d.y;
    //       });
    //   });
    // svg.on("mousemove", () => {
    //   const [x, y] = d3.mouse(svgRef.current);
    //   simUlation
    //     .force("x", d3.forceX(x).strength(0.7))
    //     .force("y", d3.forceY(y).strength(0.7));
    // });
  }, [data]);

  useEffect(() => {
    //   console.log(svgRef);
    //   const svg = select(svgRef.current);
    //   svg.on("mouseout", function (points) {
    //     console.log("points=> ", points); // log the mouse x,y position
    //     let circle = svg.selectAll("g").selectAll("circle").data(data.nodes);
    //     circle.exit().remove();
    //     circle
    //       .transition()
    //       .duration(100)
    //       .attr("cx", function (d) {
    //         if (d.x + d.r - points.x <= 50) {
    //           d.x = d.x + 100;
    //           // setData([...data, d]);
    //         }
    //       });
    //     // let text = svg.selectAll("g").selectAll("text").data(data.nodes);
    //     // text
    //     //   .transition()
    //     //   .duration(100)
    //     //   .attr("x", function (d) {})
    //     //   .attr("y", function (d) {});
    //     // text.exit().remove();
    //   });
  }, [svg]);

  return (
    <div style={{ padding: "100px" }}>
      <div>
        <input
          name="textValue"
          placeholder="Enter text"
          onChange={(e) => {
            seNewElement(e.target.value);
          }}
        />
        <button
          onClick={() => {
            // setData([...data, { x: 300, y: 150, r: 60, label: newElement }]);
          }}
        >
          Add text
        </button>
      </div>
      <svg ref={svgRef}></svg>
      <br />
      {/* <button
        onClick={() => {
          setData(data.map((value) => value + 5));
        }}
      >
        update me
      </button> */}
    </div>
  );
}

export default App;
