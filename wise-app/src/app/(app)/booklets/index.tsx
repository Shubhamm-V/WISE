import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { db } from "@/firebaseConfig";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "@/src/constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/src/components/custom-widgets/CustomText";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import Loading from "@/src/components/custom-widgets/Loading";

export type Booklet = {
  id: string;
  url: string;
  title: string;
};

type Props = {};

const Booklets = (props: Props) => {
  const [allVideos, setAllBooklets] = useState<Booklet[]>([]);
  const [tempAllBooklets, setTempAllBooklets] = useState<Booklet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const q = query(
          collection(db, "booklets"),
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(q);
        const allBookletData: Booklet[] = [];

        querySnapshot.forEach((doc) => {
          let data = doc.data();
          allBookletData.push({
            id: doc.id,
            url: data?.url,
            title: data?.title,
          });
        });

        setAllBooklets(allBookletData);
        setTempAllBooklets(allBookletData);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching booklets: ", error);
      } finally {
        setLoading(false);
      }
    };

    getInfo();
  }, []);

  const handleOpenLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Error opening link:", err)
    );
  };

  const filterResults = (value: string) => {
    value = value.toLowerCase();
    const data = tempAllBooklets.filter((video) => {
      return video.title.toLowerCase().includes(value);
    });
    setAllBooklets(data);
  };

  if (loading || !isLoaded) return <Loading />;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.light,
      }}
    >
      <View style={{ flex: 1, paddingHorizontal: "2%" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Icon
              name="arrow-back-outline"
              style={{
                fontSize: 24,
                marginTop: 10,
              }}
            />
          </TouchableOpacity>
          <CustomText label="Read Booklets " customStyle={styles.title} />
        </View>
        <View style={styles.searchInput}>
          <Icon
            name="search"
            size={20}
            color="#364F6B"
            style={{ paddingVertical: 5, paddingHorizontal: 10 }}
          />
          <TextInput
            placeholder="Search by booklet title"
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
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <View style={{ width: "70%" }}>
                    <CustomText
                      label={
                        item.title.length > 120
                          ? `${item.title.substring(0, 60)}...`
                          : item.title
                      }
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => handleOpenLink(item.url)}
                    style={{ flexDirection: "row", gap: 3 }}
                  >
                    <CustomText
                      label="View PDF"
                      customStyle={{ color: COLORS.primary }}
                    />
                    <Icon
                      name="arrow-forward-outline"
                      size={18}
                      color={COLORS.primary}
                    />
                  </TouchableOpacity>
                </View>
              )}
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

export default Booklets;

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
  card: {
    padding: 10,
    marginVertical: 2,
    height: 70,
    borderColor: "lightgray",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontFamily: "DMSansBold",
    textAlign: "center",
    marginTop: 15,
  },
});
