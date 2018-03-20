import React, { Component } from 'react';
import { View, FlatList, TouchableHighlight, Image,   Text, Dimensions, Button, StyleSheet, ListView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import firebase from '../firebaseInit';
import {yelpAPIKey} from '../config';
import axios from 'axios';
//const SCREEN_HEIGHT = Dimensions.get('window').height;

class FilterScreen extends Component {

  buildUrlFromCategories(categories) {
    let url = 'https://api.yelp.com/v3/businesses/search?term=restaurants&location=NewYork';
    url += '&categories=';
    categories.forEach((c)=> {
      url += c + ',';
    })
    return url;
  }

  getRestaurants() {
    const categories = ['italian', 'mexican', 'thai'];
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

    let books = [
      {name: 'American', selected: false, img: 'https://irp-cdn.multiscreensite.com/04eabe1e/dms3rep/multi/desktop/good-indian-food-beaverton-1000x641.jpg'},
    {name: 'Chinese', selected: false, img: 'https://irp-cdn.multiscreensite.com/04eabe1e/dms3rep/multi/desktop/good-indian-food-beaverton-1000x641.jpg'},
    {name: 'Halal', selected: false, img: 'https://irp-cdn.multiscreensite.com/04eabe1e/dms3rep/multi/desktop/good-indian-food-beaverton-1000x641.jpg'}]
    
    this.state = {
      restaurants: [],
      books: books,
      dataSource: ds.cloneWithRows(books)
    }
  }

  static navigationOptions = {
    title: 'Filters',
  };


  proceed(response) {
    let businesses = response.data && response.data.businesses;    
    const uId = firebase.auth().currentUser.uid;    
    firebase.database().ref('users').child(uId).once('value', snapshot => {
      const eventId = snapshot.val().currentEvent_id;

      // let restaurants = 
      let restaurants = {};

      // problem with this is that by using the name as keys we get weird errors, maybe just strip out special characters for now
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

      businesses.forEach((r)=>{
        firebase.database().ref('restaurants').push(r);
      })
      this.props.navigation.navigate('swipe');
      
    });
  }

  getRestaurantsAndProceed() {
    this.getRestaurants.call(this)
      .then(this.proceed.bind(this));      
  }

  _onPressRow(rowData) {
    console.log('pressed');
    console.log(rowData);
    let data = this.state.books;
    
    let i = data.find(book => book.name === rowData.name);
    i.selected = true;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});    
    this.setState({
      books: data,
      dataSource: ds.cloneWithRows(data)      
    });
  }

  render() {
    return (
      <View>
        <View style={{paddingTop: 100, justifyContent: 'center', alignItems: 'center'}}>
          <ListView
              contentContainerStyle={styles.list}
              dataSource={this.state.dataSource}
              renderRow={(rowData) => 
                <TouchableHighlight onPress={this._onPressRow.bind(this, rowData)}>
                  <View style={{paddingHorizontal: 10}}>
                    <Image style={{height:100, width: 100, opacity: rowData.selected ? 0.3 : 1}} source={{uri:rowData.img}} >                                            
                    </Image>
                    <Text className={'highlight'} style={styles.item}>{rowData.name}</Text>                      
                    { rowData.selected ? <Text style={styles.item}> Selected</Text> : null }
                  </View>
                  </TouchableHighlight>
              }
                />
        </View>
        <Button
          title='Start Swiping'
          onPress={this.getRestaurantsAndProceed.bind(this)}
        />
      </View>
    );
  }
}

export default FilterScreen;

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
