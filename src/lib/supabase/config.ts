export function getSupabaseEnv() {
  let url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ijcmmlqmnoplnrszapjr.supabase.co";
  let key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_5DAC3BCYl9oR1fkKqUAWKg_asybR6mD";

  // Safeguard: The Supabase client expects the base URL, not the REST API endpoint.
  url = url.replace(/\/rest\/v1\/?$/, "");

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://ijcmmlqmnoplnrszapjr.supabase.co";
  }

  return { url, key };
}
