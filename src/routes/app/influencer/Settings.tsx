import { useInfluencerStore } from '@/stores/influencerStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function InfluencerSettings() {
  const { settings, updateSettings } = useInfluencerStore();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Ad Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Global Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="global-opt-in">Enable Ads Globally</Label>
            <Switch
              id="global-opt-in"
              checked={settings.globalOptIn}
              onCheckedChange={(checked) => updateSettings({ globalOptIn: checked })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
