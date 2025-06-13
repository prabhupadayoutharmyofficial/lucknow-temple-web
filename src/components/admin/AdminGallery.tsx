
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Images, Database } from 'lucide-react';

const AdminGallery = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Images className="h-5 w-5" />
              Gallery Management
            </CardTitle>
            <CardDescription>
              Manage photos in different gallery categories
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="text-center py-12">
          <Database className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Database Setup Required</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            The gallery_photos table needs to be created in the database before you can manage gallery photos. 
            Please run the SQL migration to create the required table structure.
          </p>
          <div className="mt-6 p-4 bg-muted rounded-lg text-left">
            <p className="text-sm font-mono text-muted-foreground">
              Required: CREATE TABLE gallery_photos (...)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminGallery;
