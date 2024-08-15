import React, { FC } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native";
import CustomText from "../custom-widgets/CustomText";
import { COLORS } from "@/src/constants/colors";
import { YoutubeVideo } from "@/src/app/(app)/videos";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

interface ChildProps {
  youtubeData: YoutubeVideo;
}

const VideoCard: FC<ChildProps> = ({ youtubeData }) => {
  const getVideoID = (url: string) => {
    if (!url) return "";
    const regex =
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : "";
  };

  const isYouTubeShort = (url: string) =>
    url.includes("youtube.com/shorts") || url.includes("youtu.be");

  const isYouTubeVideo = (url: string) =>
    url.includes("youtube.com/watch") || url.includes("youtube.com/playlist");

  const getThumbnailUrl = (url: string) => {
    const videoId = isYouTubeShort(url)
      ? url.split("/").pop()?.split("?")[0]
      : getVideoID(url);
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  const renderThumbnail = () => {
    const thumbnailUrl = getThumbnailUrl(youtubeData.url);
    return <Image style={styles.thumbnail} source={{ uri: thumbnailUrl }} />;
  };

  const renderContent = () => {
    if (isYouTubeShort(youtubeData.url)) {
      return (
        <View style={styles.content}>
          {renderThumbnail()}
          {/* <CustomText
            label="YouTube Short"
            customStyle={styles.videoTypeText}
          /> */}
        </View>
      );
    }
    if (isYouTubeVideo(youtubeData.url)) {
      return (
        <View style={styles.content}>
          {renderThumbnail()}
          {/* <CustomText
            label="YouTube Video"
            customStyle={styles.videoTypeText}
          /> */}
        </View>
      );
    }

    return null;
  };

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
      <View style={{ width: "32%" }}>{renderContent()}</View>
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
    width: width * 0.3,
  },
  content: {
    alignItems: "center",
  },
  videoTypeText: {
    fontSize: 12,
    color: COLORS.dark700,
    marginTop: 5,
  },
});
