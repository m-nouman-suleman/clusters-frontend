export interface MetricData {
  timestamp: string;
  iopsRead: number;
  iopsWrite: number;
}

export interface ClusterMetricsProps {
  metricsData: MetricData[];
  secondMetrics: MetricData[];
}


export interface MetricsChartProps {
  dummyData: MetricData[];
  heading: string;
}
export interface SidebarLayoutProps {
  metricsData: any[];
  snapshotPolicy:any
  secondMetrics:MetricData[]
}
export interface SnapshotPolicyProps {
  policyData: {
    id: string;
    policyName: string;
    directory: string;
    scheduleType: string;
    time: string;
    days: string[];
    deleteAfter: string;
    locked: boolean;
    enabled: boolean;
  };
  shopshot_id?: string;
}

export interface HomeProps {
  metricsData: MetricData[];
  snapshotPolicy: any;
  secondMetrics:MetricData[]
}

export interface SnapshotPolicy {
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

