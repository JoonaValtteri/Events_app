import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, Image, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'
import { AntDesign, Feather, FontAwesome, MaterialCommunityIcons, FontAwesome5  } from '@expo/vector-icons'
import moment from 'moment';
import { TouchableOpacity, Linking } from 'react-native';

export default function Events({ navigation }) {

  const [data, setData] = useState([]);

  const fetchCategory = (keyword) => {
    fetch('https://api.hel.fi/linkedevents/v1/search/?format=json&type=event&q=' + keyword)
      .then(response => response.json())
      .then(data => setData(data.data))
      .catch(err => Alert.alert('Error', err))
  };
    
  return (

    <View style={styles.container}>

      <ScrollView horizontal={true} style={styles.top_nav}>

        <TouchableOpacity style={styles.gategories} onPress={() => {
           fetchCategory('Tavastia-Klubi');
           }}>
          <Ionicons name="ios-musical-notes-outline" size={20} color="black" />
          <Text style={{ margin: 3 }}>Concerts</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gategories} onPress={() => {
           fetchCategory('Näytös');
           }}>
        <FontAwesome5 name="theater-masks" size={20} color="black" />
          <Text style={{ margin: 3 }}>Theatre</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gategories}>
          <Ionicons style={{marginLeft: 3}} name="football-outline" size={20} color="black" />
          <Text style={{ margin: 3 }}>Football</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gategories} onPress={() => {
           fetchCategory('Hifk');
           }}>
        <MaterialCommunityIcons name="hockey-puck" size={20} color="black" />
          <Text style={{ margin: 3 }}>Ice Hockey</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gategories} onPress={() => {
           fetchCategory('Helsingin jäähalli');
           }} >
        <FontAwesome name="building-o" size={20} color="black" />
          <Text style={{ margin: 3 }}>Venues</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.list}>
        <FlatList style={{ width: '100%' }}
          data={data}
          renderItem={({ item }) =>

            <View style={styles.list_item}>
              <TouchableOpacity onPress={() => Linking.openURL(item.offers[0].info_url.fi)}>
                <View style={styles.list_image}>
                  {item.images[0] != null && <Image style={{ width: 300, height: 250, borderRadius: 10, }} source={{ uri: item.images[0].url }}></Image>}
                </View>
              </TouchableOpacity>

              <View style={styles.text_style}>
                <View style={{ flex: 3 }}>
                  <View style={styles.event_header}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{item.name.fi}</Text>
                  </View>

                  <Text style={{ fontSize: 17, fontWeight: 'normal', color: 'grey' }}>{moment(item.start_time).format('DD.MM.yyyy HH:mm')}</Text>

                  {item.short_description != null && <Text style={{ fontSize: 17, fontWeight: 'normal', color: 'grey' }}>{item.short_description.fi}</Text>}

                  {item.offers[0].is_free == false && item.offers[0].price != null && <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.offers[0].price.fi}</Text>}
                </View>

                <TouchableOpacity  onPress={() => navigation.navigate('Favourites', {item})}>
                  <View style={styles.like_button}>
                    <Feather name="heart" size={20} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  list: {
    flex: 1,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  search: {
    marginTop: 10,
    marginBottom: 20,
  },
  list_item: {
    margin: 10,
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center'
  },
  event_header: {
    alignItems: 'flex-start',
  },
  list_image: {
    flex: 2,
    alignItems: 'center',
  },
  text_style: {
    flex: 3,
    margin: 10,
    flexDirection: 'row',
  },
  like_button: {
    flex: 1,
    alignItems: 'flex-end'
  },
  top_nav: {
    marginTop: 10,
    maxHeight: 40,
  },
  gategories: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#dedede',
    borderRadius: 10,
    margin: 3,
    backgroundColor: 'white',
    alignItems: 'center',
  },
});