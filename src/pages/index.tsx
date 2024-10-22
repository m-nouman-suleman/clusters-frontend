import SidebarLayout from '@/components/SidebarLayout';
import { fetchMetricsData, MetricData } from '@/pages/api/metricsService';
import { GetServerSideProps } from 'next';

interface HomeProps {
  metricsData: MetricData[];
}

export default function Home({ metricsData }: HomeProps) {
  return <SidebarLayout metricsData={metricsData} />;
}
// export const getServerSideProps: GetServerSideProps = async () => {
//   try {
//     const metricsData = await fetchMetricsData(
//       '2023-11-21T00:00:00Z',
//       '2023-11-28T00:00:00Z'
//     );
//     return {
//       props: {
//         metricsData,
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching metrics data:', error);
//     return {
//       props: {
//         metricsData: [],
//       },
//     };
//   }
// };
export const getServerSideProps: GetServerSideProps = async () => {
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

  const metricsData = generateDummyData(300);

  return {
    props: {
      metricsData,
    },
  };
};
