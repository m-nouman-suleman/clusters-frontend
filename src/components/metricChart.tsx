// components/metricChart.tsx
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

interface MetricData {
  timestamp: string;
  iopsRead: number;
  iopsWrite: number;
}

interface MetricsChartProps {
  dummyData: MetricData[];
  heading: string;
}

const MetricsChart: React.FC<MetricsChartProps> = ({ dummyData, heading }) => {
  const displayDate = new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return (
    <div className="w-full bg-gray-900 p-4 rounded-md">
      <h2 className="text-white mb-4 text-xl">{heading}</h2>
      <div className="flex">
        {/* Line Chart Section */}
        <div className="flex-1">
          <span className="float-right text-gray-400 text-sm mr-10">
            {displayDate}
          </span>
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
                stroke="#9c27b0"
                strokeWidth={2}
                dot={false}
                animationDuration={300}
              />
              <Line
                type="monotone"
                dataKey="iopsWrite"
                stroke="#00bcd4"
                strokeWidth={2}
                dot={false}
                animationDuration={300}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Metrics Section */}
        <div className="flex flex-col space-y-4 justify-center ml-4">
          <h3 className="text-gray-300 text-sm mb-2">{heading}</h3>
          <div className="bg-gray-800 p-4 rounded-md border border-gray-700">
            <div className="flex justify-between items-center mb-2 border-b border-gray-600 pb-2">
              <span className="text-gray-400 text-xs mr-2">Read:</span>
              <span className="text-purple-400 text-xs font-semibold">
                {dummyData[0]?.iopsRead.toLocaleString()} IOPS
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-xs mr-2">Write:</span>
              <span className="text-blue-400 text-xs font-semibold">
                {dummyData[0]?.iopsWrite.toLocaleString()} IOPS
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsChart;
