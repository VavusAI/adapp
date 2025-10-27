import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiListCampaigns } from '@/mocks/api';
import { useCampaignStore } from '@/stores/campaignStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable, Column } from '@/components/DataTable';
import { Plus } from 'lucide-react';
import { Campaign } from '@/types';

export default function CampaignsList() {
  const { campaigns, setCampaigns } = useCampaignStore();

  const { data, isLoading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: apiListCampaigns,
  });

  useEffect(() => {
    if (data) setCampaigns(data);
  }, [data, setCampaigns]);

  const columns: Column<Campaign>[] = [
    {
      key: 'name',
      header: 'Campaign Name',
      cell: (row) => (
        <Link to={`/app/campaigns/${row.id}`} className="font-medium hover:underline">
          {row.name}
        </Link>
      ),
    },
    {
      key: 'objective',
      header: 'Objective',
      cell: (row) => <span className="capitalize">{row.objective}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      cell: (row) => (
        <Badge
          variant={
            row.status === 'active'
              ? 'default'
              : row.status === 'paused'
              ? 'secondary'
              : 'outline'
          }
        >
          {row.status}
        </Badge>
      ),
    },
    {
      key: 'surfaces',
      header: 'Surfaces',
      cell: (row) => row.surfaces.length,
    },
    {
      key: 'budget',
      header: 'Budget',
      cell: (row) => `$${row.budget.amount}/${row.budget.type}`,
    },
    {
      key: 'stats',
      header: 'Impressions',
      cell: (row) => row.stats?.impressions.toLocaleString() || '—',
    },
    {
      key: 'spend',
      header: 'Spend',
      cell: (row) => row.stats ? `$${row.stats.spend.toLocaleString()}` : '—',
    },
  ];

  if (isLoading) {
    return <div>Loading campaigns...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Campaigns</h1>
          <p className="text-muted-foreground mt-1">
            Manage your advertising campaigns
          </p>
        </div>
        <Link to="/app/campaigns/new">
          <Button size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            New Campaign
          </Button>
        </Link>
      </div>

      <DataTable data={campaigns} columns={columns} pageSize={10} />
    </div>
  );
}
