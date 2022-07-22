import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem, Avatar } from "@rneui/base";
import { getAuth } from "firebase/auth";
import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  limit,
} from "@firebase/firestore";

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [lastMessage, setLastMessage] = useState({});

  useEffect(() => {
    const q = query(
      collection(getFirestore(), "chats", id, "messages"),
      orderBy("timestamp", "desc"),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const lastMessageData = querySnapshot.docs[0];

      if (lastMessageData !== undefined) {
        console.log(JSON.stringify(lastMessageData.id));
        setLastMessage({
          id: lastMessageData.id,
          data: lastMessageData.data(),
        });
      }
    });

    return unsubscribe;
  }, []);

  console.log("CLI");
  return (
    <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
      <Avatar rounded source={{ uri: lastMessage?.data?.photoURL }} />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode={"tail"}>
          {lastMessage?.data?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
