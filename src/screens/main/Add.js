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

export default function Add({ navigation, route }) {
  const [query, setQuery] = useState();
  const [searchedItem, setSearchedItem] = useState();
  const [suggestions, setSuggestions] = useState([]);

  const headers = {
    "x-app-id": TEST_APP_ID1,
    "x-app-key": TEST_KEY1,
  };

  const searchEndpoint = "https://trackapi.nutritionix.com/v2/search/instant";

  const handleInputChange = (input) => {
    setQuery(input);
    if (input.trim().length != 0) {
      const queryParams = {
        query: input,
      };
      let foodNameList = [];

      axios
        .get(searchEndpoint, {
          params: queryParams,
          headers: headers,
        })
        .then((response) => {
          let foodNameArrayCommon = response.data.common;
          let foodNameArrayBranded = response.data.branded;
          let foodNameArray = [...foodNameArrayBranded, ...foodNameArrayCommon];

          foodNameList = foodNameArray.map(
            ({ food_name, photo, nix_item_id }) => ({
              food_name,
              photo,
              nix_item_id,
            })
          );
          setSuggestions(foodNameList);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const requestBrandedFoodItems = (getUrl, headers, item) => {
    const queryParams = {
      nix_item_id: item.nix_item_id,
    };
    axios
      .get(getUrl, { params: queryParams, headers: headers })
      .then((response) => {
        // Handle success
        // console.log(response.data);
        setSearchedItem(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  };

  const requestCommonFoodItems = (postUrl, foodItemPostData, headers) => {
    axios
      .post(postUrl, foodItemPostData, { headers })
      .then((response) => {
        // Handle success
        // console.log(response.data);
        setSearchedItem(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    if (searchedItem) {
      console.log(searchedItem);
      let foodData = searchedItem?.foods[0];
      console.log(foodData.food_name);
      let prop = {
        name: foodData.food_name,
        image: foodData.photo.thumb,
        nutriments: {
          calories: foodData.nf_calories,
          fat: foodData.nf_total_fat,
          protein: foodData.nf_protein,
          carbohydrates: foodData.nf_total_carbohydrate,
        },
      };
      const mealType = route.params && route.params.mealType;

      navigation.navigate("FoodDetails", { prop, mealType });
    } else {
      console.log("test");
    }
  }, [searchedItem]);

  const handleAddFood = (item) => {
    console.log(item.nix_item_id);
    const naturalQueryData = { query: `${item.food_name}` };
    const naturalPostUrl =
      "https://trackapi.nutritionix.com/v2/natural/nutrients"; //url for natural lanauge for common foods
    const brandedGetUrl = "https://trackapi.nutritionix.com/v2/search/item"; //url for /search/item for branded foods

    if (item.nix_item_id != undefined) {
      //check if selected food is a brand item (i.e doritos)
      requestBrandedFoodItems(brandedGetUrl, headers, item);
    } else {
      //if the selected food item is a common food (i.e apple/banana)

      requestCommonFoodItems(naturalPostUrl, naturalQueryData, headers);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => {
        handleAddFood(item);
      }}
    >
      <Image source={{ uri: item.photo.thumb }} style={styles.image} />
      <Text>{item.food_name}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    if (query === "") {
      setSuggestions([]);
    }
  }, [query]);

  const clearSearch = () => {
    setSuggestions([]);
    setQuery();
  };

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
        {query === undefined || query === "" ? (
          <View style={styles.searchOptions}>
            <View style={styles.searchOptionContainer}>
              <Text>Barcode scanner</Text>
            </View>
            <View style={styles.searchOptionContainer}>
              <Text>Natural language search</Text>
            </View>
          </View>
        ) : (
          <View></View>
        )}

        <FlatList
          style={styles.suggestionsList}
          data={suggestions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>

      {/* <Navbar navigation={navigation} /> */}
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

  searchOptionContainer: {
    height: 100,
    width: 175,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 25,
    marginBottom: 15,
  },

  searchOptions: {
    display: "flex",
    flexDirection: "row",
  },
  image: {
    width: 25,
    height: 25,
    marginRight: 10,
    borderRadius: 25,
  },
});
