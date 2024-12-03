import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { setPage404 } from "../rtk/slices/ui-slice";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useMediaQueries } from "../utils/functions";

export const Page404 = () => {
  const designs = [
    {
      img: "https://i.imgur.com/kZNTPqI.png",
      title: "This Page Contains Nothing but Scraps",
      text: "A perfectly enticing pizza box sitting on a table. You open it filled with anticipation. And find… nothing but scraps. Perhaps a half-eaten crust. And a lot of grease. The anticipation turns to deep disappointment and despair. There’s nothing left!",
    },
    {
      img: "https://i.imgur.com/yW2W9SC.png",
      title: "This Page is Broken",
      text: "This mug was a family heirloom. Of your neighbor. Your neighbor always loved the color, shape, and quantity of coffee held by this mug. But your neighbor moved out and left it on their porch, no explanation, no repair materials, no nothing. So you have this broken mug.",
    },
    {
      img: "https://i.imgur.com/DWO5Hzg.png",
      title: "This Page is Wrong",
      text: "You have been trying for ten minutes. It’s pretty late at night and pretty dark in your room. You reach over and flick on a lamp. You feel oh so stupid. The gap in the toy is a triangle and you only have the cylinder and cube pieces. In dismay you toss the toy aside. Curse your five year old’s inability to keep track of the triangle!",
    },
    {
      img: "https://i.imgur.com/flHudHE.png",
      title: "This Page is Lost",
      text: "You bought a little bracelet for the express purpose of not losing your keys. You put a hook on your door specifically meant for keeping your keys. You briefly attempted to attach your keys to your phone. But here they are. In the dirt. In the park across the street from that bar you used to like but decided the last time you went that you probably wouldn’t go again. You’ll never find them.",
    },
  ];

  const dispatch = useDispatch();
  const randomIndex = useSelector((state) => state.UI.page404);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * designs.length);
    dispatch(setPage404(randomIndex));
  }, []);

  const { xs, sm, md, lg, xl } = useMediaQueries();

  return (
    <Paper elevation={0} sx={{ mt: 5 }}>
      <Header text="Page Not Found" style={{ marginBottom: 20 }} />
      <Grid container justifyContent="center">
        <Card
          style={{
            width: xs ? 290 : "30rem",
            border: "none",
            backgroundColor: "#f7f7f7",
          }}
        >
          <CardContent>
            <img src={designs[randomIndex].img} />
            <Typography variant="h6">{designs[randomIndex].title}</Typography>
            <Typography variant="body1">{designs[randomIndex].text}</Typography>
          </CardContent>

          <CardActions>
            <Button variant="primary" href="/">
              Get back to home page
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Paper>
  );
};
