import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Organization } from '@/types';

interface OrgState {
  currentOrg: Organization | null;
  organizations: Organization[];
  switchOrg: (org: Organization) => void;
  loadOrganizations: () => Promise<void>;
}

const mockOrgs: Organization[] = [
  { id: 'org-1', name: 'Acme Corp' },
  { id: 'org-2', name: 'Digital Ventures' },
];

export const useOrgStore = create<OrgState>()(
  persist(
    (set) => ({
      currentOrg: mockOrgs[0],
      organizations: mockOrgs,
      switchOrg: (org: Organization) => {
        set({ currentOrg: org });
      },
      loadOrganizations: async () => {
        // Mock API call
        set({ organizations: mockOrgs });
      },
    }),
    {
      name: 'org-storage',
    }
  )
);
