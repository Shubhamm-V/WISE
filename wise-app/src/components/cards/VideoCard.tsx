import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import CustomText from "../custom-widgets/CustomText";
import { COLORS } from "@/src/constants/colors";
import { YoutubeVideo } from "@/src/app/(app)/videos";
import { router } from "expo-router";

interface ChildProps {
  youtubeData: YoutubeVideo;
}
const VideoCard: FC<ChildProps> = ({ youtubeData }) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() =>
        router.push({
          pathname: "/videos/video_screen",
          params: { ...youtubeData },
        })
      }
    >
      <View style={{ width: "32%" }}>
        <Image
          style={styles.thumbnail}
          source={{
            uri: `https://img.youtube.com/vi/${youtubeData?.videoId}/hqdefault.jpg`,
          }}
        />
      </View>
      <View style={{ width: "65%" }}>
        <CustomText
          label={youtubeData?.title}
          customStyle={{ paddingHorizontal: 5, fontSize: 14 }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  cardContainer: {
    elevation: 1,
    marginBottom: 3.5,
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 10,
    display: "flex",
    borderColor: "lightgray",
    borderWidth: 1,
    backgroundColor: COLORS.light,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  thumbnail: {
    height: 55,
    borderRadius: 10,
    width: "auto",
  },
});
