import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Gauge } from '@mui/x-charts/Gauge';
import { BarChart } from '@mui/x-charts/BarChart';
export const StatisticsOverview = () => {
    return (
        <div className="flex flex-col md:flex-row items-start justify-between min-h-screen pt-[2.5%]">
            <div className="max-w-md mx-auto">
                <p className="text-xl text-center font-bold">Số bệnh nhân khám bệnh </p>
                <BarChart
                    xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                    series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                    width={500}
                    height={300}
                />
            </div>
            <div className=" max-w-md mx-auto">
                <p className="text-xl text-center font-bold">Mức độ hoạt động bệnh viện </p>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
                    <Gauge className="text-3xl font-bold " width={200} height={200} value={60} startAngle={-135} endAngle={135} />
                </Stack>
            </div>
        </div>
    );
}
