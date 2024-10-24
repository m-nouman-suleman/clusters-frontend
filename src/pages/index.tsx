import SidebarLayout from '@/components/SidebarLayout';
import { fetchMetricsData} from '@/pages/api/metricsService';
import { GetServerSideProps } from 'next';
import { fetchSnapshotPolicy } from './api/snapshotPolicyService';
import { HomeProps } from '../../utils/interfaces';


// The component itself
const Home: React.FC<HomeProps> = ({ metricsData, snapshotPolicy }) => {

  return (
    <SidebarLayout metricsData={metricsData} snapshotPolicy={snapshotPolicy} />

  );
};

// Correct usage of getServerSideProps
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Fetching both metrics data and snapshot policy data
    const clusterId = '123e4567-e89b-12d3-a456-426614174000'; // Replace with the actual cluster ID
    const metricsData = await fetchMetricsData(clusterId);
    const snapshotPolicy = await fetchSnapshotPolicy("snapshot-001");
    return {
      props: {
        metricsData: metricsData,
        snapshotPolicy: snapshotPolicy,
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
