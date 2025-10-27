import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CampaignObjective, Surface, KPI, Budget, Targeting } from '@/types';

interface ReviewStepProps {
  campaignName: string;
  objective: CampaignObjective;
  surfaces: Surface[];
  kpis: KPI[];
  selectedCreatives: string[];
  targeting: Targeting;
  budget: Budget;
  schedule: { startDate?: string; endDate?: string };
}

export default function ReviewStep(props: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Review Campaign</h3>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Campaign Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div><strong>Name:</strong> {props.campaignName}</div>
          <div><strong>Objective:</strong> <Badge>{props.objective}</Badge></div>
          <div><strong>Surfaces:</strong> {props.surfaces.join(', ')}</div>
          <div><strong>KPIs:</strong> {props.kpis.join(', ')}</div>
          <div><strong>Creatives:</strong> {props.selectedCreatives.length} selected</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Budget & Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div><strong>Budget:</strong> ${props.budget.amount}/{props.budget.type}</div>
          <div><strong>Bid:</strong> ${props.budget.bidAmount} {props.budget.bidStrategy}</div>
          {props.schedule.startDate && <div><strong>Start:</strong> {props.schedule.startDate}</div>}
          {props.schedule.endDate && <div><strong>End:</strong> {props.schedule.endDate}</div>}
        </CardContent>
      </Card>
    </div>
  );
}
