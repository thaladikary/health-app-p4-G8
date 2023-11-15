import { Button, StyleSheet, Text, TouchableOpacity, View ,Dimensions} from 'react-native';
import React, { useState, useEffect } from "react";
export default function Search({ navigation,route }) {
    const mealType = route.params&& route.params.mealType
    console.log(mealType)
    const handleNavigateScanner=()=>{
        navigation.navigate("Scanner",{mealType})
    }
    return(
        <View>
            <TouchableOpacity onPress={handleNavigateScanner}>
                <Text>Scanner</Text>
            </TouchableOpacity>
        </View>
    )
}