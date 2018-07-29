import React, { Component } from 'react';
import { View, FlatList, TouchableHighlight, Image,   Text, Dimensions, Button, StyleSheet, ListView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { selectFilter, setRestaurantsAsGroupOwner } from '../src/actions/FilterActions';
//const SCREEN_HEIGHT = Dimensions.get('window').height;

class FilterScreen extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let data = [
      { key: 'American'}, 
      { key: 'Chinese' }, 
      { key: 'Dessert' },
      { key: 'Greek' }, 
      { key: 'Halal' }, 
      { key: 'Hamburgers' },
      { key: 'Indian' }, 
      { key: 'Italian' }, 
      { key: 'Japanese' },
      { key: 'Mexican' }, 
      { key: 'Sandwiches' }, 
      { key: 'Thai' },
      { key: 'Ukranian' }, 
      { key: 'Vegetarian', }      
    ]

    this.data = data;
    this.dataSource = ds.cloneWithRows(data);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.restaurantsSet) {
        this.props.navigation.navigate('Swipe');
    }
  }

  static navigationOptions = {
    title: 'Filters',
  };

  render() {
    return (
      <View>
        <View>
          <List>
            <FlatList
              extraData={this.props.filterList}
              data={this.data}            
              renderItem={({ item }) =>
                <ListItem
                  onPress={this.props.selectFilter.bind(this, item.key)}
                  title={<Text style={{color: this.props.filterList[item.key] ? 'black' : 'red'}}>{item.key}</Text>}
                  hideChevron
                />
              }
                /> 
          </List>
        </View>
        <Button
          title='Start Swiping'
          onPress={this.props.setRestaurantsAsGroupOwner.bind(this, this.props.filterList, this.props.auth, this.props.home)}
        />
        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  const {auth, filters, home} = state;
  return {auth, filterList: filters.filterList, restaurantsSet: filters.restaurantsSet, error: filters.error, home};
}
export default connect(mapStateToProps, {
selectFilter, setRestaurantsAsGroupOwner
})(FilterScreen);

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    backgroundColor: 'red',
    opacity: 0.3
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
},
item: {
    // backgroundColor: '#CCC',
    margin: 10,
},
errorTextStyle: {
  fontSize: 20,
  alignSelf: 'center',
  color: 'red'
},
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
