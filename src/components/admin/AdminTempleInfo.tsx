
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Save, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AdminTempleInfo = () => {
  const [templeInfo, setTempleInfo] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTempleInfo();
  }, []);

  const fetchTempleInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('temple_info')
        .select('*')
        .order('field_name');

      if (error) throw error;
      setTempleInfo(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching temple info",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item.id);
    setEditValues({
      field_value: item.field_value,
      display_label: item.display_label
    });
  };

  const handleSave = async (id: string) => {
    try {
      const { error } = await supabase
        .from('temple_info')
        .update({
          field_value: editValues.field_value,
          display_label: editValues.display_label,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      
      toast({ title: "Temple info updated successfully!" });
      setEditingItem(null);
      fetchTempleInfo();
    } catch (error: any) {
      toast({
        title: "Error updating temple info",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setEditValues({});
  };

  if (loading) {
    return <div className="text-center py-8">Loading temple information...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Manage Temple Information</h2>
      
      <div className="grid gap-4">
        {templeInfo.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{item.field_name}</CardTitle>
                <div className="flex gap-2">
                  {editingItem === item.id ? (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleSave(item.id)}
                        className="bg-krishna-blue hover:bg-krishna-blue/80"
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancel}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {editingItem === item.id ? (
                <>
                  <div>
                    <Label htmlFor={`label-${item.id}`}>Display Label</Label>
                    <Input
                      id={`label-${item.id}`}
                      value={editValues.display_label}
                      onChange={(e) => setEditValues({
                        ...editValues,
                        display_label: e.target.value
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`value-${item.id}`}>Value</Label>
                    <Textarea
                      id={`value-${item.id}`}
                      value={editValues.field_value}
                      onChange={(e) => setEditValues({
                        ...editValues,
                        field_value: e.target.value
                      })}
                      rows={3}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <strong>{item.display_label}:</strong>
                  </div>
                  <p className="text-muted-foreground">{item.field_value}</p>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminTempleInfo;
