import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";

function CustomToggle({ children, eventKey }) {
  return (
    <div
      className="d-flex cursor-pointer"
      onClick={useAccordionButton(eventKey)}
    >
      <div className="w-100 me-auto">{children}</div>
    </div>
  );
}

export default function AccordionCustom() {
  return (
    <Accordion defaultActiveKey="0" flush>
      <Card className="my-4">
        <Card.Header className="fw-bold">
          <CustomToggle eventKey="0">
            A creative maverick who breathes originality.
          </CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card className="my-4">
        <Card.Header className="fw-bold">
          <CustomToggle eventKey="1">
            A creative maverick who breathes originality.
          </CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card className="my-4">
        <Card.Header className="fw-bold">
          <CustomToggle eventKey="2">
            A creative maverick who breathes originality.
          </CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="2">
          <Card.Body>
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card className="my-4">
        <Card.Header className="fw-bold">
          <CustomToggle eventKey="3">
            A creative maverick who breathes originality.
          </CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="3">
          <Card.Body>
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}
