import React from "react";
import { useData } from "./DataContext";

const AggregateComponent = () => {
  const {
    inputAge,
    measurement,
    inputWeight,
    selectedGender,
    selectedActiveOption,
    selectedGoalOption,
    selectedWeightGoalOption,
  } = useData();

  // Create an object with the aggregated states
  const aggregatedStates = {
    inputAge,
    measurement,
    inputWeight,
    selectedGender,
    selectedActiveOption,
    selectedGoalOption,
    selectedWeightGoalOption,
    // Add more state variables as needed
  };

  //   Use aggregatedStates as needed
  console.log(aggregatedStates);

  return null;
};

export default AggregateComponent;
