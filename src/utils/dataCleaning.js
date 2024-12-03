export function capitalizeFirstLetters(str) {
  // Convert the string to lowercase for easier manipulation
  str = str.toLowerCase();

  // Split the string into an array of words
  const words = str.split(" ");

  // Loop through each word and capitalize the first letter
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].slice(1);
  }

  // Join the modified words back into a string
  return words.join(" ");
}

export function getDigitsOnly(phoneNumber) {
  // Define a map for efficient character lookup
  const digitMap = {
    "٠": "0",
    "١": "1",
    "٢": "2",
    "٣": "3",
    "٤": "4",
    "٥": "5",
    "٦": "6",
    "٧": "7",
    "٨": "8",
    "٩": "9",
  };

  // Initialize an empty string to store digits
  let allDigits = "";

  // Loop through each character in the phone number
  for (let char of phoneNumber) {
    const trimmedChar = char.trim();
    // Check if character is a valid digit using the map ONLY
    if (digitMap[trimmedChar] !== undefined) {
      allDigits += digitMap[trimmedChar];
    } else if (!isNaN(trimmedChar)) {
      allDigits += trimmedChar;
    }
  }

  // Return the extracted digits, even if empty (indicates no digits found)
  return allDigits;
}

export function formatPhoneNumber(phoneNumber) {
  // Remove non-numeric characters
  const digits = phoneNumber.replace(/\D/g, "");

  return `${digits.slice(0, 4)} ${digits.slice(4, 8)} ${digits.slice(8)}`;
}

export function timestampToDate(timestamp) {
  if (!timestamp) {
    return 0;
  }
  const ts = (timestamp.seconds + timestamp.nanoseconds * 10 ** -9) * 1000;
  return ts;
}
