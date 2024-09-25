import { ReactNode } from "react";

export interface Employee {
    id: string;
    name: string;
    position: string;
    depts: string;
}

export interface Organization {
    id: string;
    name: string;
    city: string;
    address: string;
    employees?: Employee[];
}

export interface OrganizationContextType {
    organizations: Organization[];
    selectedOrg: Organization | null;
    setSelectedOrg: (org: Organization | null) => void;
    addOrganization: (organization: Organization) => void;
    updateOrganization: (updatedOrg: Organization) => void;
    deleteOrganization: (orgId: string) => void;
}

export interface OrganizationProviderProps {
    children: ReactNode;
}
