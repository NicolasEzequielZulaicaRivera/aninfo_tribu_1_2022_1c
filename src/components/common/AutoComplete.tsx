import * as React from "react";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Options, OptionsRegistros } from "../../services/types";
import { zeroPad } from "../../util/util";
import { useRouter } from "next/router";

type BarProps = {
  options: Options[];
  label: string;
  routeFunction: Function;
};

const loadingOptions: Options = {
  id: 0,
  name: "Loading",
};

export default function AutoComplete({
  options,
  label,
  routeFunction,
}: BarProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  return (
    <Autocomplete
      id="combo-box-demo"
      options={options || [loadingOptions]}
      getOptionLabel={(option) =>
        zeroPad(option?.id ?? 0) + " - " + option.name
      }
      fullWidth
      renderInput={(params) => <TextField {...params} label={label} />}
      open={open}
      onInputChange={(_, value) => {
        if (value.length === 0) {
          if (open) setOpen(false);
        } else {
          if (!open) setOpen(true);
        }
      }}
      onChange={(_, value) => routeFunction(value?.id, router)}
      onClose={() => setOpen(false)}
      autoHighlight
      popupIcon={null}
    />
  );
}

type BarPropsRegistros = {
  options: OptionsRegistros[];
  label: string;
  routeFunction: Function;
};

const loadingOptionsRecurso: OptionsRegistros = {
  codigo_carga: 0,
  nombre_proyecto: "loading",
  nombre_tarea:"loading",
  nombre_recurso: "loading",
};

export function AutoCompleteRecurso({
  options,
  label,
  routeFunction,
}: BarPropsRegistros) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  return (
    <Autocomplete
      id="combo-box-demo"
      options={options || [loadingOptions]}
      getOptionLabel={(option) =>
        zeroPad(option?.codigo_carga ?? 0) + " - " + option.nombre_proyecto + " -" + option.nombre_recurso + " - " + option.nombre_tarea
      }
      fullWidth
      renderInput={(params) => <TextField {...params} label={label} />}
      open={open}
      onInputChange={(_, value) => {
        if (value.length === 0) {
          if (open) setOpen(false);
        } else {
          if (!open) setOpen(true);
        }
      }}
      onChange={(_, value) => routeFunction(value?.codigo_carga, router)}
      onClose={() => setOpen(false)}
      autoHighlight
      popupIcon={null}
    />
  );
}