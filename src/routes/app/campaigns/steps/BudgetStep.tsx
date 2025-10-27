import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Budget } from '@/types';

interface BudgetStepProps {
  budget: Budget;
  setBudget: (budget: Budget) => void;
  schedule: { startDate?: string; endDate?: string };
  setSchedule: (schedule: { startDate?: string; endDate?: string }) => void;
}

export default function BudgetStep({ budget, setBudget, schedule, setSchedule }: BudgetStepProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label>Budget Type</Label>
        <RadioGroup value={budget.type} onValueChange={(value) => setBudget({ ...budget, type: value as 'daily' | 'lifetime' })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="daily" id="daily" />
            <label htmlFor="daily" className="text-sm font-medium cursor-pointer">Daily Budget</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="lifetime" id="lifetime" />
            <label htmlFor="lifetime" className="text-sm font-medium cursor-pointer">Lifetime Budget</label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Budget Amount ($)</Label>
        <Input
          id="amount"
          type="number"
          value={budget.amount}
          onChange={(e) => setBudget({ ...budget, amount: Number(e.target.value) })}
        />
      </div>

      <div className="space-y-4">
        <Label>Bid Strategy</Label>
        <RadioGroup value={budget.bidStrategy} onValueChange={(value) => setBudget({ ...budget, bidStrategy: value as any })}>
          {['CPC', 'CPM', 'CPA'].map((strategy) => (
            <div key={strategy} className="flex items-center space-x-2">
              <RadioGroupItem value={strategy} id={strategy} />
              <label htmlFor={strategy} className="text-sm font-medium cursor-pointer">{strategy}</label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bidAmount">Bid Amount ($)</Label>
        <Input
          id="bidAmount"
          type="number"
          step="0.01"
          value={budget.bidAmount}
          onChange={(e) => setBudget({ ...budget, bidAmount: Number(e.target.value) })}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={schedule.startDate || ''}
            onChange={(e) => setSchedule({ ...schedule, startDate: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date (Optional)</Label>
          <Input
            id="endDate"
            type="date"
            value={schedule.endDate || ''}
            onChange={(e) => setSchedule({ ...schedule, endDate: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
