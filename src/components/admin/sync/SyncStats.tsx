
interface StatCardProps {
  label: string
  value: string
  subValue?: string
  trend?: {
    type: 'up' | 'down' | 'neutral'
    text: string
  }
  icon?: string
  status?: 'optimal' | 'warning' | 'error'
}

function StatCard({ label, value, subValue, trend, icon, status }: StatCardProps) {
  const getStatusColor = () => {
    if (status === 'optimal') return 'text-green-500'
    if (status === 'warning') return 'text-amber-500'
    if (status === 'error') return 'text-red-500'
    if (label.includes('Success Rate')) return 'text-green-500'
    if (label.includes('Pending')) return 'text-amber-500'
    return ''
  }

  return (
    <div className="p-6 bg-white dark:bg-slate-900 border-r border-b border-slate-200 dark:border-slate-800">
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">{label}</p>
      <p className={`text-3xl font-bold font-mono ${getStatusColor()}`}>{value}</p>
      {trend && (
        <div className={`mt-2 flex items-center gap-1 ${trend.type === 'up' ? 'text-green-500' : 'text-slate-400'}`}>
          <span className="material-symbols-outlined text-sm">
            {trend.type === 'up' ? 'trending_up' : trend.type === 'down' ? 'trending_down' : 'remove'}
          </span>
          <span className="text-xs font-medium">{trend.text}</span>
        </div>
      )}
      {subValue && (
        <div className="mt-2 flex items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined text-sm">{icon || 'history'}</span>
          <span className="text-xs font-medium">{subValue}</span>
        </div>
      )}
    </div>
  )
}

export function SyncStats() {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-slate-200 dark:border-slate-800 transition-colors">
        <StatCard
          label="Total Providers Connected"
          value="128"
          trend={{ type: 'up', text: '+2 this month' }}
        />
        <StatCard
          label="24h Sync Success Rate"
          value="99.4%"
          subValue="Avg. 98.2%"
          icon="history"
        />
        <StatCard
          label="Pending Updates"
          value="12"
          subValue="Next in 4m"
          icon="schedule"
        />
        <StatCard
          label="System Health"
          value="Optimal"
          subValue="All nodes active"
          icon="check_circle"
          status="optimal"
        />
      </div>
    </section>
  )
}
