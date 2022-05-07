import { PieChart, Pie, Cell, Tooltip, Legend, Sector } from "recharts";
import { Custom } from "../styles/Mypage/MypageChart";

const MypagePieChart = ({ chartData, total }) => {
  const COLORS = [
    "#F72585",
    "#B5179E",
    "#7209B7",
    "#3A0CA3",
    "#3F37C9",
    "#4361EE",
    "#4895EF",
    "#560BAD",
    "#480CA8",
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
    <div>
      <div className="chartTitle">관심 장르 분포</div>
      <PieChart width={500} height={300}>
        <Pie
          data={chartData}
          innerRadius={40}
          outerRadius={100}
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
    </div>
  );
};

export default MypagePieChart;
