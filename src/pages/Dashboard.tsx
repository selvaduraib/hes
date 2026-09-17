import React from 'react';
import { Activity, AlertTriangle, ArrowDownRight, ArrowUpRight, CheckCircle2, Gauge, Radio, TrendingUp } from 'lucide-react';
import { DynamicChart } from '@/components/Charts/DynamicChart';
import { formatNumber } from '@/utils/formatters';
import dashboardData from '@/data/dashboard.json';
import communicationHistoryData from '@/data/communicationHistory.json';

const { communicationData, meterStatusData, stats } = dashboardData;

export const Dashboard: React.FC = () => {
  const statsCards = [
    {
      title: 'Total meters',
      value: formatNumber(stats.totalMeters),
      trend: '+0.4%',
      positive: true,
      icon: Gauge,
      iconClass: 'primary',
    },
    {
      title: 'Communicating',
      value: formatNumber(stats.communicating),
      trend: `${stats.communicationRate}% reliability`,
      positive: true,
      icon: Radio,
      iconClass: 'success',
    },
    {
      title: 'Non-communicating',
      value: formatNumber(stats.nonCommunicating),
      trend: '−2.1%',
      positive: false,
      icon: AlertTriangle,
      iconClass: 'warning',
    },
    {
      title: 'System health',
      value: '98.2%',
      trend: 'Stable',
      positive: true,
      icon: Activity,
      iconClass: 'primary',
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">My Home</h1>
        <p className="page-subtitle">Live view of meter health, connectivity, and downstream communication performance.</p>
      </div>

      <div className="kpi-grid" style={{ marginBottom: 16 }}>
        {statsCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="kpi-tile">
              <div className="kpi-header">
                <div>
                  <div className="kpi-label">{card.title}</div>
                </div>
                <div className={`kpi-icon ${card.iconClass}`}>
                  <Icon size={18} />
                </div>
              </div>

              <div className="kpi-value">{card.value}</div>
              <div className={`kpi-trend ${card.positive ? 'positive' : 'negative'}`}>
                {card.positive ? <ArrowUpRight size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} /> : <ArrowDownRight size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />}
                {card.trend}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid-2" style={{ marginBottom: 16 }}>
        <div className="chart-card">
          <div className="chart-top">
            <h3 className="chart-title">Communication trend</h3>
            <div className="chart-actions">
              <span className="small-chip">Last 12 mo</span>
            </div>
          </div>
          <div className="chart-body">
            <DynamicChart
              metadata={{
                id: 'communication-trend',
                type: 'bar',
                title: '',
                dataKey: 'communicating',
                categoryKey: 'month',
                valueKey: 'communicating',
                legend: false,
                tooltip: true,
                height: 280,
              }}
              data={communicationData}
            />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-top">
            <h3 className="chart-title">Meter status distribution</h3>
            <div className="chart-actions">
              <span className="small-chip">Live</span>
            </div>
          </div>
          <div className="chart-body">
            <DynamicChart
              metadata={{
                id: 'meter-status',
                type: 'donut',
                title: '',
                dataKey: 'value',
                categoryKey: 'name',
                valueKey: 'value',
                legend: true,
                tooltip: true,
                height: 280,
                colors: ['#4453e4', '#0f8b5f'],
              }}
              data={meterStatusData}
            />
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: 16 }}>
        <div className="list-card">
          <div className="card-header">
            <h3 className="card-title">Critical exceptions</h3>
            <span className="small-chip">7 open</span>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            <div className="exception-row">
              <div className="exception-main">
                <div className="exception-title"><span className="sev-dot sev-critical" />Meter 4182 cannot reach backhaul</div>
                <div className="exception-meta">
                  <span>Site: North Ridge</span>
                  <span>Owner: Field Ops</span>
                  <span>Detected 12 mins ago</span>
                </div>
              </div>
              <span className="status-pill danger">Critical</span>
            </div>
            <div className="exception-row">
              <div className="exception-main">
                <div className="exception-title"><span className="sev-dot sev-high" />Firmware update queued for 64 devices</div>
                <div className="exception-meta">
                  <span>Batch: 12-A</span>
                  <span>Impact: Medium</span>
                  <span>Estimated 2h</span>
                </div>
              </div>
              <span className="status-pill warning">Queued</span>
            </div>
            <div className="exception-row">
              <div className="exception-main">
                <div className="exception-title"><span className="sev-dot sev-info" />Gateway latency above baseline</div>
                <div className="exception-meta">
                  <span>Zone: East</span>
                  <span>Signal: 94%</span>
                  <span>Review: 30m</span>
                </div>
              </div>
              <span className="status-pill info">Monitoring</span>
            </div>
          </div>
        </div>

        <div className="card table-card">
          <div className="card-header">
            <h3 className="card-title">Recent communication events</h3>
            <span className="small-chip">Today</span>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Meter</th>
                  <th>Event</th>
                  <th>Status</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {communicationHistoryData.slice(0, 5).map((event) => (
                  <tr key={`${event.timestamp}-${event.meterNo}`}>
                    <td>{event.timestamp}</td>
                    <td>{event.meterNo}</td>
                    <td>{event.event}</td>
                    <td>
                      <span className={`status-pill ${event.status === 'Success' ? 'success' : 'danger'}`}>
                        {event.status}
                      </span>
                    </td>
                    <td>{event.duration}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid-3">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Connectivity quality</h3>
            <CheckCircle2 size={18} color="#0f8b5f" />
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <strong style={{ fontSize: 24 }}>89.4%</strong>
              <span className="status-pill success">Healthy</span>
            </div>
            <div style={{ height: 8, borderRadius: 999, background: 'var(--surface-secondary)', overflow: 'hidden' }}>
              <div style={{ width: '89.4%', height: '100%', borderRadius: 999, background: 'var(--primary)' }} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Network uptime</h3>
            <TrendingUp size={18} color="#4453e4" />
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <strong style={{ fontSize: 24 }}>99.7%</strong>
              <span className="status-pill success">+0.2%</span>
            </div>
            <div style={{ height: 8, borderRadius: 999, background: 'var(--surface-secondary)', overflow: 'hidden' }}>
              <div style={{ width: '99.7%', height: '100%', borderRadius: 999, background: 'var(--success)' }} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Remote sync backlog</h3>
            <Activity size={18} color="#a4650a" />
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <strong style={{ fontSize: 24 }}>214</strong>
              <span className="status-pill warning">Queued</span>
            </div>
            <div style={{ height: 8, borderRadius: 999, background: 'var(--surface-secondary)', overflow: 'hidden' }}>
              <div style={{ width: '62%', height: '100%', borderRadius: 999, background: 'var(--warning)' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

