import { AnimatePresence, motion } from 'framer-motion';
import { CheckSquare, Sparkles } from 'lucide-react';
import { useTodos } from '@/hooks/useTodos';
import { AddTodoForm } from '@/components/AddTodoForm';
import { TodoItem } from '@/components/TodoItem';
import { TodoFilters } from '@/components/TodoFilters';
import { StatsCards } from '@/components/StatsCards';
import { toast } from 'sonner';

export default function Index() {
  const {
    todos,
    filter,
    setFilter,
    categoryFilter,
    setCategoryFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    stats,
  } = useTodos();

  const handleAdd = (text: string, priority: any, category: any) => {
    addTodo(text, priority, category);
    toast.success('Task added!', { description: text });
  };

  const handleToggle = (id: string) => {
    const todo = todos.find(t => t.id === id);
    toggleTodo(id);
    if (todo && !todo.completed) {
      toast.success('Nice work! Task completed 🎉');
    }
  };

  const handleDelete = (id: string) => {
    deleteTodo(id);
    toast('Task deleted', { description: 'The task has been removed.' });
  };

  const handleClearCompleted = () => {
    clearCompleted();
    toast('Cleared completed tasks');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="p-2.5 bg-primary rounded-xl shadow-lg shadow-primary/25">
              <CheckSquare className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TaskFlow
            </h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Stay organized. Get things done.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="mb-6">
          <StatsCards stats={stats} />
        </div>

        {/* Add Todo Form */}
        <div className="mb-6">
          <AddTodoForm onAdd={handleAdd} />
        </div>

        {/* Filters */}
        <div className="mb-4">
          <TodoFilters
            filter={filter}
            setFilter={setFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            stats={stats}
            onClearCompleted={handleClearCompleted}
          />
        </div>

        {/* Todo List */}
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>

          {todos.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Sparkles className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground font-medium">
                {filter === 'completed'
                  ? 'No completed tasks yet'
                  : filter === 'active'
                  ? 'All caught up! 🎉'
                  : 'No tasks yet. Add one above!'}
              </p>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-xs text-muted-foreground/50">
            Built with ❤️ · Data saved locally
          </p>
        </div>
      </div>
      {/* Toaster is rendered in App.tsx */}
    </div>
  );
}