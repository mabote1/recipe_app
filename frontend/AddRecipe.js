import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity,Button, View, Text, TextInput, ScrollView} from 'react-native';
import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings([
	'Each child in a list should have a unique "key" prop', // TODO: Remove when fixed
])
export default class Recipe extends Component {
    constructor(props){
      super(props);
      this.state = {
        name: '',
        category: '', 
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
            howMuch: '',
            color: '#fff'
          }
        ],
        iid: 1,
        hmid: 1,
        url: "192.168.1.20:4001",
        formContentType: "application/x-www-form-urlencoded;charset=UTF-8",
        measurementDictionary: [
          "tbsp",
          "cup",
          "cups",
          "tsp",
          "gallon",
          "gallons"
        ]
     }
    }
    handlePress = () => {
              /* Example of Mutation */
        let query = `
        mutation CreateMessage($input: RecipeInput){
            createRecipe(input: $input) {
                id
                name
            }      
          }`
        let name = this.state.name
        let author = "Parameter not in use"
        let description = "Parameter not in use"
        let category = "Parameter not in use"
        let directions = this.state.directions
        let serves = 0
        let calories = parseInt(this.state.calories)
        //THIS IS THE STRUCTURE OF OUR INGREDIENT OBJECT
        // let flour = {
        //   "amount": 0.75,
        //   "category": "Dry",
        //   "id": 0,
        //   "measurement": "Cups",
        //   "name": "Flour"
        // }

        let ingredients = this.state.ingredients.map((item, key) => {
          delete this.state.ingredients[key].id;
          item.name = this.state.ingredients[key].name.trim();
          if (this.state.proportions[key].howMuch != undefined){
            var ingr_string = this.state.proportions[key].howMuch.trim().split(' ');
          }else{
            item.amount = 0;
            item.measurement = "";
            return item;
          }
          if (ingr_string.length == 1){
            let num = parseInt(ingr_string[0]);
              if (num == NaN){
                console.log("NaN");
                item.amount = 0;
              }else{
                console.log("Num assigned");
                item.amount = num;
              } 
            item.measurement = "";
            item.category = "not in use";
          }
          console.log(ingr_string);
          if (ingr_string.length > 2 || ingr_string.length < 1){
            console.log("Error: invalid number of arguments in howMuch: " + key);
            item.amount = 0;
            item.measurement = "";
          }
          for (let i =0; i< ingr_string.length; i++){
            if (i == 0){ // index 0 should be an integer 
              let num = parseInt(ingr_string[i]);
              if (num == NaN){
                console.log("NaN");
                item.amount = 0;
              }else{
                console.log("Num assigned");
                item.amount = num;
              } 
            }else if (i==1){ // index 1 should be a measurement
                ingr_string[i] = ingr_string[i].toLowerCase();
                var measurement_is_set = 0;
                for (let y =0; y<this.state.measurementDictionary.length; y ++){
                    if (ingr_string[i] == this.state.measurementDictionary[y]){
                      item.measurement = ingr_string[i];
                      measurement_is_set = 1;
                    }
                }
                if (measurement_is_set == 0){
                  console.log("invalid measurement!");
                  item.measurement = "";
                }
            }
          }
          item.category = "parameter not in use";
          return item;
        });
        console.log("ingredients");
        console.log(ingredients);
        console.log("end ingredients")
        let is_valid_structure = 1;
        for (var i=0;i<ingredients.length;i++){
          if (ingredients[i].amount + "" == "NaN" || ingredients[i].amount == 0 || ingredients[i].name == undefined || ingredients[i].name == ""){
            this.updateProportions(this.state.proportions[i].howMuch, i, "#f00")
            is_valid_structure = 0;
          }else {
            this.updateProportions(this.state.proportions[i].howMuch, i, "#fff")
          }
        }
        if (is_valid_structure == 1){
          fetch('http://10.0.0.110:4000/graphql', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              },
              body: JSON.stringify({
                  query,
                  variables: {
                      input: {
                          name,
                          author,
                          description,
                          category,
                          calories,
                          directions,
                          serves,
                          ingredients
                      }
                  }
              })
          })
          .then(res => res.json())
          .then(data => console.log(data));
        } else {
          alert("Your syntax is incorrect! Recipe not submitted! Make sure you have names and correct measurements for your ingredients and proportions.");
        }
        this.setState(state => {
          const ingredients = state.ingredients.map((item, key) =>{
              item.id = key;
              return item;
          });
          //console.log(this.state.ingredients);
            return {
              ingredients,
            };
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
        //console.log(this.state.ingredients);
          return {
            ingredients,
          };
      });
    };
    updateProportions = (text, key, color) => {
      this.setState(state => {
        const proportions = state.proportions.map((item, j) =>{
          if (j == key) {
              item.howMuch = text;
              item.color = color;
              return item;
          }else {
              return item;
          }
        });
        //console.log(this.state.proportions);
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
      //console.log("state iid: " + this.state.iid);
      let newIngredient = {id: this.state.iid, name: "" }
      //console.log("new ingredient id: " + newIngredient.id);
      this.setState({ingredients: [...this.state.ingredients, newIngredient]}, () =>
      {
        this.state.iid = this.state.iid + 1;
      });
    }
    addHowMuch = () => {
      //console.log("state hmid: " + this.state.hmid);
      let newProportion = {id: this.state.hmid, name: "", color:"#fff"}
      //console.log("new proportion id: " + newProportion.id);
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
              backgroundColor: this.state.proportions[item.id].color}]}
            placeholder="how much?"
            onChangeText={(name) => this.updateProportions(name, key, this.state.proportions[item.id].color)}
            value={this.state.proportions[item.id].howMuch}
            />
            </View>
          );
       }
    });
      return (
        <View style={styles.container}>

                                {/*added navigation section*/}
        <View style={{paddingTop: 1, paddingBottom: 1}}/>   

        <Button title="Home"
                onPress={() => this.props.navigation.navigate('Home')}/>

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
                      onPress={() => this.handlePress()}
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