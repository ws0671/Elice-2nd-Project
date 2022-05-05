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

  return <>
  {data &&
    <div>
      <h1>{data.game.name}</h1>
      <div>{data.game.releaseDate}</div>
      <div>{data.game.genre}</div>
      <div>{data.game.platforms}</div>
      <div>{data.game.overallReview}</div>
      <div>{data.game.positiveRate}</div>
    <div/>}
    </>
};

export default GameDetail;
