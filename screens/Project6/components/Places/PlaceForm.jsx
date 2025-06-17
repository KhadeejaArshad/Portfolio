import { useCallback, useContext, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { ScrollView, TextInput } from "react-native-gesture-handler"
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import CustomButton from "../UI/Button";
import { Place } from "../../models/place";
import { PlaceContext } from "../../store/place-context";
function PlaceForm({onCreatePlace}){
    const PlaceCtx=useContext(PlaceContext)


    function changeTitleHandler(enteredText){
        PlaceCtx.Title(enteredText)
        
    }
    function takeImageHandler(imageUri){
        PlaceCtx.Image(imageUri)
        
        
        
    }
    const pickLocationHandler=useCallback((location)=>{
        PlaceCtx.Location(location)
        

    },[])
    function savePlaceHandler(){
        const placeData=new Place(PlaceCtx.title,PlaceCtx.image,PlaceCtx.location);
        onCreatePlace(placeData);
        PlaceCtx.title=""
        PlaceCtx.image=""
      
        
        
        

    }

    return(
       <ScrollView style={styles.form}>
        <View>
            <Text style={styles.label}>
                Title

            </Text>
            <TextInput style={styles.input} onChangeText={changeTitleHandler} value={PlaceCtx.title}/>
        </View>
        <ImagePicker onTakeImage={takeImageHandler}/>
        <LocationPicker onPickLocation={pickLocationHandler}/>
        <CustomButton onPress={savePlaceHandler}>Add Place</CustomButton>
       </ScrollView>
    )
}
export default PlaceForm

const styles=StyleSheet.create({
    form:{
        flex:1,
        padding:24
    },
    label:{
        fontWeight:'bold',
        marginBottom:4,
        color:Colors.primary500
    },
    input:{
        marginVertical:8,
        paddingHorizontal:4,
        paddingVertical:8,
        fontSize:16,
        borderBottomColor:Colors.primary700,
        borderBottomWidth:2,
        backgroundColor:Colors.primary100
    }
})