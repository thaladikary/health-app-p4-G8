import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [inputAge, setInputAge] = useState();
  const [measurement, setMeasurement] = useState({
    weight: "",
    unit: "kg",
  }); // THIS IS WEIGHT
  const [inputHeight, setInputHeight] = useState(); //THIS IS HEIGHT NOT WEIGHT
  const [selectedGender, setSelectedGender] = useState();
  const [selectedActiveOption, setSelectedActiveOption] = useState();
  const [selectedGoalOption, setSelectedGoalOption] = useState();
  const [selectedWeightGoalOption, setSelectedWeightGoalOption] = useState();

  const contextValue = {
    inputAge,
    setInputAge,
    measurement,
    setMeasurement,
    inputHeight,
    setInputHeight,
    selectedGender,
    setSelectedGender,
    selectedActiveOption,
    setSelectedActiveOption,
    selectedGoalOption,
    setSelectedGoalOption,
    selectedWeightGoalOption,
    setSelectedWeightGoalOption,

    // Add more state variables and setters as needed
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
