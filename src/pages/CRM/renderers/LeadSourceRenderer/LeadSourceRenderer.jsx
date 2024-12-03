import React from "react";
import { Icon, Tooltip, capitalize } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import GroupsIcon from "@mui/icons-material/Groups";
import CellTowerIcon from "@mui/icons-material/CellTower";
import DeviceUnknownIcon from "@mui/icons-material/DeviceUnknown";
import { useSelector } from "react-redux";

const LeadSourceRenderer = ({ value, className, isCard = false }) => {
  const campaignsStore = useSelector((state) => state.campaigns);
  const { campaigns } = campaignsStore;

  const CellRender = ({ icon, className, title = "" }) => {
    return (
      <div className={`cell-container ${className}`}>
        {icon}
        {isCard && title}
      </div>
    );
  };

  if (value === "facebook") {
    return (
      <CellRender
        icon={
          <FacebookIcon fontSize="small" sx={{ mr: 0.5, color: "#1877F2" }} />
        }
        title="Facebook"
        className={className}
      />
    );
  } else if (value === "instagram") {
    return (
      <CellRender
        icon={
          <InstagramIcon fontSize="small" sx={{ mr: 0.5, color: "#f50092" }} />
        }
        title="Instagram"
        className={className}
      />
    );
  } else if (value === "whatsapp") {
    return (
      <CellRender
        icon={
          <WhatsAppIcon fontSize="small" sx={{ mr: 0.5, color: "#25D366" }} />
        }
        title="WhatsApp"
        className={className}
      />
    );
  } else if (value === "other") {
    return (
      <CellRender
        icon={<CellTowerIcon fontSize="small" sx={{ mr: 0.5 }} />}
        title="Other"
        className={className}
      />
    );
  } else if (value === "acquaintances") {
    return (
      <CellRender
        icon={<GroupsIcon fontSize="small" sx={{ mr: 0.5 }} />}
        title="Acquaintances"
        className={className}
      />
    );
  } else if (value.includes("facebook")) {
    return (
      <CellRender
        icon={
          <FacebookIcon fontSize="small" sx={{ mr: 0.5, color: "#1877F2" }} />
        }
        title={
          campaigns.find((campaign) => value.includes(campaign.id))?.adName
        }
        className={className}
      />
    );
  } else if (value.includes("whatsapp")) {
    return (
      <CellRender
        icon={
          <WhatsAppIcon fontSize="small" sx={{ mr: 0.5, color: "#25D366" }} />
        }
        title={
          campaigns.find((campaign) => value.includes(campaign.id))?.adName
        }
        className={className}
      />
    );
  } else if (value !== "n/a" || value !== "") {
    return (
      <CellRender
        // icon={
        //   <Tooltip title="Unknown" placement="right" arrow>
        //     <DeviceUnknownIcon fontSize="small" sx={{ mr: 0.5 }} />
        //   </Tooltip>
        // }
        title={
          campaigns.find((campaign) => value.includes(campaign.id))?.adName ||
          "Unknown"
        }
        className={className}
      />
    );
  }
};

export default LeadSourceRenderer;
