import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";
import { Orientation, PhotoFile } from "react-native-vision-camera";

export const extractAmountFromText = (text: string) => {
  const regex = /[^0-9.]/g;
  const extractedText = text.replace(regex, "");
  const parsedAmount = parseFloat(extractedText);
  return parsedAmount;
};

export const getAbsolutePath = (uri: string) => {
  // Extract just the filename from the full path
  const filename = uri.split("/").pop();
  // Return null if we couldn't get a filename
  if (!filename) return null;
  // Construct a clean absolute path
  return `${FileSystem.documentDirectory}${filename}`;
};

export const shouldFlipOrientation = (orientation: Orientation) => {
  if (Platform.OS === "ios") {
    if (orientation === "landscape-right") {
      return true;
    }
  } else {
    if (orientation === "portrait") {
      return true;
    }
  }
  return false;
};

export const formatCurrency = (amount: string) => {
  const parsedAmount = parseFloat(amount);
  return parsedAmount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

// This function gets the crop dimensions of the live preview so the dimensions match the visual
// dimensions of the scanning rectangle.

export const getCropDimensions = (
  frameHeight: number,
  frameWidth: number,
  dimensions: { height: number; width: number },
  RECT_WIDTH: number,
  RECT_HEIGHT: number,
  rectLeft: number,
  rectTop: number
) => {
  // Calculate the height proportion between the live preview and the screen
  const heightProportion = frameHeight / dimensions.height;
  // Calculate the amount of the live preview that is covered by the screen
  const amountCovered = heightProportion * dimensions.width;

  // calculate how much of the live preview is hanging off the left and right of the screen
  const offHang = frameWidth - amountCovered;

  // Calculate the crop width if the live preview was the same width as the screen
  const unProportionedCropWidth = (RECT_WIDTH / dimensions.width) * frameWidth;

  // Calculate actual crop width by subtracting the off hang from the un-proportioned crop width
  const cropWidth =
    unProportionedCropWidth - offHang * (RECT_WIDTH / dimensions.width);

  const visualRectHeightProportion = RECT_HEIGHT / dimensions.height;

  // Calculate the crop height to visually match the green rectangle.
  // The preview live view is rendered full screen to match the height of the screen.
  // There is none hanging off the edge, so we only need to calculate the proportional height.
  const cropHeight = visualRectHeightProportion * frameHeight;

  // Calculate the crop x position to visually match the green rectangle.
  // Since the preview live view is wider, we need to offset the x position
  // to the left by the width of the hanging off portion.
  const cropX =
    frameWidth * (rectLeft / dimensions.width) +
    (offHang * (RECT_WIDTH / dimensions.width)) / 2;

  // Adjust vertical position with an offset factor to move it down
  const verticalRatio = rectTop / dimensions.height;
  const cropY = frameHeight * verticalRatio;

  return { cropX, cropY, cropWidth, cropHeight };
};
