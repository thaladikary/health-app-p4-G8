import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import { useUser } from "../../context/userContext";
import { db } from "../../config/firebase";
import { addDoc, collection } from "@firebase/firestore";
import React, { useState, useEffect } from "react";
import { DataProvider, useData } from "../../context/DataContext";
import { useNavigation } from "@react-navigation/native";
import { StackActions } from '@react-navigation/native';
export default function CalculateBMR() {
  const user = useUser();
  const navigation = useNavigation();
  const [targetCalories,setTargetCaloricIntake] = useState()
  const {
    inputAge,
    measurement,
    inputHeight,
    selectedGender,
    selectedActiveOption,
    selectedGoalOption,
    selectedWeightGoalOption,
  } = useData();

  const mockData1 = {
    age: inputAge,
    weight: measurement,
    height: inputHeight,
    gender: selectedGender,
    activity: selectedActiveOption,
    lbsGoalPerWeek: selectedGoalOption,
    goal: parseFloat(selectedWeightGoalOption.match(/(\d+(\.\d+)?)/)?.[0]) || 0
    
  };
  console.log(mockData1);

  const activityMultipliers = {
    "Sedentary": 1.2,
    "Lightly Active": 1.375,
    "Moderately Active": 1.55,
    "Very Active": 1.725,
    "Extra Active": 1.9,
  };

  const calculateBMR = () => {
    // in kg
    const { weight, height, age, gender, activity, lbsGoalPerWeek ,goal} =
      mockData1;
      if (weight.unit === "lb") {
        weight.weight = Math.round(weight.weight / 2.20462); // 1 lb = 0.453592 kg
        weight.unit = "kg";

      }
      console.log(weight)
    let bmr;
    if (gender.toLowerCase() === "male") {
      bmr = 66.47 + 13.75 * weight.weight + 5.003 * height - 6.755 * age;
    } else if (gender.toLowerCase() === "female") {
      bmr = 655.1 + 9.563 * weight.weight + 1.85 * height - 4.676 * age;
    }
    
    const activityMultiplier = activityMultipliers[activity];
    const tdee = bmr * activityMultiplier;
   
    const totalCaloricIntake = goal * 3500;
    console.log(totalCaloricIntake)
    const dailyCaloricExtra = totalCaloricIntake / 7; // Assuming durationGoalInDays is a week
    let targetDailyCaloricIntake;
    console.log("GOAL",lbsGoalPerWeek)
    if (lbsGoalPerWeek === "gainWeight") {
      targetDailyCaloricIntake = tdee + dailyCaloricExtra;
    } else if (lbsGoalPerWeek === "loseWeight") {
      targetDailyCaloricIntake = tdee - dailyCaloricExtra;
    } else if (lbsGoalPerWeek === "stayHealthy") {
      targetDailyCaloricIntake = tdee;
    }
   
    return Math.round(targetDailyCaloricIntake);
  };

  const calculateMacronutrients = (targetCaloricIntake) => {
    const carbRatio = 0.5;
    const fatRatio = 0.3;
    const proteinRatio = 0.2;

    const carbCalories = targetCaloricIntake * carbRatio;
    const fatCalories = targetCaloricIntake * fatRatio;
    const proteinCalories = targetCaloricIntake * proteinRatio;

    const carbGrams = carbCalories / 4;
    const fatGrams = fatCalories / 9;
    const proteinGrams = proteinCalories / 4;

    return {
      carbGrams: carbGrams.toFixed(0),
      fatGrams: fatGrams.toFixed(0),
      proteinGrams: proteinGrams.toFixed(0),
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      const entryPath = `users/${user.uid}/userInfo`;
      const targetCaloricIntake = calculateBMR();
      setTargetCaloricIntake(targetCaloricIntake)
      console.log("TARGTE",targetCaloricIntake)
      const entries = {
        ...mockData1,
        caloriesIntake: targetCaloricIntake,
        carbIntake: calculateMacronutrients(targetCaloricIntake).carbGrams,
        fatIntake: calculateMacronutrients(targetCaloricIntake).fatGrams,
        proteinIntake:
          calculateMacronutrients(targetCaloricIntake).proteinGrams,
      };
      console.log(entries)
      try {
        const docRef = await addDoc(collection(db, entryPath), entries);
        console.log("Document added successfully with ID: ", docRef.id);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    };

    fetchData();
  }, []);

  const handleButtonPress = ()=>{
    navigation.dispatch(
      StackActions.push('User')
    );
  }
  // console.log(calculateBMR());
  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.heading}>Your Stats</Text>

      <View style={{ marginBottom: 16 }}>
        <Text style={styles.statLabel}>Age</Text>
        <Text style={styles.statValue}>{mockData1.age} years</Text>
      </View>

      <View style={{ marginBottom: 16 }}>
        <Text style={styles.statLabel}>Weight</Text>
        <Text style={styles.statValue}>{mockData1.weight.weight} {mockData1.weight.unit}</Text>
      </View>

      <View style={{ marginBottom: 16 }}>
        <Text style={styles.statLabel}>Height</Text>
        <Text style={styles.statValue}>{mockData1.height} cm</Text>
      </View>

      <View style={{ marginBottom: 16 }}>
        <Text style={styles.statLabel}>Gender</Text>
        <Text style={styles.statValue}>{mockData1.gender}</Text>
      </View>

      <View style={{ marginBottom: 16 }}>
        <Text style={styles.statLabel}>Activity Level</Text>
        <Text style={styles.statValue}>{mockData1.activity}</Text>
      </View>

      <View style={{ marginBottom: 16 }}>
        <Text style={styles.statLabel}>Goal</Text>
        <Text style={styles.statValue}>{mockData1.lbsGoalPerWeek}</Text>
      </View>

      <View style={{ marginBottom: 16 }}>
        <Text style={styles.statLabel}>LBS Goal per week</Text>
        <Text style={styles.statValue}>{mockData1.goal}</Text>
      </View>
      </View>
      <View style={styles.container}>
      <View style={{ marginBottom: 16 }}>
        <Text style={styles.statLabel}>Basal Metabolic Rate (BMR)</Text>
        <Text style={styles.statValue}>{targetCalories} calories/day</Text>
      </View>

      <View style={{ marginBottom: 16 }}>
        <Text style={styles.statLabel}>Protein Intake</Text>
        <Text style={styles.statValue}>{calculateMacronutrients(targetCalories).proteinGrams} grams/day</Text>
      </View>

      <View style={{ marginBottom: 16 }}>
        <Text style={styles.statLabel}>Fat Intake</Text>
        <Text style={styles.statValue}>{calculateMacronutrients(targetCalories).fatGrams} grams/day</Text>
      </View>

      <View style={{ marginBottom: 16 }}>
        <Text style={styles.statLabel}>Carb Intake</Text>
        <Text style={styles.statValue}>{calculateMacronutrients(targetCalories).carbGrams} grams/day</Text>
      </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Let's Get Started!" onPress={() => handleButtonPress()} />
      </View>

    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 16,
    backgroundColor: "#f4f4f4",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  statLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#555",
  },
  statValue: {
    fontSize: 18,
    color: "#222",
  }, buttonContainer: {
    margin: 20,
  },
});
