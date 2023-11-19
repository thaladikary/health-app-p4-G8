import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
  Image,
} from "react-native";
import Navbar from "../../components/Navbar";
import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import { TEST_KEY1, TEST_APP_ID1 } from "@env";

export default function Add({ navigation }) {
  const [query, setQuery] = useState("");
  const [searchedItem, setSearchedTerm] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const headers = {
    "x-app-id": TEST_APP_ID1,
    "x-app-key": TEST_KEY1,
  };

  const apiUrl = "https://trackapi.nutritionix.com/v2/search/instant";

  const handleInputChange = (input) => {
    setQuery(input);
    if (input.trim().length != 0) {
      const queryParams = {
        query: input,
      };
      let foodNameList = [];

      axios
        .get(apiUrl, {
          params: queryParams,
          headers: headers,
        })
        .then((response) => {
          let foodNameArray = response.data.common;
          foodNameList = foodNameArray.map(({ food_name, photo }) => ({
            food_name,
            photo,
          }));
          setSuggestions(foodNameList);
          // console.log(foodNameList);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleAddFood = (item) => {};

  const clearSearch = () => {
    setSuggestions([]);
    setQuery([]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => {
        handleAddFood(item.food_name);
        setSuggestions([]); // Clear suggestions when a suggestion is selected
      }}
    >
      <Image source={{ uri: item.photo.thumb }} style={styles.image} />
      <Text>{item.food_name}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#aaa" />
          <TextInput
            style={styles.input}
            placeholder="Search for food"
            placeholderTextColor="#aaa"
            value={query}
            onChangeText={handleInputChange}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              clearSearch();
            }}
          >
            <Text style={styles.buttonText}>
              <Ionicons name="close" size={20} color="#4470e9" />
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          style={styles.suggestionsList}
          data={suggestions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>

      <Navbar navigation={navigation} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "auto",
  },
  searchBar: {
    flexDirection: "row",
    height: 45,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 25,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  suggestionsList: {
    margin: 10,
    marginBottom: 100,
  },

  suggestionItem: {
    padding: 10,
    margin: 5,
    backgroundColor: "#fff",
    elevation: 2,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
  },

  button: {
    marginRight: 15,
  },
  buttonText: {
    color: "#4470e9", // Text color
    fontSize: 16, // Font size
    fontWeight: "bold", // Font weight
  },
  image: {
    width: 25,
    height: 25,
    marginRight: 10,
    borderRadius: 25,
  },
});
