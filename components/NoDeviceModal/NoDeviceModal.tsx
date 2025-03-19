import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";

type Props = {
  cameraVisible: boolean;
  setCameraVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const NoDeviceModal = ({ cameraVisible, setCameraVisible }: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <Modal visible={cameraVisible}>
      <View
        style={[s.centeredContainer, { paddingBottom: insets.bottom + 48 }]}
      >
        <View style={s.mainContent}>
          <View style={{ padding: 24, gap: 32 }}>
            <View style={s.cameraOffIconContainer}>
              <Feather name="camera-off" size={48} color={Colors.lime[500]} />
            </View>
            <Text style={s.primaryText}>No Camera device available.</Text>
            <Text style={s.secondaryText}>
              A camera device is required to use this feature.
            </Text>
          </View>
        </View>
        <View>
          <Pressable
            onPress={() => setCameraVisible(false)}
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            hitSlop={15}
          >
            <Text style={s.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default NoDeviceModal;

const s = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.slate[900],
  },
  cameraOffIconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: Colors.slate[200],
    fontSize: 20,
    textDecorationLine: "underline",
  },
  primaryText: {
    color: Colors.slate[200],
    fontSize: 26,
    fontWeight: "500",
    textAlign: "center",
  },
  secondaryText: {
    color: Colors.slate[400],
    fontSize: 20,
    fontWeight: "300",
    textAlign: "center",
    marginBottom: 24,
  },
});
