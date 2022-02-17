import React, { useRef, useEffect, useState } from "react";
import { forceCollide, select, svg } from "d3";
import * as d3 from "d3";
import "../App.css";
import { Button, Row, Col } from "reactstrap";
import ReactTooltip from "react-tooltip";

function Example1() {
  const svgRef = useRef();
  const [ScreenWidth, setScreenWidth] = useState(document.body.clientWidth);
  const [ScreenHeight, setScreenHeight] = useState(document.body.clientHeight);
  const [newElement, seNewElement] = useState("");
  const [data, setData] = useState([
    {
      x: 0.1 * ScreenWidth,
      y: 0.1 * ScreenHeight,
      r: 0.2 * (0.1 * ScreenWidth),
      label: "A",
    },
    {
      x: 0.2 * ScreenWidth,
      y: 0.2 * ScreenHeight,
      r: 0.3 * (0.2 * ScreenWidth),
      label: "B",
    },
    {
      x: 0.3 * ScreenWidth,
      y: 0.3 * ScreenHeight,
      r: 0.2 * (0.3 * ScreenWidth),
      label: "C",
    },
    {
      x: 0.05 * ScreenWidth,
      y: 0.04 * ScreenHeight,
      r: 0.09 * (0.3 * ScreenWidth),
      label: "D",
    },
    {
      x: 0.7 * ScreenWidth,
      y: 0.4 * ScreenHeight,
      r: 0.09 * (0.3 * ScreenWidth),
      label: "E",
    },
    {
      x: 0.8 * ScreenWidth,
      y: 0.3 * ScreenHeight,
      r: 0.09 * (0.3 * ScreenWidth),
      label: "F",
    },
    {
      x: 0.2 * ScreenWidth,
      y: 0.4 * ScreenHeight,
      r: 0.2 * (0.3 * ScreenWidth),
      label: "G",
    },
    {
      x: 0.45 * ScreenWidth,
      y: 0.4 * ScreenHeight,
      r: 0.14 * (0.3 * ScreenWidth),
      label: "H",
    },
    {
      x: 0.2 * ScreenWidth,
      y: 0.4 * ScreenHeight,
      r: 0.07 * (0.3 * ScreenWidth),
      label: "I",
    },
    {
      x: 0.2 * ScreenWidth,
      y: 0.41 * ScreenHeight,
      r: 0.07 * (0.3 * ScreenWidth),
      label: "J",
    },
    {
      x: 0.2 * ScreenWidth,
      y: 0.44 * ScreenHeight,
      r: 0.27 * (0.3 * ScreenWidth),
      label: "K",
    },
    {
      x: 0.2 * ScreenWidth,
      y: 0.44 * ScreenHeight,
      r: 0.07 * (0.35 * ScreenWidth),
      label: "L",
    },
    {
      x: 0.244 * ScreenWidth,
      y: 0.44 * ScreenHeight,
      r: 0.08 * (0.3 * ScreenWidth),
      label: "M",
    },
    {
      x: 0.2 * ScreenWidth,
      y: 0.44 * ScreenHeight,
      r: 0.07 * (0.4 * ScreenWidth),
      label: "N",
    },
    {
      x: 0.4 * ScreenWidth,
      y: 0.44 * ScreenHeight,
      r: 0.17 * (0.2 * ScreenWidth),
      label: "O",
    },
    {
      x: 0.8 * ScreenWidth,
      y: 0.44 * ScreenHeight,
      r: 0.07 * (0.7 * ScreenWidth),
      label: "P",
    },
  ]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      console.log("resize");
      setScreenWidth(document.body.clientWidth);
      setScreenHeight(document.body.clientHeight);
    });

    console.log("svg==width>", ScreenWidth, ScreenHeight);
  }, [ScreenWidth]);

  useEffect(() => {
    console.log("data now--> ", data);
    const svg = select(svgRef.current);
    ReactTooltip.show(svgRef.current);
    svg.selectAll("*").remove();
    let Width = svg.attr("width", ScreenWidth * 0.8);
    let Height = svg.attr("height", ScreenHeight * 0.6);
    let svgDefs = svg.append("defs");
    let mainGradient = svgDefs
      .append("linearGradient")
      .attr("id", "mainGradient");
    mainGradient
      .append("stop")
      .attr("stop-color", "#D1B1CB")
      .attr("offset", "15%");
    mainGradient
      .append("stop")
      .attr("stop-color", "#d3d3d3")
      .attr("offset", "74%");

    console.log("svg==> ", svg, Width, Height);

    let drag = d3
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
      });

    let node = svg
      .append("g")
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", (d) => d.r)
      .attr("class", "new")
      .classed("filled", true)
      // .attr("stroke", "yellow")
      .call(drag);

    let texts = svg
      .append("g")
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((d) => d.label)
      .call(drag);

    let simulation = d3
      .forceSimulation(data)
      .force("charge", d3.forceManyBody().strength(30))
      .force(
        "collide",
        d3.forceCollide((d) => d.r + 2)
      )
      .on("tick", () => {
        texts.attr("x", function (d) {
          return d.x;
        });
        texts.attr("y", function (d) {
          return d.y + 0.5;
        });
        node
          .attr("cx", function (d) {
            return d.x;
          })
          .attr("cy", function (d) {
            return d.y;
          });
      });
  }, [data, ScreenWidth, ScreenHeight]);

  return (
    <div>
      <Row>
        <Col lg="12" className="mb-3 py-5">
          <p style={{ textAlign: "center", fontSize: "20px" }}>Add New Ball</p>
          <div className="flex_class">
            <input
              name="textValue"
              placeholder="Enter text ..."
              onChange={(e) => {
                seNewElement(e.target.value);
              }}
            />
            &nbsp;&nbsp;&nbsp;
            <Button
              className="btn"
              onClick={() => {
                if (newElement !== "") {
                  let TempData = data;
                  TempData.push({
                    x: 0.3 * ScreenWidth,
                    y: 0.3 * ScreenHeight,
                    r: 0.06 * (0.5 * ScreenWidth),
                    label: newElement,
                  });
                  setData([...TempData]);
                }
              }}
            >
              Add
            </Button>
          </div>
        </Col>
        <Col lg="12" className="flex_class">
          <svg
            ref={svgRef}
            data-tip="Try to drag and drop nodes!"
            data-place="left"
            data-type="info"
          ></svg>
          <ReactTooltip />
        </Col>
      </Row>
    </div>
  );
}

export default Example1;
