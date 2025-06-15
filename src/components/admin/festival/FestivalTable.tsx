
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface FestivalEvent {
  id: string;
  name: string;
  date: string;
  month: string;
  description?: string;
}

interface FestivalTableProps {
  festivals: FestivalEvent[];
  onEdit: (festival: FestivalEvent) => void;
  onDelete: (id: string) => void;
}

const FestivalTable = ({ festivals, onEdit, onDelete }: FestivalTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Festivals</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Month</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {festivals.map((festival) => (
              <TableRow key={festival.id}>
                <TableCell className="font-medium">{festival.name}</TableCell>
                <TableCell>{festival.date}</TableCell>
                <TableCell>{festival.month}</TableCell>
                <TableCell>{festival.description || 'No description'}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(festival)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(festival.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {festivals.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No festivals found. Add your first festival!
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FestivalTable;
