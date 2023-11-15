import { View, Text } from "react-native";
import Navbar from "../../components/Navbar";
import React from "react";

export default function Add({ navigation }) {
  return (
    <View>
      <Text>Add/search page</Text>
      <Navbar navigation={navigation} />
    </View>
  );
}
