import { useState } from 'react';
import { View, Text, StyleSheet,Image, Dimensions, StatusBar, TouchableOpacity, Picker} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';



export default function StepTwo(){

    //creating the variables used in this function
    const [selectedWeight, setSelectedWeight] = useState(50);
    const [selectedUnit, setSelectedUnit] = useState('kg');

    const navigation = useNavigation();



    return(
        <View style={StyleSheet.container}>
            <Text style={styles.steText}>Step 2 of 3</Text>
            <Text style={styles.mainLabel}>Enter your weight</Text>

            <View style={styles.inputContainer}>
                <Picker
                    selectedValue={selectedWeight}
                    onValueChange={(itemValue) => setSelectedWeight(itemValue)}
                >

                    <Picker.Item label='50' value={50} />
                    <Picker.Item label='51' value={51} />
                    <Picker.Item label='52' value={52} />
                    <Picker.Item label='53' value={53} />
                    <Picker.Item label='54' value={54} />
                    <Picker.Item label='55' value={55} />

                </Picker>

                <Picker
                    selectedValue={selectedUnit}
                    onValueChange={(itemValue) => setSelectedUnit(itemValue)}
                >
                    <Picker.Item label="kg" value="kg" />
                    <Picker.Item label="lb" value="lb" />
                
                </Picker>

            </View>
            <TouchableOpacity
                style={styles.nextButton}
                onPress={() => navigation.navigate('StepThree')}
            >

                <Text style={styles.nextButtonText}>NEXT STEP</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  steText: {
    fontSize: 24,
    marginBottom: 25,
  },
  mainLabel: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  nextButton: {
    backgroundColor: 'blue',
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
  },
  nextButtonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
});




  