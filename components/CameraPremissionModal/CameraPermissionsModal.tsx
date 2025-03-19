import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";

type Props = {
  cameraVisible: boolean;
  setCameraVisible: React.Dispatch<React.SetStateAction<boolean>>;
  cameraPermissionDenied: boolean;
  requestCameraPermission: () => Promise<void>;
};

const CameraPermissionsModal = ({
  cameraVisible,
  setCameraVisible,
  cameraPermissionDenied,
  requestCameraPermission,
}: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <Modal visible={cameraVisible}>
      <View
        style={[s.centeredContainer, { paddingBottom: insets.bottom + 48 }]}
      >
        <View style={s.mainContent}>
          {!cameraPermissionDenied ? (
            <>
              <Text style={s.helpText}>Camera permission is required.</Text>
              <Pressable
                onPress={requestCameraPermission}
                style={({ pressed }) => [
                  s.requestPermissionButton,
                  {
                    opacity: pressed ? 0.6 : 1,
                  },
                ]}
              >
                <Text style={s.requestPermissionButtonText}>
                  Request Permission
                </Text>
              </Pressable>
            </>
          ) : (
            <View style={s.deniedContainer}>
              <View style={s.cameraOffIconContainer}>
                <Feather name="camera-off" size={48} color={Colors.lime[500]} />
              </View>
              <Text style={s.deniedText}>Camera permission denied.</Text>
              <Text style={s.deniedHelpText}>
                To use this feature, please allow camera permission for this app
                from your device settings.
              </Text>
            </View>
          )}
        </View>
        <View>
          <Pressable
            onPress={() => setCameraVisible(false)}
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            hitSlop={15}
          >
            <Text style={s.closeText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default CameraPermissionsModal;

const s = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.slate[900],
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  helpText: {
    color: Colors.slate[200],
    fontSize: 22,
    fontWeight: "300",
    textAlign: "center",
    marginBottom: 24,
  },
  deniedText: {
    color: Colors.slate[200],
    fontSize: 26,
    fontWeight: "500",
    textAlign: "center",
  },
  deniedHelpText: {
    color: Colors.slate[400],
    fontSize: 20,
    fontWeight: "300",
    textAlign: "center",
    marginBottom: 24,
  },
  closeText: {
    color: Colors.slate[200],
    fontSize: 20,
    textDecorationLine: "underline",
  },
  cameraOffIconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  requestPermissionButton: {
    backgroundColor: Colors.lime[500],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
  },
  requestPermissionButtonText: {
    color: Colors.slate[900],
    fontSize: 18,
  },
  deniedContainer: {
    padding: 24,
    gap: 32,
  },
});
