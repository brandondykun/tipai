import * as FileSystem from "expo-file-system";

export const extractAmountFromText = (text: string) => {
  const regex = /[^0-9.]/g;
  const extractedText = text.replace(regex, "");
  const parsedAmount = parseFloat(extractedText);
  return parsedAmount;
};

// let extractedText = result.text;
// const regex = /[^0-9.]/g;
// extractedText = extractedText.replace(",", ".");
// extractedText = extractedText.replace(regex, "");
// const parsedAmount = parseFloat(extractedText);

export const getAbsolutePath = (uri: string) => {
  // Extract just the filename from the full path
  const filename = uri.split("/").pop();
  // Return null if we couldn't get a filename
  if (!filename) return null;
  // Construct a clean absolute path
  return `${FileSystem.documentDirectory}${filename}`;
};
