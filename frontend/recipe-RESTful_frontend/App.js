import React, { Component } from 'react';
import { Button, View, Text, TextInput} from 'react-native';

export default class ButtonClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'http://192.168.1.20:3001',
            formContentType: "application/x-www-form-urlencoded;charset=UTF-8", 
            name: 'hello',
            recipe_name: 'pi',
            author: 'Thab',
            description: 'This tasty cake is so tasty',
            serves: '3',
            category: 'Bakery',
            calories: '200',
            directions: 'No directions'
	};
    }

    
    handlePress = (op, method = '', params = {}) => {
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
    
    
    render(){
        return(
            <View style={{paddingTop: 10, paddingBottom: 40, paddingLeft: 10 , paddingRight: 10}}>

        <Button title="Recipe RESTful"
                onPress={() => this.props.navigation.navigate('Recipe RESTful')}/>
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
              
              <View style={{margin: 5, paddingLeft: 10,
                            borderStyle: 'solid', borderWidth: 2, }}>
                <TextInput
                  style={{height: 40}}
                  placeholder="recipe_name to add"
                  onChangeText={(recipe_name) => this.setState({recipe_name})}
                  value={this.state.recipe_name}
                /></View>
                <View style={{margin: 5, paddingLeft: 10,
                            borderStyle: 'solid', borderWidth: 2, }}>
               <TextInput
                  style={{height: 40}}
                  placeholder="Author to add"
                  onChangeText={(author) => this.setState({author})}
                  value={this.state.author}
                /></View>
                <View style={{margin: 5, paddingLeft: 10,
                            borderStyle: 'solid', borderWidth: 2, }}>
                <TextInput
                  style={{height: 40}}
                  placeholder="description to add"
                  onChangeText={(description) => this.setState({description})}
                  value={this.state.description}
                /></View>
                <View style={{margin: 5, paddingLeft: 10,
                            borderStyle: 'solid', borderWidth: 2, }}>
                <TextInput
                  style={{height: 40}}
                  placeholder="category to add"
                  onChangeText={(category) => this.setState({category})}
                  value={this.state.category}
                /></View>
                <View style={{margin: 5, paddingLeft: 10,
                            borderStyle: 'solid', borderWidth: 2, }}>
                <TextInput
                  style={{height: 40}}
                  keyboardType="integer"
                  placeholder="calories to add"
                  onChangeText={(calories) => this.setState({calories})}
                  value={this.state.calories}
                /></View>
                <View style={{margin: 5, paddingLeft: 10,
                            borderStyle: 'solid', borderWidth: 2, }}>
                <TextInput
                  style={{height: 40}}
                  placeholder="directions to add"
                  onChangeText={(directions) => this.setState({directions})}
                  value={this.state.directions}
                /></View>
                <View style={{margin: 5, paddingLeft: 10,
                            borderStyle: 'solid', borderWidth: 2, }}>
                <TextInput
                  style={{height: 40}}
                  keyboardType="integer"
                  placeholder="serves to add"
                  onChangeText={(serves) => this.setState({serves})}
                  value={this.state.serves}
                />
	      </View>    

              {/* CREATE a name */} 
              <Button onPress={() => this.handlePress('addrecipe', 'POST', {
                  headers: {
		      "Content-type": this.state.formContentType
		  },  
          body: `recipe_name=${this.state.recipe_name}&author=${this.state.author}&description=${this.state.description}&category=${this.state.category}&calories=${this.state.calories}&directions=${this.state.directions}&serves=${this.state.serves}`
            }
                                                     )}
                      title='Click to add recipe'/>

            </View> 
            
        );
    }
}

/*            	
<View style={{padding: 25}}/>   
<Button title="Button"
        onPress={() => this.props.navigation.navigate('Button')}/>
<Button title="Home"
        onPress={() => this.props.navigation.navigate('Home')}/>*/