import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rawrvymyvdqvftpuotnq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhd3J2eW15dmRxdmZ0cHVvdG5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIzMTgxODksImV4cCI6MjAzNzg5NDE4OX0.bqHu--_mLKNeWD3ar5wJgqnnvjKdbNx-s_m4wmAlBDg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)