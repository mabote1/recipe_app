import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity,Button, View, Text, TextInput, ScrollView} from 'react-native';

export default class Recipe extends Component {
    constructor(props){
      super(props);
      this.state = {
        name: '',
        category: '', //italian, chinese, latin...
        calories: '',
        directions: '',
        ingredients: [
          {
            id: 0,
            name: ''
          }
        ],
        proportions: [
          {
            id: 0,
            howMuch: ''
          }
        ],
        iid: 1,
        hmid: 1,
        url: "127.0.0.1:4001",
        formContentType: "application/x-www-form-urlencoded;charset=UTF-8"
     }
    }
/*unfinished and untested*/
    submitRecipe(){
      database('recipe', 'POST', {
        headers: {
          "Content-type": this.state.formContentType
        },
        body: `name=${this.state.name}category=${this.state.category}calories=${this.state.calories}directions=${this.state.directions}`
      });

    }
    database = (op, method = '', params = {}) => {
      if (method != '')
          params.method = method;
      fetch(this.state.url + '/'+op, params)
          .then((response) => response.text())
          .then((responseText) => {
              alert(`
                  Sent:  op=${JSON.stringify(op)}\nparams+method=${
    JSON.stringify(params)}\n
                  Received:  ${responseText}`);
          })
          .catch((error) => {
              console.error(error);
          });
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
    updateProportions = (text, key) => {
      this.setState(state => {
        const proportions = state.proportions.map((item, j) =>{
          if (j == key) {
              item.howMuch = text;
              return item;
          }else {
              return item;
          }
        });
        console.log(this.state.proportions);
          return {
            proportions,
          };
      });
    };
    addComponents = () =>
    {
      this.addIngredient();
      this.addHowMuch();
    }
    addIngredient = () =>{
      console.log("state iid: " + this.state.iid);
      let newIngredient = {id: this.state.iid, name: "" }
      console.log("new ingredient id: " + newIngredient.id);
      this.setState({ingredients: [...this.state.ingredients, newIngredient]}, () =>
      {
        this.state.iid = this.state.iid + 1;
      });
    }
    addHowMuch = () => {
      console.log("state hmid: " + this.state.hmid);
      let newProportion = {id: this.state.hmid, name: "" }
      console.log("new proportion id: " + newProportion.id);
      this.setState({proportions: [...this.state.proportions, newProportion]}, () =>
      {
        this.state.hmid = this.state.hmid + 1;
      });
    }
    render(){
      let newArray = this.state.ingredients.map( (item, key) => {
        if ( (key) == item.id){
          return(
            <View style= {styles.rowStyle}>
              <TextInput
              style={[styles.textBorder,{marginTop: 10,
                backgroundColor: "#fff"}]}
              placeholder="Ingredient"
              onChangeText={(name) => this.updateIngredients(name, key)}
              value={this.state.ingredients[item.id].name}
              />
              <TextInput
            style={[styles.textBorder,{marginTop: 10,
              backgroundColor: "#fff"}]}
            placeholder="how much?"
            onChangeText={(name) => this.updateProportions(name, key)}
            value={this.state.proportions[item.id].howMuch}
            />
            </View>
          );
       }
    });
  //   let newProportionArray = this.state.proportions.map( (item, key) => {
  //     if ( (key) == item.id){
  //       return(
  //           <TextInput
  //           style={[styles.textBorder,{marginTop: 10,
  //             backgroundColor: "#fff"}]}
  //           placeholder="how much?"
  //           onChangeText={(name) => this.updateProportions(name, key)}
  //           value={this.state.proportions[item.id].howMuch}
  //           />
  //       );
  //    }
  // });
      return (
        <View style={styles.container}>
            <View style = {[{flex:1}, styles.navigationContainer]}>
              <Text style={styles.headerStyle}>Add a Recipe!</Text>
              <Image style={styles.navImage}
                source={require("./res/img.jpg")}
                />
            </View>

            <View style={[{flex: 5}, styles.elementsContainer]}>{/* This view holds the recipe name input, ingredients and POST button*/}
              <View style={[styles.formStyle, {flex:1}]}>
                    <View style ={{backgroundColor: '#a59da6', borderWidth: 2, borderColor: '#a59da6', borderRadius: 5, flex:0}}>
                              <TextInput
                        style={[styles.textBorder,{backgroundColor: "#fff"}]}
                        placeholder="Name your Recipe!"
                        onChangeText={(name) => this.setState({name:name})}
                        value={this.state.name}
                        />
                        <TextInput
                        style={[styles.textBorder,{backgroundColor: "#fff", marginTop:5}]}
                        placeholder="Calories"
                        onChangeText={(calories) => this.setState({calories:calories})}
                        value={this.state.calories}
                        />
                        <TextInput
                        style={[styles.textBorder,{backgroundColor: "#fff", marginTop: 5}]}
                        placeholder="Directions"
                        onChangeText={(directions) => this.setState({directions:directions})}
                        value={this.state.directions}
                        />
                    </View>
                    <View style={{flex:6, backgroundColor:'#a59da6',flexDirection:'column'}}>
                      <ScrollView>
                        <View style = {{padding:4, backgroundColor:'#a59da6', borderWidth: 2, borderColor: '#a59da6', borderBottomLeftRadius: 5,borderBottomRightRadius: 5}}>
                            {newArray}
                          <Button
                              key = {this.state.id}
                              color = '#000'
                              onPress = {() => this.addComponents()}
                              title = {'+'}
                          />
                          </View>
                          </ScrollView>
                    </View>
                    <View style= {{flex:1,backgroundColor: '#ae59da6', borderWidth: 2,borderColor: '#ae59da6', borderRadius: 5}}>
                      <Button
                      //onPress={() => this.submitRecipe()}
                      //uncomment onPress when submitRecipe() is complete
                                    title = "Submit"/>
                          </View>
                </View>
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
