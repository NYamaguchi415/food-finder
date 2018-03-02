import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions, Button, StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-elements';

//const SCREEN_HEIGHT = Dimensions.get('window').height;

class FilterScreen extends Component {
  static navigationOptions = {
    title: 'Filters',
  };

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', paddingTop: 50 }}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button
            title='American'
            onPress={() => console.log('abc')}
            style={styles.filterButtonStyle}
          />
          <Button
            title='Chinese'
            onPress={() => console.log('abc')}
            style={styles.filterButtonStyle}
          />
          <Button
            title='Halal'
            onPress={() => console.log('abc')}
            style={styles.filterButtonStyle}
          />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button
            title='Indian'
            onPress={() => console.log('abc')}
            style={styles.filterButtonStyle}
          />
          <Button
            title='Italian'
            onPress={() => console.log('abc')}
            style={styles.filterButtonStyle}
          />
          <Button
            title='Japanese'
            onPress={() => console.log('abc')}
            style={styles.filterButtonStyle}
          />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button
            title='Mexican'
            onPress={() => console.log('abc')}
            style={styles.filterButtonStyle}
          />
          <Button
            title='Thai'
            onPress={() => console.log('abc')}
            style={styles.filterButtonStyle}
          />
          <Button
            title='Ukranian'
            onPress={() => console.log('abc')}
            style={styles.filterButtonStyle}
          />
        </View>
      </View>
    );
  }
}

export default FilterScreen;

const styles = StyleSheet.create({
  filterButtonStyle: {
    flex: 1,
    height: 50,
    width: 50,
    borderWidth: 2,
    borderRadius: 10,
    padding: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

// <List>
//   <FlatList
//     data={[{ key: 'American' }, { key: 'Chinese' }, { key: 'Halal' },
//      { key: 'Indian' }, { key: 'Italian' }, { key: 'Japanese' },
//      { key: 'Mexican' }, { key: 'Thai' }, { key: 'Ukranian' }]}
//     renderItem={({ item }) =>
//       <ListItem
//         title={item.key}
//         hideChevron
//       />
//     }
//   />
// </List>
