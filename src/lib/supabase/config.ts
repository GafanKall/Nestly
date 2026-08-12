export function getSupabaseEnv() {
  let url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
    );
  }

  // Safeguard: The Supabase client expects the base URL, not the REST API endpoint.
  url = url.replace(/\/rest\/v1\/?$/, "");

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL must start with http:// or https://");
  }

  return { url, key };
}

