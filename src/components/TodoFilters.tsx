import { Button } from '@/components/ui/button';
import type { FilterStatus, Category } from '@/hooks/useTodos';

interface TodoFiltersProps {
  filter: FilterStatus;
  setFilter: (f: FilterStatus) => void;
  categoryFilter: Category | 'all';
  setCategoryFilter: (c: Category | 'all') => void;
  stats: { total: number; active: number; completed: number };
  onClearCompleted: () => void;
}

const statusFilters: { value: FilterStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Done' },
];

const categoryFilters: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'personal', label: '👤 Personal' },
  { value: 'work', label: '💼 Work' },
  { value: 'shopping', label: '🛒 Shopping' },
  { value: 'health', label: '💪 Health' },
];

export function TodoFilters({ filter, setFilter, categoryFilter, setCategoryFilter, stats, onClearCompleted }: TodoFiltersProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-1 bg-secondary/60 rounded-lg p-1">
          {statusFilters.map(f => (
            <Button
              key={f.value}
              variant={filter === f.value ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilter(f.value)}
              className={`text-sm px-4 ${
                filter === f.value
                  ? 'shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {f.label}
              {f.value === 'active' && (
                <span className="ml-1.5 text-xs bg-primary/15 text-primary px-1.5 py-0.5 rounded-full font-semibold">
                  {stats.active}
                </span>
              )}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          {categoryFilters.map(c => (
            <Button
              key={c.value}
              variant={categoryFilter === c.value ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setCategoryFilter(c.value)}
              className={`text-xs px-3 ${
                categoryFilter === c.value
                  ? 'bg-secondary shadow-sm font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {c.label}
            </Button>
          ))}
        </div>
      </div>
      {stats.completed > 0 && (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearCompleted}
            className="text-xs text-muted-foreground hover:text-destructive"
          >
            Clear {stats.completed} completed
          </Button>
        </div>
      )}
    </div>
  );
}
