import { AntDesign } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  setCameraVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const CloseButton = ({ setCameraVisible }: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.closeButtonContainer, { top: insets.top }]}>
      <Pressable onPress={() => setCameraVisible(false)}>
        <AntDesign name="close" size={32} color={Colors.slate[200]} />
      </Pressable>
    </View>
  );
};

export default CloseButton;

const styles = StyleSheet.create({
  closeButtonContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    paddingLeft: 16,
    zIndex: 10,
  },
});
