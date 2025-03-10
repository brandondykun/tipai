import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Camera } from "react-native-vision-camera";
import { Colors } from "../../constants/Colors";
const dimensions = Dimensions.get("window");

type Props = {
  setScanning: React.Dispatch<React.SetStateAction<boolean>>;
  camera: React.RefObject<Camera>;
  setCameraVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const BottomControls = ({ setScanning, camera, setCameraVisible }: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { bottom: insets.bottom + 24 }]}>
      <View>
        <Text style={{ textAlign: "center", color: "#e2e8f0" }}>
          Press and hold to Scan
        </Text>
      </View>
      <View style={styles.controls}>
        <View style={{ flex: 1 }} />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Pressable
            onLongPress={() => {
              setScanning(true); // Move this before haptics
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              camera.current?.focus({
                x: dimensions.width / 2,
                y: dimensions.height / 4,
              });
            }}
            onPressOut={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setScanning(false);
            }}
            style={({ pressed }) => pressed && { opacity: 0.6 }}
          >
            <View style={styles.scanButton}>
              <Ionicons name="scan" size={36} color="black" />
            </View>
          </Pressable>
        </View>

        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.6 : 1,
                backgroundColor: "#0f172a",
                borderRadius: 100,
                padding: 2,
              },
            ]}
            onPress={() => {
              setCameraVisible(false);
            }}
          >
            <AntDesign name="checkcircle" size={38} color="#65a30d" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default BottomControls;

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    left: 16,
    right: 16,
    gap: 4,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  controls: {
    backgroundColor: Colors.slate[950],
    paddingVertical: 12,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.slate[900],
    flexDirection: "row",
  },
  text: {
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    backgroundColor: "#020617",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  scanButton: {
    backgroundColor: Colors.slate[200],
    width: 80,
    height: 80,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.slate[400],
  },
});
