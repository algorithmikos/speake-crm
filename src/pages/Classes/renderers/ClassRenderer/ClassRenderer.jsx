import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TypeRenderer from "../../../CRM/renderers/TypeRenderer/TypeRenderer";
import { convertTime } from "../../../../utils/functions";

const ClassRenderer = ({ classId }) => {
  const classesStore = useSelector((state) => state.classes);
  const { classes } = classesStore;

  const [sessionClassExists, setSessionClassExists] = useState(false);

  useEffect(() => {
    if (classes.length) {
      setSessionClassExists(true);
    }
  }, [classes]);

  const sessionClass = classes.find(
    (sessionClass) => sessionClass.id === classId
  );

  if (sessionClassExists) {
    return (
      <Grid container alignItems="center" gap={0.5}>
        <Grid item>
          [ <strong>{sessionClass?.days?.join(" - ")}</strong> ]
        </Grid>
        <Grid item>{convertTime(sessionClass?.startTime)} : </Grid>
        <Grid item>{convertTime(sessionClass?.endTime)}</Grid>
        <Grid item>{<TypeRenderer value={sessionClass?.place} />}</Grid>
      </Grid>
    );
  } else {
    return "";
  }
};

export default ClassRenderer;
