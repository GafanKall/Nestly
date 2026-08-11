import { PageHeader } from "@/components/ui/PageHeader";
import { NoteForm } from "@/components/notes/NoteForm";

export default function NewNotePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader title="New Note" />
      <div className="card">
        <NoteForm />
      </div>
    </div>
  );
}
