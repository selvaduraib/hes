import React from 'react';

interface WireframePageProps {
  title: string;
  subtitle?: string;
}

export const WireframePage: React.FC<WireframePageProps> = ({ title, subtitle }) => {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Overview</h3>
        </div>
        <div className="card-body">
          <div className="grid-3">
            <div className="kpi-tile">
              <div className="kpi-label">Active</div>
              <div className="kpi-value">1,284</div>
              <div className="kpi-trend positive">+12.4% this month</div>
            </div>
            <div className="kpi-tile">
              <div className="kpi-label">Health</div>
              <div className="kpi-value">96.4%</div>
              <div className="kpi-trend positive">Within SLA</div>
            </div>
            <div className="kpi-tile">
              <div className="kpi-label">Exceptions</div>
              <div className="kpi-value">48</div>
              <div className="kpi-trend negative">Needs review</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
