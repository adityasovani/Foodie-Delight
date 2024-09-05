import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://crifglzsfsfwryhzvndx.supabase.co'
const supabase = createClient(supabaseUrl, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyaWZnbHpzZnNmd3J5aHp2bmR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzNTk0NTUsImV4cCI6MjA0MDkzNTQ1NX0.M-oZGAGnVNzIyz9zDJ0wQ-q0ChIq6wwbCKyQXizcrHc');
export default supabase