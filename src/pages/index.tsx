import SidebarLayout from '@/components/SidebarLayout';
import { fetchMetricsData} from '@/pages/api/metricsService';
import { GetServerSideProps } from 'next';
import { fetchSnapshotPolicy } from './api/snapshotPolicyService';
import { HomeProps } from '../../utils/interfaces';
import {clusterId, secondClusterId, snapshot_id} from "../../utils/constants"

// The component itself
const Home: React.FC<HomeProps> = ({ metricsData,secondMetrics, snapshotPolicy }) => {

  return (
    <SidebarLayout metricsData={metricsData} secondMetrics={secondMetrics} snapshotPolicy={snapshotPolicy} />

  );
};

// Correct usage of getServerSideProps
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Fetching both metrics data and snapshot policy data
    const metricsData = await fetchMetricsData(clusterId);
    const secondMetrics = await fetchMetricsData(secondClusterId);
    const snapshotPolicy = await fetchSnapshotPolicy(snapshot_id);
    return {
      props: {
        metricsData: metricsData,
        snapshotPolicy: snapshotPolicy,
        secondMetrics:secondMetrics
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        metricsData: [],
        snapshotPolicy: null,
      },
    };
  }
};

export default Home;
