import React, { createContext, useState, useContext } from 'react';
import { Organization, OrganizationContextType, OrganizationProviderProps } from './IInterface';

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

const OrganizationProvider: React.FC<OrganizationProviderProps> = ({ children }) => {
  const [organizations, setOrganizations] = useState<Organization[]>(() => {
    const localData = localStorage.getItem('organizations');
    return localData ? JSON.parse(localData) : [];
  });
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);

  const addOrganization = (organization: Organization) => {
    const updatedOrganizations = [...organizations, organization];
    setOrganizations(updatedOrganizations);
    localStorage.setItem('organizations', JSON.stringify(updatedOrganizations));
  };

  const updateOrganization = (updatedOrg: Organization) => {
    const updatedOrganizations = organizations.map((org) =>
      org.id === updatedOrg.id ? updatedOrg : org
    );
    setOrganizations(updatedOrganizations);
    localStorage.setItem('organizations', JSON.stringify(updatedOrganizations));
  };

  const deleteOrganization = (orgId: string) => {
    const updatedOrganizations = organizations.filter((org) => org.id !== orgId);
    setOrganizations(updatedOrganizations);
    localStorage.setItem('organizations', JSON.stringify(updatedOrganizations));
  };

  return (
    <OrganizationContext.Provider
      value={{
        organizations,
        selectedOrg,
        setSelectedOrg,
        addOrganization,
        updateOrganization,
        deleteOrganization,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

const useOrganization = (): OrganizationContextType => {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error('хук useOrganization должен исполняться в OrganizationProvider');
  }
  return context;
};

export { OrganizationProvider, useOrganization, OrganizationContext };