import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { Avatar } from "@rneui/base";
import { getAuth } from "firebase/auth";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

const ChatScreen = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerTitleAlign: "left",
      headerBackTitleVisible: false,
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar rounded source={{ uri: getAuth().currentUser.photoURL }} />
          <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={navigation.goBack}
          style={{ marginLeft: 10 }}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, []);
  return (
    <View>
      <Text>{route.params.chatName}</Text>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
