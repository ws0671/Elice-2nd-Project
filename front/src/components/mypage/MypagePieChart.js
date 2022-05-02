import { PieChart, Pie, Cell, Tooltip, Legend, Sector } from "recharts";
import { Custom } from "../styles/Mypage/MypageChart";

const MypagePieChart = ({ chartData, total }) => {
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
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
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
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
          {`${chartData[index].name}`}
          {/* {`${(percent * 100).toFixed(0)} %`} */}
        </text>
      </>
    );
  };

  const CustomTooltip = ({ payload }) => {
    console.log(payload);

    return (
      <div>
        <div className="ant-popover-arrow" />
        <Custom>
          <span>게임 장르(개수) : </span>
          <b>
            {payload?.[0]?.payload?.name} ({payload?.[0]?.payload?.value})
          </b>

          <p className="desc">
            <span>비율 : </span>
            <b>{((payload?.[0]?.payload?.value / total) * 100).toFixed(0)}%</b>
          </p>
        </Custom>
      </div>
    );
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>장르 분포</div>
      <PieChart width={500} height={300}>
        <Pie
          data={chartData}
          // labelLine={false}
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
        <Tooltip content={<CustomTooltip />} />
        {/* <Legend /> */}
      </PieChart>
    </>
  );
};

export default MypagePieChart;
