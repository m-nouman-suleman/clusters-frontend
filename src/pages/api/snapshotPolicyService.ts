// src/services/snapshotPolicyService.ts
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface SnapshotPolicy {
  id: string;
  policyName: string;
  directory: string;
  scheduleType: string;
  time: string;
  days: string[];
  deleteAfter: string;
  locked: boolean;
  enabled: boolean;
}

export const fetchSnapshotPolicy = async (): Promise<SnapshotPolicy> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/v2/snapshots/policies`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    });

    // Assuming response.data is an array and we want the first policy for simplicity
    const policy = response.data[0];
    return {
      id: policy.id,
      policyName: policy.policy_name,
      directory: policy.directory,
      scheduleType: policy.schedule_type,
      time: policy.time,
      days: policy.days,
      deleteAfter: policy.delete_after,
      locked: policy.locked,
      enabled: policy.enabled,
    };
  } catch (error) {
    console.error('Error fetching snapshot policy:', error);
    throw new Error('Unable to fetch snapshot policy');
  }
};

export const updateSnapshotPolicy = async (
  policyId: string,
  policyData: SnapshotPolicy
): Promise<SnapshotPolicy> => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/v2/snapshots/policies/${policyId}`,
      policyData,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error updating snapshot policy:', error);
    throw new Error('Unable to update snapshot policy');
  }
};
