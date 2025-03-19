import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  useWindowDimensions,
  Pressable,
} from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";
import * as Haptics from "expo-haptics";
import TextRecognition, {
  TextRecognitionScript,
} from "@react-native-ml-kit/text-recognition";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import RectangleOverlay from "../RectangleOverlay/RectangleOverlay";
import TransparentOverlay from "../TransparentOverlay/TransparentOverlay";
import CloseButton from "../CloseButton/CloseButton";
import AmountPreview from "../AmountPreview/AmountPreview";
import BottomControls from "../BottomControls/BottomControls";
import InfoModal from "../InfoModal/InfoModal";
import CameraPermissionsModal from "../CameraPremissionModal/CameraPermissionsModal";
import NoDeviceModal from "../NoDeviceModal/NoDeviceModal";
import { Colors } from "../../constants/Colors";
import { getCropDimensions } from "../../utils/utils";
import {
  extractAmountFromText,
  getAbsolutePath,
  shouldFlipOrientation,
} from "../../utils/utils";

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
  const insets = useSafeAreaInsets();
  const { hasPermission, requestPermission } = useCameraPermission();

  const [cameraPermissionDenied, setCameraPermissionDenied] =
    useState<boolean>(true);
  const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false);

  const [scanning, setScanning] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const widthScale = isExpanded ? 0.45 : 0.3;
  // Define the rectangle dimensions
  const RECT_WIDTH = dimensions.width * widthScale;
  const RECT_HEIGHT = dimensions.height * 0.05;

  // Calculate rectangle position (centered)
  const rectLeft = (dimensions.width - RECT_WIDTH) / 2;
  const rectTop = (dimensions.height - RECT_HEIGHT) / 4;

  // Function to process the captured frame
  const processFrame = useCallback(
    async (path: string, frameHeight: number, frameWidth: number) => {
      if (isProcessing) return;
      setIsProcessing(true);

      try {
        const { cropX, cropY, cropWidth, cropHeight } = getCropDimensions(
          frameHeight,
          frameWidth,
          dimensions,
          RECT_WIDTH,
          RECT_HEIGHT,
          rectLeft,
          rectTop
        );

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
            await FileSystem.deleteAsync(originalPath, { idempotent: true });
          }

          // Clean and delete cropped image
          const croppedPath = getAbsolutePath(croppedImage.uri);
          if (croppedPath) {
            await FileSystem.deleteAsync(croppedPath, { idempotent: true });
          }
        } catch (deleteError) {
          console.error("Delete error:", deleteError);
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
        const photo = await camera.current.takePhoto({
          flash: "off",
          enableShutterSound: false,
        });
        let height = photo.height;
        let width = photo.width;

        if (shouldFlipOrientation(photo.orientation)) {
          height = photo.width;
          width = photo.height;
        }

        processFrame(photo.path, height, width);
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
      captureInBackground();
    }

    return () => {
      if (processingTimerRef.current) {
        clearTimeout(processingTimerRef.current);
      }
    };
  }, [device, hasPermission, captureInBackground, scanning]);

  const requestCameraPermission = async () => {
    if (!hasPermission) {
      const status = await requestPermission();
      if (!status) {
        setCameraPermissionDenied(true);
        setCameraVisible(false);
      } else {
        setCameraPermissionDenied(false);
      }
    }
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  if (!hasPermission) {
    return (
      <CameraPermissionsModal
        cameraVisible={cameraVisible}
        setCameraVisible={setCameraVisible}
        cameraPermissionDenied={cameraPermissionDenied}
        requestCameraPermission={requestCameraPermission}
      />
    );
  }

  if (!device) {
    return (
      <NoDeviceModal
        cameraVisible={cameraVisible}
        setCameraVisible={setCameraVisible}
      />
    );
  }

  return (
    <Modal visible={cameraVisible}>
      <CloseButton setCameraVisible={setCameraVisible} />
      <View
        style={{
          position: "absolute",
          top: insets.top + 4,
          right: 16,
          zIndex: 10,
        }}
      >
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setIsExpanded((prev) => !prev);
          }}
          hitSlop={10}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.6 : 1,
            },
          ]}
        >
          {isExpanded ? (
            <MaterialCommunityIcons
              name="arrow-collapse-horizontal"
              size={28}
              color={Colors.slate[300]}
            />
          ) : (
            <MaterialCommunityIcons
              name="arrow-expand-horizontal"
              size={28}
              color={Colors.slate[300]}
            />
          )}
        </Pressable>
      </View>
      <AmountPreview totalAmount={totalAmount} />
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={cameraVisible}
        photo={true}
        photoQualityBalance="speed"
        outputOrientation="device"
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
        setInfoModalVisible={setInfoModalVisible}
      />
      <InfoModal visible={infoModalVisible} setVisible={setInfoModalVisible} />
    </Modal>
  );
};

export default CameraModal;
