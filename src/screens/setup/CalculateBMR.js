
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useUser } from '../../context/userContext';
import { db } from '../../config/firebase';
import { addDoc,collection } from '@firebase/firestore';
import React,{ useState, useEffect } from "react";
export default function CalculateBMR ()  {
    const userId = useUser().uid
    const mockData1 = {
        age: 20,
        weight: 60,
        height: 175,
        gender: "male",
        activity: "moderatelyActive",
        durationGoalInDays: 90,
        weightGoal: 10,
        goal: "gainWeight"
      };
      
      const activityMultipliers = {
        sedentary: 1.2,
        lightlyActive: 1.375,
        moderatelyActive: 1.55,
        veryActive: 1.725,
        extremelyActive: 1.9,
      };
      
      const calculateBMR = () => {
        const { weight, height, age, gender, activity, durationGoalInDays, weightGoal, goal} = mockData1;
      
        let bmr;
        //formula obtained from https://www.omnicalculator.com/health/bmr-harris-benedict-equation
        if (gender.toLowerCase() === "male") {
            // For men: BMR = 66.47 + (13.75 * weight in kg) + (5.003 * height in cm) - (6.755 * age in years)
            bmr = 66.47 + 13.75 * weight + 5.003 * height - 6.755 * age;
          } else if (gender.toLowerCase() === "female") {
            // For women: BMR = 655.1 + (9.563 * weight in kg) + (1.850 * height in cm) - (4.676 * age in years)
            bmr = 655.1 + 9.563 * weight + 1.850 * height - 4.676 * age;
          }
        const activityMultiplier = activityMultipliers[activity];
        const tdee = bmr * activityMultiplier;
        
        const totalCaloricIntake = weightGoal*3500
        const dailyCaloricExtra = totalCaloricIntake / durationGoalInDays
        let targetDailyCaloricIntake 
        if (goal === "gainWeight"){
            targetDailyCaloricIntake = tdee + dailyCaloricExtra
        }else if (goal === "loseWeight"){
            targetDailyCaloricIntake = tdee - dailyCaloricExtra
        }else if (goal === "stayHealthy"){
            targetDailyCaloricIntake = tdee
        }

        return Math.round(targetDailyCaloricIntake);
      };

   
      const calculateMacronutrients = (targetCaloricIntake) => {
           // formula obtained from https://www.shape.com/healthy-eating/diet-tips/how-to-calculate-macros
        const carbRatio = 0.50;
        const fatRatio = 0.30;
        const proteinRatio = 0.20; 
      
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
        useEffect(()=>{
            const fetchData = async () => {
                const entryPath = `users/${userId}/userInfo`;
                const targetCaloricIntake = calculateBMR();
                const entries = {
                  ...mockData1,
                  caloriesIntake: targetCaloricIntake,
                  carbIntake: calculateMacronutrients(targetCaloricIntake).carbGrams,
                  fatIntake: calculateMacronutrients(targetCaloricIntake).fatGrams,
                  proteinIntake: calculateMacronutrients(targetCaloricIntake).proteinGrams,
                };
            
                try {
                  const docRef = await addDoc(collection(db, entryPath), entries);
                  console.log("Document added successfully with ID: ", docRef.id);
                } catch (error) {
                  console.error('Error adding document: ', error);
                }
              };
            
              fetchData();
            
        },[])
     

      return(
        <View>
            <Text>{calculateBMR()}</Text>
            <Text>{calculateMacronutrients( calculateBMR()).proteinGrams}</Text>
            <Text>{calculateMacronutrients( calculateBMR()).fatGrams}</Text>
            <Text>{calculateMacronutrients( calculateBMR()).carbGrams}</Text>
        </View>
      )
  
};
