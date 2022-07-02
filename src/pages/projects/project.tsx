import type { NextPage } from "next";
import { Box, Typography, Button } from "@mui/material";
import { useProject, useProjectTRs } from "../../services/projects";
import { useRouter } from "next/router";
import { zeroPad, routeToTask } from "../../util/util";
import ListBar from "../../components/common/ListBar";
import { useMemo, useState } from "react";
import TaskModal from "../../components/projects/tasks/TaskModal";
import TasksList from "../../components/projects/tasks/TasksList";
import { Task } from "../../services/types";
import Loading from "../../components/common/Loading";
import ProjectModal from "../../components/projects/ProjectModal";
import TitledText from "../../components/common/TitledText";
import StateChip from "../../components/projects/StateChip";

import styles from "../../styles/Project.module.css";

type TasksProps = {
  projectId: string;
  tasks: Task[];
  onCreate: () => void;
};
const Tasks = ({ projectId, tasks, onCreate }: TasksProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListBar
        handleNew={() => setOpen(true)}
        label="tarea"
        options={tasks}
        routeFunction={routeToTask}
      />
      <TasksList tasks={tasks} />
      <TaskModal
        open={open}
        onClose={() => setOpen(false)}
        projectId={projectId}
        onSave={onCreate}
      />
    </>
  );
};

const Project: NextPage = () => {
  const router = useRouter();
  const projectId = router?.query?.id as string;
  const lastTask = router?.query?.lastTask as string;
  const { project, error, loading, mutate } = useProject(projectId);
  const { totalTime } = useProjectTRs(parseInt(projectId));
  const [open, setOpen] = useState(false);

  const getEstimatedTime = () =>
    project?.tasks?.reduce((acc, task) => acc + task?.estimated_hours, 0) ?? 0;
  const estimatedTime = useMemo(getEstimatedTime, [project]);

  return (
    <div className="page">
      {loading ? <Loading /> : ""}
      {error ? "ERROR" : ""}
      {project && (
        <>
          <Box
            style={{
              display: "flex",
              marginTop: "20px",
              justifyContent: "space-between",
            }}
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h4"
                className={lastTask ? styles.ProjectTitle : ""}
                style={{ marginRight: "15px" }}
              >
                {zeroPad(project?.id ?? 0)} - {project?.name}
              </Typography>
              <StateChip state={project?.state} />
            </Box>
            <Button
              variant="contained"
              color="primary"
              style={{ height: "fit-content" }}
              onClick={() => setOpen(true)}
            >
              Editar Proyecto
            </Button>
          </Box>
          <Box className={styles.dataRow}>
            <TitledText title="Fecha de inicio">
              {project?.initial_date}
            </TitledText>
            <TitledText title="Fecha de fin">{project?.final_date}</TitledText>
            <TitledText title="Horas Estimadas">{estimatedTime}</TitledText>
            <TitledText title="Horas Trabajadas">
              {totalTime} ( {((totalTime / estimatedTime) * 100).toPrecision(2)}{" "}
              % )
            </TitledText>
          </Box>
          <TitledText title="Descripción">{project?.description}</TitledText>
          <Tasks
            projectId={projectId}
            tasks={project?.tasks ?? []}
            onCreate={mutate}
          />
          <ProjectModal
            open={open}
            onClose={() => setOpen(false)}
            project={project}
            onSave={mutate}
          />
        </>
      )}
    </div>
  );
};

export default Project;
