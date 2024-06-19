import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomButton from "@/src/components/custom-widgets/CustomButton";
import { useAuth } from "@/src/context/authContext";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/src/components/custom-widgets/CustomText";
import { Avatar } from "@rneui/base";
import { COLORS } from "@/src/constants/colors";
import { Image } from "react-native";

type Props = {};

const home = (props: Props) => {
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View>
          <CustomText label="Hello," customStyle={styles.textStyle} />
          <CustomText
            label="Suvarna Vyavhare"
            customStyle={styles.headerTextStyle}
          />
        </View>
        <TouchableOpacity
        // onPress={() => onDisplayNotification()}
        >
          <Image
            style={styles.profileImage}
            source={require("../../../../assets/images/illustrations/profile1.png")}
          />
        </TouchableOpacity>
      </View>

      <CustomButton label="Logout" onPress={handleLogout} />
    </SafeAreaView>
  );
};

export default home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 20,
  },
  header: {
    width: "100%",
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTextStyle: {
    fontSize: 20,
    lineHeight: 24,
    flexWrap: "wrap",
    fontFamily: "DMSansBlack",
    color: COLORS.title,
  },
  textStyle: {
    fontSize: 16,
    color: COLORS.title,
    fontFamily: "DMSans",
  },
  profileImage: {
    borderRadius: 100,
    height: 50,
    width: 50,
    borderColor: "#75AABF",
    borderWidth: 1,
  },
});
