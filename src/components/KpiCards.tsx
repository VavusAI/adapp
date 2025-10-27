import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, MousePointerClick, Eye, DollarSign, Target, ArrowUpRight } from 'lucide-react';
import { CampaignStats } from '@/types';

interface KpiCardsProps {
  stats: CampaignStats;
}

export const KpiCards = ({ stats }: KpiCardsProps) => {
  const kpis = [
    {
      title: 'Impressions',
      value: stats.impressions.toLocaleString(),
      icon: Eye,
      trend: '+12.5%',
      positive: true,
    },
    {
      title: 'Clicks',
      value: stats.clicks.toLocaleString(),
      icon: MousePointerClick,
      trend: '+8.3%',
      positive: true,
    },
    {
      title: 'CTR',
      value: `${stats.ctr.toFixed(2)}%`,
      icon: Target,
      trend: '+0.5%',
      positive: true,
    },
    {
      title: 'CPC',
      value: `$${stats.cpc.toFixed(2)}`,
      icon: DollarSign,
      trend: '-5.2%',
      positive: true,
    },
    {
      title: 'Total Spend',
      value: `$${stats.spend.toLocaleString()}`,
      icon: DollarSign,
      trend: '+15.7%',
      positive: false,
    },
    {
      title: 'ROAS',
      value: `${stats.roas.toFixed(1)}x`,
      icon: ArrowUpRight,
      trend: '+0.3x',
      positive: true,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        const TrendIcon = kpi.positive ? TrendingUp : TrendingDown;
        return (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center gap-1 mt-1 text-xs">
                <TrendIcon className={`h-3 w-3 ${kpi.positive ? 'text-success' : 'text-muted-foreground'}`} />
                <span className={kpi.positive ? 'text-success' : 'text-muted-foreground'}>
                  {kpi.trend}
                </span>
                <span className="text-muted-foreground">vs last period</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
