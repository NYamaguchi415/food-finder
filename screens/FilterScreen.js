import React, { Component } from 'react';
import { View, FlatList, TouchableHighlight, Image,   Text, Dimensions, Button, StyleSheet, ListView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import firebase from '../firebaseInit';
import {yelpAPIKey} from '../config';
import axios from 'axios';
import { connect } from 'react-redux';
import { selectFilter } from '../src/actions/FilterActions';
//const SCREEN_HEIGHT = Dimensions.get('window').height;

class FilterScreen extends Component {

  buildUrlFromCategories(categories) {
    let url = 'https://api.yelp.com/v3/businesses/search?term=restaurants&location=NewYork';
    url += '&categories=';
    categories.forEach((c)=> {
      url += c.toLowerCase() + ',';
    })
    return url;
  }

  getRestaurants() {
    const filterObject = this.props.filterList;
    const categories = Object.keys(filterObject);
    const url = this.buildUrlFromCategories(categories);
    const options = {headers: {authorization: `Bearer ${yelpAPIKey}`}};
    return axios.get(url, options);
  }

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // let data = 
    // [{key: 'American'}, {key: 'Chinese'}, { key: 'Halal'},
    // {key: 'Indian'}, {key: 'Italian'}, {key: 'Japanese'},
    // {key: 'Mexican'}, {key: 'Thai'}, {key: 'Ukranian'}];

    // let books = [
    // {name: 'American', selected: false, img: 'https://irp-cdn.multiscreensite.com/04eabe1e/dms3rep/multi/desktop/good-indian-food-beaverton-1000x641.jpg'},
    // {name: 'Chinese', selected: false, img: 'https://irp-cdn.multiscreensite.com/04eabe1e/dms3rep/multi/desktop/good-indian-food-beaverton-1000x641.jpg'},
    // {name: 'Halal', selected: false, img: 'https://irp-cdn.multiscreensite.com/04eabe1e/dms3rep/multi/desktop/good-indian-food-beaverton-1000x641.jpg'}]
    
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


  static navigationOptions = {
    title: 'Filters',
  };

  proceed(response) {
    let businesses = response.data && response.data.businesses;    
    const uId = this.props.auth.user.uid; 
    firebase.database().ref('users').child(uId).once('value', snapshot => {
      const eventId = snapshot.val().currentEvent_id;
      let restaurants = {};
      businesses.forEach((r)=>{
        // const key = r.name.replace(/[\.\#\$\[\]\/]/g, "");
        const key = r.id;
        restaurants[key] = {
            name: r.name, no: 0, yes: 0, id: r.id
          }
        });
      firebase.database().ref('events').child(eventId).update(
        {restaurants: restaurants}
      );
      this.props.navigation.navigate('swipe');
      
    });
  }

  getRestaurantsAndProceed() {
    this.getRestaurants.call(this)
      .then(this.proceed.bind(this));      
  }

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
          onPress={this.getRestaurantsAndProceed.bind(this)}
        />
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  const {auth, filters} = state;
  // console.log(filters.filterList)
  return {auth, filterList: filters.filterList};
}
export default connect(mapStateToProps, {
selectFilter
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
