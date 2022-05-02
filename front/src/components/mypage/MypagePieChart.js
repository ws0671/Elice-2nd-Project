import { PieChart, Pie, Cell, Tooltip, Legend, Sector } from "recharts";
import { Custom } from "../styles/Mypage/MypageChart";

const MypagePieChart = ({ chartData }) => {
  // const CustomTooltip = ({ active, payload, label }) => {
  //   if (active && payload && payload.length) {
  //     return (
  //       <Custom className="custom-tooltip">
  //         <p className="label">{`${label}`}</p>
  //         <p> {`긍정적 : ${payload[0].value} %`}</p>
  //         <p> {`부정적 : ${payload[1].value} %`}</p>
  //       </Custom>
  //     );
  //   }

  //   return null;
  // };

  // const TagData = [
  //   { name: "FPS", value: 3 },
  //   { name: "World War II", value: 1 },
  //   { name: "Multiplayer", value: 1 },
  //   { name: "Classic", value: 1 },
  //   { name: "Action", value: 2 },
  //   { name: "Sci-fi", value: 1 },
  // ];
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF8042",
    "#FF8042",
  ];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <>
        <text
          x={x}
          y={y}
          fill="black"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${chartData[index].name}`} {`${(percent * 100).toFixed(0)} %`}
        </text>
      </>
    );
  };
  console.log("태그데이터", chartData);

  return (
    <>
      <div style={{ textAlign: "center" }}>장르 분포</div>
      <PieChart width={500} height={300}>
        <Pie
          data={chartData}
          labelLine={false}
          innerRadius={40}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label={renderCustomizedLabel}
        >
          {chartData &&
            chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
        </Pie>
        <Tooltip />
        {/* <Legend /> */}
      </PieChart>
    </>
  );
};

export default MypagePieChart;
