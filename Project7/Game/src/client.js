import { createClient } from '@supabase/supabase-js'

const URL = 'https://gynuajidzvqxwzjwquyl.supabase.co'
const API_KEY ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5bnVhamlkenZxeHd6andxdXlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5MTYyNDcsImV4cCI6MjA2OTQ5MjI0N30.Jy7RZeWRKX5cMa9gonvnJxIrl6am2bzh-TXRbiJOCaI'

export const supabase =createClient(URL, API_KEY)

console.log('typeof id:', typeof id);
console.log('Supabase client initialized:', supabase);