import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";
import React from "react";
import CustomText from "@/src/components/custom-widgets/CustomText";
import { router, useLocalSearchParams } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import WebView from "react-native-webview";
import { COLORS } from "@/src/constants/colors";

const VideoScreen = () => {
  const params: any = useLocalSearchParams();

  const isYouTubeShort = (url: string) => url.includes("youtube.com/shorts");

  const getVideoUrl = () => {
    if (isYouTubeShort(params.url)) {
      return params.url;
    } else {
      return `https://www.youtube.com/embed/${params.videoId}`;
    }
  };

  const videoHeight = isYouTubeShort(params.url) ? 700 : 250;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back-outline" style={styles.backIcon} />
        </TouchableOpacity>
        <CustomText label={params?.title} customStyle={styles.title} />
        <View style={[styles.video, { height: videoHeight }]}>
          <WebView
            style={{ marginTop: 0 }}
            containerStyle={{ borderRadius: 5 }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{ uri: getVideoUrl() }}
          />
        </View>
        <View>
          <CustomText
            label="Description"
            customStyle={styles.descriptionTitle}
          />
          <CustomText
            label={params.description}
            customStyle={styles.descriptionText}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "2%",
    flex: 1,
    backgroundColor: COLORS.light,
  },
  backIcon: {
    marginTop: 35,
    fontSize: 30,
    paddingHorizontal: 1,
    marginBottom: 10,
  },
  title: {
    fontSize: 25,
    fontFamily: "DMSansBold",
    textAlign: "center",
  },
  video: {
    marginTop: 20,
    marginBottom: 10,
    width: "100%",
  },
  descriptionTitle: {
    fontSize: 18,
    fontFamily: "DMSansBold",
    paddingVertical: 5,
  },
  descriptionText: {
    textAlign: "justify",
    paddingBottom: 20,
  },
});
