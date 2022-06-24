import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect } from "react";
import CustomListItem from "../components/CustomListItem";
import { Avatar } from "@rneui/base";
import { getAuth } from "firebase/auth";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const HomeScreen = ({ navigation }) => {
  const auth = getAuth();

  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

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

  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <ScrollView>
        <CustomListItem />
        {/* <View style={styles.container}>
          <Text style={styles.text}>{`Name: ${
            getAuth().currentUser.displayName
          }`}</Text>
          <Text style={styles.text}>{`Email: ${
            getAuth().currentUser.email
          }`}</Text>
          <Image
            source={{
              uri: getAuth().currentUser.photoURL,
            }}
            style={{ width: 200, height: 200 }}
          />
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginVertical: 20,
  },
  text: {
    marginBottom: 10,
  },
});
