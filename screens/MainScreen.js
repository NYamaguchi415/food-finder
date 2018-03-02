import React, { Component } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { List, ListItem } from 'react-native-elements';

class MainScreen extends Component {
  static navigationOptions = {
    headerTitle: 'Food-Finder',
    headerRight: (
      <Button
        onPress={() => alert('this is a button!')}
        title='+'
        color='blue'
      />
    )
  }

  render() {
    return (
      <View>
        <Text>FRIENDS</Text>
        <List>
          <FlatList
            data={[{ key: 'Friend1' }, { key: 'Friend2' }, { key: 'Friend3' }, { key: 'Friend4' }]}
            renderItem={({ item }) =>
              <ListItem
                title={item.key}
                hideChevron
              />
            }
          />
        </List>
      </View>
    );
  }
}

export default MainScreen;
