import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import CreateRoomModal from "./CreateRoomModal";
import Room from "./Room";
import { ROOMSFORUSER } from "../ApolloClient/query";
import { useUser } from "../context/userContext";
import uniqBy from "lodash/uniqBy";

export default function UserDashboard() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [roomsForUser, { loading, data, error }] = useLazyQuery(ROOMSFORUSER);

  useEffect(() => {
    if (!loading && !user) navigate("/");
    if (!!user) roomsForUser({ variables: { userId: user.id } });
  }, [user, loading]);

  useEffect(() => {
    if (data?.roomsForUser) {
      setUser((user) => ({
        ...user,
        rooms: uniqBy(
          [...(user?.rooms ?? []), ...(data.roomsForUser ?? [])],
          "id"
        )
      }));
    }
  }, [data]);
  return (
    <>
      <CreateRoomModal />
      {!loading && !error && !!data?.roomsForUser?.length ? (
        user?.rooms?.map((room) => <Room key={room.id} room={room} />)
      ) : (
        <h5 className="text-center mt-4">No rooms added.</h5>
      )}
    </>
  );
}
