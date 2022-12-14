import React, { useEffect } from 'react';
import { Alert, StyleSheet, Text, View, Button, Image, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SQLite from 'expo-sqlite';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons'
import moment from 'moment';
import { TouchableOpacity, Linking } from 'react-native';

const db = SQLite.openDatabase('favouriteslist.db');


export default function Favourites({ route, navigation }) {

  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    saveItem();
    console.log(favourites)
  }, []);

  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists favouriteslist (id integer primary key not null, url text, image text, name text, time text);');
    });
    db.transaction(tx => {
      tx.executeSql('insert into favouriteslist (url, image, name, time) values (?, ?, ?, ?);', [route.params.item.offers[0].info_url.fi,
      route.params.item.images[0].url, route.params.item.name.fi, route.params.item.start_time]);
    }, null
    )
    db.transaction(tx => {
      tx.executeSql('select * from favouriteslist;', [], (_, { rows }) =>
        setFavourites(rows._array)
      );
    });
    Alert.alert('Added ' + route.params.item.name.fi + ' to your favourites.');
  };

  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql('delete from favouriteslist where id = ?;', [id]);
      }, null
    );
    db.transaction(tx => {
      tx.executeSql('select * from favouriteslist;', [], (_, { rows }) =>
        setFavourites(rows._array))
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <FlatList style={{ width: '100%' }}
          data={favourites}
          renderItem={({ item }) =>
            <View style={styles.list_item}>
              <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                <View style={styles.list_image}>
                  {item.image != null && <Image style={{ width: 300, height: 250, borderRadius: 10, }} source={{ uri: item.image }}></Image>}
                </View>
              </TouchableOpacity>

              <View style={styles.text_style}>
                <View style={{ flex: 3 }}>
                  <View style={styles.event_header}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{item.name}</Text>
                  </View>

                  <Text style={{ fontSize: 17, fontWeight: 'normal', color: 'grey' }}>{moment(item.time).format('DD.MM.yyyy HH:mm')}</Text>
                </View>

                <TouchableOpacity onPress={() => deleteItem(item.id)}>
                  <View style={styles.like_button}>
                    <AntDesign name="delete" size={24} color="black" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          }
        />
      </View>
      <StatusBar style='auto' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

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
});
