import {StyleSheet, Text, TextInput, View} from 'react-native';
import {GlobalStyles} from '../../constant/styles';

function Input({label,invalid, textInputConfig, style}) {


  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }
  if(invalid){
    inputStyles.push(styles.inValidInput)
  }
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}
export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
    
   
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidLabel:{
    color:GlobalStyles.colors.error500

  },
  inValidInput:{
    backgroundColor:GlobalStyles.colors.error50

  }
});
