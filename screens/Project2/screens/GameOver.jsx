import {Text, Image, View, StyleSheet,useWindowDimensions, ScrollView} from 'react-native';
import Title from '../components/UI/Title';
import Colors from '../constant/colors';
import PrimaryButton from '../components/UI/PrimaryButton';
function GameOverScreen({roundsNumber, userNumber, onStartNewGame}) {

    const {width, height}= useWindowDimensions();

    let imageSize= 300;
    if(width <380){
        imageSize=150;
    }
    if(height<380){
        imageSize=80;
    }
    const imageStyle={
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize/2
    }
    const marginTopDistance = height < 380 ? 30 : 100;
  return (
    <ScrollView style={styles.screen}>
        <View style={[styles.rootContainer,{marginTop: marginTopDistance}]}>
      <Title>GAME OVER!!!</Title>
      <View style={[styles.imageContainer, imageStyle]}>
        <Image
          style={styles.image}
          source={require('../assets/Images/success.png')}
        />
      </View>
      <View>
        <Text style={styles.summaryText}>
          Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> round to
          guess the number<Text style={styles.highlight}> {userNumber}</Text>.
        </Text>
      </View>
      <PrimaryButton onPress={onStartNewGame}>Start A New Game</PrimaryButton>
    </View>

    </ScrollView>
    
  );
}
export default GameOverScreen;

//const deviceWidth=Dimensions.get("window").width

const styles = StyleSheet.create({
    screen:{
        flex:1
    },
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    // width: deviceWidth < 380 ? 150: 300,
    // height: deviceWidth < 380 ? 150: 300,
    // borderRadius: deviceWidth < 380 ? 75: 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: 'hidden',
    margin: 36,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  summaryText: {
    fontFamily: 'NotoSans_Condensed-Regular',
    fontSize: 25,
    textAlign: 'center',
    marginVertical: 24,
    marginBottom: 24,
  },
  highlight: {
    fontFamily: 'NotoSans_Condensed-Regular',
    color: Colors.primary500,
    fontWeight: 'bold',
  },
});
