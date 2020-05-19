import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Image, SafeAreaView, SectionList } from 'react-native';

export default class ViewRecipes extends Component {
    state = {
        names: null,
        url: 'http://10.0.0.43:4000/graphql'
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
      const names = json.data;
      this.setState({names: names.names});
    }
    componentDidMount = () => {
        this._asyncRequest = this.getRecipes().then(
          res => {
            this._asyncRequest = null;
          }
        )
    }
    componentWillUnmount() {
      if (this._asyncRequest) {
        this._asyncRequest.cancel();
      }
    }
    RecipeListRender(props) {
      return (
        <div>
          {props.names.map((item, index) => (
            <li key={index}>
              <Button title={item.recipe_name}
                      onPress={() => console.log(item.recipe_id, item.recipe_name)}
                      />
            </li>
          ))}
        </div>
      );
    }
    render() {
      console.log("Render ", this.state.names);
      const Item = ({ recipe_name }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{recipe_name}</Text>
        </View>
      )
      if(this.state.names === null) {
        console.log("Loading...");
        return (
          <View style = {[{flex:1}, styles.navigationContainer]}>
            <Text>Loading....</Text>
          </View>
        )
      }
      else if (typeof(this.state.names === "list")) {
        console.log("Showing data: ", this.state.names[0].recipe_name)
        return (
          <View style = {[{flex:1}, styles.navigationContainer]}>
            <View style = {[{flex:1}, styles.container]}>
              <Text>{this.state.names[0].recipe_name}</Text>
              <br></br>
              <ul style = {{listStyle:'none'}}>
                <this.RecipeListRender names={this.state.names}/>
              </ul>              
            </View>
          </View>
        )
      }
      else {
        return (
          <View style = {[{flex:1}, styles.navigationContainer]}>
            <Text>Loading....</Text>
          </View>
        )
      }
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
