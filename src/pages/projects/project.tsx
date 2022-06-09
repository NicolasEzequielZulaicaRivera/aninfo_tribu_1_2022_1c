import type { NextPage } from "next";

import { useProject } from "../../services/projects";
import { useRouter } from "next/router";

const Projects: NextPage = () => {
  const router = useRouter();
  const projectId = router?.query?.id as string;
  const { project, error, loading } = useProject(projectId);

  return (
    <div className="page">
      {loading ? "LOADING" : ""}
      {error ? "ERROR" : ""}
      {project && (
        <>
          <h1>{project?.name}</h1>
          <p>initial_date {project?.initial_date}</p>
          <p>final_date {project?.final_date}</p>
          <p>estimated_hours {project?.estimated_hours}</p>
        </>
      )}
    </div>
  );
};

export default Projects;
