import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Create a Supabase client with the service role key
const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Fetch all guides
    const { data: guides, error } = await supabaseClient
      .from('guides')
      .select('id, title, description, content, created_at')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching guides:', error)
      throw error
    }

    // Return the guides as JSON with CORS headers
    return new Response(
      JSON.stringify(guides),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error('Error in guides-api function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    )
  }
})