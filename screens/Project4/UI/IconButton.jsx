import { Pressable, StyleSheet,View } from "react-native";
import AntDesign from '@react-native-vector-icons/ant-design';

function IconButton({icon, color, size, onPress}){
    return (
        <Pressable onPress={onPress} style={({pressed})=> pressed && styles.pressed}>
            <View style={styles.buttonContainer}>
                <AntDesign name={icon} color={color} size={size}/>
            </View>
        </Pressable>
    )
}
export default IconButton;

const styles= StyleSheet.create({
    buttonContainer:{
        borderRadius:24,
        padding:6,
        marginHorizontal:8,
        marginVertical:2
    },
    pressed:{
        opacity:0.75
    }
})