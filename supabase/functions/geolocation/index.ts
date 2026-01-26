import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP from headers
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const clientIp = forwardedFor?.split(',')[0]?.trim() || realIp || 'unknown';

    console.log(`Geolocation request from IP: ${clientIp}`);

    // Use ip-api.com free service (no API key required)
    // Note: For production, consider using a paid service like ipinfo.io or MaxMind
    const geoResponse = await fetch(`http://ip-api.com/json/${clientIp}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone&lang=fr`);
    
    if (!geoResponse.ok) {
      console.error('Geo API error:', geoResponse.status);
      return new Response(JSON.stringify({
        success: false,
        error: 'Geo service unavailable',
        fallback: {
          city: 'Paris',
          region: 'Île-de-France',
          country: 'France',
          countryCode: 'FR'
        }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const geoData = await geoResponse.json();
    
    if (geoData.status === 'fail') {
      console.log('Geo lookup failed:', geoData.message);
      return new Response(JSON.stringify({
        success: false,
        error: geoData.message,
        fallback: {
          city: 'Paris',
          region: 'Île-de-France',
          country: 'France',
          countryCode: 'FR'
        }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Geolocation result: ${geoData.city}, ${geoData.regionName}, ${geoData.country}`);

    return new Response(JSON.stringify({
      success: true,
      data: {
        city: geoData.city || 'Paris',
        region: geoData.regionName || 'Île-de-France',
        country: geoData.country || 'France',
        countryCode: geoData.countryCode || 'FR',
        postalCode: geoData.zip || '',
        latitude: geoData.lat,
        longitude: geoData.lon,
        timezone: geoData.timezone
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error in geolocation function:', errorMessage);
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage,
      fallback: {
        city: 'Paris',
        region: 'Île-de-France',
        country: 'France',
        countryCode: 'FR'
      }
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
