import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface TravelPackage {
  id: string;
  title: string;
  slug: string;
  price: string;
  duration?: string;
  travel_period?: string;
  location?: string;
  description?: string;
  rating?: number;
  review_count?: number;
  status: 'draft' | 'published';
  images?: string[];
  videos?: Array<{
    id: string;
    type: 'upload' | 'url';
    url: string;
    title?: string;
    description?: string;
    order: number;
  }>;
  highlights?: string[];
  itinerary?: Array<{
    day: string;
    activity: string;
    accommodation: string;
  }>;
  inclusions?: string[];
  exclusions?: string[];
  created_at: string;
  updated_at: string;
}

export const usePackages = () => {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const transformPackage = (pkg: any): TravelPackage => ({
    ...pkg,
    status: pkg.status as 'draft' | 'published',
    images: Array.isArray(pkg.images) ? pkg.images as string[] : [],
    videos: Array.isArray(pkg.videos) ? pkg.videos as Array<{
      id: string;
      type: 'upload' | 'url';
      url: string;
      title?: string;
      description?: string;
      order: number;
    }> : [],
    highlights: Array.isArray(pkg.highlights) ? pkg.highlights as string[] : [],
    inclusions: Array.isArray(pkg.inclusions) ? pkg.inclusions as string[] : [],
    exclusions: Array.isArray(pkg.exclusions) ? pkg.exclusions as string[] : [],
    itinerary: Array.isArray(pkg.itinerary) ? pkg.itinerary as Array<{
      day: string;
      activity: string;
      accommodation: string;
    }> : [],
  });

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('travel_packages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching packages:', error);
        toast({
          title: "Error",
          description: "Failed to fetch packages",
          variant: "destructive",
        });
        return;
      }

      const transformedPackages: TravelPackage[] = (data || []).map(transformPackage);
      setPackages(transformedPackages);
    } catch (err) {
      console.error('Error:', err);
      toast({
        title: "Error",
        description: "Failed to fetch packages",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getPackageById = async (id: string): Promise<TravelPackage | null> => {
    try {
      const { data, error } = await supabase
        .from('travel_packages')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching package:', error);
        return null;
      }

      return transformPackage(data);
    } catch (err) {
      console.error('Error:', err);
      return null;
    }
  };

  const getPackageBySlug = async (slug: string): Promise<TravelPackage | null> => {
    try {
      const { data, error } = await supabase
        .from('travel_packages')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) {
        console.error('Error fetching package:', error);
        return null;
      }

      return transformPackage(data);
    } catch (err) {
      console.error('Error:', err);
      return null;
    }
  };

  const createPackage = async (packageData: Omit<TravelPackage, 'id' | 'created_at' | 'updated_at'>): Promise<TravelPackage | null> => {
    try {
      // Generate unique slug
      const { data: slugData, error: slugError } = await supabase
        .rpc('generate_unique_slug', { 
          title_text: packageData.title, 
          table_name: 'travel_packages' 
        });

      if (slugError) {
        console.error('Error generating slug:', slugError);
        toast({
          title: "Error",
          description: "Failed to generate unique slug",
          variant: "destructive",
        });
        return null;
      }

      const finalPackageData = {
        ...packageData,
        slug: slugData || packageData.slug,
      };

      const { data, error } = await supabase
        .from('travel_packages')
        .insert([finalPackageData])
        .select()
        .single();

      if (error) {
        console.error('Error creating package:', error);
        toast({
          title: "Error",
          description: "Failed to create package",
          variant: "destructive",
        });
        return null;
      }

      toast({
        title: "Success",
        description: "Package created successfully",
      });

      await fetchPackages();
      return transformPackage(data);
    } catch (err) {
      console.error('Error:', err);
      toast({
        title: "Error",
        description: "Failed to create package",
        variant: "destructive",
      });
      return null;
    }
  };

  const updatePackage = async (id: string, packageData: Partial<TravelPackage>): Promise<TravelPackage | null> => {
    try {
      const { data, error } = await supabase
        .from('travel_packages')
        .update({ ...packageData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating package:', error);
        toast({
          title: "Error",
          description: "Failed to update package",
          variant: "destructive",
        });
        return null;
      }

      toast({
        title: "Success",
        description: "Package updated successfully",
      });

      await fetchPackages();
      return transformPackage(data);
    } catch (err) {
      console.error('Error:', err);
      toast({
        title: "Error",
        description: "Failed to update package",
        variant: "destructive",
      });
      return null;
    }
  };

  const deletePackage = async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('travel_packages')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting package:', error);
        toast({
          title: "Error",
          description: "Failed to delete package",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Success",
        description: "Package deleted successfully",
      });

      await fetchPackages();
      return true;
    } catch (err) {
      console.error('Error:', err);
      toast({
        title: "Error",
        description: "Failed to delete package",
        variant: "destructive",
      });
      return false;
    }
  };

  const publishPackage = async (id: string) => {
    return updatePackage(id, { status: 'published' });
  };

  const unpublishPackage = async (id: string) => {
    return updatePackage(id, { status: 'draft' });
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return {
    packages,
    loading,
    createPackage,
    updatePackage,
    deletePackage,
    publishPackage,
    unpublishPackage,
    getPackageById,
    getPackageBySlug,
    refreshPackages: fetchPackages,
  };
};
