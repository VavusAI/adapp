import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Stepper } from '@/components/Stepper';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { apiCreateCampaign } from '@/mocks/api';
import { useCampaignStore } from '@/stores/campaignStore';
import { Campaign, CampaignObjective, Surface, KPI, Budget, Targeting } from '@/types';

import ObjectiveStep from './steps/ObjectiveStep';
import CreativeStep from './steps/CreativeStep';
import TargetingStep from './steps/TargetingStep';
import BudgetStep from './steps/BudgetStep';
import ReviewStep from './steps/ReviewStep';

const steps = [
  { id: 'objective', title: 'Objective', description: 'Campaign goals' },
  { id: 'creative', title: 'Creative', description: 'Ad content' },
  { id: 'targeting', title: 'Targeting', description: 'Audience & placement' },
  { id: 'budget', title: 'Budget', description: 'Spend & schedule' },
  { id: 'review', title: 'Review', description: 'Launch campaign' },
];

export default function NewCampaign() {
  const navigate = useNavigate();
  const addCampaign = useCampaignStore((state) => state.addCampaign);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Campaign data state
  const [campaignName, setCampaignName] = useState('');
  const [objective, setObjective] = useState<CampaignObjective>('product');
  const [surfaces, setSurfaces] = useState<Surface[]>([]);
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [selectedCreatives, setSelectedCreatives] = useState<string[]>([]);
  const [targeting, setTargeting] = useState<Targeting>({
    keywords: [],
    categories: [],
    hashtags: [],
    newsTopics: [],
    geo: { countries: [], cities: [] },
    devices: [],
    brandSafety: 'standard',
    frequencyCap: 3,
  });
  const [budget, setBudget] = useState<Budget>({
    type: 'daily',
    amount: 100,
    bidStrategy: 'CPC',
    bidAmount: 1.0,
    pacing: 'smooth',
  });
  const [schedule, setSchedule] = useState<{ startDate?: string; endDate?: string }>({});

  const createMutation = useMutation({
    mutationFn: apiCreateCampaign,
    onSuccess: (newCampaign) => {
      addCampaign(newCampaign);
      toast.success('Campaign created successfully!');
      navigate(`/app/campaigns/${newCampaign.id}`);
    },
    onError: () => {
      toast.error('Failed to create campaign');
    },
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    const campaignData: Omit<Campaign, 'id' | 'createdAt'> = {
      name: campaignName || `Campaign ${Date.now()}`,
      objective,
      surfaces,
      kpis,
      status: 'active',
      budget,
      targeting,
      creatives: selectedCreatives,
      ...schedule,
    };

    createMutation.mutate(campaignData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <ObjectiveStep
            campaignName={campaignName}
            setCampaignName={setCampaignName}
            objective={objective}
            setObjective={setObjective}
            surfaces={surfaces}
            setSurfaces={setSurfaces}
            kpis={kpis}
            setKpis={setKpis}
          />
        );
      case 1:
        return (
          <CreativeStep
            objective={objective}
            selectedCreatives={selectedCreatives}
            setSelectedCreatives={setSelectedCreatives}
          />
        );
      case 2:
        return (
          <TargetingStep
            targeting={targeting}
            setTargeting={setTargeting}
            surfaces={surfaces}
          />
        );
      case 3:
        return (
          <BudgetStep
            budget={budget}
            setBudget={setBudget}
            schedule={schedule}
            setSchedule={setSchedule}
          />
        );
      case 4:
        return (
          <ReviewStep
            campaignName={campaignName}
            objective={objective}
            surfaces={surfaces}
            kpis={kpis}
            selectedCreatives={selectedCreatives}
            targeting={targeting}
            budget={budget}
            schedule={schedule}
          />
        );
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return campaignName && surfaces.length > 0 && kpis.length > 0;
      case 1:
        return selectedCreatives.length > 0;
      case 2:
        return true; // Targeting is optional
      case 3:
        return budget.amount > 0 && budget.bidAmount > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Create New Campaign</h1>
        <p className="text-muted-foreground mt-1">
          Follow the steps to set up your advertising campaign
        </p>
      </div>

      <Stepper steps={steps} currentStep={currentStep} />

      <Card>
        <CardContent className="pt-6">{renderStep()}</CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          Back
        </Button>
        {currentStep === steps.length - 1 ? (
          <Button
            onClick={handleFinish}
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? 'Creating...' : 'Create Campaign'}
          </Button>
        ) : (
          <Button onClick={handleNext} disabled={!canProceed()}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
