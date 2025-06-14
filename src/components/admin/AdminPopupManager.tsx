
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save, Text } from 'lucide-react';
import { useAdminPopup } from '@/hooks/useAdminPopup';
import PopupForm from './PopupForm';

const AdminPopupManager = () => {
  const { popupData, setPopupData, loading, saving, savePopupData } = useAdminPopup();

  if (loading) {
    return <div className="text-center py-8">Loading popup settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Text className="h-6 w-6 text-krishna-blue" />
        <h2 className="text-2xl font-bold">Manage Homepage Popup</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Popup Settings</CardTitle>
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
            {saving ? 'Saving...' : 'Save Popup Settings'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPopupManager;
