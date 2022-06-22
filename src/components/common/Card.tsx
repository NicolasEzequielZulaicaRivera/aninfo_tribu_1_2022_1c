import styles from "./Card.module.css";
import Link from "next/link";
import { Project, Task } from "../../services/types";
import { zeroPad, dateDiff, pluralize } from "../../util/util";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  Tooltip,
} from "@material-ui/core";

const InfoCard = ({
  info,
  link,
  children,
}: {
  info: Project | Task;
  link: string;
  children?: React.ReactNode;
}) => {
  let daysToEnd = dateDiff(new Date(info.final_date), new Date());

  let finishString = "";
  if (daysToEnd > 0) finishString = `${pluralize("día", daysToEnd)} restantes`;
  else if (daysToEnd < 0)
    finishString = `finalizado hace ${pluralize("día", Math.abs(daysToEnd))}`;
  else finishString = "finaliza hoy";

  return (
    <Link href={link + info?.id}>
      <a className={styles.InfoCard}>
        <Card style={{ padding: 0 }}>
          <CardActionArea>
            <CardContent>
              <Typography
                variant="h6"
                component="h4"
                style={{ fontWeight: 700, textOverflow: "ellipsis" }}
                noWrap
              >
                {zeroPad(info?.id ?? 0)} - {info.name}
              </Typography>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Tooltip
                  title={`Fecha de fin: ${info.final_date}`}
                  style={{
                    width: "fit-content",
                    height: "fit-content",
                    alignSelf: "flex-end",
                  }}
                  placement="right"
                >
                  <Typography variant="subtitle1">
                    {`Iniciado el ${info.initial_date} (${finishString})`}
                  </Typography>
                </Tooltip>
                <Box>{children}</Box>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </a>
    </Link>
  );
};

export default InfoCard;
