// components/ClusterMetrics.tsx
import { useState } from 'react';
import MetricsChart from './metricChart';
import { ClusterMetricsProps } from '../../utils/interfaces';



const ClusterMetrics: React.FC<ClusterMetricsProps> = ({ metricsData,secondMetrics }) => {
  const [timeRange, setTimeRange] = useState<'7' | '14' | '30'>('7');
  const [data, setData] = useState(metricsData);
  const [secondMetricsData, setSecondMetricsData] = useState(secondMetrics);
  
  const handleTimeRangeChange = async (range: '7' | '14' | '30') => {
    setTimeRange(range);
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <select
          value={timeRange}
          onChange={(e) =>
            handleTimeRangeChange(e.target.value as '7' | '14' | '30')
          }
          className="bg-gray-700 text-white p-2 rounded-md"
        >
          <option value="7">Last 7 days</option>
          <option value="14">Last 14 days</option>
          <option value="30">Last 30 days</option>
        </select>
      </div>
      <MetricsChart
        dummyData={data}
        heading="IOPS"
      />
      <MetricsChart
        dummyData={secondMetricsData}
        heading="Throughput"
      />
    </div>
  );
};

export default ClusterMetrics;
