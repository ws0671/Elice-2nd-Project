import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Custom } from "../styles/Mypage/MypageChart";

const MypageBarChart = ({ chartData }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Custom className="custom-tooltip">
          <p className="label">{`${label}`}</p>
          <p> {`긍정적 : ${payload[0].value} %`}</p>
          <p> {`부정적 : ${payload[1].value} %`}</p>
        </Custom>
      );
    }

    return null;
  };

  return (
    <div>
      <div className="chartTitle">게임별 긍정/부정 리뷰 비율</div>
      <BarChart
        width={500}
        height={300}
        data={chartData}
        margin={{ top: 40, right: 40, bottom: 30, left: 40 }}
      >
        <XAxis style={{ fontWeight: "bold", display: "none" }} dataKey="name" />
        <YAxis
          style={{ fontWeight: "bold" }}
          label={{
            value: "(%)",
            position: "top",
            offset: 20,
            fontWeight: "bold",
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar dataKey="긍정적" stackId="a" barSize={30} fill="#36A2EB" />
        <Bar dataKey="부정적" stackId="a" barSize={30} fill="#FF6384" />
      </BarChart>
    </div>
  );
};

export default MypageBarChart;
