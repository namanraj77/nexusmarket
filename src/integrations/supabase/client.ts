
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://fyzxudijpqyrkzypzcaz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5enh1ZGlqcHF5cmt6eXB6Y2F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMTIwMzMsImV4cCI6MjA1OTc4ODAzM30.XgAP62oVOlWzftN5fYHYUZqnE1eYjWWHVlc3LWedsXM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
