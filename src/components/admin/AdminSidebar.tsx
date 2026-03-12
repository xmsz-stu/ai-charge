import { Link } from '@tanstack/react-router'

export function AdminSidebar() {
  const navItems = [
    {
      label: 'Catalog Management',
      icon: 'database',
      to: '/admin',
    },
    {
      label: 'Channel Management',
      icon: 'share_windows',
      to: '/admin/channels',
    },
    {
      label: 'Provider Sync',
      icon: 'sync',
      to: '/admin/sync',
    },
    {
      label: 'Settings',
      icon: 'settings',
      to: '/admin/settings',
    },
  ]

  return (
    <aside className="w-64 border-r border-slate-200 bg-white dark:bg-slate-900 border-slate dark:border-slate-800 flex flex-col">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800">
        <Link to="/" className="flex items-center gap-2 text-brand-primary">
          <span className="material-symbols-outlined text-3xl font-bold">layers</span>
          <h1 className="text-xl font-bold tracking-tight font-display">PROXYBASE</h1>
        </Link>
        <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-medium">Admin Dashboard</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            activeProps={{
              className: 'bg-brand-primary text-white! font-medium',
            }}
            inactiveProps={{
              className: 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors',
            }}
            className="flex items-center gap-3 px-4 py-3"
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
            <span className="material-symbols-outlined text-slate-500">person</span>
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold truncate">Admin User</p>
            <p className="text-[10px] text-slate-500 uppercase">Super Admin</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
