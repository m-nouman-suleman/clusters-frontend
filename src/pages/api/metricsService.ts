// src/services/metricsService.ts
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface MetricData {
  timestamp: string;
  iopsRead: number;
  iopsWrite: number;
}

export const fetchMetricsData = async (
  startTime: string,
  endTime: string
): Promise<MetricData[]> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/v1/analytics/time-series`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        params: {
          metric: 'iops',
          start_time: startTime,
          end_time: endTime,
        },
      }
    );

    return response.data.map((entry: any) => ({
      timestamp: entry.timestamp,
      iopsRead: entry.iopsRead,
      iopsWrite: entry.iopsWrite,
    }));
  } catch (error) {
    console.error('Error fetching metrics data:', error);
    throw new Error('Unable to fetch metrics data');
  }
};
