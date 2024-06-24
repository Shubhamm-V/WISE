import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import CustomButton from "@/src/components/custom-widgets/CustomButton";
import { useAuth } from "@/src/context/authContext";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/src/components/custom-widgets/CustomText";
import { Avatar } from "@rneui/base";
import { COLORS } from "@/src/constants/colors";
import { Image } from "react-native";

type Props = {};

const Header = (props: Props) => {
  const { logout, user } = useAuth();
  useEffect(() => {
    console.log("MY name ", user?.name);
  }, []);
  const handleLogout = async () => {
    await logout();
  };
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View>
          <CustomText label="Hello," customStyle={styles.textStyle} />
          <CustomText label={user?.name} customStyle={styles.headerTextStyle} />
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Image
            style={styles.profileImage}
            source={require("../../../assets/images/illustrations/profile1.png")}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Header;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 20,
  },
  header: {
    width: "100%",
    paddingHorizontal: 12,
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
    height: 45,
    width: 45,
    borderColor: "#75AABF",
    borderWidth: 1,
  },
});
