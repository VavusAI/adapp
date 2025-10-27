import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: string;
  title: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export const Stepper = ({ steps, currentStep, className }: StepperProps) => {
  return (
    <nav aria-label="Progress" className={className}>
      <ol className="flex items-center">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isUpcoming = index > currentStep;

          return (
            <li
              key={step.id}
              className={cn(
                'relative flex-1',
                index !== steps.length - 1 && 'pr-8'
              )}
            >
              <div className="flex items-center">
                <div
                  className={cn(
                    'relative flex h-8 w-8 items-center justify-center rounded-full border-2',
                    isCompleted && 'border-primary bg-primary',
                    isCurrent && 'border-primary bg-background',
                    isUpcoming && 'border-muted bg-background'
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5 text-primary-foreground" />
                  ) : (
                    <span
                      className={cn(
                        'text-sm font-semibold',
                        isCurrent && 'text-primary',
                        isUpcoming && 'text-muted-foreground'
                      )}
                    >
                      {index + 1}
                    </span>
                  )}
                </div>
                <div className="ml-4 min-w-0 flex-1">
                  <p
                    className={cn(
                      'text-sm font-semibold',
                      isCurrent && 'text-foreground',
                      isCompleted && 'text-foreground',
                      isUpcoming && 'text-muted-foreground'
                    )}
                  >
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="text-xs text-muted-foreground">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
              {index !== steps.length - 1 && (
                <div
                  className={cn(
                    'absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5',
                    isCompleted ? 'bg-primary' : 'bg-muted'
                  )}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
