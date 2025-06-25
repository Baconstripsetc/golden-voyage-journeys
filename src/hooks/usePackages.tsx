
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

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

  const fetchPackages = async () => {
    try {
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

      setPackages(data || []);
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

  const createPackage = async (packageData: Omit<TravelPackage, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('travel_packages')
        .insert([packageData])
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

      await fetchPackages(); // Refresh the list
      return data;
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

  const updatePackage = async (id: string, packageData: Partial<TravelPackage>) => {
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

      await fetchPackages(); // Refresh the list
      return data;
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

  const deletePackage = async (id: string) => {
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

      await fetchPackages(); // Refresh the list
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
    refreshPackages: fetchPackages,
  };
};
