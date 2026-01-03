import React from 'react';
import DashboardPage from "../../../app/dashboard/page.tsx";
import { ViewState } from "../../../types.ts";

interface DashboardHomeProps {
  onNavigate: (view: ViewState) => void;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ onNavigate }) => {
  return <DashboardPage onNavigate={onNavigate} />;
};

export default DashboardHome;