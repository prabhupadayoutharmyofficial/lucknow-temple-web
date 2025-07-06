import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EventNotificationRequest {
  event: {
    title: string;
    date: string;
    time: string;
    description: string;
    location?: string;
    image?: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  console.log('send-event-notification function called');

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { event }: EventNotificationRequest = await req.json();
    console.log('Processing event notification for:', event.title);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get all user emails (in a real app, you'd have a subscription system)
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('email')
      .not('email', 'is', null);

    if (profilesError) {
      console.error('Error fetching profiles:', profilesError);
      throw profilesError;
    }

    const emails = profiles?.map(p => p.email).filter(Boolean) || [];
    console.log(`Sending notification to ${emails.length} subscribers`);

    if (emails.length === 0) {
      return new Response(
        JSON.stringify({ message: "No subscribers found" }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }

    const emailHTML = `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">New Temple Event!</h1>
        </div>
        
        ${event.image ? `
          <img src="${event.image}" alt="${event.title}" style="width: 100%; height: 300px; object-fit: cover;">
        ` : ''}
        
        <div style="padding: 30px; background: #f8fafc;">
          <h2 style="color: #1e40af; margin-top: 0;">${event.title}</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0; color: #64748b;">
              <strong>📅 Date:</strong> ${event.date}
            </p>
            <p style="margin: 0 0 10px 0; color: #64748b;">
              <strong>⏰ Time:</strong> ${event.time}
            </p>
            ${event.location ? `
              <p style="margin: 0; color: #64748b;">
                <strong>📍 Location:</strong> ${event.location}
              </p>
            ` : ''}
          </div>
          
          <p style="line-height: 1.6; color: #374151;">
            ${event.description}
          </p>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="${Deno.env.get('SITE_URL') || 'https://your-temple-site.com'}/events" 
               style="background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              View Event Details
            </a>
          </div>
        </div>
        
        <div style="background: #e2e8f0; padding: 20px; text-align: center; color: #64748b; font-size: 14px;">
          <p>You're receiving this because you're subscribed to temple event notifications.</p>
        </div>
      </div>
    `;

    // Send emails in batches to avoid rate limits
    const batchSize = 50;
    const batches = [];
    for (let i = 0; i < emails.length; i += batchSize) {
      batches.push(emails.slice(i, i + batchSize));
    }

    for (const batch of batches) {
      const emailResponse = await resend.emails.send({
        from: "Temple Events <events@yourdomain.com>",
        to: batch,
        subject: `New Event: ${event.title}`,
        html: emailHTML,
      });

      console.log("Email batch sent:", emailResponse);
    }

    return new Response(
      JSON.stringify({ 
        message: `Notifications sent to ${emails.length} subscribers`,
        emailsSent: emails.length 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-event-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);