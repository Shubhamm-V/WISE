import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { useAuth } from "@/src/context/authContext";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/src/components/custom-widgets/CustomText";
import { COLORS } from "@/src/constants/colors";
import { Image } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
type Props = {};

const Header = (props: Props) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View>
          <CustomText
            label={"👋 " + t("screens.home.hello") + ","}
            customStyle={styles.textStyle}
          />
          <CustomText label={user?.name} customStyle={styles.headerTextStyle} />
        </View>
        <TouchableOpacity onPress={() => router.navigate("/home/profile")}>
          <Image
            style={styles.profileImage}
            source={require("../../../assets/images/illustrations/profile.png")}
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
    paddingHorizontal: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTextStyle: {
    fontSize: 16,
    lineHeight: 24,
    flexWrap: "wrap",
    fontFamily: "DMSansBlack",
    color: COLORS.primary,
  },
  textStyle: {
    fontSize: 14,
    color: COLORS.title,
    fontFamily: "DMSans",
  },
  profileImage: {
    borderRadius: 100,
    height: 45,
    width: 45,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
});
