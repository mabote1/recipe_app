import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

export default class ViewRecipes extends Component {
    state = {
        names: [],
        ids: [],
        url: 'http://localhost:4000/graphql'
    }
    getRecipes = async () => {
        const query = `query getNames {
            names {
                recipe_id
                recipe_name
            }
        }`
        const response = await fetch(this.state.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                query
            })
        });
        const json = await response.json();
        console.log(json);
    }
    componentWillMount(){
        var names = this.getRecipes().names
        var ids = this.getRecipes().ids
        this.setState()
    }
    render() {
	return (
          <View style = {[{flex:1}, styles.navigationContainer]}>
            <View style={[{ flex: 1}, styles.elementsContainer]}>
              <Text style={styles.headerStyle}>Recipes:</Text>
              <Image style={styles.navImage}
                source={require("./res/img.jpg")}/>
              <View style={{padding: 25}}/>
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
