import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import type { Todo } from '@/hooks/useTodos';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const priorityColors = {
  low: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  high: 'bg-red-100 text-red-700 border-red-200',
};

const categoryIcons: Record<string, string> = {
  personal: '👤',
  work: '💼',
  shopping: '🛒',
  health: '💪',
};

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
      className={`group flex items-center gap-3 sm:gap-4 p-4 rounded-xl bg-white border border-border/50 shadow-sm hover:shadow-md transition-all duration-200 ${
        todo.completed ? 'opacity-60' : ''
      }`}
    >
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
        className="h-5 w-5 rounded-full border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-base font-medium truncate ${
              todo.completed ? 'line-through text-muted-foreground' : 'text-foreground'
            }`}
          >
            {todo.text}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <Badge variant="outline" className={`text-xs px-2 py-0 font-medium border ${priorityColors[todo.priority]}`}>
            {todo.priority}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {categoryIcons[todo.category]} {todo.category}
          </span>
          <span className="text-xs text-muted-foreground hidden sm:inline">
            · {formatDistanceToNow(todo.createdAt, { addSuffix: true })}
          </span>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </motion.div>
  );
}
