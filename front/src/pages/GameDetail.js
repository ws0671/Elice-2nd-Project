import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as Api from "../api";
const GameDetail = () => {
  const [data, setData] = useState(null);
  const [id, setId] = useState(null);
  const params = useParams();

  const handleData = async () => {
    const res = await Api.get(`game/${params.id}/guest`);
    setData(res.data);
    console.log(data);
  };
  useEffect(() => {
    handleData();
  }, []);

  return <>{data && <h1>{data.game.name}</h1>}</>;
};

export default GameDetail;
