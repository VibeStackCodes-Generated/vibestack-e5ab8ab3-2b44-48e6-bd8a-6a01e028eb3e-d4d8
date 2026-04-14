import { CheckCircle2, Circle, ListTodo } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsCardsProps {
  stats: { total: number; active: number; completed: number };
}

export function StatsCards({ stats }: StatsCardsProps) {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const cards = [
    { label: 'Total Tasks', value: stats.total, icon: ListTodo, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Active', value: stats.active, icon: Circle, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white rounded-xl border border-border/50 p-4 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className={`p-1.5 rounded-lg ${card.bg}`}>
              <card.icon className={`w-4 h-4 ${card.color}`} />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-foreground">{card.value}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{card.label}</p>
        </motion.div>
      ))}
      <div className="col-span-3">
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${completionRate}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1.5 text-center">
          {completionRate}% complete
        </p>
      </div>
    </div>
  );
}
