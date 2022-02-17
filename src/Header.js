import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import { Row, Col, Nav, NavItem, NavLink } from "reactstrap";

function Header() {
  return (
    <Col lg="12">
      <Nav>
        <NavItem>
          <NavLink href="/example1">Example 1</NavLink>{" "}
        </NavItem>
        <NavItem>
          <NavLink href="/example2">Example 2</NavLink>{" "}
        </NavItem>
      </Nav>
    </Col>
  );
}

export default Header;
