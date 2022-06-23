import { Field, ErrorMessage } from "formik";
import { TextField, Select, TextFieldProps, SelectProps } from "@mui/material";
import styles from "./FormField.module.css";

type Props = {
  label?: string;
  name: string;
  placeholder?: string;
  type?: string;
  datalistOptions?: string[];
  selectOptions?: {
    id: string;
    name: string;
  }[];
  multiline?: boolean;
} & TextFieldProps &
  SelectProps;

const FormField = ({
  label,
  name,
  placeholder,
  type,
  datalistOptions,
  selectOptions,
  ...rest
}: Props) => {
  const field = (
    <Field
      name={name}
      type={type ?? "text"}
      placeholder={placeholder}
      list={datalistOptions && `${name}-datalist`}
      as={type === "select" || selectOptions ? Select : TextField}
      className={styles.Field}
      label={label ?? name}
      InputLabelProps={type === "date" ? { shrink: true } : undefined}
      {...rest}
    >
      {selectOptions?.map(({ id, name }, i) => (
        <option key={i} value={id}>
          {name}
        </option>
      ))}
    </Field>
  );

  const datalist = datalistOptions && (
    <datalist id={`${name}-datalist`}>
      {datalistOptions.map((value, i) => (
        <option value={value} key={i} />
      ))}
    </datalist>
  );

  return (
    <div style={{ marginTop: "15px" }}>
      {field}

      <ErrorMessage name={name} component="div" className={styles.Error} />

      {datalist}
    </div>
  );
};

export default FormField;
