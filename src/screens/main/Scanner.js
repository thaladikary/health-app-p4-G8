import { Camera, CameraType } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { APP_KEY, APP_ID } from "@env";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
export default function Scanner({ navigation, route }) {
  const mealType = route.params && route.params.mealType;
  const currentDate = route.params && route.params.currentDate;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [foodData, setFoodData] = useState();
  useEffect(() => {
    setScanned(false);
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setScanned(false);
      setHasPermission(false);
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
      })();
    });
    return unsubscribe;
  }, [navigation]);
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    console.log(data);
    try {
      const headers = {
        "x-app-id": APP_ID,
        "x-app-key": APP_KEY,
      };
      const apiLink = "https://trackapi.nutritionix.com/v2/search/item?upc=";

      axios.get(apiLink + data, { headers }).then((resp) => {
        const data = resp.data.foods[0];
        console.log(data.food_name);
        prop = {
          name: data.food_name,
          image: data.photo.thumb,
          nutriments: {
            calories: data.nf_calories,
            fat: data.nf_total_fat,
            protein: data.nf_protein,
            carbohydrates: data.nf_total_carbohydrate,
          },
        };
        navigation.navigate("FoodDetails", { prop, mealType, currentDate});
      });
      // console.log(headers)
      // axios.get("https://world.openfoodfacts.net/api/v2/product/"+data)
      // .then(resp => {
      //   setFoodData({ image: resp.data.product.image_url });
      //   const data = resp.data
      //   prop={
      //     name:data.product.product_name,
      //     image: data.product.image_url,
      //     nutriments: data.product.nutriments,

      //   }
      //   navigation.navigate("FoodDetails", {prop});
      // })
    } catch (e) {
      console.log("invalid scan");
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.overlay}></View>
      <BarCodeScanner
        style={styles.camera}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      ></BarCodeScanner>
      <View style={styles.box}></View>
      <View style={styles.barcodeInstruction}>
        <Text style={styles.text}>Point your camera at a barcode</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  box: {
    borderWidth: 2,
    borderColor: "white",
    width: 270,
    height: 180,
    position: "absolute",
    zIndex: 2,
    top: (screenHeight - 180) / 2,
    left: (screenWidth - 270) / 2,
    borderRadius: 20,
  },
  barcodeInstruction: {
    position: "absolute",
    top: screenHeight / 1.5,
    left: 40,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
