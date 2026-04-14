import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Priority, Category } from '@/hooks/useTodos';
import { motion } from 'framer-motion';

interface AddTodoFormProps {
  onAdd: (text: string, priority: Priority, category: Category) => void;
}

export function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<Category>('personal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim(), priority, category);
    setText('');
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 sm:flex-row sm:items-center"
    >
      <div className="flex-1">
        <Input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="h-12 text-base bg-white border-border/60 shadow-sm focus-visible:ring-primary/30"
        />
      </div>
      <div className="flex gap-2">
        <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
          <SelectTrigger className="w-[120px] h-12 bg-white shadow-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">🟢 Low</SelectItem>
            <SelectItem value="medium">🟡 Medium</SelectItem>
            <SelectItem value="high">🔴 High</SelectItem>
          </SelectContent>
        </Select>
        <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
          <SelectTrigger className="w-[130px] h-12 bg-white shadow-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="personal">👤 Personal</SelectItem>
            <SelectItem value="work">💼 Work</SelectItem>
            <SelectItem value="shopping">🛒 Shopping</SelectItem>
            <SelectItem value="health">💪 Health</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit" size="lg" className="h-12 px-6 shadow-sm">
          <Plus className="w-5 h-5 mr-1" />
          Add
        </Button>
      </div>
    </motion.form>
  );
}
