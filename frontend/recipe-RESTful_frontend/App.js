import React, { Component } from 'react';
import { Button, View, Text, TextInput, ScrollView, StyleSheet} from 'react-native';

export default class ButtonClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'http://192.168.1.20:3009',
            formContentType: "application/x-www-form-urlencoded;charset=UTF-8", 
            name: ' ',
            recipe_name: '',
            author: '',
            description: '',
            serves: '',
            category: '',
            calories: '',
            directions: ''
	};
    }

    
    handlePress = (op, method = '', params = {}) => {
        if (method != '')
            params.method = method;
        fetch(this.state.url + '/'+op, params)
            .then((response) => response.text())
            .then((responseText) => {
                if (op == 'allrecipes'){
                  this.setState({name: responseText});
                  alert(`
                    Sent:  op=${JSON.stringify(op)}\nparams+method=${
			JSON.stringify(params)}\n
                    Received:  ${responseText}`);
                }
                else{
                  this.setState({name: ' '});
                alert(`
                    Sent:  op=${JSON.stringify(op)}\nparams+method=${
			JSON.stringify(params)}\n
                    Received:  ${responseText}`);}
            })
            .catch((error) => {
                console.error(error);
            });
    }
    
    
    render(){
        return(
            <ScrollView style={{marginTop: 50,
              flex: 1,
              backgroundColor: "#fff",
              paddingLeft: 20,
              paddingRight: 20}}>


        <Button title="Home"
                onPress={() => this.props.navigation.navigate('Home')}/>

              <Text>Test Program for RESTful</Text>
              {/* Comment: The empty View below is for vertical spacing */}
              <View style={{padding: 5}}/>   

              <View style={{padding: 10}}/>


              {/* RETRIEVE allrecipes */}
	      <Button onPress={() => this.handlePress('allrecipes', 'GET')}
	              color='red' title='Click to see all the recipes'/>
            {/* RETRIEVE allrecipes' names */}
          <Button onPress={() => this.handlePress('allrecipenames','GET')} 
                   color='purple'   title='Click to see the recipe names'/>
              
              
                <TextInput
                  style={{margin: 5, paddingLeft: 10,
                    borderStyle: 'solid', borderWidth: 2, }}
                  placeholder="recipe_name to add"
                  onChangeText={(recipe_name) => this.setState({recipe_name})}
                  value={this.state.recipe_name}
                />
               <TextInput
                  style={{margin: 5, paddingLeft: 10,
                    borderStyle: 'solid', borderWidth: 2, }}
                  placeholder="Author to add"
                  onChangeText={(author) => this.setState({author})}
                  value={this.state.author}
                />
                <TextInput
                  style={{margin: 5, paddingLeft: 10,
                    borderStyle: 'solid', borderWidth: 2, }}
                  placeholder="description to add"
                  onChangeText={(description) => this.setState({description})}
                  value={this.state.description}
                />
                <TextInput
                  style={{margin: 5, paddingLeft: 10,
                    borderStyle: 'solid', borderWidth: 2, }}
                  placeholder="category to add"
                  onChangeText={(category) => this.setState({category})}
                  value={this.state.category}
                />
                <TextInput
                  style={{margin: 5, paddingLeft: 10,
                  borderStyle: 'solid', borderWidth: 2, }}
                  placeholder="calories to add"
                  onChangeText={(calories) => this.setState({calories})}
                  value={this.state.calories}
                />
                <TextInput
                  style={{margin: 5, paddingLeft: 10,
                    borderStyle: 'solid', borderWidth: 2, }}
                  placeholder="directions to add"
                  onChangeText={(directions) => this.setState({directions})}
                  value={this.state.directions}
                />
                <TextInput
                  style={{margin: 5, paddingLeft: 10,
                    borderStyle: 'solid', borderWidth: 2, }}
                  //keyboardType="integer"
                  placeholder="serves to add"
                  onChangeText={(serves) => this.setState({serves})}
                  value={this.state.serves}
                />

              {/* CREATE a name */} 
              <Button onPress={() => this.handlePress('addrecipe', 'POST', {
                  headers: {
		      "Content-type": this.state.formContentType
		  },  
          body: `recipe_name=${this.state.recipe_name}&author=${this.state.author}&description=${this.state.description}&category=${this.state.category}&calories=${this.state.calories}&directions=${this.state.directions}&serves=${this.state.serves}`
            }
                                                     )}
                      title='Click to add recipe'/>
            <View style={{padding: 5}}/> 
            <Text>{this.state.name}</Text>
            </ScrollView> 
            
        );
    }
}

/*            	
<View style={{padding: 25}}/>   
<Button title="Button"
        onPress={() => this.props.navigation.navigate('Button')}/>
<Button title="Home"
        o8nPress={() => this.props.navigation.navigate('Home')}/>*/
        /*const styles = StyleSheet.create({
          text: {
            color: '#4f603c'
         },
          container: {
            marginTop: 60,
            flex: 1,
            backgroundColor: "#fff",
            paddingLeft: 20,
            paddingRight: 20
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
          navContainer: {
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
        });*/
        