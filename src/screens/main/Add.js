import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
import Navbar from "../../components/Navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { APP_KEY, APP_ID } from "@env";

export default function Add({ navigation }) {
  const [query, setQuery] = useState("");
  const [foodList, setFoodList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (input) => {
    setQuery(input);
  };
  const headers = {
    "x-app-id": APP_ID,
    "x-app-key": APP_KEY,
  };
  const apiUrl = "https://trackapi.nutritionix.com/v2/search/instant";

  axios
    .get(apiUrl, {
      params: {
        query: "common", // An empty query will return all foods
      },
      headers: {
        "x-app-id": APP_ID,
        "x-app-key": APP_KEY,
      },
    })
    .then((response) => {
      // Handle successful response
      setSuggestions(response.data);
    })
    .catch((error) => {
      // Handle error
      console.error("Error fetching data:", error);
    });

  const renderSuggestionItem = ({ item }) => (
    <TouchableOpacity style={styles.suggestionItem}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );
  return (
    <View>
      <View style={styles.search_container}>
        <TextInput
          style={styles.input}
          onChangeText={handleInputChange}
          value={query}
        />
      </View>
      <FlatList
        data={suggestions}
        renderItem={renderSuggestionItem}
        keyExtractor={(item) => item.toString()}
        style={styles.suggestionsList}
      />

      <Navbar navigation={navigation} />
    </View>
  );
}
const styles = StyleSheet.create({
  search_container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  suggestionsList: {
    marginTop: 8,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
