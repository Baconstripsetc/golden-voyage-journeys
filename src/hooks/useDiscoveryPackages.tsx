
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface DiscoveryPackage {
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

export const useDiscoveryPackages = () => {
  const [packages, setPackages] = useState<DiscoveryPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPackages = async () => {
    try {
      const { data, error } = await supabase
        .from('discovery_packages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching discovery packages:', error);
        toast({
          title: "Error",
          description: "Failed to fetch discovery packages",
          variant: "destructive",
        });
        return;
      }

      // Transform the data to match our DiscoveryPackage interface
      const transformedPackages: DiscoveryPackage[] = (data || []).map(pkg => ({
        ...pkg,
        status: pkg.status as 'draft' | 'published',
        images: Array.isArray(pkg.images) ? pkg.images as string[] : [],
        highlights: Array.isArray(pkg.highlights) ? pkg.highlights as string[] : [],
        inclusions: Array.isArray(pkg.inclusions) ? pkg.inclusions as string[] : [],
        exclusions: Array.isArray(pkg.exclusions) ? pkg.exclusions as string[] : [],
        itinerary: Array.isArray(pkg.itinerary) ? pkg.itinerary as Array<{
          day: string;
          activity: string;
          accommodation: string;
        }> : [],
      }));

      setPackages(transformedPackages);
    } catch (err) {
      console.error('Error:', err);
      toast({
        title: "Error",
        description: "Failed to fetch discovery packages",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createPackage = async (packageData: Omit<DiscoveryPackage, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('discovery_packages')
        .insert([packageData])
        .select()
        .single();

      if (error) {
        console.error('Error creating discovery package:', error);
        toast({
          title: "Error",
          description: "Failed to create discovery package",
          variant: "destructive",
        });
        return null;
      }

      toast({
        title: "Success",
        description: "Discovery package created successfully",
      });

      await fetchPackages(); // Refresh the list
      return data;
    } catch (err) {
      console.error('Error:', err);
      toast({
        title: "Error",
        description: "Failed to create discovery package",
        variant: "destructive",
      });
      return null;
    }
  };

  const updatePackage = async (id: string, packageData: Partial<DiscoveryPackage>) => {
    try {
      const { data, error } = await supabase
        .from('discovery_packages')
        .update({ ...packageData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating discovery package:', error);
        toast({
          title: "Error",
          description: "Failed to update discovery package",
          variant: "destructive",
        });
        return null;
      }

      toast({
        title: "Success",
        description: "Discovery package updated successfully",
      });

      await fetchPackages(); // Refresh the list
      return data;
    } catch (err) {
      console.error('Error:', err);
      toast({
        title: "Error",
        description: "Failed to update discovery package",
        variant: "destructive",
      });
      return null;
    }
  };

  const deletePackage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('discovery_packages')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting discovery package:', error);
        toast({
          title: "Error",
          description: "Failed to delete discovery package",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Success",
        description: "Discovery package deleted successfully",
      });

      await fetchPackages(); // Refresh the list
      return true;
    } catch (err) {
      console.error('Error:', err);
      toast({
        title: "Error",
        description: "Failed to delete discovery package",
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
    refreshPackages: fetchPackages,
  };
};
