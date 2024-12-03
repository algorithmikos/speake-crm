import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import "./SideBar.css";

import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import QuickreplyIcon from "@mui/icons-material/Quickreply";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import StorefrontIcon from "@mui/icons-material/Storefront";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import { useMediaQueries } from "../../utils/functions";
import { Settings } from "@mui/icons-material";

const SideBar = () => {
  const list = [
    {
      title: "Dashboard",
      path: "/",
      icon: <HomeIcon />,
    },
    {
      title: "CRM",
      path: "/crm",
      icon: <SupportAgentIcon />,
    },
    {
      title: "Students",
      path: "/students",
      icon: <SchoolIcon />,
    },
    {
      title: "Classes",
      path: "/classes",
      icon: <MenuBookIcon />,
    },
    {
      title: "Sessions",
      path: "/sessions",
      icon: <Diversity3Icon />,
    },
    { title: "Marketing", path: "/marketing", icon: <StorefrontIcon /> },
    {
      title: "Reply Texts",
      path: "/replies",
      icon: <QuickreplyIcon />,
    },
    // {
    //   title: "Mr. Umar's Planner",
    //   path: "/times",
    //   icon: <CalendarMonthIcon />,
    // },

    // {
    //   title: "Assignments",
    //   path: "/assignments",
    //   icon: <AssignmentIcon />,
    // },
    // {
    //   title: "Exams",
    //   path: "/exams",
    //   icon: <HistoryEduIcon />,
    // },
    { title: "Settings", path: "/settings", icon: <Settings /> },
    { title: "Change Log", path: "/changelog", icon: <TrackChangesIcon /> },
    // {
    //   title: "Add Student(s)",
    //   path: "/add-students",
    //   icon: <GroupAddIcon />,
    // },
    // {
    //   title: "Payments",
    //   path: "/payments",
    //   icon: <AttachMoneyIcon />,
    // },
  ];

  const location = useLocation();

  const { xs, sm, md, lg, xl } = useMediaQueries();

  return (
    <List sx={{ mt: xs ? 6 : 7, width: "100%" }}>
      {list.map((item, index) => (
        <Link
          key={item.path}
          to={item.path}
          className={`sidebar-item ${
            location.pathname === item.path ? "active-sidebar-item" : ""
          }`}
        >
          <Tooltip title={item.title} arrow placement="right">
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: xs ? 2 : 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Tooltip>
        </Link>
      ))}
    </List>
  );
};

export default SideBar;
