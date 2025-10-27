import { useInfluencerStore } from '@/stores/influencerStore';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

export default function MyContent() {
  const { myContent, toggleContentAdOptIn } = useInfluencerStore();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Content</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {myContent.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="flex gap-4">
              <img src={item.thumbnail} alt={item.title} className="h-20 w-20 rounded-lg object-cover" />
              <div className="flex-1">
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground capitalize">{item.type}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Switch checked={item.adOptIn} onCheckedChange={() => toggleContentAdOptIn(item.id)} />
                  <span className="text-sm">Ads {item.adOptIn ? 'enabled' : 'disabled'}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
