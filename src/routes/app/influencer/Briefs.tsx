import { useInfluencerStore } from '@/stores/influencerStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Briefs() {
  const { briefs, applyToBrief } = useInfluencerStore();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Brand Briefs</h1>
      <div className="grid gap-4">
        {briefs.map((brief) => (
          <Card key={brief.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{brief.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{brief.advertiserName}</p>
                </div>
                <Badge variant={brief.status === 'open' ? 'default' : 'secondary'}>{brief.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">{brief.description}</p>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="font-semibold text-success">${brief.payoutAmount}</span>
                  <span className="text-muted-foreground"> {brief.payoutModel}</span>
                </div>
                {brief.status === 'open' && (
                  <Button onClick={() => applyToBrief(brief.id, 'Interested!')}>Apply</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
