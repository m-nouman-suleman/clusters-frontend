// pages/api/metrics.ts
import type { NextApiRequest, NextApiResponse } from 'next';

interface MetricData {
  timestamp: string;
  iopsRead: number;
  iopsWrite: number;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<MetricData[]>
) {
  const mockData: MetricData[] = [
    { timestamp: 'Nov 21', iopsRead: 10000, iopsWrite: 1200 },
    { timestamp: 'Nov 22', iopsRead: 21000, iopsWrite: 1500 },
    // Add more mock data points here
  ];

  res.status(200).json(mockData);
}
