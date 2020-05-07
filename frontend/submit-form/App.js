import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity,Button, View, Text, TextInput, ScrollView} from 'react-native';

export default class Recipe extends Component {
    constructor(props){
      super(props);
      this.state = {
        recipe: {
           recipe_id: 0,
           name: '',
           category: '', //italian, chinese, latin...
           calories: '',
           directions: ''
        },
        ingredients: [
          {
            id: 0,
            name: ''
          }
        ],
        id: 1
     }
    }
    updateIngredients = (text, key) => {
      this.setState(state => {
        const ingredients = state.ingredients.map((item, j) =>{
          if (j == key) {
              item.name = text;
              return item;
          }else {
              return item;
          }
        });
        console.log(this.state.ingredients);
          return {
            ingredients,
          };
      });
    };
    addIngredient = () =>
    {
      console.log("state id: " + this.state.id);
      let newIngredient = {id: this.state.id, name: "" }
      console.log("new ingredient id: " + newIngredient.id);
      this.setState({ingredients: [...this.state.ingredients, newIngredient]}, () =>
      {
        this.state.id = this.state.id + 1;
      });
    }
    render(){
      let newArray = this.state.ingredients.map( (item, key) => {
        if ( (key) == item.id){
          return(
              <TextInput
              style={styles.container}
              placeholder="Ingredient"
              onChangeText={(name) => this.updateIngredients(name, key)}
              value={this.state.ingredients[item.id].name}
              />
          );
       }
    });
      return (
        <View style={styles.container}>
            <View style = {[{flex:1}, styles.navigationContainer]}>
              <Text style={styles.headerStyle}>Recipes</Text>
              <Image style={{width:100, height:100}}
                source={require("./res/img.jpg")}
                />
            </View>

            <View style={[{flex: 6}, styles.elementsContainer]}>
              <View style={{flex: 8, backgroundColor: '#a59da6', margin: 10, padding:5}}>
                    <View style={{flex:1, backgroundColor:'#a54ac7',flexDirection:'column'}}>
                      <ScrollView>
                        <View style = {{flex:1, padding:4, backgroundColor:'#a59da6'}}>
                            {newArray}
                          <Button
                              //key = {item.id}
                              color = 'green'
                              onPress = {() => this.addIngredient()}
                              title = {'+'} 
                          />
                          </View>
                          </ScrollView>
                          <View style = {{flex:1, backgroundColor:"9a34bf"}}>
                             {/* <Text style = {{fontSize:24}}>Hello</Text> */}
                            </View>
                    </View>
                </View>
              <View style={{flex: 1, backgroundColor: '#FAA030'}}/>
              <View style={{flex: 1, backgroundColor: '#32B76C'}} />
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
    fontSize: 36,
    textAlign: 'center',
    fontWeight: '200',
    marginBottom: 5
  },
  elementsContainer: {
    backgroundColor: '#7e6edb',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5
  },
  navigationContainer: {
    backgroundColor: '#a59da6',
    flexDirection: 'row',
    justifyContent: 'center',
    justifyContent: 'space-around'
  }
});