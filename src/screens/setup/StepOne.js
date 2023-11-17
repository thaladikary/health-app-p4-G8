import { useState } from 'react';
import { View, Text, StyleSheet,Image, Dimensions, StatusBar, KeyboardAvoidingView, TouchableOpacity, TextInput, Keyboard, FlatList} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';


export default function StepOne({ navigation }){
    // if you want to have a button that navigates through different screens refer to /components/Navbar.js

    //using this variable to store the age of the users, we also set the initial age at 18
    const setSelectedAge = useState(18);
    const [inputAge, setInputAge] = useState('');

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

        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            
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
                onPress={() => navigation.navigate('StepTwo')}
            >
                <Text style={styles.nextButtonText}>Next Step</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
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
    },

    steText: {
        flexDirection: 'row',
        fontSize: 18,
        marginBottom: 20,
        position: 'absolute',
        top: 70,
        color: 'dodgerblue',
        fontFamily: 'Georgia',
        fontWeight: '500',
        flexDirection: 'row', // Use row direction for horizontal layout
        alignItems: 'center', // Align items in the center
    },

    mainLabel: {
        fontSize: 30,
        marginTop: 30,
        position: 'absolute',
        top: 170,
        fontWeight: 'bold',
    },

    nextButton: {
        backgroundColor: "deepskyblue",
        fontSize: 18,
        textAlign: 'center',
        padding: 10,
        width: '75%',
        borderRadius: 25,
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
        marginVertical: 200,
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
        top: -90,
    },
    
})
;
