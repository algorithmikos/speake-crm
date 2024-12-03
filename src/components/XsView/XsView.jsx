import {
  Alert,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Table,
  TableBody,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import CardRow from "../CardRow/CardRow";

import BadgeIcon from "@mui/icons-material/Badge";

const XsView = ({
  item,
  rows,
  selectedItems,
  setSelectedItems,
  itemBadgeName,
  itemBadgeId,
  buttons,
  showItemBadgeId = true,
  showActionArea = true,
}) => {
  const dispatch = useDispatch();

  return (
    <Card
      elevation={5}
      onDoubleClick={() => {
        if (selectedItems.includes(item.id)) {
          const updatedSelectedItems = [...selectedItems].filter(
            (id) => id !== item.id
          );
          dispatch(setSelectedItems(updatedSelectedItems));
        } else {
          const updatedselectedItems = [...selectedItems, item.id];
          dispatch(setSelectedItems(updatedselectedItems));
        }
      }}
      sx={{
        width: 350,
        backgroundColor: selectedItems?.includes(item.id) && "#f1f2f3",
      }}
    >
      <CardHeader
        title={
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item width={showItemBadgeId ? "50%" : "100%"}>
              {itemBadgeName}
            </Grid>

            {showItemBadgeId && (
              <Alert
                severity="info"
                icon={<BadgeIcon />}
                sx={{
                  fontSize: 17,
                  fontWeight: "bold",
                }}
              >
                {itemBadgeId}
              </Alert>
            )}
          </Grid>
        }
      />
      <Divider />
      <CardContent sx={{ p: 0 }}>
        <Table size="small">
          <TableBody>
            {rows?.map((row, index) =>
              row.hideEmpty ? (
                (row.value || row.value > 0) && (
                  <CardRow
                    key={`${index}-${row.firstCell}`}
                    firstCell={row.firstCell}
                    secondCell={row.secondCell}
                  />
                )
              ) : (
                <CardRow
                  key={`${index}-${row.firstCell}`}
                  firstCell={row.firstCell}
                  secondCell={row.secondCell}
                />
              )
            )}
          </TableBody>
        </Table>
      </CardContent>
      {showActionArea && (
        <>
          <Divider />
          <CardActions>
            <Grid container justifyContent="space-between">
              {buttons}
            </Grid>
          </CardActions>
        </>
      )}
    </Card>
  );
};

export default XsView;
