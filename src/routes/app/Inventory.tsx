import { useQuery } from '@tanstack/react-query';
import { apiListInventorySlots } from '@/mocks/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Inventory() {
  const { data: slots } = useQuery({ queryKey: ['inventory'], queryFn: apiListInventorySlots });

  const groupedSlots = slots?.reduce((acc, slot) => {
    if (!acc[slot.surface]) acc[slot.surface] = [];
    acc[slot.surface].push(slot);
    return acc;
  }, {} as Record<string, typeof slots>);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Ad Inventory</h1>
        <p className="text-muted-foreground mt-1">Available ad placements across all surfaces</p>
      </div>
      {Object.entries(groupedSlots || {}).map(([surface, surfaceSlots]) => (
        <div key={surface} className="space-y-4">
          <h2 className="text-xl font-semibold capitalize">{surface.replace('_', ' ')}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {surfaceSlots.map((slot) => (
              <Card key={slot.id}>
                <CardHeader>
                  <CardTitle className="text-base">{slot.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{slot.description}</p>
                  <div className="flex gap-2">
                    <Badge variant="outline">{slot.dimensions.width}x{slot.dimensions.height}</Badge>
                    {slot.allowedFormats.map(format => <Badge key={format}>{format}</Badge>)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
