import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { getAuth } from "firebase/auth";
import { Image } from "@rneui/base";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`Name: ${
        getAuth().currentUser.displayName
      }`}</Text>
      <Text style={styles.text}>{`Email: ${getAuth().currentUser.email}`}</Text>
      <Image
        source={{
          uri: getAuth().currentUser.photoURL,
        }}
        style={{ width: 200, height: 200 }}
      />
    </View>
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
