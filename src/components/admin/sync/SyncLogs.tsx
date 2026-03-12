export function SyncLogs() {
  const logs = [
    {
      time: '14:45:12',
      status: 'SUCCESS',
      message: 'Azure Sync Hub: Synchronized 142 items from regional endpoints.',
      type: 'success',
    },
    {
      time: '14:30:05',
      status: 'SUCCESS',
      message: 'AWS Cloud Services: delta_update complete. No changes detected.',
      type: 'success',
    },
    {
      time: '14:15:32',
      status: 'WARNING',
      message: 'Internal: Global cache refresh took longer than expected. Retrying secondary node...',
      type: 'warning',
    },
    {
      time: '14:00:00',
      status: 'ERROR',
      message: 'Google Cloud Feed: API connection failed. Remote host unreachable.',
      type: 'error',
    },
    {
      time: '13:45:10',
      status: 'SUCCESS',
      message: 'Azure Sync Hub: Initial handshake successful.',
      type: 'success',
    },
  ]

  return (
    <section className="space-y-4">
      <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">System Sync Logs</h3>
      <div className="bg-slate-950 text-slate-300 font-mono text-xs border border-slate-800 p-4 overflow-y-auto max-h-64 leading-relaxed transition-colors shadow-2xl">
        <div className="space-y-1">
          {logs.map((log, i) => (
            <div
              key={i}
              className={`flex gap-4 py-1 group hover:bg-slate-800/50 px-2 transition-colors ${
                log.type === 'warning'
                  ? 'border-l-2 border-amber-500 bg-amber-500/5'
                  : log.type === 'error'
                  ? 'border-l-2 border-red-500 bg-red-500/5'
                  : ''
              }`}
            >
              <span className="text-slate-500 shrink-0">[{log.time}]</span>
              <span
                className={`flex items-center gap-1 shrink-0 ${
                  log.type === 'success' ? 'text-green-500' : log.type === 'warning' ? 'text-amber-500' : 'text-red-500'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">
                  {log.type === 'success' ? 'check_circle' : log.type === 'warning' ? 'warning' : 'error'}
                </span>
                {log.status}
              </span>
              <span className={`flex-1 ${log.type === 'error' ? 'font-bold text-red-100' : ''}`}>
                {log.message}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-[10px] text-slate-600 border-t border-slate-800 pt-3 flex justify-between uppercase tracking-wider">
          <span>Showing last 5 events</span>
          <a className="text-brand-primary hover:text-brand-primary/80 transition-colors" href="#">
            View All Logs
          </a>
        </div>
      </div>
    </section>
  )
}
