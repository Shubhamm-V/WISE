import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import VideoCard from "@/src/components/cards/VideoCard";
import { db } from "@/firebaseConfig";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "@/src/constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/src/components/custom-widgets/CustomText";
import { getDocs, collection } from "firebase/firestore";
import Loading from "@/src/components/custom-widgets/Loading";

export type YoutubeVideo = {
  id: string;
  videoId?: string;
  url: string;
  title: string;
  thumbnail: string;
  category: string;
  description: string;
};

// Function to extract YouTube video ID
const getVideoID = (url: string | null): string => {
  if (!url) return "";
  const regex =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const matches = url.match(regex);
  return matches ? matches[1] : "";
};

type Props = {};

const EducationalVideos = (props: Props) => {
  const [allVideos, setAllVideos] = useState<YoutubeVideo[]>([]);
  const [tempAllVideos, setTempAllVideos] = useState<YoutubeVideo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getInfo = async () => {
      const querySnapshot = await getDocs(collection(db, "videos"));
      const allVideoData: YoutubeVideo[] = [];

      querySnapshot.forEach((doc) => {
        let data = doc.data();
        allVideoData.push({
          id: doc.id,
          url: data?.url,
          title: data?.title,
          thumbnail: data?.thumbnail,
          description: data?.description,
          category: data?.category,
        });
      });

      const filterVideos: YoutubeVideo[] = allVideoData.map((video) => {
        return {
          ...video,
          videoId: getVideoID(video?.url) || "",
        };
      });

      setAllVideos(filterVideos);
      setTempAllVideos(filterVideos);
    };
    try {
      getInfo();
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }, []);

  if (loading) return <Loading />;

  const filterResults = (value: string) => {
    value = value.toLowerCase();
    const data = tempAllVideos.filter((video) => {
      return (
        video.title.toLowerCase().includes(value) ||
        video.description.toLowerCase().includes(value)
      );
    });
    setAllVideos(data);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.light,
      }}
    >
      <View style={{ flex: 1, paddingHorizontal: "2%" }}>
        <CustomText
          label="👩‍⚕️ Health Education Videos "
          customStyle={{
            fontSize: 20,
            fontFamily: "DMSansBold",
            textAlign: "center",
            marginTop: 15,
          }}
        />
        <View style={styles.searchInput}>
          <Icon
            name="search"
            size={20}
            color="#364F6B"
            style={{ paddingVertical: 5, paddingHorizontal: 10 }}
          />
          <TextInput
            placeholder="Search by title, description, etc."
            onChangeText={(value: string) => filterResults(value)}
            placeholderTextColor={COLORS.dark}
            style={{ flex: 1, paddingVertical: 0, color: "#364F6B" }}
          />
        </View>
        {allVideos.length > 0 ? (
          <View style={{ flex: 1 }}>
            <FlatList
              data={allVideos}
              contentContainerStyle={{ paddingBottom: 5 }}
              keyExtractor={(item) => item.id}
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
            {/* <Image
              style={{ height: 200, width: 200 }}
              source={require("../../../../assets/images/illustrations/hospitals/finding-hospital.png")}
            /> */}
            <View style={{ width: "80%" }}>
              <CustomText
                customStyle={{ textAlign: "center" }}
                label="Sorry..! No videos found"
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default EducationalVideos;

const styles = StyleSheet.create({
  searchInput: {
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 5,
    borderBottomWidth: 1,
    flexDirection: "row",
    borderBottomColor: "#ccc",
    backgroundColor: "#f5f5f5",
  },
});
