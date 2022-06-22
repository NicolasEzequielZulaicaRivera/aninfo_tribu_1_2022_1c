import { Task } from "../../../services/types";
import InfoCard from "../../common/Card";
import Loading from "../../common/Loading";
import Caption from "../../common/Caption";
import styles from "../Projects.module.css";

type TasksListProps = {
  tasks: Task[];
  error?: any;
  loading?: boolean;
};

const TasksList = ({ tasks, error, loading }: TasksListProps) => {
  return (
    <div className={styles.TasksList + " flexContainer"}>
      {loading ? <Loading /> : ""}
      {error ? "ERROR" : ""}
      {tasks?.map((task: Task, i: number) => (
        <InfoCard key={i} info={task} link="/projects/task?id=" />
      ))}
      <Caption>{tasks?.length ? "" : "No hay tareas"}</Caption>
    </div>
  );
};

export default TasksList;
