import React, { useRef, useEffect, useState } from "react";
import { Button, Row, Col } from "reactstrap";
import * as d3 from "d3";
import ReactTooltip from "react-tooltip";
import { forceCollide, select, svg } from "d3";

export default function Example2() {
  const svgRef = useRef();
  const [ScreenWidth, setScreenWidth] = useState(document.body.clientWidth);
  const [ScreenHeight, setScreenHeight] = useState(document.body.clientHeight);
  const [newElement, seNewElement] = useState("");
  const [data, setData] = useState({
    nodes: [
      { name: "katy", age: 23 },
      { name: "bob", age: 35 },
      { name: "mina", age: 34 },
      { name: "mary", age: 25 },
      { name: "bibo", age: 15 },
      { name: "mai", age: 26 },
      { name: "ali", age: 14 },
    ],
  });

  useEffect(() => {
    d3.select("h1").style("font-size", 60);

    const svg = d3.select("#network");

    console.log("data now--> ", data, svg);
    let Width = svg.attr("width");
    let Height = svg.attr("height");

    let r = 5,
      ctx = svg.node().getContext("2d");

      data.nodes.forEach(function (d) {
      d.x = Math.random() * Width;
      d.y = Math.random() * Height;
    });

    function update() {
      ctx.clearRect(0, 0, Width, Height);
      ctx.beginPath();
      data.nodes.forEach(drawNode);
      //   P;
      ctx.fill();
    }
    function drawNode(d) {
      ctx.moveTo(d.x, d.y);
      ctx.arc(d.x, d.y, r, 0, 2 * Math.PI);
    }
    update();
  }, [data, ScreenWidth, ScreenHeight]);

  return (
    <div>
      <Row>
        <Col lg="12" className="flex_class">
          <canvas
            id="network"
            width="500"
            height="500"
            style={{
              border: "2px solid ",
              marginTop: "50px",
              marginLeft: "50px",
            }}
          ></canvas>
        </Col>
      </Row>
    </div>
  );
}
