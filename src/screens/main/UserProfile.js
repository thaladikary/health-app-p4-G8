import { useState } from 'react';
import { View, Text, StyleSheet,Image, Dimensions, StatusBar, KeyboardAvoidingView, TouchableOpacity, TextInput, Keyboard, FlatList, ImageBackground} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Navbar from '../../components/Navbar';

export default function UserProfile({ navigation }) {
  const [firstName] = useState('John');
  const [lastName] = useState('Thal');
  const [age] = useState('18');
  const [goal] = useState('Stay healthy');
  const [weight] = useState('70');

  return (
    <ImageBackground
      source={require('../../assets/Setup-pages/white-background-1.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Top Section */}
        <View style={styles.topSection}>
          <Text style={styles.profileText}>Profile</Text>
          <Image
            source={require('../../assets/Setup-pages/human-fruit-gym-WHITE.jpg')}
            style={styles.userImage}
          />

          {/* User Name */}
          <Text style={styles.userName}>{`${firstName} ${lastName}`}</Text>
        </View>

        
        {/* Section with the infos  */}
        <View style={styles.infoContainer}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoItemValue}>{age}</Text>
              <Text style={styles.infoItemLabel}>Age</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoColumn}>
              <Text style={styles.infoItemValue}>{weight}</Text>
              <Text style={styles.infoItemLabel}>Weight</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoColumn}>
              <Text style={styles.infoItemValue}>{goal}</Text>
              <Text style={styles.infoItemLabel}>Goal</Text>




</View>
       </View> 
      </View>
      <Navbar navigation={navigation} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  topSection: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20
    // marginTop: -50, // Adjust the value based on your design
  },

//   topSectionBackground: {
//     backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent white background
//     padding: 20,
//     borderRadius: 20,
//     alignItems: 'center',
//   },







  userImage: {
    width: 140,
    height: 140,
    borderRadius: 50, // Assuming the user image is a circle
    marginBottom: 10,

  },

  profileText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    
  },





infoContainer: {

    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center', // Center items vertically
    backgroundColor: 'white',
    padding: 20,
    marginTop:10,  
    borderRadius: 20,
    flex: 0.1,

  },

  infoColumn: {
    alignItems: 'center',
    margin: 12,
    flex: 0.3

  },

  infoItemValue: {
    fontSize: 20,
    marginBottom: 5,
    textAlign: 'center',
    
  },
  infoItemLabel: {
    fontSize: 14,
    color: 'gray',
  },
  divider: {
    height: '60%', // Adjust the height of the divider as needed
    width: 1,
    backgroundColor: 'black', // Color of the divider
    fontWeight: 'bold',
    
  },





//   infoContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   infoItem: {
//     fontSize: 20,
//   },

//   divider: {
//     fontSize: 20,
//     color: 'black', // Color of the divider
//     marginHorizontal: 10, // Adjust the spacing around the divider
//   },
});