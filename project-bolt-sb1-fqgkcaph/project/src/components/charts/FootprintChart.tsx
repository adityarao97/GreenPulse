import React from 'react';
import Chart from 'react-apexcharts';
import { format } from 'date-fns';

interface FootprintChartProps {
  data: {
    date: string;
    value: number;
  }[];
  period: 'daily' | 'weekly' | 'monthly';
  height?: number;
}

const FootprintChart: React.FC<FootprintChartProps> = ({
  data,
  period,
  height = 300,
}) => {
  // Format the labels based on period
  const formatLabel = (date: string) => {
    const dateObj = new Date(date);
    switch (period) {
      case 'daily':
        return format(dateObj, 'MMM d');
      case 'weekly':
        return `Week ${format(dateObj, 'w')}`;
      case 'monthly':
        return format(dateObj, 'MMM yyyy');
      default:
        return date;
    }
  };

  const series = [
    {
      name: 'Carbon Footprint',
      data: data.map(item => item.value),
    },
  ];

  const options = {
    chart: {
      type: 'area' as const,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      curve: 'smooth' as const,
      width: 3,
    },
    colors: ['#10B981'], // Primary green
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      borderColor: '#f1f1f1',
      padding: {
        bottom: 10,
      },
    },
    xaxis: {
      categories: data.map(item => formatLabel(item.date)),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: '#64748b',
          fontFamily: 'Inter, sans-serif',
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value: number) => `${value} kg`,
        style: {
          colors: '#64748b',
          fontFamily: 'Inter, sans-serif',
        },
      },
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: (value: number) => `${value} kg CO₂e`,
      },
    },
    markers: {
      size: 4,
      colors: ['#10B981'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
  };

  return (
    <div className="w-full">
      <Chart
        options={options}
        series={series}
        type="area"
        height={height}
      />
    </div>
  );
};

export default FootprintChart;