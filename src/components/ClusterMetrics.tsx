// components/ClusterMetrics.tsx
import { useState } from 'react';
import MetricsChart from './metricChart';

interface MetricData {
  timestamp: string;
  iopsRead: number;
  iopsWrite: number;
}

interface ClusterMetricsProps {
  metricsData: MetricData[];
}

const ClusterMetrics: React.FC<ClusterMetricsProps> = ({ metricsData }) => {
  const [timeRange, setTimeRange] = useState<'7' | '14' | '30'>('7');
  const [data, setData] = useState(metricsData);

  const handleTimeRangeChange = async (range: '7' | '14' | '30') => {
    setTimeRange(range);
    // Fetch the data based on the selected range
    const response = await fetch(`/api/metrics?range=${range}`);
    const newData = await response.json();
    setData(newData);
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
        dummyData={data}
        heading="Throughput"
      />
    </div>
  );
};

export default ClusterMetrics;
