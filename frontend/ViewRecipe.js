import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Image, ActivityIndicator, ScrollView } from 'react-native';
import { BaseRouter } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

export default class ViewRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'http://10.0.0.40:4000/graphql',
            formContentType: "application/x-www-form-urlencoded;charset=UTF-8",
            recipe_id: -1,
            recipe_name: '',
            ingredients: [],
            calories: -1,
            directions: '',
            isLoading: true
        }
    }
    componentDidMount() {
        console.log(this.props.route.params);
        const {recipe_id} = this.props.route.params;
        this.setState({recipe_id: recipe_id});
        const query = `
        query RecipeByID($id: Int!){
            recipe(id: $id) {
              name
              calories
              directions
              ingredients {
                name
                amount
                measurement
              }
            }
          }`
        fetch(this.state.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                query,
                variables: {
                    id: recipe_id
                }
            })
        })
        .then(res => res.json())
        .then(data => {
            data = data.data;
            const {name, calories, directions, ingredients} = data.recipe;
            this.setState({
                recipe_name: name,
                ingredients: ingredients,
                calories: calories,
                directions: directions
            })
        })
        .then(this.setState({isLoading: false}));
    }
    ListViewItemSeparator = () => {
        //Item sparator view
        return (
          <View
            style={{
              height: 1,
              width: '90%',
              backgroundColor: '#080808',
            }}
          />
        );
      }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }
        console.log(this.state.directions);
	    return (
          <View style={styles.container}>
            <View style = {[{flex:1}, styles.navigationContainer]}>
                <Text style={styles.headerStyle}>{this.state.recipe_name} </Text>
            </View>
            <View style={[{flex:6}, styles.elementsContainer]}>
                    <View>
                        <Text style={styles.headerStyle}>Ingredients:</Text>
                        <FlatList
                            data={this.state.ingredients}
                            ItemSeparatorComponent={this.ListViewItemSeparator}
                            renderItem={({ item }) => (
                                <Text>{item.name}: {item.amount} {item.measurement}</Text>
                            )}
                            style={{ marginTop: 5 }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        <Text style={styles.headerStyle}>Directions: </Text>
                        <Text>{this.state.directions}</Text>
                        <Text style={styles.headerStyle}>Calories: {this.state.calories}</Text>
                    </View>
            </View>
          </View>
        );
    }
}
/*              <Button title="Button"
                      onPress={() => this.props.navigation.navigate('Button')}/>
                      <View style={{padding: 10}}/>*/
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
