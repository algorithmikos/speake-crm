import { toast } from "react-toastify";
import bidiFactory from "bidi-js";
import { Fade, Grid, useMediaQuery } from "@mui/material";
import TelegramIcon from "../components/Icons/TelegramIcon";
import { Timestamp } from "firebase/firestore";
import _ from "lodash";

export function triggerCall(phoneNumber) {
  // Check if the device supports making calls (for mobile browsers)
  if (
    typeof window.navigator.userAgent === "string" &&
    window.navigator.userAgent.indexOf("Mobile") !== -1
  ) {
    // Use a tel: link to initiate a call on mobile devices
    window.location.href = `tel:${phoneNumber}`;
  } else {
    // Alert the user that calling is not supported on this device
    toast.error("Calling is not supported on this device.");
  }
}

export function openWhatsAppChat(phoneNumber) {
  // Validate phone number (optional)
  // You can add logic here to validate the phone number format

  const url = `https://wa.me/2${phoneNumber}`;
  window.open(url, "_blank");
}

export function copyToClipboard(text, msg = "Copied phone number!") {
  if (!navigator.clipboard) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
    toast(msg, {
      autoClose: 300,
      position: "bottom-center",
      hideProgressBar: true,
      icon: "",
      theme: "colored",
      style: {
        background: `linear-gradient(to right, #fff8e1 0%, #fbedb7 30%, #f8e89b 100%)`,
      },
      closeButton: false,
    });
    return false;
  }
  return navigator.clipboard.writeText(text).then(
    function () {
      toast(msg, {
        autoClose: 300,
        position: "bottom-center",
        hideProgressBar: true,
        icon: "",
        theme: "colored",
        style: {
          background: `linear-gradient(to right, #fff8e1 0%, #fbedb7 30%, #f8e89b 100%)`,
        },
        closeButton: false,
      });
      return true;
    },
    function (err) {
      toast.error("Copying to clipboard failed!");
      return false;
    }
  );
}

export function formatDateWithTimeOrdinal(date) {
  if (!date) return null; // Handle cases where date is undefined or null

  const dayNumber = date.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  const hours = date.getHours() % 12 || 12; // 12-hour format

  const minutes = date.getMinutes().toString().padStart(2, "0");
  const amPm = date.getHours() >= 12 ? "PM" : "AM";

  // Get the appropriate ordinal suffix for the day number
  const ordinalSuffix = getOrdinalSuffix(dayNumber);

  const dateString = `${dayNumber}${ordinalSuffix} of ${month}, ${year} @ ${hours}:${minutes} ${amPm}`;

  return dateString;
}

function getOrdinalSuffix(dayNumber) {
  const suffixes = ["st", "nd", "rd", "th"];
  const remainder = dayNumber % 10; // Use remainder of 10 for single digit days

  return remainder === 1 && dayNumber !== 11 // "st" for 1st but not 11th
    ? suffixes[0]
    : remainder === 2 && dayNumber !== 12 // "nd" for 2nd but not 12th
    ? suffixes[1]
    : remainder === 3 && dayNumber !== 13 // "rd" for 3rd but not 13th
    ? suffixes[2]
    : suffixes[3]; // "th" for all other cases
}

export function formatDateForTextField(date) {
  if (!date) {
    return null;
  }
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Add leading zero for single-digit months
  const day = String(dateObject.getDate()).padStart(2, "0");
  const hours = String(dateObject.getHours()).padStart(2, "0");
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");
  const seconds = String(dateObject.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

export function generateUID() {
  const array = new Uint32Array(3); // Generate 3 random 32-bit numbers for better randomness
  window.crypto.getRandomValues(array);
  const randomPart = Array.from(array)
    .map((value) => value.toString(16).padStart(8, "0"))
    .join("");

  const timestamp = Number(new Date()); // Formatted timestamp (YYYYMMDDHHmm)

  return (timestamp + randomPart).slice(0, 20);
}

export const useMediaQueries = () => {
  const xs = useMediaQuery("(max-width: 599.95px)");
  const sm = useMediaQuery("(min-width: 600px) and (max-width: 959.95px)");
  const md = useMediaQuery("(min-width: 960px) and (max-width: 1279.95px)");
  const lg = useMediaQuery("(min-width: 1280px) and (max-width: 1919.95px)");
  const xl = useMediaQuery("(min-width: 1920px)");

  return { xs, sm, md, lg, xl };
};

export function convertTime(timeString) {
  // Check for valid time format (HH:MM)
  const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
  if (!timeRegex.test(timeString)) {
    return "Invalid time format";
  }

  // Extract hours and minutes
  const [hours, minutes] = timeString.split(":");
  const parsedHours = parseInt(hours, 10);

  // Convert to 12-hour format
  let meridiem = "AM";
  let newHours = parsedHours;
  if (parsedHours >= 12) {
    meridiem = "PM";
    newHours = parsedHours % 12;
    if (newHours === 0) {
      newHours = 12; // Handle midnight as 12:00 AM
    }
  } else if (newHours === 0) {
    newHours = 12; // Handle noon as 12:00 PM
  }

  // Return formatted time string
  return `${newHours.toString().padStart(2, "0")}:${minutes} ${meridiem}`;
}

export function areArraysIdentical(arr1, arr2) {
  if (arr1?.length !== arr2?.length) {
    return false;
  }
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

const bidi = bidiFactory();

export const textDir = (string) => {
  if (string) {
    const bidiType = bidi.getBidiCharTypeName(string[0]);

    let direction = "";
    if (bidiType === "L") {
      direction = "left";
    } else if (bidiType === "AL") {
      direction = "right";
    }

    return direction;
  }
};

export function stringToTimestamp(timestampString) {
  // Extract seconds and nanoseconds using regular expressions or string manipulation
  const match = timestampString.match(/seconds=(\d+), nanoseconds=(\d+)/);
  if (!match) {
    throw new Error("Invalid timestamp string format");
  }

  const seconds = parseInt(match[1], 10);
  const nanoseconds = parseInt(match[2], 10);

  // Create a Firestore Timestamp object
  return new Timestamp(seconds, nanoseconds);
}

export function compareObjects(oldObj, newObj) {
  const changes = {};

  // Iterate over old object to find removed or modified properties
  _.forOwn(oldObj, (value, key) => {
    if (!_.isEqual(value, newObj[key])) {
      changes[key] = { old: value, new: newObj[key] };
    } else if (!newObj.hasOwnProperty(key)) {
      // Property removed
      changes[key] = { old: value, new: undefined };
    }
  });

  // Iterate over new object to find added properties
  _.forOwn(newObj, (value, key) => {
    if (!oldObj.hasOwnProperty(key)) {
      // Property added
      changes[key] = { old: undefined, new: value };
    }
  });

  return changes;
}
