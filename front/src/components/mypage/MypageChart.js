import React from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"

function BarChart({ chartData }) {
  return (
    <Bar
      data={chartData}
      // options={{
      //   // 플러그인 설정
      //   plugins: {
      //     // data labels 플러그인
      //     datalabels: {
      //       display: false,
      //     },
      //   },
      //   scales: {
      //     // Y축
      //     yAxes: [
      //       {
      //         ticks: {
      //           // 간격 설정
      //           fontColor: "#ffffff",
      //           fontSize: 13,
      //         },
      //         gridLines: {
      //           // grid line 설정
      //           display: false,
      //           drawBorder: false,
      //           color: "white",
      //         },
      //       },
      //     ],
      //     // X축
      //     xAxes: [
      //       {
      //         // bar 너비 조정
      //         categoryPercentage: 0.7,
      //         maxBarThickness: 20,
      //         ticks: {
      //           fontColor: "#ffffff",
      //           fontSize: 13,
      //         },
      //         gridLines: {
      //           display: false,
      //         },
      //       },
      //     ],
      //   },
      // }}
    />
  )
}

export default BarChart
