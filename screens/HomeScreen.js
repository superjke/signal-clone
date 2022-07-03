import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import CustomListItem from "../components/CustomListItem";
import { Avatar, Image } from "@rneui/base";
import { getAuth } from "firebase/auth";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { pages } from "../App";
import { collection, getFirestore, getDocs } from "@firebase/firestore";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  const auth = getAuth();

  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace(pages.login);
    });
  };

  useEffect(() => {
    const getChats = async () => {
      await getDocs(collection(getFirestore(), "chats")).then((snapshot) =>
        setChats(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    };

    getChats();
    const willFocusSubscription = navigation.addListener("focus", () => {
      getChats();
    });

    return willFocusSubscription;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#ffffff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity onPress={signOut} activeOpacity={0.5}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddChat");
            }}
            activeOpacity={0.5}
          >
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const enterChat = (id, chatName) => {
    navigation.navigate(pages.chat, {
      id,
      chatName,
    });
  };

  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
