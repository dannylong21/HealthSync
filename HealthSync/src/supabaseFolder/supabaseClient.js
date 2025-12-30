import {createClient} from '@supabase/supabase-js';

/* const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
*/

const supabaseUrl = "https://sitquagadxlwayiwlvmj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpdHF1YWdhZHhsd2F5aXdsdm1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4MTE2ODcsImV4cCI6MjA3OTM4NzY4N30.5biC03vQ9dZv2tjlYaPUkYdyLKIKMR-ASAX4uf-LlbQ";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);