import React from "react";
import { Card, Col } from "react-bootstrap";
import BEUrl from "../BEUrl";

export default function Item(props) {
  return (
    <Col sm={3}>
      <Card>
        <Card.Img
          variant="top"
          src={BEUrl + props.item?.image?.split("/")[1]}
          heigth="auto"
        />
        <Card.Subtitle className="mt-3 p-2">
          {props.item?.description}
        </Card.Subtitle>
      </Card>
    </Col>
  );
}
