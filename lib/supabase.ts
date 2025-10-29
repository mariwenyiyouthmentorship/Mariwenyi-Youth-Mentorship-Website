import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create a single supabase client for interacting with your database
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return supabase !== null
}

export interface Database {
  public: {
    Tables: {
      newsletter_subscriptions: {
        Row: {
          id: number
          email: string
          subscribed_at: string
          is_active: boolean
        }
        Insert: {
          email: string
          subscribed_at?: string
          is_active?: boolean
        }
        Update: {
          email?: string
          is_active?: boolean
        }
      }
      contact_messages: {
        Row: {
          id: number
          name: string
          email: string
          subject: string
          message: string
          submitted_at: string
          status: "new" | "read" | "replied"
        }
        Insert: {
          name: string
          email: string
          subject: string
          message: string
          submitted_at?: string
          status?: "new" | "read" | "replied"
        }
        Update: {
          status?: "new" | "read" | "replied"
        }
      }
      scholarship_applications: {
        Row: {
          id: number
          student_name: string
          school_level: string
          school: string
          currently_in_school: string
          kcpe_results: string
          parent_name: string
          parent_occupation: string
          parent_income: string
          siblings: string | null
          previous_sponsor: string
          last_term_fees: string
          present_term_fees: string
          submitted_at: string
          status: "pending" | "under_review" | "approved" | "rejected"
          reference_number: string
        }
        Insert: {
          student_name: string
          school_level: string
          school: string
          currently_in_school: string
          kcpe_results: string
          parent_name: string
          parent_occupation: string
          parent_income: string
          siblings?: string | null
          previous_sponsor: string
          last_term_fees: string
          present_term_fees: string
          submitted_at?: string
          status?: "pending" | "under_review" | "approved" | "rejected"
          reference_number: string
        }
        Update: {
          status?: "pending" | "under_review" | "approved" | "rejected"
        }
      }
    }
  }
}
