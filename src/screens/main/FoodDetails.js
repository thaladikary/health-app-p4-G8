import { View, Text, StyleSheet,Image, Dimensions, StatusBar, TouchableOpacity} from 'react-native';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
export default function FoodDetails({navigation,route}) {
    const foodData = route.params
    const [servingsAmt, setServingsAmt] = useState(1);
    const [macros, setMacros] = useState({
        calories: foodData.prop.nutriments.calories,
        carbs: foodData.prop.nutriments.carbohydrates,
        protein: foodData.prop.nutriments.protein,
        fat: foodData.prop.nutriments.fat
    });
    
    console.log("TEST", typeof foodData.prop.nutriments.carbohydrates, foodData.prop.nutriments.carbohydrates);
    
    const handleSubtractServing = () => {
        console.log("test");
        const newServingsAmt = servingsAmt !== 1 ? servingsAmt - 1 : 1;
        setServingsAmt(newServingsAmt);
        setMacros({
            calories: foodData.prop.nutriments.calories * newServingsAmt,
            carbs: foodData.prop.nutriments.carbohydrates * newServingsAmt,
            protein: foodData.prop.nutriments.protein * newServingsAmt,
            fat: foodData.prop.nutriments.fat * newServingsAmt
        });
        console.log(foodData.prop.nutriments.calories * newServingsAmt, foodData.prop.nutriments.calories, newServingsAmt);
    };
    
    const handleAddServing = () => {
        console.log("test2");
        const newServingsAmt = servingsAmt + 1;
        setServingsAmt(newServingsAmt);
        setMacros({
            calories: foodData.prop.nutriments.calories * newServingsAmt,
            carbs: foodData.prop.nutriments.carbohydrates * newServingsAmt,
            protein: foodData.prop.nutriments.protein * newServingsAmt,
            fat: foodData.prop.nutriments.fat * newServingsAmt
        });
        console.log(foodData.prop.nutriments.calories * newServingsAmt, foodData.prop.nutriments.calories, newServingsAmt);
    };
    return(
        <View style={styles.container}>
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
                    <View>
                        <TouchableOpacity onPress={handleSubtractServing}>
                        <Text style={styles.servingsFont}>-</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.numberBox}>
                        <Text style={styles.servingsFont}>{servingsAmt}</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={handleAddServing}>
                            <Text style={styles.servingsFont}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.addButton}>
                <Text style={styles.addText}>+ Add</Text>
            </View>
            
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
        height:270,
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
        marginTop:35,
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
        // marginBottom:15,
        // marginTop:15,
        
      
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
    }
})