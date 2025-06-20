import { StyleSheet, Text } from "react-native";


function Title({children}){
    return <Text style={styles.title}>{children}</Text>
}
export default Title;

const styles=StyleSheet.create({
    title:{
        fontFamily:'NotoSans_Condensed-Regular',
        fontSize:24,
        fontWeight:'bold',
        color: 'white',
        textAlign: 'center',
        //borderWidth:Platform.OS==='android' ? 2 :0,
        //borderWidth: Platform.select({ios: 0, android:2}),
        borderWidth: 0,
        borderColor: 'white',
        padding: 12,
        maxWidth: '80%',
        width:300
    }
})