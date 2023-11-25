import { View, Text, StyleSheet,Image, Dimensions, StatusBar, TouchableOpacity} from 'react-native';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { collection, addDoc, doc } from '@firebase/firestore';
import {db} from "../../config/firebase"
import { useUser } from '../../context/userContext';

const { width, height } = Dimensions.get('window');

export default function FoodDetails({navigation,route}) {
    const foodData = route.params
   
    const user = useUser()
    const [servingsAmt, setServingsAmt] = useState(1);
    const [macros, setMacros] = useState({
        calories: foodData.prop.nutriments.calories,
        carbs: foodData.prop.nutriments.carbohydrates,
        protein: foodData.prop.nutriments.protein,
        fat: foodData.prop.nutriments.fat
    });
    const [foodDataWithServings,setFoodDataWithServings] =useState({
            ...foodData,
           
    })

    useEffect(() => {
        setFoodDataWithServings({
          ...foodDataWithServings,
          prop: {
            ...foodDataWithServings.prop,
            nutriments: {
              calories: macros.calories,
              carbohydrates: macros.carbs,
              protein: macros.protein,
              fat: macros.fat,
            },
          },
          servingsAmt:servingsAmt
        });
      }, [macros]);
    
    const handleSubtractServing = () => {
        const newServingsAmt = servingsAmt !== 1 ? servingsAmt - 1 : 1;
        setServingsAmt(newServingsAmt);
        setMacros({
            calories: foodData.prop.nutriments.calories * newServingsAmt,
            carbs: foodData.prop.nutriments.carbohydrates * newServingsAmt,
            protein: foodData.prop.nutriments.protein * newServingsAmt,
            fat: foodData.prop.nutriments.fat * newServingsAmt
        });
       
    };
    
    const handleAddServing = () => {
        const newServingsAmt = servingsAmt + 1;
        setServingsAmt(newServingsAmt);
        setMacros({
            calories: foodData.prop.nutriments.calories * newServingsAmt,
            carbs: foodData.prop.nutriments.carbohydrates * newServingsAmt,
            protein: foodData.prop.nutriments.protein * newServingsAmt,
            fat: foodData.prop.nutriments.fat * newServingsAmt
        });
       
    };
    const handleReturn= ()=>{
        console.log("return to scanner")
        navigation.navigate("Scanner")
    }
    const getCurrentDate = () => {
        const today = foodData.currentDate;
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
      console.log(getCurrentDate())
    const handleAddToDiary = async()=>{
        
        console.log("food is logged")
        const prop = {
            macros,
            name: foodData.prop.name,
            mealType: foodData.mealType,
            servingsAmt:servingsAmt
        }
        console.log("PROP",prop)
        
        // navigation.navigate("TrackCalories",{prop})
       
        try {
            const userId = user.uid
            const entryPath = `users/${userId}/foodDiaries/${getCurrentDate()}/entries`;
            
            console.log("FOODDATA,",foodDataWithServings)
            const docRef = await addDoc(collection(db, entryPath), foodDataWithServings);
            navigation.navigate("TrackCalories", { prop });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={handleReturn}>
                <View style={styles.arrowContainer}>
                    <Text style={styles.arrowText}>{'<'}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.imageContainer}>
                <View style={styles.imageCard}>
                     <Image style={styles.icon}src={foodData.prop.image} resizeMode='contain'/>
                </View>
            </View>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>{foodData.prop.name}</Text>
             </View>
            

             <View style={styles.boxContainer}>
                 <View style={styles.nutritionBox}>
                    <View style={styles.macroBox}>
                        <View style={[styles.circle,styles.circle1]}>
                            <Text>{Math.round(macros.calories)}</Text> 
                        </View>
                        <View style={styles.center}>
                            <Text >Calories</Text>
                            <Text style={styles.unitText}>kcal</Text>
                        </View>
                       
                    </View>
                    <View style={styles.macroBox}>
                        <View style={[styles.circle,styles.circle2]}>
                            <Text>{Math.round(macros.carbs)}</Text> 
                        </View>
                        <View style={styles.center}>
                            <Text >Carbs</Text>
                            <Text  style={styles.unitText}>g</Text>
                        </View>
                    </View>
                    <View style={styles.macroBox}>
                        <View style={[styles.circle,styles.circle3]}>
                            <Text>{Math.round(macros.protein)}</Text>
                          
                        </View>
                        
                        <View style={styles.center}>
                            <Text >Protein</Text>
                            <Text style={styles.unitText}>g</Text> 
                        </View>
                    </View>
                    <View style={styles.macroBox}>
                        <View style={[styles.circle,styles.circle4]}>
                            <Text>{Math.round(macros.fat)}</Text> 
                        </View>
                        <View style={styles.center}>
                            <Text >Fat</Text>
                            <Text style={styles.unitText}>g</Text> 
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.servingContainer}>
                <Text style={styles.subText}>Servings</Text>
                <View style={styles.servingNumberContainer}>
                    
                <TouchableOpacity onPress={handleSubtractServing}>
                    <View style={styles.touchableOpacityInner}>
                        <Text style={styles.servingsFont}>-</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.numberBox}>
                    <Text style={styles.servingsFont}>{servingsAmt}</Text>
                </View>

                <TouchableOpacity onPress={handleAddServing}>
                    <View style={styles.touchableOpacityInner}>
                        <Text style={styles.servingsFont}>+</Text>
                    </View>
                </TouchableOpacity>
                    
                </View>
            </View>
            <TouchableOpacity onPress={handleAddToDiary}>
            <View style={styles.addButton}>
                <Text style={styles.addText}>+ Add</Text>
            </View>
            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    headerContainer:{
        // borderBottomColor:"black",
        // borderBottomWidth:1,
    },
    imageContainer:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:250,
    },
    imageCard:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:330,
        height:230,
        backgroundColor:"white",
        borderRadius:20
    },
    icon:{
        width: 200, 
        height: 200,        
        borderRadius:20
        
    },
    headerText:{
        fontSize:17,
        fontWeight:"bold",
        marginBottom:7
       
    },
    subText:{
        fontSize:15,
        
        fontWeight:"bold",
      
    },
    nutritionBox:{
        width:330,
        height:"auto",
   
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
     
    },
    boxContainer:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    macroBox:{
        width: 80,
        height: 120,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        borderRadius: 40,
        margin: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation:5,
       
    },
    circle:{
        width:60,
        height:60,
       
        borderWidth:2,
        borderRadius:30,
        marginLeft:9,
        marginTop:9,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    circle1:{
        borderColor:"#c2cfdf",
    },
    circle2:{
        borderColor:"#f5a5b0",
    },
    circle3:{
        borderColor:"#9ccaf8",
    },
    circle4:{
        borderColor:"#fbc67f",
    },

    center:{
        // marginLeft:15,
        marginTop:5,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"

    },
    unitText:{
        fontSize:13,
        color:"#a3a1ac" 
    },
    addButton:{
        width:300,
        height:55,
        backgroundColor:"red",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:20,
        marginTop:5,
        backgroundColor:"#4c72d5",
        
    },
    addText:{
        color:"#ffffff"
    },
    servingContainer:{
        marginTop:10,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    servingNumberContainer:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
    },
    numberBox:{
        width:100,
        height:100,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:20,
        margin:25,
        marginTop:10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        borderRadius: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation:5,
    },
    servingsFont:{
        fontSize:50
    },
   
    touchableOpacityInner: {
        margin:20

    },
    arrowContainer: {
       marginLeft:-160,
       marginTop:5,
    },
    arrowText: {
        fontSize: 35, 
        fontWeight: 'bold',
    },
    
    
})