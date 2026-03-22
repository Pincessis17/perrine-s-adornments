import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://tvbccszndxozqijluhfo.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2YmNjc3puZHhvenFqamx1aGZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxMzU5MzksImV4cCI6MjA4OTcxMTkzOX0.4NZAvMH3STnYo5QrsweQa9qGF6FyMfrjiCdYPUN2mDo"

export const supabase = createClient(supabaseUrl, supabaseKey)