import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ListItem, Avatar } from "@rneui/base";
import { getAuth } from "firebase/auth";
// import { Image } from "@rneui/base";

const CustomListItem = ({ id, chatName, enterChat }) => {
  return (
    <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
      <Avatar rounded source={{ uri: getAuth().currentUser.photoURL }} />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode={"tail"}>
          Hi...
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
