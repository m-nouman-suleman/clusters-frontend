// components/ClusterMetrics.tsx
import { useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import axios from 'axios';
interface MetricData {
  timestamp: string;
  iopsRead: number;
  iopsWrite: number;
}

const generateDummyData = (numPoints: number): MetricData[] => {
  const data = [];
  for (let i = 0; i < numPoints; i++) {
    const timestamp = `Nov ${21 + (i % 7)}`;
    const iopsRead = Math.floor(Math.random() * 50000) + 1000;
    const iopsWrite = Math.floor(Math.random() * 2000) + 500;
    data.push({ timestamp, iopsRead, iopsWrite });
  }
  return data;
};

const ClusterMetrics: React.FC = () => {
  useEffect(() => {
    // Fetch data from the Qumulo API
    axios
      .get('/v1/analytics/time-series', {
        headers: { Authorization: 'Bearer YOUR_ACCESS_TOKEN' },
        params: {
          metric: 'iops', // Customize as needed
          start_time: '2023-11-21T00:00:00Z',
          end_time: '2023-11-28T00:00:00Z',
        },
      })
      .then((response) => {
        const formattedData = response.data.map((entry: any) => ({
          timestamp: entry.timestamp,
          iopsRead: entry.iopsRead,
          iopsWrite: entry.iopsWrite,
        }));
        setData(formattedData);
      })
      .catch((error) => {
        console.error('Error fetching time series data:', error);
      });
  }, []);

  // Generate a large dataset for more spikes
  const dummyData = generateDummyData(300);

  return (
    <div className="w-full bg-gray-900 p-4 rounded-md">
      <h2 className="text-white mb-4 text-xl">Performance Metrics</h2>
      <div className="flex space-x-8">
        {/* Line Chart Section */}
        <div className="flex-1">
          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <LineChart
              data={dummyData}
              margin={{ top: 20, right: 40, left: 0, bottom: 20 }}
            >
              <CartesianGrid
                stroke="#444"
                strokeDasharray="3 3"
              />
              <XAxis
                dataKey="timestamp"
                stroke="#ccc"
              />
              <YAxis stroke="#ccc" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#2d3748',
                  border: 'none',
                  borderRadius: '4px',
                  color: '#fff',
                }}
                labelStyle={{ color: '#ccc' }}
              />
              <Legend
                verticalAlign="top"
                height={36}
              />
              <Line
                type="monotone"
                dataKey="iopsRead"
                stroke="#9c27b0" // Purple
                strokeWidth={2}
                dot={false}
                animationDuration={300}
              />
              <Line
                type="monotone"
                dataKey="iopsWrite"
                stroke="#00bcd4" // Blue
                strokeWidth={2}
                dot={false}
                animationDuration={300}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Metrics Section */}
        <div className="w-48 flex flex-col space-y-4 justify-center">
          <div className="bg-gray-800 p-4 rounded-md">
            <h3 className="text-white text-lg">IOPS</h3>
            <p className="text-purple-400">Read: 21.2k IOPS</p>
            <p className="text-blue-400">Write: 122.0 IOPS</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-md">
            <h3 className="text-white text-lg">Throughput</h3>
            <p className="text-purple-400">Read: 10.3 KB/s</p>
            <p className="text-blue-400">Write: 489.8 KB/s</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClusterMetrics;
