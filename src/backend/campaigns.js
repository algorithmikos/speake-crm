import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase.config";

export const createCampaign = async (campaign) => {
  if (!campaign.id) {
    toast.error("Please refresh the page and try again");
    return 1;
  }

  if (!campaign.campaignPlatform) {
    toast.error("You must provide the platform on which the ad is published");
    return 1;
  }

  if (!campaign.adName) {
    toast.error("You must provide a name for this ad");
    return 1;
  }

  if (!campaign.status || campaign.status === "n/a") {
    toast.error("You must provide the status of this ad");
    return 1;
  }

  const campaignsDocRef = doc(db, "utils", "campaigns");

  await updateDoc(campaignsDocRef, {
    value: arrayUnion(campaign),
  });
  return 2;
};

export const updateCampaign = async (modifiedCampaign, campaigns) => {
  if (!modifiedCampaign.campaignPlatform) {
    toast.error("You must provide the platform on which the ad is published");
    return 1;
  }

  if (!modifiedCampaign.adName) {
    toast.error("You must provide a name for this ad");
    return 1;
  }

  if (!modifiedCampaign.status || modifiedCampaign.status === "n/a") {
    toast.error("You must provide the status of this ad");
    return 1;
  }

  const campaignsDocRef = doc(db, "utils", "campaigns");

  await updateDoc(campaignsDocRef, {
    value: campaigns,
  });
  return 2;
};
