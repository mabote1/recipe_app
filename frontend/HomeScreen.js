import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

export default class HomeScreen extends Component {
    render() {
	return (
          <View style = {[{flex:1}, styles.navigationContainer]}>
            <View style={{ flex: 1, alignItems: 'center',
                           justifyContent: 'center' }}>
              <Text style={styles.headerStyle}>Welcome to GRUT!</Text>
              <Image style={styles.navImage}
                source={require("./res/img.jpg")}/>
              <View style={{padding: 25}}/>
              <Button title="New Recipe"
                      onPress={() => this.props.navigation.navigate('Add Recipe')}/>
                      <View style={{padding: 10}}/>
              <Button title="View Recipes"
                      onPress={() => this.props.navigation.navigate('View Recipes')}/>
              <Button title="Button"
                      onPress={() => this.props.navigation.navigate('Button')}/>
                      <View style={{padding: 10}}/>
              <Button title="Recipe RESTful"
                      onPress={() => this.props.navigation.navigate('Recipe RESTful')}/>
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  text: {
    color: '#4f603c'
 },
  container: {
    marginTop: 10,
    flex: 1,
    backgroundColor: "#fff",
  },
  headerStyle: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '200',
    paddingTop: 25
  },
  elementsContainer: {
    backgroundColor: '#fff',
    paddingLeft: 25,
    paddingRight: 25
  },
  navigationContainer: {
    backgroundColor: '#a59da6',
    flexDirection: 'row',
    justifyContent: 'center',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 10
  },
  navImage: {
    width:100,
    height:90
  },
  formStyle: {
    backgroundColor: '#a59da6',
    margin: 10,
    padding:5,
    borderWidth : 2,
    borderColor: '#a59da6',
    borderRadius: 5
  },
  textBorder: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 5
  },
  containerBorder:{
    borderWidth: 2,
    borderColor: '#a59da6',
    borderRadius: 5
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
