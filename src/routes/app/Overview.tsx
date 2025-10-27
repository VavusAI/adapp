import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useCampaignStore } from '@/stores/campaignStore';
import { useInfluencerStore } from '@/stores/influencerStore';
import { useQuery } from '@tanstack/react-query';
import { apiListCampaigns, apiListMyContent, apiListBriefs } from '@/mocks/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { KpiCards } from '@/components/KpiCards';
import { Plus, TrendingUp, Eye, MousePointerClick, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

export default function Overview() {
  const user = useAuthStore((state) => state.user);
  const { campaigns, setCampaigns } = useCampaignStore();
  const { setMyContent, setBriefs } = useInfluencerStore();

  const { data: campaignsData, isLoading: campaignsLoading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: apiListCampaigns,
    enabled: user?.role === 'advertiser',
  });

  const { data: contentData } = useQuery({
    queryKey: ['myContent'],
    queryFn: apiListMyContent,
    enabled: user?.role === 'creator',
  });

  const { data: briefsData } = useQuery({
    queryKey: ['briefs'],
    queryFn: apiListBriefs,
    enabled: user?.role === 'creator',
  });

  useEffect(() => {
    if (campaignsData) setCampaigns(campaignsData);
  }, [campaignsData, setCampaigns]);

  useEffect(() => {
    if (contentData) setMyContent(contentData);
    if (briefsData) setBriefs(briefsData);
  }, [contentData, briefsData, setMyContent, setBriefs]);

  if (user?.role === 'advertiser') {
    const activeCampaigns = campaigns.filter((c) => c.status === 'active');
    const totalStats = campaigns.reduce(
      (acc, c) => {
        if (c.stats) {
          return {
            impressions: acc.impressions + c.stats.impressions,
            clicks: acc.clicks + c.stats.clicks,
            ctr: acc.impressions > 0 ? ((acc.clicks + c.stats.clicks) / (acc.impressions + c.stats.impressions)) * 100 : 0,
            cpc: acc.clicks > 0 ? (acc.spend + c.stats.spend) / (acc.clicks + c.stats.clicks) : 0,
            cpm: acc.impressions > 0 ? ((acc.spend + c.stats.spend) / (acc.impressions + c.stats.impressions)) * 1000 : 0,
            spend: acc.spend + c.stats.spend,
            conversions: acc.conversions + c.stats.conversions,
            roas: c.stats.conversions > 0 ? (acc.conversions + c.stats.conversions) / (acc.spend + c.stats.spend) * 100 : 0,
          };
        }
        return acc;
      },
      { impressions: 0, clicks: 0, ctr: 0, cpc: 0, cpm: 0, spend: 0, conversions: 0, roas: 0 }
    );

    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
            <p className="text-muted-foreground mt-1">
              Here's an overview of your advertising performance
            </p>
          </div>
          <Link to="/app/campaigns/new">
            <Button size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              New Campaign
            </Button>
          </Link>
        </div>

        {campaignsLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <KpiCards stats={totalStats} />
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Active Campaigns</CardTitle>
              <CardDescription>Currently running campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              {activeCampaigns.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No active campaigns</p>
                  <Link to="/app/campaigns/new">
                    <Button variant="outline">Create Your First Campaign</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeCampaigns.slice(0, 5).map((campaign) => (
                    <Link key={campaign.id} to={`/app/campaigns/${campaign.id}`}>
                      <div className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary cursor-pointer transition-colors">
                        <div>
                          <p className="font-medium">{campaign.name}</p>
                          <p className="text-sm text-muted-foreground capitalize">
                            {campaign.objective} • {campaign.surfaces.length} surfaces
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">${campaign.stats?.spend.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">spent</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link to="/app/campaigns/new">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Plus className="h-4 w-4" />
                  Create New Campaign
                </Button>
              </Link>
              <Link to="/app/creatives">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Plus className="h-4 w-4" />
                  Upload Creative
                </Button>
              </Link>
              <Link to="/app/reports">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <TrendingUp className="h-4 w-4" />
                  View Reports
                </Button>
              </Link>
              <Link to="/app/inventory">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Eye className="h-4 w-4" />
                  Explore Ad Placements
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Creator view
  const optedInContent = contentData?.filter((c) => c.adOptIn).length || 0;
  const openBriefs = briefsData?.filter((b) => b.status === 'open').length || 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground mt-1">
          Manage your content monetization and brand partnerships
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Content
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentData?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {optedInContent} with ads enabled
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Open Briefs
            </CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openBriefs}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Available opportunities
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Est. Earnings
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,234</div>
            <p className="text-xs text-success mt-1">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ad Impressions
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.2K</div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Content</CardTitle>
            <CardDescription>Your latest posts and videos</CardDescription>
          </CardHeader>
          <CardContent>
            {!contentData || contentData.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No content yet</p>
                <Link to="/app/influencer/content">
                  <Button variant="outline">Manage Content</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {contentData.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {item.type} • Ads {item.adOptIn ? 'enabled' : 'disabled'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Briefs</CardTitle>
            <CardDescription>Brand partnership opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            {!briefsData || briefsData.filter(b => b.status === 'open').length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No open briefs</p>
              </div>
            ) : (
              <div className="space-y-4">
                {briefsData
                  .filter((b) => b.status === 'open')
                  .slice(0, 3)
                  .map((brief) => (
                    <div key={brief.id} className="p-3 rounded-lg border">
                      <p className="font-medium">{brief.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {brief.advertiserName}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-medium text-success">
                          ${brief.payoutAmount} {brief.payoutModel}
                        </span>
                        <Link to="/app/influencer/briefs">
                          <Button size="sm" variant="outline">View</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
