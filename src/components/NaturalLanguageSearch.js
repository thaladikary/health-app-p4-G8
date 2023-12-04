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
import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import { APP_ID, APP_KEY } from "@env";

export default function NaturalLanguageSearch({ visible, setVisible }) {
  const [nlSuggestionList, setNlSuggestionList] = useState([]);
  const [isModalVisible, setModalVisibile] = useState(visible);
  const [modalSearchText, setModalSearchText] = useState();
  const [nlAddedList, setNlAddedList] = useState([]);

  const headers = {
    "x-app-id": APP_ID,
    "x-app-key": APP_KEY,
  };

  useEffect(() => {
    setVisible(isModalVisible);
  }, [isModalVisible]);

  const requestCommonFoodItems = (postUrl, foodItemPostData, headers) => {
    axios
      .post(postUrl, foodItemPostData, { headers })
      .then((response) => {
        setNlSuggestionList(response.data.foods);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleModalInputChange = (input) => {
    setModalSearchText(input);
  };

  const handleSubmitModalSearch = () => {
    const naturalPostUrl =
      "https://trackapi.nutritionix.com/v2/natural/nutrients";
    const naturalQueryData = { query: `${modalSearchText}` };
    requestCommonFoodItems(naturalPostUrl, naturalQueryData, headers);
  };

  const handleAddItem = (item) => {
    // console.log(item);
    setNlAddedList((prevList) => [...prevList, item]);

    //remove clicked item from suggestion list
    setNlSuggestionList((prevElements) =>
      prevElements.filter((addedItem) => addedItem.food_name !== item.food_name)
    );

    console.log(nlAddedList);
  };

  const removeFromNlAddedList = (item) => {
    setNlAddedList((prevElements) =>
      prevElements.filter((addedItem) => addedItem.food_name !== item.food_name)
    );
  };

  const clearNlSearch = () => {
    setModalSearchText();
    setNlSuggestionList([]);
    setNlAddedList([]);
  };

  return (
    <View style={styles.container}>
      <Modal transparent={true} animationType="fade" visible={isModalVisible}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            onPress={(isModalVisible) => setModalVisibile(!isModalVisible)}
          >
            <Text style={[styles.buttonText, styles.nlCloseBtn]}>
              <Ionicons name="close" size={50} color="white" />
            </Text>
          </TouchableOpacity>
          <View style={styles.nlIconModal}>
            <Ionicons name="mic" size={100} color="#ffff" />
          </View>

          <View style={styles.nlInputContainer}>
            <TextInput
              style={[styles.modalInput, { fontSize: 16 }]}
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
            {nlAddedList.length != 0 ? (
              <Text style={styles.nlItemsFoundHeader}>Added:</Text>
            ) : undefined}
            {nlAddedList.map((item) => {
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
                  <TouchableOpacity onPress={() => removeFromNlAddedList(item)}>
                    <View style={styles.plusSign}>
                      <Text style={styles.plusSignText}>
                        <Ionicons
                          name="checkmark-outline"
                          size={25}
                          color={"green"}
                        />
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          <View>
            {nlSuggestionList.length != 0 ? (
              <Text style={styles.nlItemsFoundHeader}>Results:</Text>
            ) : undefined}
            <View>
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
                    <TouchableOpacity onPress={() => handleAddItem(item)}>
                      <View style={styles.plusSign}>
                        <Text style={styles.plusSignText}>+</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>

          {nlAddedList.length == 0 && nlSuggestionList.length >= 0 ? (
            <TouchableOpacity onPress={handleSubmitModalSearch}>
              <Text style={styles.nlSearchBtn}>Search</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setModalVisibile(false)}>
              <Text style={styles.nlDoneBtn}>Done</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
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
  nlItemsFoundHeader: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    marginTop: 25,
  },
  nlDoneBtn: {
    backgroundColor: "green",
    borderRadius: 10,
    margin: 5,
    padding: 5,
    width: 100,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});
