import { View, Text, Modal, Pressable, Image, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import DoneButton from "../DoneButton/DoneButton";
import ScanButton from "../ScanButton/ScanButton";

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const InfoModal = ({ visible, setVisible }: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      className="flex-1"
    >
      <View className="flex-1 bg-slate-900">
        <ScrollView
          contentContainerStyle={{
            padding: 24,
            paddingTop: 0,
            flexGrow: 1,
          }}
          style={{ marginTop: insets.top }}
          className="bg-slate-900"
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
        >
          <View className="items-start pt-2">
            <Pressable
              className="bg-slate-200 rounded-full justify-center items-center w-8 h-8 ml-[-8px] active:opacity-60"
              onPress={() => setVisible(false)}
              hitSlop={20}
            >
              <AntDesign name="close" size={20} color={Colors.slate[900]} />
            </Pressable>
          </View>
          <View className="flex-1">
            <Text className="text-slate-400 text-center tracking-widest mb-8 uppercase font-bold text-2xl">
              Help
            </Text>
            <Text className="text-slate-300 text-center font-light mb-10 text-2xl">
              To scan your bill, follow these steps:
            </Text>

            <View className="mb-20">
              <Header>
                <SectionNumber number={1} />
                <HeaderText>Align the Bill Amount</HeaderText>
              </Header>
              <HelperText>
                Line the bill amount up with the guide lines in the center of
                the white scanning rectangle.
              </HelperText>
              <View className="items-center">
                <Image
                  source={require("../../assets/images/scan_example.png")}
                  style={{ width: 280, height: 170, borderRadius: 16 }}
                />
              </View>
            </View>

            <View className="mb-20">
              <Header>
                <SectionNumber number={2} />
                <HeaderText>Press and Hold Scan Button</HeaderText>
              </Header>
              <HelperText>
                Press and hold the scan button at the bottom of the screen.
              </HelperText>
              <View className="flex-1 justify-center items-center mb-6">
                <ScanButton />
              </View>
              <HelperText>
                When the screen turns green, it's scanning. Hold still while it
                is scanning the amount.
              </HelperText>
              <View style={{ alignItems: "center", marginBottom: 24 }}>
                <Image
                  source={require("../../assets/images/scanning_example.png")}
                  style={{ width: 280, height: 240, borderRadius: 16 }}
                />
              </View>
              <HelperText>
                If the amount in the scanning rectangle isn't perfectly focused,
                that's okay. When the camera starts scanning, it will try to
                auto focus the text in the scanning rectangle.
              </HelperText>
            </View>

            <View className="mb-20">
              <Header>
                <SectionNumber number={3} />
                <HeaderText>Release the Scan Button</HeaderText>
              </Header>
              <HelperText>
                After 1-3 seconds, the scanned amount will display in the top
                center of the screen. When the correct amount is displayed,
                release the scan button.
              </HelperText>
              <View style={{ alignItems: "center", marginBottom: 24 }}>
                <Image
                  source={require("../../assets/images/scan_complete_example.png")}
                  style={{ width: 280, height: 240, borderRadius: 16 }}
                />
              </View>
              <HelperText>
                If an incorrect amount is displayed, keep scanning and try to
                center the amount in the scanning rectangle. When it's correct,
                then release the scan button.
              </HelperText>
            </View>

            <View className="mb-20">
              <Header>
                <SectionNumber number={4} />
                <HeaderText>Press the Done Button</HeaderText>
              </Header>
              <HelperText>
                Once the amount is scanned, press the done button to close the
                camera and go back to the tip calculator screen.
              </HelperText>
              <View className="items-center">
                <DoneButton />
              </View>
            </View>
          </View>

          <View className="mb-8">
            <Text className="text-slate-500 font-bold mb-1 text-2xl">Tip</Text>
            <Text className="text-slate-200 font-light text-lg leading-6">
              If the scanned amount is incorrect, try moving the device closer,
              so the amount appears larger in the scanning rectangle. This is
              especially helpful if there is other text nearby.
            </Text>
          </View>
          <View>
            <Text className="text-slate-500 font-bold mb-1 text-2xl">
              Pro Tip
            </Text>
            <Text className="text-slate-200 font-light text-lg leading-6">
              If your amount won't fit in the rectangular box or other text is
              nearby, use the expand or collapse button in the top right to
              change the size of the scanning rectangle.
            </Text>
            <View className="flex-row gap-8 justify-center items-center pt-4">
              <MaterialCommunityIcons
                name="arrow-collapse-horizontal"
                size={34}
                color={Colors.slate[300]}
              />
              <MaterialCommunityIcons
                name="arrow-expand-horizontal"
                size={34}
                color={Colors.slate[300]}
              />
            </View>
          </View>
          <View
            style={{ paddingBottom: insets.bottom + 12 }}
            className="justify-center items-center pt-20"
          >
            <Pressable onPress={() => setVisible(false)}>
              <Text className="text-slate-100 underline text-3xl">Close</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default InfoModal;

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className="flex flex-row items-center gap-3 mb-6">{children}</View>
  );
};

const HeaderText = ({ children }: { children: React.ReactNode }) => {
  return <Text className="text-slate-100 text-3xl">{children}</Text>;
};

const HelperText = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text className="text-slate-300 font-light text-xl leading-6 mb-6">
      {children}
    </Text>
  );
};

const SectionNumber = ({ number }: { number: number }) => {
  return (
    <View className="bg-lime-500 rounded-full justify-center items-center w-10 h-10">
      <Text className="text-slate-950 font-bold text-2xl">{number}</Text>
    </View>
  );
};
