import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import AddChatScreen from "./screens/AddChatScreen";
import ChatScreen from "./screens/ChatScreen";

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#2C6BED" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
};

initializeApp(firebaseConfig);
export const pages = {
  home: "Home",
  login: "Login",
  register: "Register",
  addChat: "AddChat",
  chat: "Chat",
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name={pages.login} component={LoginScreen} />
        <Stack.Screen name={pages.register} component={RegisterScreen} />
        <Stack.Screen name={pages.home} component={HomeScreen} />
        <Stack.Screen name={pages.addChat} component={AddChatScreen} />
        <Stack.Screen name={pages.chat} component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
