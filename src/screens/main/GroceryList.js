import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Button,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useUser } from "../../context/userContext";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDocs,
  deleteDoc,
} from "@firebase/firestore";
import { db } from "../../config/firebase";

export default function GroceryList({ navigation }) {
  const [groceryList, setGroceryList] = useState([]);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [docRefId, setDocRefId] = useState("");

  const user = useUser();

  //retrieves existing grocery items ffrom firebase
  useEffect(() => {
    console.log(groceryList);
    if (groceryList.length === 0) {
      const fetchGroceryItems = async () => {
        try {
          const userId = user.uid;
          const entryPath = `users/${userId}/groceryList`;
  
          const querySnapshot = await getDocs(collection(db, entryPath));
          const items = [];
  
          querySnapshot.forEach((doc) => {
            // Assuming your documents have 'itemName', 'quantity', and 'docRefId' fields
            const { itemName, quantity, docRefId } = doc.data();
            items.push({ itemName, quantity, docRefId, id: doc.id });
          });
          console.log("ITEMS:",items)
  
          setGroceryList(items);
        } catch (error) {
          console.error("Error fetching grocery items:", error);
        }
      };
  
      fetchGroceryItems();
    }
   
  }, []);

  const handleInputChange = (input) => {
    setItemName(input);
  };
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const addItem = async () => {
    if (itemName && quantity) {
      try {
        const userId = user.uid;
        const entryPath = `users/${userId}/groceryList`;

        const docRef = await addDoc(collection(db, entryPath), {
          itemName,
          quantity,
        });
        const newItem = { itemName, quantity, docRefId: docRef.id };

        await updateDoc(docRef, { docRefId: docRef.id });
        
        setGroceryList([...groceryList, newItem]);
        setItemName("");
        setQuantity(1);
        console.log("Added item with id updated")
      } catch (error) {
        console.error("Error adding item: ", error);
      }
    }
  };

  const deleteItem = (item) => {
    Alert.alert(
      "Delete Item",
      `Are you sure you want to delete ${item.itemName}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            try {
              // Delete the item from the state
              // const updatedList = groceryList.filter(
              //   (item) => item.itemName !== item.itemName
              // );
              // setGroceryList(updatedList);
            setGroceryList((prevList) =>
              prevList.filter((groceryItem) => item.docRefId !== groceryItem.docRefId)
            );
              // Delete the item from Firebase
              const userId = user.uid;
              const entryPath = `users/${userId}/groceryList`;
              console.log(item.docRefId)
              const docRef = doc(db,entryPath,item.docRefId)
              await deleteDoc(docRef);
            } catch (error) {
              console.error("Error deleting item:", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  const handleClear = async () => {
    Alert.alert(
      "Clear List",
      `Are you sure you want to clear your grocery list`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            clearGroceryListFromFirebase();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const clearGroceryListFromFirebase = async () => {
    try {
      // Delete each document in the collection
      const userId = user.uid;
      const entryPath = `users/${userId}/groceryList`;

      const querySnapshot = await getDocs(collection(db, entryPath));

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      setGroceryList([]);
      setQuantity(1);
    } catch (error) {
      console.error("Error clearing grocery list:", error);
    }
  };
  const updateQuantity = async (item, newQuantity) => {
    // setNewQuant(newQuantity);
  
    try {
      console.log("test", item,newQuantity,item.docRefId)
      const userId = user.uid;
      const entryPath = `users/${userId}/groceryList`;
      const docRef = doc(db,entryPath,item.docRefId)
      const updatedObject = {
        docRefId:item.docRefId,
        itemName: item.itemName,
        quantity: newQuantity
      }
      console.log("NEWQUANT OBJ", updatedObject)
      setGroceryList((prevList) =>
      prevList.map((prevItem) =>
        prevItem.docRefId === item.docRefId ? updatedObject : prevItem
      )
    );
      await updateDoc(docRef,updatedObject)
     
  
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  useEffect(() => {
    // This code will run after the component re-renders due to a state change
    console.log("Grocery list updated:", groceryList);
  }, [groceryList]);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Grocery List</Text>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#aaa" />
          <TextInput
            style={styles.input}
            placeholder="Enter a food item"
            placeholderTextColor="#aaa"
            value={itemName}
            onChangeText={handleInputChange}
          />
          {itemName ? (
            <View style={styles.counterContainer}>
              <TouchableOpacity onPress={incrementQuantity}>
                <View style={styles.counter}>
                  <Text style={styles.plusSignText}>+</Text>
                </View>
              </TouchableOpacity>
              <Text>
                <View style={styles.quantityCounter}>
                  <Text style={styles.plusSignText}>{quantity}</Text>
                </View>
              </Text>
              <TouchableOpacity onPress={decrementQuantity}>
                <View style={styles.counter}>
                  <Text style={styles.plusSignText}>-</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={addItem}>
                <View style={styles.plusSign}>
                  <Text style={styles.plusSignText}>Add</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : undefined}
        </View>

        <View>
          {groceryList.length != 0 ? (
            <View>
              <TouchableOpacity onPress={handleClear}>
                <Text style={styles.clearBtn}>Clear</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text></Text>
          )}
          {groceryList.map((item, index) => {
            return (
              <View style={styles.addedListContainer}>
                <View key={index} style={styles.addedFoodItem}>
                  <Text style={styles.addedItem}>
                    {`${item.itemName} x${item.quantity} ${docRefId}`}
                  </Text>
                  <View style={styles.addedItemButtons}>
                    <View style={styles.addedCounterContainer}>
                      <TouchableOpacity
                        onPress={() =>
                          updateQuantity(
                            item,
                            parseInt(item.quantity) + 1
                          )
                        }
                      >
                        <View style={styles.addedCounter}>
                          <Text style={styles.plusSignText}>+</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          updateQuantity(
                            item,
                            parseInt(item.quantity) - 1
                          )
                        }
                      >
                        <View style={styles.addedCounter}>
                          <Text style={styles.plusSignText}>-</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => deleteItem(item)}
                      >
                        <View style={styles.deleteIcon}>
                          <Text style={styles.deleteSign}>
                            <Ionicons
                              name="trash"
                              size={20}
                              color={"#E34234"}
                            />
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <Navbar navigation={navigation} active="Grocery" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {},
  headerTitle: {
    fontSize: 30,
    marginTop: 20,
    marginLeft: 18,
    fontWeight: "bold",
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

  plusSign: {
    width: 50,
    height: 30,
    backgroundColor: "#eaf4fe",
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    // marginTop: 10,
  },
  plusSignText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#4470e9",
  },
  addedFoodHeader: {
    // textAlign: "center",
    marginLeft: 5,
    fontWeight: "bold",
    fontSize: 15,
  },

  addedListContainer: {
    // marginTop: 25,
    elevation: 2,
  },
  addedFoodItem: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    elevation: 2,
    fontSize: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  clearBtn: {
    backgroundColor: "#4470e9",
    width: 45,
    height: 25,
    marginLeft: 5,
    paddingTop: 2,
    borderRadius: 5,
    textAlign: "center",
  },

  counterContainer: {
    display: "flex",
    flexDirection: "row",
    width: 140,
    justifyContent: "space-evenly",
  },
  counter: {
    width: 25,
    height: 30,
    backgroundColor: "#eaf4fe",
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityCounter: {
    backgroundColor: "#eaf4fe",
    width: 25,
    height: 30,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteIcon: {
    // backgroundColor: "red",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eaf4fe",
    width: 25,
    height: 30,
    borderRadius: 5,
  },
  deleteSign: {
    fontWeight: "bold",
    fontSize: 15,
  },
  addedCounter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eaf4fe",
    width: 25,
    height: 30,
    borderRadius: 5,
  },

  addedItemButtons: {
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "flex-start",
    marginLeft: 70,
  },

  addedItem: {
    width: 170,
    marginTop: 4,
  },
  addedCounterContainer: {
    display: "flex",
    flexDirection: "row",
    width: 85,
    marginLeft: 53,
    justifyContent: "space-evenly",
  },
});
