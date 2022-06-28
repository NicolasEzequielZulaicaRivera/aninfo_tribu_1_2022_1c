import Modal from "../common/Modal/Modal";
import { Formik, Form } from "formik";
import FormField from "../common/Form/FormField";
import { Button, Typography } from "@mui/material";
import { saveProject } from "../../services/projects";
import { toast } from "react-toastify";
import { Project } from "../../services/types";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  project?: Project;
};

const ProjectModal = ({ open, onClose, onSave, project }: Props) => {
  const creating = project == null;

  const initialValues = {
    name: project?.name ?? "",
    initial_date: project?.initial_date ?? "",
    final_date: project?.final_date ?? "",
    description: project?.description ?? "",
  };

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.name) errors.name = "Requerido";
    if (!values.initial_date) errors.initial_date = "Requerido";
    if (!values.final_date) errors.final_date = "Requerido";
    if (values.final_date < values.initial_date)
      errors.final_date =
        "La fecha de finalización debe ser mayor a la de inicio";
    if (!values.description) errors.description = "Requerido";
    return errors;
  };

  const onSubmit = async (values: any) => {
    try {
      await saveProject(values, project?.id);
      toast.success("Proyecto guardado correctamente");
      onSave?.();
      onClose?.();
    } catch (e) {
      console.error(e);
      toast.error("Error al guardar proyecto");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ display: "flex" }}>
        <Typography variant="h5">
          {creating ? "Nuevo" : "Editar"} Proyecto
        </Typography>
        <Typography
          variant="h5"
          color="textSecondary"
          style={{ marginLeft: "10px" }}
        >
          {creating ? "" : `(ID ${project?.id})`}
        </Typography>
      </div>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <FormField name="name" label="Nombre" />
              <FormField
                name="initial_date"
                type="date"
                label="Fecha de inicio"
              />
              <FormField name="final_date" type="date" label="Fecha de fin" />
              <FormField
                name="description"
                label="Descripción"
                multiline
                maxRows={5}
              />
            </div>
            <br />
            <Button variant="contained" color="primary" type="submit">
              Guardar Proyecto
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ProjectModal;
