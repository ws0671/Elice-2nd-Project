import React, { useEffect, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
} from "recharts";

const RecommendChart = ({ gameItem }) => {

  const [category, setCategory] = useState()


  useEffect(() => {
    let tempCategory = []
    const tempData = gameItem.map(item => { return (item.categories) })
    for (let i = 0; i <= tempData.length; i++) {
      tempCategory.push(tempData[i])
      console.log(tempCategory)
    }
  }, [])




  const data = [
    {
      subject: "Math",
      A: 120,
      B: 110,
      fullMark: 150,
    },
    {
      subject: "Chinese",
      A: 100,
      B: 100,
      fullMark: 150,
    },
    {
      subject: "English",
      A: 86,
      B: 130,
      fullMark: 150,
    },
    {
      subject: "Geography",
      A: 99,
      B: 100,
      fullMark: 150,
    },
    {
      subject: "Physics",
      A: 85,
      B: 90,
      fullMark: 150,
    },
    {
      subject: "History",
      A: 65,
      B: 85,
      fullMark: 150,
    },
  ];

  return (
    <RadarChart outerRadius="80%" height={500} width={500} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      {/* <PolarRadiusAxis /> */}
      <Radar
        name="Mike"
        dataKey="A"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />
    </RadarChart>
  );
};

export default RecommendChart;