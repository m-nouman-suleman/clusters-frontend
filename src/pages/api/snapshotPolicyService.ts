// src/services/snapshotPolicyService.ts
import axios from 'axios';
import { SnapshotPolicy } from '../../../utils/interfaces';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;



export const fetchSnapshotPolicy = async (clusterId: string): Promise<SnapshotPolicy> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/clusters/${clusterId}/snapshot-policy`, {
    });
    const policy = response.data;
    return {
      id: policy.id,
      policyName: policy.policyName,
      directory: policy.directory,
      scheduleType: policy.scheduleType,
      time: policy.time,
      days: policy.days,
      deleteAfter: policy.deleteAfter,
      locked: policy.locked,
      enabled: policy.enabled,
    };
  } catch (error) {
    console.error('Error fetching snapshot policy:', error);
    throw new Error('Unable to fetch snapshot policy');
  }
};

export const updateSnapshotPolicy = async (shopshot_id: string, policy: SnapshotPolicy) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/clusters/${shopshot_id}/snapshot-policy`, policy);
    return response.data;
  } catch (error) {
    console.error('Error updating snapshot policy:', error);
    throw new Error('Unable to update snapshot policy');
  }
};