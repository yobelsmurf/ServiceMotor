import React from 'react';
import { Sparkles, Bike, History, BookOpen } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'check' | 'garage' | 'history' | 'tips';
  setActiveTab: (tab: 'check' | 'garage' | 'history' | 'tips') => void;
  savedVehiclesCount: number;
  serviceLogsCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  savedVehiclesCount,
  serviceLogsCount
}) => {
  const triggerHaptic = () => {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(10);
      } catch {
        // ignore if not allowed
      }
    }
  };

  const handleTabClick = (tab: 'check' | 'garage' | 'history' | 'tips') => {
    triggerHaptic();
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    {
      id: 'check' as const,
      label: 'Cek Servis',
      icon: Sparkles,
      badge: null
    },
    {
      id: 'garage' as const,
      label: 'Garasi',
      icon: Bike,
      badge: savedVehiclesCount > 0 ? savedVehiclesCount : null
    },
    {
      id: 'history' as const,
      label: 'Riwayat',
      icon: History,
      badge: serviceLogsCount > 0 ? serviceLogsCount : null
    },
    {
      id: 'tips' as const,
      label: 'Tips Manual',
      icon: BookOpen,
      badge: null
    }
  ];

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/90 shadow-[0_-8px_25px_rgba(0,0,0,0.6)] px-2 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-4 items-center">
        {navItems.map(item => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleTabClick(item.id)}
              className="relative flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all active:scale-95 cursor-pointer"
            >
              {/* Active pill background effect */}
              {isActive && (
                <span className="absolute -top-1.5 w-8 h-1 bg-amber-400 rounded-full shadow-[0_0_8px_#f59e0b]" />
              )}

              <div className="relative">
                <div
                  className={`p-1.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-400 scale-110'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>

                {/* Badge indicator */}
                {item.badge !== null && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.2 min-w-[16px] text-center rounded-full text-[9px] font-black bg-amber-500 text-slate-950 shadow-sm">
                    {item.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] font-semibold mt-0.5 tracking-tight transition-colors ${
                  isActive ? 'text-amber-400 font-bold' : 'text-slate-400'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
