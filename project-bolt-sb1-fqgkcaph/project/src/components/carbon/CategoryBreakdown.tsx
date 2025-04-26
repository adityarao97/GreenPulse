import React from 'react';
import Chart from 'react-apexcharts';
import Card from '../ui/Card';

interface CategoryBreakdownProps {
  data: {
    category: string;
    value: number;
  }[];
}

const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({ data }) => {
  const totalValue = data.reduce((sum, item) => sum + (typeof item.value === 'number' ? item.value : 0), 0);
  
  // Category colors
  const categoryColors = {
    'Transportation': '#3B82F6', // Secondary blue
    'Energy': '#F59E0B',         // Accent amber
    'Food': '#10B981',           // Primary green
    'Shopping': '#8B5CF6',       // Purple
    'Home': '#EC4899',           // Pink
    'Other': '#6B7280',          // Gray
  };
  
  const series = data.map(item => typeof item.value === 'number' ? item.value : 0);
  
  const chartOptions = {
    labels: data.map(item => item.category),
    colors: data.map(item => categoryColors[item.category as keyof typeof categoryColors] || '#6B7280'),
    chart: {
      type: 'donut' as const,
      // events: {
      //   mounted: function(chart: any) {
      //     const centerText = document.querySelector('.apexcharts-datalabels-group text');
      //     if (centerText) {
      //       centerText.textContent = `${totalValue.toFixed(1)} kg`;
      //     }
      //   },
      //   mouseMove: function(event: any, chartContext: any, config: any) {
      //     const centerText = document.querySelector('.apexcharts-datalabels-group text');
      //     if (centerText && config.dataPointIndex !== -1) {
      //       const percentage = ((series[config.dataPointIndex] / totalValue) * 100).toFixed(1);
      //       centerText.textContent = `${percentage}%`;
      //     }
      //   },
      //   mouseLeave: function() {
      //     const centerText = document.querySelector('.apexcharts-datalabels-group text');
      //     if (centerText) {
      //       centerText.textContent = `${totalValue.toFixed(1)} kg`;
      //     }
      //   }
      // }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            name: {
              show: true,
              offsetY: -10,
            },
            value: {
              show: true,
              offsetY: 10,
              formatter: function (val: number) {
                return `${val.toFixed(1)} kg CO₂e`;  // This shows the hovered segment's value
              },
            },
            total: {
              show: true,
              showAlways: false,  // Important: Only show when not hovering
              label: 'Total',
              formatter: function (w: any) {
                const total = w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
                return `${total.toFixed(1)} kg CO₂e`;
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: 'bottom',
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,
      formatter: (label: string, opts: any) => {
        const value = opts.w.globals.series[opts.seriesIndex];
        const percent = totalValue > 0 ? ((value / totalValue) * 100).toFixed(1) : '0.0';
        return `${label}: ${percent}%`;
      },
    },
    stroke: {
      width: 0,
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: (val: any) => typeof val === 'number' ? `${val.toFixed(1)} kg CO₂e` : '0.0 kg CO₂e',
      },
    },
  };

  return (
    <Card className="h-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h3>
      <Chart
        options={chartOptions}
        series={series}
        type="donut"
        height={300}
      />
    </Card>
  );
};

export default CategoryBreakdown;