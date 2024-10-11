'use client';

import React, { useEffect ,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { fetchProjects, updateProjectStatus, selectProjects, selectProjectsStatus, selectProjectsError } from '../features/projects/projectSlice';
import { AppDispatch, RootState } from '../app/store';

interface ProjectCardProps {
  id: number;
  name: string;
  description: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
}

const ProjectCard: React.FC<ProjectCardProps> = ({ id, name, description, status }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PROJECT',
    item: { id, status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const ref = useRef<HTMLDivElement>(null);
  drag(ref);
  return (
    <div
      ref={ref}
      className={`p-4 mb-2 bg-white rounded-lg shadow ${isDragging ? 'opacity-50' : ''}`}
    >
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

interface ColumnProps {
  title: 'Not Started' | 'In Progress' | 'Completed';
  projects: ProjectCardProps[];
}

const Column: React.FC<ColumnProps> = ({ title, projects }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'PROJECT',
    drop: (item: { id: number, status: string }) => {
      if (item.status !== title) {
        dispatch(updateProjectStatus({ id: item.id, status: title }));
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const ref = useRef<HTMLDivElement>(null);
  drop(ref);
  return (
    <div
      ref={ref}
      className={`flex-1 p-4 bg-gray-100 rounded-lg ${isOver ? 'bg-gray-200' : ''}`}
    >
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
};

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const projects = useSelector((state: RootState) => state.projects.projects);
  const status = useSelector((state: RootState) => state.projects.status);
  const error = useSelector((state: RootState) => state.projects.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProjects());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div className="text-center">Loading projects...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  const notStarted = projects.filter((project) => project.status === 'Not Started');
  const inProgress = projects.filter((project) => project.status === 'In Progress');
  const completed = projects.filter((project) => project.status === 'Completed');

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Project Dashboard</h1>
        <div className="flex space-x-4">
          <Column title="Not Started" projects={notStarted} />
          <Column title="In Progress" projects={inProgress} />
          <Column title="Completed" projects={completed} />
        </div>
      </div>
    </DndProvider>
  );
};

export default Dashboard;