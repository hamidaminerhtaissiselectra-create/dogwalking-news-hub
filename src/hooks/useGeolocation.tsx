import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface GeoLocation {
  city: string;
  region: string;
  country: string;
  countryCode: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
}

interface UseGeolocationReturn {
  location: GeoLocation | null;
  loading: boolean;
  error: string | null;
}

const STORAGE_KEY = 'dogwalking_geolocation';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export const useGeolocation = (): UseGeolocationReturn => {
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGeolocation = async () => {
      try {
        // Check cache first
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setLocation(data);
            setLoading(false);
            return;
          }
        }

        // Fetch from edge function
        const { data, error: fnError } = await supabase.functions.invoke('geolocation');

        if (fnError) {
          console.error('Geolocation error:', fnError);
          setError(fnError.message);
          // Use fallback
          setLocation({
            city: 'Paris',
            region: 'Île-de-France',
            country: 'France',
            countryCode: 'FR'
          });
        } else if (data?.success && data?.data) {
          setLocation(data.data);
          // Cache the result
          localStorage.setItem(STORAGE_KEY, JSON.stringify({
            data: data.data,
            timestamp: Date.now()
          }));
        } else if (data?.fallback) {
          setLocation(data.fallback);
        }
      } catch (err) {
        console.error('Geolocation fetch error:', err);
        setError('Failed to get location');
        // Use fallback
        setLocation({
          city: 'Paris',
          region: 'Île-de-France',
          country: 'France',
          countryCode: 'FR'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGeolocation();
  }, []);

  return { location, loading, error };
};
