import React from 'react';
import Chart from 'react-apexcharts';

interface LeaderboardChartProps {
  data: {
    name: string;
    footprint: number;  // ✅ Absolute value (total emission)
    reduction: number;  // This will no longer be used
  }[];
  height?: number;
}

export const LeaderboardChart: React.FC<LeaderboardChartProps> = ({
  data,
  height = 350,
}) => {
  // Sort data by absolute emissions (highest first)
  const sortedData = [...data].sort((a, b) => b.footprint - a.footprint);

  // Take top 5 companies
  const topCompanies = sortedData.slice(0, 5);

  const series = [
    {
      name: 'Total Emission (kg CO₂e)',
      data: topCompanies.map(item => item.footprint), // ✅ Use footprint here
    },
  ];

  const options = {
    chart: {
      type: 'bar' as const,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        barHeight: '70%',
      },
    },
    colors: ['#3B82F6'], // Secondary blue
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toLocaleString()} kg CO₂e`, // ✅ Show absolute values
      style: {
        colors: ['#fff'],
        fontWeight: 600,
      },
      offsetX: -10,
    },
    xaxis: {
      categories: topCompanies.map(item => item.name),
      labels: {
        style: {
          colors: '#64748b',
          fontFamily: 'Inter, sans-serif',
        },
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#64748b',
          fontFamily: 'Inter, sans-serif',
        },
      },
    },
    grid: {
      borderColor: '#f1f1f1',
      padding: {
        left: 20,
      },
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: (value: number) => `${value.toLocaleString()} kg CO₂e`, // ✅ Tooltip showing absolute values
      },
    },
  };

  return (
    <div className="w-full">
      <Chart
        options={options}
        series={series}
        type="bar"
        height={height}
      />
    </div>
  );
};

export default LeaderboardChart;
