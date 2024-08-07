import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import CustomText from "@/src/components/custom-widgets/CustomText";
import { router, useLocalSearchParams } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import WebView from "react-native-webview";
import { COLORS } from "@/src/constants/colors";
const VideoScreen = () => {
  const params: any = useLocalSearchParams();
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: "2%",
        flex: 1,
        backgroundColor: COLORS.light,
      }}
    >
      <ScrollView>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon
            name="arrow-back-outline"
            style={{
              marginTop: 35,
              fontSize: 30,
              paddingHorizontal: 1,
              marginBottom: 10,
            }}
          />
        </TouchableOpacity>
        <CustomText
          label={params?.title}
          customStyle={{
            fontSize: 25,
            fontFamily: "DMSansBold",
            textAlign: "center",
          }}
        />
        <View style={styles.video}>
          <WebView
            style={{ marginTop: 0 }}
            containerStyle={{ borderRadius: 5 }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{ uri: `https://www.youtube.com/embed/${params?.videoId}` }}
          />
        </View>
        <View>
          <CustomText
            label="Description"
            customStyle={{
              fontSize: 18,
              fontFamily: "DMSansBold",
              paddingVertical: 5,
            }}
          />
          <CustomText
            label={params.description}
            customStyle={{ textAlign: "justify", paddingBottom: 20 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  video: {
    marginTop: 20,
    marginBottom: 10,
    height: 250,
    width: "100%",
  },
});
