import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Megaphone, Video } from 'lucide-react';
import { UserRole } from '@/types';

export default function ChooseRole() {
  const navigate = useNavigate();
  const setRole = useAuthStore((state) => state.setRole);

  const handleRoleSelect = (role: UserRole) => {
    setRole(role);
    navigate('/app/overview');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background p-4">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Choose Your Role
          </h1>
          <p className="text-muted-foreground">
            Select how you'd like to use Vavus Ads
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="cursor-pointer transition-all hover:shadow-xl hover:scale-105" onClick={() => handleRoleSelect('advertiser')}>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Megaphone className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Advertiser</CardTitle>
              <CardDescription>
                Create and manage advertising campaigns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Create product and general ad campaigns</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Target across shop, social, and news surfaces</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Advanced targeting and budget controls</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Detailed analytics and reporting</span>
                </li>
              </ul>
              <Button className="w-full" onClick={() => handleRoleSelect('advertiser')}>
                Continue as Advertiser
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer transition-all hover:shadow-xl hover:scale-105" onClick={() => handleRoleSelect('creator')}>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
                <Video className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-2xl">Influencer / Creator</CardTitle>
              <CardDescription>
                Monetize your content with ads
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>Enable ads on your posts and videos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>Control category preferences and brand safety</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>Browse and apply to advertiser briefs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>Track earnings and performance</span>
                </li>
              </ul>
              <Button className="w-full" variant="secondary" onClick={() => handleRoleSelect('creator')}>
                Continue as Creator
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
