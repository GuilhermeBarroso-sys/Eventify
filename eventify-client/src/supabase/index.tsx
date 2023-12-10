
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL   ?? "https://auroojfqoaxkzudmiapj.supabase.co" as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY  ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1cm9vamZxb2F4a3p1ZG1pYXBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU0MDA5NjAsImV4cCI6MjAxMDk3Njk2MH0.ckhYWx8zxqL03gHZPAPsfxLFQTuEiabw8eNj38ndIsc" as string;
export const supabase = createClient(supabaseUrl, supabaseKey);

