import { PageHeader } from "@/components/ui/PageHeader";
import { TaskForm } from "@/components/tasks/TaskForm";

export default function NewTaskPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader title="Add Task" />
      <div className="card">
        <TaskForm />
      </div>
    </div>
  );
}
