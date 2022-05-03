import React, { useEffect, useState, } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend, Label } from 'recharts';
import { ImgWrapper } from '../Contents/ContentStyle';
import styled from 'styled-components';


const FirstChart = () => {

    /*   const data = [
          { name: "아케이드 게임", value: 3.8 },
          { name: "콘솔 게임", value: 12 },
          { name: "PC 게임", value: 82.8 },
          { name: "전자 오락실 게임", value: 1.4 }
      ]; */

    const getData = async () => {
        const res = await Api.get(
            `gameGraph/indieByYear`
        );
        console.log(res.data);
        setData(res.data);
    };


    useEffect(() => {
        getData()

    }, [])

    const COLORS = ["#00BFF8", "#FFB618", "#FF4A44", "#008733"];

    const customLabel = (entry) => {
        return `${entry.name} ${entry.value}%`;
    };

    return (
        <ResponsiveContainer className='chart1' width="90%" height={400} >
            <PieChart style={{ backgroundColor: 'white', borderRadius: '1.5rem' }}>
                <Pie
                    data={data}
                    dataKey="value"
                    outerRadius={90}
                    innerRadius={40}
                    startAngle={90}
                    endAngle={-270}
                    label={customLabel}
                >
                    {data.map((point, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}

                </Pie>
                <text style={{ fontSize: '23px', fontWeight: 'bold' }} x={100} y={20} textAnchor="inner" dominantBaseline="middle">
                    2020 분야별 국내 게임 시장 점유율
                </text>
                <Tooltip />
                <Legend />
            </PieChart>

        </ResponsiveContainer>

    )
}

export default FirstChart