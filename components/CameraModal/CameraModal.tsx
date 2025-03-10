import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import { useCallback, useEffect, useRef, useState } from "react";
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";
import TextRecognition, {
  TextRecognitionScript,
} from "@react-native-ml-kit/text-recognition";
import RectangleOverlay from "../RectangleOverlay/RectangleOverlay";
import TransparentOverlay from "../TransparentOverlay/TransparentOverlay";
import CloseButton from "../CloseButton/CloseButton";
import AmountPreview from "../AmountPreview/AmountPreview";
import BottomControls from "../BottomControls/BottomControls";
import { extractAmountFromText, getAbsolutePath } from "../../utils/utils";

type Props = {
  cameraVisible: boolean;
  setCameraVisible: React.Dispatch<React.SetStateAction<boolean>>;
  totalAmount: number;
  setTotalAmount: React.Dispatch<React.SetStateAction<number>>;
  setImages: React.Dispatch<
    React.SetStateAction<ImageManipulator.ImageResult[]>
  >;
};

const CameraModal = ({
  cameraVisible,
  setCameraVisible,
  totalAmount,
  setTotalAmount,
  setImages,
}: Props) => {
  const dimensions = useWindowDimensions();
  const camera = useRef<Camera>(null);
  const processingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const device = useCameraDevice("back");

  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [scanning, setScanning] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Define the rectangle dimensions
  const RECT_WIDTH = dimensions.width * 0.6;
  const RECT_HEIGHT = dimensions.height * 0.07;

  // Calculate rectangle position (centered)
  const rectLeft = (dimensions.width - RECT_WIDTH) / 2;
  const rectTop = (dimensions.height - RECT_HEIGHT) / 4;

  // Function to process the captured frame
  const processFrame = useCallback(
    async (path: string, frameHeight: number, frameWidth: number) => {
      if (isProcessing) return;
      setIsProcessing(true);

      try {
        // Calculate aspect ratios to handle coordinate mapping
        const screenAspectRatio = dimensions.width / dimensions.height;
        const imageAspectRatio = frameWidth / frameHeight;

        // Calculate scaling factors
        let scale;
        if (screenAspectRatio > imageAspectRatio) {
          // Image is taller relative to screen
          scale = dimensions.width / frameWidth;
        } else {
          // Image is wider relative to screen
          scale = dimensions.height / frameHeight;
        }

        // Use exact proportions from the green rectangle
        const cropWidth = RECT_WIDTH / scale;
        const cropHeight = RECT_HEIGHT / scale;

        // Keep horizontal position the same
        const cropX = frameWidth * (rectLeft / dimensions.width);

        // Adjust vertical position with an offset factor to move it down
        const verticalRatio = rectTop / dimensions.height;
        const offsetFactor = 1.9; // Adjust this value to move the crop down
        const cropY = frameHeight * (verticalRatio * offsetFactor);

        console.log("Screen dimensions:", dimensions.width, dimensions.height);
        console.log("Frame dimensions:", frameWidth, frameHeight);
        console.log("Rectangle position:", rectLeft, rectTop);
        console.log("Vertical ratio:", verticalRatio);
        console.log("Adjusted vertical ratio:", verticalRatio * offsetFactor);
        console.log("Crop position:", cropX, cropY);
        console.log("Scale:", scale);

        // crop the image
        const manipulator = ImageManipulator.ImageManipulator;
        const image = await manipulator
          .manipulate(path)
          .crop({
            originX: Math.round(cropX),
            originY: Math.round(cropY),
            width: Math.round(cropWidth),
            height: Math.round(cropHeight),
          })
          .renderAsync();

        // save the cropped image
        const croppedImage = await image.saveAsync({
          format: ImageManipulator.SaveFormat.PNG,
        });

        // Process the cropped image with text recognition
        const result = await TextRecognition.recognize(
          croppedImage.uri,
          TextRecognitionScript.LATIN
        );

        // Update state with extracted text
        if (result.text) {
          const parsedAmount = extractAmountFromText(result.text);

          if (!isNaN(parsedAmount) && isFinite(parsedAmount) && scanning) {
            setTotalAmount(parsedAmount);
          }
        }

        // set images - TEMP for now to see what images are being captured
        setImages((prevImages) => [...prevImages, croppedImage]);

        // Updated file cleanup logic
        try {
          // Clean and delete original photo
          const originalPath = getAbsolutePath(path);
          if (originalPath) {
            console.log("Attempting to delete original:", originalPath);
            await FileSystem.deleteAsync(originalPath, { idempotent: true });
          }

          // Clean and delete cropped image
          const croppedPath = getAbsolutePath(croppedImage.uri);
          if (croppedPath) {
            console.log("Attempting to delete cropped:", croppedPath);
            await FileSystem.deleteAsync(croppedPath, { idempotent: true });
          }
        } catch (deleteError) {
          console.error("Delete error:", deleteError);
          console.error("Full paths:", {
            original: path,
            cropped: croppedImage.uri,
          });
        }
      } catch (error) {
        console.error("Error processing frame:", error);
      } finally {
        setIsProcessing(false);
      }
    },
    [isProcessing, RECT_WIDTH, RECT_HEIGHT, rectLeft, rectTop]
  );

  // Background frame capture function (simulates real-time)
  const captureInBackground = useCallback(async () => {
    if (camera.current && !isProcessing) {
      try {
        const photo = await camera.current.takePhoto({ flash: "off" });
        processFrame(photo.path, photo.height, photo.width);
      } catch (error) {
        console.error("Error capturing frame:", error);
        setIsProcessing(false);
      }

      // Reduce interval from 300ms to 150ms for faster scanning
      processingTimerRef.current = setTimeout(captureInBackground, 150);
    }
  }, [isProcessing, processFrame]);

  // Start background processing immediately when scanning starts
  useEffect(() => {
    if (device && hasPermission && scanning) {
      // Remove the initial delay and start immediately
      captureInBackground();
    }

    return () => {
      if (processingTimerRef.current) {
        clearTimeout(processingTimerRef.current);
      }
    };
  }, [device, hasPermission, captureInBackground, scanning]);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = useCallback(async () => {
    const status = await Camera.requestCameraPermission();
    setHasPermission(status === "granted");
  }, []);

  if (!hasPermission) {
    return (
      <Modal visible={cameraVisible}>
        <View style={styles.centeredContainer}>
          <Text>Camera permission is required</Text>
          <Button title="Request Permission" onPress={checkPermission} />
          <Button title="Close" onPress={() => setCameraVisible(false)} />
        </View>
      </Modal>
    );
  }

  if (device == null) {
    return (
      <Modal visible={cameraVisible}>
        <View style={styles.centeredContainer}>
          <Text>Loading camera...</Text>
          <Button title="Close" onPress={() => setCameraVisible(false)} />
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={cameraVisible}>
      <CloseButton setCameraVisible={setCameraVisible} />
      <AmountPreview totalAmount={totalAmount} scanning={scanning} />
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={cameraVisible}
        photo={true}
        photoQualityBalance="speed"
      />
      <RectangleOverlay
        scanning={scanning}
        left={rectLeft}
        top={rectTop}
        width={RECT_WIDTH}
        height={RECT_HEIGHT}
      />
      <TransparentOverlay
        scanning={scanning}
        rectTop={rectTop}
        rectWidth={RECT_WIDTH}
        rectHeight={RECT_HEIGHT}
      />
      <BottomControls
        setScanning={setScanning}
        camera={camera}
        setCameraVisible={setCameraVisible}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CameraModal;
