import { useQuery } from '@tanstack/react-query';
import { apiListCreatives } from '@/mocks/api';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function Creatives() {
  const { data: creatives } = useQuery({ queryKey: ['creatives'], queryFn: apiListCreatives });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Creatives</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {creatives?.map((creative) => (
          <Card key={creative.id}>
            <CardContent className="p-4">
              <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-muted">
                <img src={creative.thumbnail || creative.url} alt={creative.name} className="w-full h-full object-cover" />
              </div>
              <Badge>{creative.type}</Badge>
              <p className="font-medium mt-2">{creative.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
