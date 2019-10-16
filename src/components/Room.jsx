import React from "react";
import { Card, Row } from "react-bootstrap";
import Item from "./Item";
import CreateItemModal from "./CreateItemModal";

export default function Room(props) {
  const {
    id = "",
    roomName = "",
    items = [],
    quantity = 0,
    price = 0
  } = props.room;

  const roomItems = items?.filter((item) => item.room.id === id);

  // Calculate total price
  const totalItemPrice = roomItems
    ?.map((item) => item.price)
    ?.reduce((a, b) => Number(a) + Number(b), 0);

  return (
    <Card className="p-2 mb-2 bg-light">
      <Card.Title className="pt-2 mb-2">Room: {roomName}</Card.Title>
      <Row style={{ overflowX: "auto" }} className="d-flex flex-row">
        {roomItems &&
          roomItems?.map((item) => <Item key={item.id} item={item} />)}
        <CreateItemModal roomId={id} />
      </Row>
      <Card.Text>
        <h5 className="d-flex justify-content-around mt-4">
          <span>Items: {roomItems?.length}</span>
          <span>Total cost of Items: {totalItemPrice}</span>
        </h5>
      </Card.Text>
    </Card>
  );
}
