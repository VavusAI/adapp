import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { CampaignObjective, Surface, KPI } from '@/types';
import { ShoppingBag, Megaphone } from 'lucide-react';

interface ObjectiveStepProps {
  campaignName: string;
  setCampaignName: (name: string) => void;
  objective: CampaignObjective;
  setObjective: (objective: CampaignObjective) => void;
  surfaces: Surface[];
  setSurfaces: (surfaces: Surface[]) => void;
  kpis: KPI[];
  setKpis: (kpis: KPI[]) => void;
}

const surfaceOptions: { value: Surface; label: string; description: string }[] = [
  { value: 'shop_search', label: 'Shop Search', description: 'Product search results' },
  { value: 'product_page', label: 'Product Page', description: 'Individual product pages' },
  { value: 'social_feed', label: 'Social Feed', description: 'Social media feeds' },
  { value: 'news_article', label: 'News Article', description: 'News and blog content' },
];

const kpiOptions: { value: KPI; label: string }[] = [
  { value: 'impressions', label: 'Impressions' },
  { value: 'clicks', label: 'Clicks' },
  { value: 'conversions', label: 'Conversions' },
];

export default function ObjectiveStep({
  campaignName,
  setCampaignName,
  objective,
  setObjective,
  surfaces,
  setSurfaces,
  kpis,
  setKpis,
}: ObjectiveStepProps) {
  const toggleSurface = (surface: Surface) => {
    if (surfaces.includes(surface)) {
      setSurfaces(surfaces.filter((s) => s !== surface));
    } else {
      setSurfaces([...surfaces, surface]);
    }
  };

  const toggleKpi = (kpi: KPI) => {
    if (kpis.includes(kpi)) {
      setKpis(kpis.filter((k) => k !== kpi));
    } else {
      setKpis([...kpis, kpi]);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="campaign-name">Campaign Name</Label>
        <Input
          id="campaign-name"
          placeholder="e.g., Summer Product Launch"
          value={campaignName}
          onChange={(e) => setCampaignName(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <Label>Campaign Type</Label>
        <RadioGroup value={objective} onValueChange={(value) => setObjective(value as CampaignObjective)}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Label
              htmlFor="product"
              className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-6 hover:bg-accent hover:text-accent-foreground cursor-pointer has-[:checked]:border-primary"
            >
              <RadioGroupItem value="product" id="product" className="sr-only" />
              <ShoppingBag className="mb-3 h-12 w-12 text-primary" />
              <div className="space-y-1 text-center">
                <p className="font-semibold">Product Ads</p>
                <p className="text-sm text-muted-foreground">
                  Promote specific products
                </p>
              </div>
            </Label>

            <Label
              htmlFor="general"
              className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-6 hover:bg-accent hover:text-accent-foreground cursor-pointer has-[:checked]:border-primary"
            >
              <RadioGroupItem value="general" id="general" className="sr-only" />
              <Megaphone className="mb-3 h-12 w-12 text-accent" />
              <div className="space-y-1 text-center">
                <p className="font-semibold">General Ads</p>
                <p className="text-sm text-muted-foreground">
                  Brand awareness & engagement
                </p>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label>Ad Surfaces</Label>
        <div className="grid gap-3">
          {surfaceOptions.map((option) => (
            <div
              key={option.value}
              className="flex items-start space-x-3 rounded-lg border p-4"
            >
              <Checkbox
                id={option.value}
                checked={surfaces.includes(option.value)}
                onCheckedChange={() => toggleSurface(option.value)}
              />
              <div className="flex-1 space-y-1">
                <label
                  htmlFor={option.value}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {option.label}
                </label>
                <p className="text-sm text-muted-foreground">
                  {option.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label>Key Performance Indicators</Label>
        <div className="flex flex-wrap gap-3">
          {kpiOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={option.value}
                checked={kpis.includes(option.value)}
                onCheckedChange={() => toggleKpi(option.value)}
              />
              <label
                htmlFor={option.value}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
