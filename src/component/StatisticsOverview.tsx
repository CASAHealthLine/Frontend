import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { BarChart } from '@mui/x-charts/BarChart';
import '../index.css';
import Button from 'react-bootstrap/Button';
import totalUserData from '../data/totalUser.json';
export const StatisticsOverview = () => {
    const [weekRange, setWeekRange] = useState("");

    useEffect(() => {
        const updateWeekRange = () => {
            const today = new Date();
            const dayOfWeek = today.getDay(); // 0 (Chủ nhật) -> 6 (Thứ bảy)
            const monday = new Date(today);
            const sunday = new Date(today);

            // Tính ngày Thứ Hai và Chủ Nhật của tuần
            monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
            sunday.setDate(monday.getDate() + 6);

            // Định dạng ngày dạng dd/mm
            const formatDate = (date) =>
                `${date.getDate()}/${date.getMonth() + 1}`;

            setWeekRange(`${formatDate(monday)} - ${formatDate(sunday)}`);
        };


        updateWeekRange();
    }, []);

    const settings = {
        width: 200,
        height: 200,
        value: 60,
        startAngle: -135,
        endAngle: 135,
    };

    type UserData = {
        name: string;
        number: number;
    };

    const [data, setData] = useState<UserData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/data/totalUser.json');
            const jsonData: UserData[] = await response.json();
            setData(jsonData);
        };
        fetchData();
    }, []);

    return (
        <div className="flex flex-col md:flex-row items-start justify-between pt-[2.5%]">
            <div className="max-w-md mx-auto">
                <p className="text-xl text-center font-bold">Số bệnh nhân khám bệnh </p>
                <div className="text-center">{weekRange}</div>
                <BarChart
                    xAxis={[{ scaleType: 'band', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }]}
                    series={[{ data: [2, 5, 1, 3, 6, 4, 7] }]}
                    width={400}
                    height={300}
                    borderRadius={10}
                />
            </div>
            <div className="max-w-md mx-auto">
                <p className="text-xl text-center font-bold">Số người dùng CASA HealthLine</p>
                <BarChart
                    xAxis={[{ scaleType: 'band', data: data.map(item => item.name) }]}
                    series={[{ data: data.map(item => item.number) }]}
                    width={400}
                    height={300}
                    borderRadius={10}
                />
            </div>
            <div className=" max-w-md mx-auto">
                <p className="text-xl text-center font-bold">Mức độ hoạt động bệnh viện </p>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }} >
                    <Gauge className="font-bold "
                        {...settings}
                        sx={(theme) => ({
                            [`& .${gaugeClasses.valueText}`]: {
                                fontSize: 50,
                            },
                            [`& .${gaugeClasses.valueArc}`]: {
                                fill: '#24c38c',
                            },
                        })}
                    />
                </Stack>
                <div className="text-center">
                    <Button className="btn btn-custom" type="submit">Chi tiết</Button>
                </div>
            </div>
        </div>
    );
}
