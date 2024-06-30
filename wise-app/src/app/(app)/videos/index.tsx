import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import HospitalCard from "@/src/components/cards/HospitalCard";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "@/src/constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/src/components/custom-widgets/CustomText";
import { DUMMY_VIDEOS } from "@/src/constants/dummy";
import VideoCard from "@/src/components/cards/VideoCard";

export interface YoutubeVideo {
  url: string;
  title: string;
  description: string;
  videoId: string;
  uid: string;
}

// Function to extract YouTube video ID
const getVideoID = (url: string | null): string => {
  if (!url) return "";
  const regex =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const matches = url.match(regex);
  return matches ? matches[1] : "";
};

type Props = {};

const NearByHospitals = (props: Props) => {
  const [allVideos, setAllVideos] = useState<YoutubeVideo[]>([]);
  const [tempAllVideos, setTempAllVideos] = useState<YoutubeVideo[]>([]);

  useEffect(() => {
    const filterVideos: YoutubeVideo[] = DUMMY_VIDEOS.map((video) => {
      return {
        ...video,
        videoId: getVideoID(video?.url) || "",
      };
    });

    setAllVideos(filterVideos);
    setTempAllVideos(filterVideos);
  }, []);

  const filterResults = (value: string) => {
    value = value.toLowerCase();
    const data = tempAllVideos.filter((hospital: any) => {
      return (
        hospital.title.toLowerCase().includes(value) ||
        hospital.description.toLowerCase().includes(value)
      );
    });
    setAllVideos(data);
  };

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: "2.3%" }}>
      <CustomText
        label="Educational Health Videos"
        customStyle={{ fontSize: 23, fontFamily: "DMSansBold", marginTop: 20 }}
      />
      <View style={styles.searchInput}>
        <Icon
          name="search"
          size={20}
          color="#364F6B"
          style={{ paddingVertical: 5, paddingHorizontal: 10 }}
        />
        <TextInput
          placeholder="Search by Title, Description, etc."
          onChangeText={(value: string) => filterResults(value)}
          placeholderTextColor={COLORS.dark}
          style={{ flex: 1, paddingVertical: 0, color: "#364F6B" }}
        />
      </View>
      {allVideos.length > 0 ? (
        <View style={{ flex: 1 }}>
          <FlatList
            data={allVideos}
            contentContainerStyle={{ paddingBottom: 20 }}
            keyExtractor={(item) => item.uid}
            renderItem={({ item }) => <VideoCard youtubeData={item} />}
          />
        </View>
      ) : (
        <View
          style={{
            height: "80%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ height: 200, width: 200 }}
            source={require("../../../../assets/images/illustrations/hospitals/finding-hospital.png")}
          />
          <View style={{ width: "80%" }}>
            <CustomText
              customStyle={{ textAlign: "center" }}
              label="Sorry..! No nearby hospitals are registered on our App"
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default NearByHospitals;

const styles = StyleSheet.create({
  searchInput: {
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 5,
    borderBottomWidth: 1,
    flexDirection: "row",
    borderBottomColor: "#ccc",
    backgroundColor: "#fbfbfb",
  },
});
