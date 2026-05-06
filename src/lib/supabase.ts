import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://dtbyqlfehdppvqvikesx.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0YnlxbGZlaGRwcHZxdmlrZXN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1NjQ2NjcsImV4cCI6MjA5MzE0MDY2N30.W97KBlAUy1ljkdlSFkkob7uffuegnoGakQl5cA7_tWs"

export const supabase = createClient(supabaseUrl, supabaseKey)