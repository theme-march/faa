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
    <Accordion defaultActiveKey="0" flush className="w-100">
      <Card className="my-4">
        <Card.Header className="fw-bold">
          <CustomToggle eventKey="0">
            Qualifications for Membership
          </CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            General Membership is open to all graduates of the Department of
            Finance of the University of Dhaka.Life Membership will be awarded
            to a general member by the Executive Council (EC) of the Association
            upon fulfilment of conditions set by the EC.
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card className="my-4">
        <Card.Header className="fw-bold">
          <CustomToggle eventKey="1">Fees and Subscriptions:</CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            The annual membership fee for a general member shall be Tk. 1000
            (One thousand). The fee for Life Member shall be Tk. 10000 (Ten
            thousand). These rates are subject to change upon decision in the
            general meeting of the Association.
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card className="my-4">
        <Card.Header className="fw-bold">
          <CustomToggle eventKey="2">
            Rights and Privileges of the Members:
          </CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="2">
          <Card.Body>
            To attend general meetings and to move and support motions; To
            participate in election of the EC and to hold any office of the EC;
            and, To participate in any events organized by the Association
            subject to registration
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card className="my-4">
        <Card.Header className="fw-bold">
          <CustomToggle eventKey="3">Termination of Membership:</CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="3">
          <Card.Body>
            Membership will cease automatically in case of any of the following
            circumstances: His/her resignation from the Association and such
            resignation is accepted by the EC; His/her death, bankruptcy or
            insanity; He/she is punished by a court of law; or, He/she does not
            pay membership fees for two consecutive years.
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}
