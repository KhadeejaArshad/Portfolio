
import { FlatList, StyleSheet } from 'react-native';
import ProjectTile from './ProjectTile';
import { Projects } from './dummy/Projects'; 

function ProjectScreen({navigation}) {
  function renderCategory(itemData) {
    return (
      <ProjectTile
        title={itemData.item.title}
        color={itemData.item.color}
        image={itemData.item.image}
        onPress={() => {
          console.log('Pressed:', itemData.item.title);
          navigation.navigate(itemData.item.screenName)
        }}
      />
    );
  }

  return (
    <FlatList
      data={Projects}
      keyExtractor={item => item.id}
      renderItem={renderCategory}
      numColumns={2}
      contentContainerStyle={styles.list}
    />
  );
}

export default ProjectScreen;

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
});
