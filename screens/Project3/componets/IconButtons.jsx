import { Pressable,StyleSheet } from "react-native";
import Ionicons from '@react-native-vector-icons/ionicons';

function IconButton ({ icon, color,onPress}){
    return (
        <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
            <Ionicons name={icon} color={color} size={24}/>
        </Pressable>
    )
}
export default IconButton;

const styles= StyleSheet.create({
    pressed:{
        opacity: 0.7
    }

})