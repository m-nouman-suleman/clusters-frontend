// src/services/metricsService.ts
import axios from 'axios';
import { generateTimestamps } from '../../../utils/generateTimestamp';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchMetricsData = async (
  clusterId: string,  // Adding clusterId parameter
): Promise<any> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/clusters/${clusterId}/metrics`, {
      
          });
    // Assuming the response structure matches
    const metrics = response.data.metrics;

    // Generate timestamps dynamically or use your own logic
    const timestamps = generateTimestamps(metrics.iops.length);

    // Map through the data to create the expected structure
    const formattedData = timestamps.map((timestamp, index) => ({
      timestamp,
      iopsRead: metrics.iops[index],
      iopsWrite: metrics.throughput[index], // Assuming throughput matches iopsWrite
    }));
    return formattedData;
  } catch (error) {
    console.error('Error fetching metrics data:', error);
    throw new Error('Unable to fetch metrics data');
  }
};
