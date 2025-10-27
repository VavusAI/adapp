import { useQuery } from '@tanstack/react-query';
import { apiListCreatives } from '@/mocks/api';
import { useCreativeStore } from '@/stores/creativeStore';
import { useEffect } from 'react';
import { CampaignObjective } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Image, Video, FileText, Package } from 'lucide-react';

interface CreativeStepProps {
  objective: CampaignObjective;
  selectedCreatives: string[];
  setSelectedCreatives: (creatives: string[]) => void;
}

export default function CreativeStep({
  objective,
  selectedCreatives,
  setSelectedCreatives,
}: CreativeStepProps) {
  const { creatives, setCreatives } = useCreativeStore();

  const { data, isLoading } = useQuery({
    queryKey: ['creatives'],
    queryFn: apiListCreatives,
  });

  useEffect(() => {
    if (data) setCreatives(data);
  }, [data, setCreatives]);

  const toggleCreative = (id: string) => {
    if (selectedCreatives.includes(id)) {
      setSelectedCreatives(selectedCreatives.filter((c) => c !== id));
    } else {
      setSelectedCreatives([...selectedCreatives, id]);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'product':
        return <Package className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'native':
        return <FileText className="h-5 w-5" />;
      default:
        return <Image className="h-5 w-5" />;
    }
  };

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-xl" />
        ))}
      </div>
    );
  }

  const filteredCreatives = creatives.filter((c) => {
    if (objective === 'product') {
      return c.type === 'product' || c.type === 'image';
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Select Creatives</h3>
        <p className="text-sm text-muted-foreground">
          Choose ad creatives for this campaign
        </p>
      </div>

      {filteredCreatives.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No suitable creatives found. Please upload creatives first.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCreatives.map((creative) => {
            const isSelected = selectedCreatives.includes(creative.id);
            return (
              <Card
                key={creative.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  isSelected ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => toggleCreative(creative.id)}
              >
                <CardContent className="p-4">
                  <div className="relative aspect-square rounded-lg overflow-hidden mb-3 bg-muted">
                    {creative.thumbnail || creative.url || creative.product?.image ? (
                      <img
                        src={creative.thumbnail || creative.url || creative.product?.image}
                        alt={creative.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        {getIcon(creative.type)}
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleCreative(creative.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="capitalize">
                        {creative.type}
                      </Badge>
                      <Badge
                        variant={creative.status === 'active' ? 'default' : 'outline'}
                      >
                        {creative.status}
                      </Badge>
                    </div>
                    <p className="font-medium text-sm line-clamp-1">{creative.name}</p>
                    {creative.product && (
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {creative.product.title} - ${creative.product.price}
                      </p>
                    )}
                    {creative.native && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {creative.native.headline}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
