import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lvytjfabodewspdyxxas.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_KEY!;  // Non-null assertion

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
