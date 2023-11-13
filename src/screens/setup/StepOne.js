import { useState } from 'react';
import { View, Text, StyleSheet,Image, Dimensions, StatusBar, TouchableOpacity, Picker} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';


export default function StepOne({ navigation }){
    // if you want to have a button that navigates through different screens refer to /components/Navbar.js
    // ask us if stuck

    //using this variable to store the age of the users, we also set the initial age at 18
    const [selectedAge, setSelectedAge] = useState(18);

    
    //NEXT STEP button stuff
    //SHOULD BE USING THIS: according to chat 
   // const navigation = useNavigation();

    // TO DO : change text styles
    // Picker item lets the user pick from a list
    // onValueChange is used to update the selectedAge
    // Do I need to make the list of picker item from 0-100?

    return(
        <View style={styles.container}>
            <Text style={styles.steText}>Step 1 of 3</Text> 
            <Text style={styles.mainLabel}>Enter your age</Text>


            <Picker 
                selectedValue={selectedAge}
                onValueChange={(itemValue) => setSelectedAge(itemValue)}
            >

            <Picker.Item label="18" value={18} />
            <Picker.Item label="19" value={19} />
            <Picker.Item label="20" value={20} />
            <Picker.Item label="21" value={21} />
            <Picker.Item label="22" value={22} />
            <Picker.Item label="23" value={23} />
            <Picker.Item label="24" value={24} />
            <Picker.Item label="25" value={25} />


            </Picker>



            <TouchableOpacity
                style={styles.nextButton}
                onPress={() => navigation.navigate('StepTwo')}

>

                <Text style={styles.nextButtonText}>NEXT STEP</Text>
            </TouchableOpacity>






            
        </View>

    )




//all the styles
// TO DO : make it look like the picture 

const styles = StyleSheet.create ({
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
    label: {
        fontSize: 16,
    },

    nextButton: {
        backgroundColor: "blue",
        fontSize: 18,
        textAlign: 'center',

    },
    nextButtonText: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
    }

}
)
};
