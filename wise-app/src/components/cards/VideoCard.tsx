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
      <View style={{ width: "42%" }}>
        <Image
          style={styles.thumbnail}
          source={{
            uri: `https://img.youtube.com/vi/${youtubeData?.videoId}/hqdefault.jpg`,
          }}
        />
      </View>
      <View style={{ width: "56%" }}>
        <CustomText
          label={youtubeData?.title}
          customStyle={{ paddingHorizontal: 5, fontSize: 16 }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  cardContainer: {
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginTop: 12,
    borderRadius: 8,
    shadowRadius: 0.84,
    shadowOpacity: 0.15,
    paddingVertical: 12,
    paddingHorizontal: 10,
    display: "flex",
    backgroundColor: COLORS.light,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  thumbnail: {
    height: 80,
    borderRadius: 10,
    width: "auto",
  },
});
