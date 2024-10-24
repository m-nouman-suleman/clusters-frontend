// components/SidebarLayout.tsx
import { useState } from 'react';
import ClusterMetrics from './ClusterMetrics';
import SnapshotPolicy from './SnapchotPolicy';
import { SidebarLayoutProps } from '../../utils/interfaces';


const SidebarLayout: React.FC<SidebarLayoutProps> = ({ metricsData,snapshotPolicy }) => {
  const [selectedTab, setSelectedTab] = useState<'metrics' | 'snapshot'>('metrics');

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800 p-4">
        <h1 className="text-xl font-semibold mb-4">[Cluster Name]</h1>
        <ul>
          <li
            className={`p-2 cursor-pointer ${selectedTab === 'metrics' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
            onClick={() => setSelectedTab('metrics')}
          >
            Performance Metrics
          </li>
          <li
            className={`p-2 cursor-pointer ${selectedTab === 'snapshot' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
            onClick={() => setSelectedTab('snapshot')}
          >
            Edit Snapshot Policy
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-6">
        {selectedTab === 'metrics' ? (
          <ClusterMetrics metricsData={metricsData} />
        ) : (
          <SnapshotPolicy policyData={snapshotPolicy}/>
        )}
      </div>
    </div>
  );
};

export default SidebarLayout;
