import React, { useEffect, useState, } from 'react';
import { PieChart, Pie, Tooltip, Legend, Label } from 'recharts';
import { ImgWrapper } from '../Contents/ContentStyle';
import * as Api from '../../../api'


const FirstChart = () => {

    const [data, setData] = useState(null);

    const [key, setKey] = useState(1);
    const [limit, setLimit] = useState('releaseDate');
    const [lastPage, setLastPage] = useState(1);
    const [order, setOrder] = useState(1);


    const getData = async () => {
        const res = await Api.get(
            `gameGraph/releaseByYear`
        );
        console.log(res.data);
        setData(res.data);
        setLastPage(10);
        //res.lastPage
    };



    useEffect(() => {
        getData()

    }, [])

    const data01 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];
    const data02 = [
        { name: 'A1', value: 100 },
        { name: 'A2', value: 300 },
        { name: 'B1', value: 100 },
        { name: 'B2', value: 80 },
        { name: 'B3', value: 40 },
        { name: 'B4', value: 30 },
        { name: 'B5', value: 50 },
        { name: 'C1', value: 100 },
        { name: 'C2', value: 200 },
        { name: 'D1', value: 150 },
        { name: 'D2', value: 50 },
    ];
    let renderLabel = function (entry) {
        return entry.name;
    }

    let renderLegend = function (entry) {
        return entry.name;
    }

    return (
        <ImgWrapper >
            <PieChart width={400} height={400}>
                <Pie dataKey="value"
                    isAnimationActive={false}
                    data={data01}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                />

                <text style={{ fontSize: '30px' }} x={200} y={15} textAnchor="middle" dominantBaseline="middle">
                    Donut
                </text>

                <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label={renderLabel} />
                <Tooltip />
                <Legend />
            </PieChart>
        </ImgWrapper >


    )
}

export default FirstChart