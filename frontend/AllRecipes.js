import React, { Component } from 'react';
import { Button, View, Text, TextInput, ScrollView, FlatList, ActivityIndicator,Alert,StyleSheet} from 'react-native';
import { SearchBar } from 'react-native-elements'
import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings([
	'VirtualizedLists should never be nested', // TODO: Remove when fixed
])
export default class ButtonClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "http://localhost:28450",
            formContentType: "application/x-www-form-urlencoded;charset=UTF-8", 
            name: ' ',
            recipe_name: '',
            author: '',
            description: '',
            serves: '',
            category: '',
            calories: '',
            directions: '',
            isLoading: true, search: ''
	};this.arrayholder = [];
    }

    
    handlePress = (op, method = '', params = {}) => {
        if (method != '')
            params.method = method;
        fetch(this.state.url + '/'+op, params)
            .then((response) => response.text())
            .then((responseText) => {
                if (op == 'allrecipes'){
                  this.setState({name: responseText});
                  /*alert(`
                    Sent:  op=${JSON.stringify(op)}\nparams+method=${
			JSON.stringify(params)}\n
                    Received:  ${responseText}`);*/
                }
                else{
                  this.setState({name: ' '});
                `
                    Sent:  op=${JSON.stringify(op)}\nparams+method=${
			JSON.stringify(params)}\n
                    Received:  ${responseText}`;}
            })
            .catch((error) => {
                console.error(error);
            });
    }


    componentDidMount() {
      return fetch('http://10.0.0.40:28450/allrecipenames')
        .then(response => response.json())
        .then(responseJson => {
          this.setState({isLoading: false,
            dataSource: responseJson},
            function() {
              this.arrayholder = responseJson;
            });
        })
        .catch(error => {
          console.error(error);
        });
    }

    search = text => {
      console.log(text);
    };
    clear = () => {
      this.search.clear();
    };
    
    SearchFilterFunction(text) {
      //passing the inserted text in textinput
      const newData = this.arrayholder.filter(function(item) {
        //applying filter for the inserted text in search bar
        const itemData = item.recipe_name ? item.recipe_name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        //setting the filtered newData on datasource
        //After setting the data it will automatically re-render the view
        dataSource: newData,
        search: text,
      });
    }
    ListViewItemSeparator = () => {
      //Item sparator view
      return (
        <View
          style={{
            height: 0.3,
            width: '90%',
            backgroundColor: '#080808',
          }}
        />
      );
    };
    
    render(){
      if (this.state.isLoading) {
        //Loading View while data is loading
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <ActivityIndicator />
          </View>
        );
      }
        return(
            <ScrollView style={{marginTop: 30,
              flex: 1,
              backgroundColor: "#fff",
              paddingLeft: 20,
              paddingRight: 20}}>

        

              {/* Comment: The empty View below is for vertical spacing */}
              <View style={{padding: 5}}/> 
              <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={text => this.SearchFilterFunction(text)}
          onClear={text => this.SearchFilterFunction('')}
          placeholder="Type here to look up the names..."
          value={this.state.search}
        />
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          //Item Separator View
          renderItem={({ item }) => (
            // Single Comes here which will be repeatative for the FlatListItems
            <Button title={item.recipe_name}
                onPress={() => this.props.navigation.navigate('View Recipe', {recipe_id: item.recipe_id})}/>
          )}
          enableEmptySections={true}
          style={{ marginTop: 10 }}
          keyExtractor={(item, index) => index.toString()}
        />  

              {/* RETRIEVE allrecipes */}
	      <Button onPress={() => this.handlePress('allrecipes', 'GET')}
	              color='red' title='Click to display raw data'/>
                
            {/* RETRIEVE allrecipes' names */}
            <View style={{padding: 10}}/> 
            <Button onPress={() => this.handlePress('allrecipenames', 'GET')}
	              color='blue' title='Click to clear raw data'/>

            <View style={{padding: 10}}/> 
            <Text>{this.state.name}</Text>             
              
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


            <View style={{padding: 10}}/> 
            
            
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
 