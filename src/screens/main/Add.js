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
  Modal,
} from "react-native";
import Navbar from "../../components/Navbar";
import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import { APP_ID, APP_KEY } from "@env";

export default function Add({ navigation, route }) {
  const [query, setQuery] = useState();
  const [searchedItem, setSearchedItem] = useState();
  const [nlSuggestionList, setNlSuggestionList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isModalVisible, setModalVisibile] = useState(false);
  const [modalSearchText, setModalSearchText] = useState();
  const [nlAddedList, setNlAddedList] = useState();
  const [fontSize, setFontSize] = useState(14);

  const mealType = route.params && route.params.mealType;
  const headers = {
    "x-app-id": APP_ID,
    "x-app-key": APP_KEY,
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
        console.log(isModalVisible);
        if (isModalVisible) {
          let nlSuggestionArray = [];

          setNlSuggestionList(response.data.foods);
        } else {
          console.log("test32432");
          setSearchedItem(response.data);
        }
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
  const handleBarcodeNavigation = () => {
    navigation.navigate("Scanner", { mealType }); //mealtype should be selected once in the food details page if searched from this page
  };

  const toggleModal = () => {
    setModalVisibile(!isModalVisible);
  };

  const handleModalInputChange = (input) => {
    setModalSearchText(input);
    const newTextLength = input.length;
    const newSize = Math.max(14, 16 - newTextLength); // Example adjustment logic

    setFontSize(newSize);
  };

  const handleSubmitModalSearch = () => {
    const naturalPostUrl =
      "https://trackapi.nutritionix.com/v2/natural/nutrients";
    const naturalQueryData = { query: `${modalSearchText}` };
    requestCommonFoodItems(naturalPostUrl, naturalQueryData, headers);
  };

  const handleAddItem = (item) => {
    console.log(item);
  };

  const clearNlSearch = () => {
    setModalSearchText();
    setNlSuggestionList([]);
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
            <TouchableOpacity onPress={handleBarcodeNavigation}>
              <View style={styles.searchOptionContainer}>
                <View style={styles.nlIconBackground}>
                  <View style={styles.nlIcon}>
                    <Ionicons name="barcode" size={60} color="#ffff" />
                  </View>
                </View>
                <Text style={[styles.nlText, styles.bsText]}>
                  Barcode Scanner
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.searchOptionContainer}>
              <TouchableOpacity onPress={toggleModal}>
                <View style={styles.nlIconBackground}>
                  <View style={styles.nlIcon}>
                    <Ionicons name="mic" size={60} color="#ffff" />
                  </View>
                </View>
              </TouchableOpacity>

              <Text style={styles.nlText}>Natural Languge</Text>
              <Text style={styles.nlText}>Search</Text>
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

      <View style={styles.container}>
        <Modal
          transparent={true}
          animationType="fade"
          visible={isModalVisible}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalOverlay}>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={[styles.buttonText, styles.nlCloseBtn]}>
                <Ionicons name="close" size={50} color="white" />
              </Text>
            </TouchableOpacity>
            <View style={styles.nlIconModal}>
              <Ionicons name="mic" size={100} color="#ffff" />
            </View>

            <View style={styles.nlInputContainer}>
              <TextInput
                style={[styles.modalInput, { fontSize: fontSize }]}
                placeholder="For breakfast I had eggs and orange juice..."
                placeholderTextColor="#aaa"
                value={modalSearchText}
                onChangeText={handleModalInputChange}
              />
              <TouchableOpacity
                // style={styles.button}
                onPress={() => {
                  clearNlSearch();
                }}
              >
                <Text style={styles.nlClearBtn}>
                  <Ionicons name="close" size={20} color="#4470e9" />
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <View>
                {console.log("test", nlSuggestionList)}
                {nlSuggestionList.map((item) => {
                  return (
                    <View style={styles.nlSuggestionList}>
                      <Image
                        source={{ uri: item.photo.thumb }}
                        style={[styles.nlImage]}
                      />
                      <Text style={styles.nlFoodItem}>
                        {item.food_name.charAt(0).toUpperCase() +
                          item.food_name.slice(1)}
                      </Text>
                      <TouchableOpacity>
                        <View
                          onPress={() => handleAddItem(item)}
                          style={styles.plusSign}
                        >
                          <Text style={styles.plusSignText}>+</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </View>

            <TouchableOpacity onPress={handleSubmitModalSearch}>
              <Text style={styles.nlSearchBtn}>Search</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
    height: 115,
    width: 150,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,

    marginLeft: 15,
    marginRight: 15,
    marginTop: 25,
    marginBottom: 15,
  },

  searchOptions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  image: {
    width: 25,
    height: 25,
    marginRight: 10,
    borderRadius: 25,
  },
  nlIcon: {
    backgroundColor: "#4470e9",
    borderRadius: 30,
    paddingLeft: 3,
    marginTop: 5,
    opacity: 0.8,
  },
  nlIconBackground: {
    // height: 70,
    // width: 70,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  nlText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  bsText: {
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Adjust the last value (0.5) to control the opacity
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  nlIconModal: {
    // marginTop: "50%",
    paddingLeft: 5,
  },
  modalInput: {
    paddingLeft: 10,
    color: "#333",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    width: 350,
    marginBottom: 10,
  },
  nlSuggestionList: {
    backgroundColor: "white",
    width: 250,
    height: 50,
    margin: 5,
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    borderRadius: 15,
  },
  plusSignText: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#4470e9",
  },
  nlImage: {
    width: 25,
    height: 25,
    marginTop: 13,
    marginLeft: 5,
    borderRadius: 5,
  },
  plusSign: {
    width: 30,
    height: 30,
    backgroundColor: "#eaf4fe",
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  nlFoodItem: {
    width: 170,
    marginTop: 15,
    marginLeft: 10,
  },
  nlSearchBtn: {
    backgroundColor: "#4470e9",
    borderRadius: 10,
    margin: 5,
    padding: 5,
    width: 100,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  nlCloseBtn: {
    bottom: 125,
  },
  nlInputContainer: {
    display: "flex",
    flexDirection: "row",
  },
  nlClearBtn: {
    marginTop: 14,
    right: 30,
  },
});
