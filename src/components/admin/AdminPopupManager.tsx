
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save, Text, Plus } from 'lucide-react';
import { useAdminPopup } from '@/hooks/useAdminPopup';
import PopupForm from './PopupForm';
import PopupList from './PopupList';

const AdminPopupManager = () => {
  const { popupData, setPopupData, loading, saving, savePopupData, resetForm } = useAdminPopup();

  const handleEditPopup = (popup: any) => {
    setPopupData(popup);
  };

  const handleCreateNew = () => {
    resetForm();
  };

  if (loading) {
    return <div className="text-center py-8">Loading popup settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Text className="h-6 w-6 text-krishna-blue" />
        <h2 className="text-2xl font-bold">Manage Homepage Popups</h2>
      </div>

      <PopupList onEditPopup={handleEditPopup} />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {popupData.id ? 'Edit Popup' : 'Create New Popup'}
            </CardTitle>
            {popupData.id && (
              <Button variant="outline" onClick={handleCreateNew}>
                <Plus className="h-4 w-4 mr-2" />
                Create New
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <PopupForm
            popupData={popupData}
            onPopupDataChange={setPopupData}
          />

          <Button
            onClick={savePopupData}
            disabled={saving || !popupData.title.trim()}
            className="w-full bg-krishna-blue hover:bg-krishna-blue/80"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : popupData.id ? 'Update Popup' : 'Create Popup'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPopupManager;
