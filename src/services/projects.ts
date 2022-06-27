import { projectsApi, projectsResourcesApi, useSWR } from "./requests";
import { Project, Task, Employee } from "./types";

const saveHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const checkStatus = (res: Response) => {
  if (!res.ok) throw new Error(res.statusText);
  return res;
};

export const projectsFetch = async (url: string, request?: any) => {
  {console.log(projectsApi + url)}
  return fetch(projectsApi + url, {
    ...request,
  })
    .then(checkStatus)
    .then((res) => res.json());
};

export const useProjects = () => {
  const { data, error, isValidating, ...rest } = useSWR(
    "/projects/",
    projectsFetch
  );
  const loading = !data && isValidating;

  const projects = data as Project[];

  console.log(error);

  return { projects, error, loading, ...rest };
};

export const useProject = (projectId: string) => {
  const { data, error, isValidating, ...rest } = useSWR(
    projectId ? "/projects/" + projectId : null,
    projectsFetch
  );
  const loading = !data && isValidating;

  const project = data as Project;

  console.log(error);

  return { project, error, loading, ...rest };
};

export const saveProject = async (project: Project, id?: number) =>
  await fetch(`${projectsApi}/projects/${id ?? ""}`, {
    method: id == null ? "POST" : "PUT",
    headers: saveHeaders,
    body: JSON.stringify(removeEmpty(project)),
  }).then(checkStatus);

export const useTask = (taskId: string) => {
  const { data, error, isValidating, ...rest } = useSWR(
    taskId ? "/tasks/" + taskId : null,
    projectsFetch
  );
  const loading = !data && isValidating;

  const task = data as Task;

  return { task, error, loading, ...rest };
};

export const saveTask = async (
  task: Task,
  projectId?: string,
  taskId?: number
) =>
  await fetch(
    projectsApi +
      (projectId ? `/projects/${projectId}/tasks/` : `/tasks/${taskId}`),
    {
      method: projectId ? "POST" : "PUT",
      headers: saveHeaders,
      body: JSON.stringify(removeEmpty(task)),
    }
  ).then(checkStatus);

export const employeesFetch = async (url: string, request?: any) => {
  return fetch(projectsResourcesApi + url, {
    ...request,
    headers: {
      accept: "application/json",
    },
  }).then((res) => res.json());
};

export const useEmployees = () => {
  const { data, error, isValidating, ...rest } = useSWR(
    "/resources/",
    employeesFetch
  );
  const loadingEmployee = !data && isValidating;

  const employees = data as Employee[];

  return { employees, error, loadingEmployee, ...rest };
};

const removeEmpty = <T>(object: T): T => {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [
      key,
      value === "" ? null : value,
    ])
  ) as T;
};
