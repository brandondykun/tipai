import { AntDesign } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  setCameraVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const CloseButton = ({ setCameraVisible }: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ top: insets.top }}
      className="absolute left-0 right-0 pl-4 z-10"
    >
      <Pressable
        onPress={() => setCameraVisible(false)}
        style={({ pressed }) => [{ width: 50, opacity: pressed ? 0.6 : 1 }]}
      >
        <AntDesign name="close" size={32} color={Colors.slate[200]} />
      </Pressable>
    </View>
  );
};

export default CloseButton;
