import { useState } from 'react';
import { View, Text, StyleSheet,Image, Dimensions, StatusBar, KeyboardAvoidingView, TouchableOpacity, TextInput, Keyboard, FlatList} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useUser } from '../../context/userContext';
import { db } from '../../config/firebase';
import { addDoc,collection } from '@firebase/firestore';
export default function StepOne({ navigation }){
    // if you want to have a button that navigates through different screens refer to /components/Navbar.js

    //using this variable to store the age of the users, we also set the initial age at 18
    const setSelectedAge = useState(18);
    const [inputAge, setInputAge] = useState('');
    const userId = useUser().uid
    const handleNextStep = async() => {
        // Check if inputAge is not empty before navigating to the next step
        if (inputAge.trim() !== '') {
            
                // const entryPath = `users/${userId}/userInfo`
                // const docRef = await addDoc(collection(db, entryPath), {age:inputAge});
                navigation.navigate('StepTwo',{inputAge});
         
        } else {
            // You can add an alert or other feedback for the user to enter their age
            console.warn('Please enter your age');
        }
    };
    //used for the age input
    const renderItem = ({ item }) => (
        <TouchableOpacity
          style={styles.ageItem}
          onPress={() => {
            setSelectedAge(item.value.toString());
            setInputAge('');
          }}
        >
          <Text style={styles.ageItemText}>{item.label}</Text>
        </TouchableOpacity>
      );


   
    // onValueChange is used to update the setSelectedAge
    return(

        <View style={styles.container} behavior='padding'>
            
            {/* used for the Step Progress Lines */}
            <View style={styles.steText}>
                <View style={styles.progressLine} />
                <View style={styles.emptyLine} />
                <View style={styles.emptyLine} />
            </View>

            <Text style={styles.steTextNumber}>Step 1 of 3</Text>
            <Text style={styles.mainLabel}>Enter your age</Text>

            {/* we take inputs for the age 
                Age is STORED into inputAge */}
            <TextInput
                style={styles.inputAge}
                placeholder="18"
                keyboardType="numeric"
                value={inputAge}
                onChangeText={(text) => setInputAge(text)}
                onFocus={() => {}}
                // onBlur={Keyboard.dismiss}
            ></TextInput>

            {/* NEXT STEP Button here */}
            <TouchableOpacity
                style={styles.nextButton}
                onPress={handleNextStep}
            >
                <Text style={styles.nextButtonText}>Next Step</Text>
            </TouchableOpacity>
        </View>
    )
}




//all the styles
const styles = StyleSheet.create ({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        margin: 20,
        position: 'relative',
        //marginTop: 70,
    },

    steText: {
        flexDirection: 'row',
        fontSize: 18,
        marginBottom: 20,
        position: 'absolute',
        top: 0,
        marginTop: 70,
        color: 'dodgerblue',
        fontFamily: 'Georgia',
        fontWeight: '500',
        flexDirection: 'row', // Use row direction for horizontal layout
        alignItems: 'center', // Align items in the center

        zIndex: 1, // Add this line
    },

    mainLabel: {
        fontSize: 30,
        marginTop: 30,
        //position: 'absolute',
        top: -210,
        fontWeight: 'bold',
        
    },

    nextButton: {
        backgroundColor: "deepskyblue",
        fontSize: 18,
        textAlign: 'center',
        padding: 10,
        width: '75%',
        borderRadius: 25,
        top: -50,
    },

    nextButtonText: {
        color: 'black',
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',

    },

    inputAge: {
        fontSize: 26,
        textAlign: 'center',
        borderBottomWidth: 1,
        width: '70%',
        //marginVertical: 200,
        margin: 20,
        top: -50,
    },

    progressLine: {
        flex: 1,
        height: 2,
        backgroundColor: 'dodgerblue',
    },

    emptyLine: {
        flex: 1,
        height: 2,
        backgroundColor: '#ccc',
    },

    steTextNumber: {
        fontSize: 18,
        marginLeft: 10, // Adjust the spacing between the lines and the number
        color: 'dodgerblue',
        fontFamily: 'Georgia',
        fontWeight: '500',
        top: -240,
    },
    
})
;
