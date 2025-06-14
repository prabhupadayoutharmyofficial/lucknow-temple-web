
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit } from 'lucide-react';
import { usePopupList } from '@/hooks/usePopupList';

interface PopupListProps {
  onEditPopup: (popup: any) => void;
}

const PopupList = ({ onEditPopup }: PopupListProps) => {
  const { popups, loading, deletePopup } = usePopupList();

  if (loading) {
    return <div className="text-center py-4">Loading popups...</div>;
  }

  if (popups.length === 0) {
    return (
      <Card>
        <CardContent className="py-6">
          <p className="text-center text-muted-foreground">No popups created yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Existing Popups</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {popups.map((popup) => (
            <div key={popup.id} className="border rounded-lg p-4 space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold">{popup.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {popup.content}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={popup.is_enabled ? "default" : "secondary"}>
                      {popup.is_enabled ? "Enabled" : "Disabled"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Updated: {new Date(popup.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditPopup(popup)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deletePopup(popup.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {popup.image_url && (
                <div className="mt-2">
                  <img
                    src={popup.image_url}
                    alt="Popup preview"
                    className="w-20 h-20 object-cover rounded"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PopupList;
