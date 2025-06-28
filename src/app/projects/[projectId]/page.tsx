import React from "react";

interface Props {
  params: Promise<{
    projectId: string;
  }>;
}

const ProjectIdPage = async ({ params }: Props) => {
  const { projectId } = await params;

  return <div>ProjectIdPage: {projectId}</div>;
};

export default ProjectIdPage;
