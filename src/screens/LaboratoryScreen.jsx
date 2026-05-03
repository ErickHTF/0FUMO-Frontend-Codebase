import React, { useState, useEffect } from 'react';
import { Card, PageTitle } from '../components/ui/Card';
import { HeatmapDemo } from '../components/charts/HeatmapDemo';
import { SankeyOverview } from '../components/charts/SankeyOverview';

export const LaboratoryScreen = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const refresh = () => setRefreshKey(k => k + 1);
    window.addEventListener('craving-logged', refresh);
    return () => window.removeEventListener('craving-logged', refresh);
  }, []);

  return (
    <>
      <PageTitle
        title="Laboratório"
        subtitle="Experimentos e visualizações para validar ideias antes de irem para produção."
      />
      <Card className="heatmap-card">
        <HeatmapDemo refreshKey={refreshKey} />
      </Card>

      <Card className="sankey-card" style={{ marginTop: 24 }}>
        <SankeyOverview refreshKey={refreshKey} />
      </Card>
    </>
  );
};
