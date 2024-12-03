import React, { useState } from "react";
import { versionChangeLog } from "./versionChangeLog";
import { Collapse, Grid, IconButton, Paper, Typography } from "@mui/material";
import { Header } from "../../components/Header";
import {
  formatDateWithTimeOrdinal,
  useMediaQueries,
} from "../../utils/functions";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const Changelog = () => {
  const { xs, sm, md, lg, xl } = useMediaQueries();

  const [expand, setExpand] = useState(
    Array(versionChangeLog.length).fill(true, 0, 3).fill(false, 4)
  );

  return (
    <Paper elevation={0} sx={{ mt: 10 }}>
      <Grid container direction="column">
        <Grid item>
          <Header text="App Change Log" />
        </Grid>

        <Grid item container>
          {versionChangeLog.map((v, index) => (
            <Grid
              item
              container
              direction="column"
              gap={1}
              sx={{ width: xs ? "100%" : "60%" }}
              key={v.version}
            >
              <Grid
                item
                container
                direction="column"
                justifyContent="end"
                gap={0.5}
              >
                <Typography
                  variant="h3"
                  component="h1"
                  className="app-font"
                  sx={{ cursor: "pointer" }}
                  onClick={() =>
                    setExpand((prev) => {
                      const updatedState = [...prev];
                      updatedState[index] = !updatedState[index];
                      return updatedState;
                    })
                  }
                >
                  <IconButton title={expand[index] ? "Show Less" : "Show More"}>
                    {expand[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>{" "}
                  v.{v.version}
                </Typography>
                {v.date && (
                  <Typography variant="body2" ml={7}>
                    {formatDateWithTimeOrdinal(v.date)}
                  </Typography>
                )}
              </Grid>

              <Collapse in={expand[index]}>
                {v.new && (
                  <>
                    <Typography
                      variant="h4"
                      className="app-font"
                      sx={{ ml: 3 }}
                    >
                      New
                    </Typography>
                    <ol className="app-font">
                      {v.new?.map((feature, index) => (
                        <li
                          key={`${feature[0]}-${index}`}
                          style={{ marginLeft: 15, marginBottom: 10 }}
                        >
                          {feature}
                        </li>
                      ))}
                    </ol>
                  </>
                )}

                {v.enhancements && (
                  <>
                    <Typography
                      variant="h4"
                      className="app-font"
                      sx={{ ml: 3 }}
                    >
                      Enhancements
                    </Typography>
                    <ol className="app-font">
                      {v.enhancements?.map((enhancement, index) => (
                        <li
                          key={`${enhancement[0]}-${index}`}
                          style={{ marginLeft: 15, marginBottom: 10 }}
                        >
                          {enhancement}
                        </li>
                      ))}
                    </ol>
                  </>
                )}

                {v.bugs && (
                  <>
                    <Typography
                      variant="h4"
                      className="app-font"
                      sx={{ ml: 3 }}
                    >
                      Solved Bugs
                    </Typography>
                    <ol className="app-font">
                      {v.bugs?.map((solvedBug, index) => (
                        <li
                          key={`${solvedBug[0]}-${index}`}
                          style={{ marginLeft: 15, marginBottom: 10 }}
                        >
                          {solvedBug}
                        </li>
                      ))}
                    </ol>
                  </>
                )}

                {v.knownBugs && (
                  <>
                    <Typography
                      variant="h4"
                      className="app-font"
                      sx={{ ml: 3 }}
                    >
                      Known Bugs
                    </Typography>
                    <ol className="app-font">
                      {v.knownBugs?.map((bug, index) => (
                        <li
                          key={`${bug[0]}-${index}`}
                          style={{ marginLeft: 15 }}
                        >
                          {bug}
                        </li>
                      ))}
                    </ol>
                  </>
                )}
              </Collapse>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Changelog;
