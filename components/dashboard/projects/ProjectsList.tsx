import React from 'react';
import ProjectsListPage from "../../../app/dashboard/projects/page.tsx";
import { ViewState } from "../../../types.ts";

interface ProjectsListProps {
  onNavigate: (view: ViewState) => void;
}

const ProjectsList: React.FC<ProjectsListProps> = ({ onNavigate }) => {
  // We reuse the newly designed page logic within the SPA container
  return <ProjectsListPage />;
};

export default ProjectsList;