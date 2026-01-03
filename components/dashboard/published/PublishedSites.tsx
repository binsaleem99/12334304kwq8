import React from 'react';
import PublishedSitesPage from "../../../app/dashboard/published/page.tsx";
import { ViewState } from "../../../types.ts";

interface PublishedSitesProps {
  onNavigate: (view: ViewState) => void;
}

const PublishedSites: React.FC<PublishedSitesProps> = ({ onNavigate }) => {
  return <PublishedSitesPage onNavigate={onNavigate} />;
};

export default PublishedSites;