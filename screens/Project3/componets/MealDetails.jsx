import { View, Text,StyleSheet } from "react-native";
function MealDetails({duration, complexity, affordability,style,textStyle}) {
  return (
    <View style={[styles.details, style]}>
      <Text style={[styles.mealsText, textStyle]}>{duration}m</Text>
      <Text style={[styles.mealsText, textStyle]}>{complexity.toUpperCase()}</Text>
      <Text style={[styles.mealsText, textStyle]}>{affordability.toUpperCase()}</Text>
    </View>
  );
}

export default MealDetails;

const styles= StyleSheet.create({
    details: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
       
        
      },
      mealsText: {
        color: 'white',
        marginHorizontal: 4,
        fontSize: 12,
      },
})