import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Draggable from "react-draggable";
import { useMediaQueries } from "../../utils/functions";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const CustomDialog = ({
  title,
  content,
  buttons,
  open,
  onClose,
  closeButton,
}) => {
  const { xs, sm, md, lg, xl } = useMediaQueries();

  return (
    <Dialog
      onClose={onClose}
      open={open}
      scroll="paper"
      fullWidth
      fullScreen={xs}
      PaperComponent={!xs && PaperComponent}
      aria-labelledby={!xs && "draggable-dialog-title"}
    >
      <DialogTitle sx={{ borderBottom: 1, borderColor: "#e0e0e0", mb: 2 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid
            item
            style={{ cursor: !xs && "move" }}
            id={!xs && "draggable-dialog-title"}
          >
            <Typography variant="h6">{title}</Typography>
          </Grid>

          <Grid item>
            <IconButton size="small" variant="contained" onClick={closeButton}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>

      <DialogContent sx={{ mb: 1 }}>{content}</DialogContent>
      {buttons && (
        <DialogActions
          sx={{
            borderTop: 1,
            borderColor: "#e0e0e0",
          }}
        >
          {buttons}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default CustomDialog;
