import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://nfgqwtrhlvjzkxrvmcnk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mZ3F3dHJobHZqemt4cnZtY25rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgxNDIzMDksImV4cCI6MjAyMzcxODMwOX0.nGSOMeKRL21F3-CkZAuVOmIg-W6U3qX0YYLnnemq2eY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
