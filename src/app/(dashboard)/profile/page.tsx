import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProfileForm } from "@/components/profile/ProfileForm";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader title="Settings" subtitle="Manage your account preferences." />
      
      <div className="card">
        <ProfileForm
          initialDisplayName={profile?.display_name || ""}
          email={user.email || ""}
        />
      </div>
    </div>
  );
}
