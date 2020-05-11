import React, { Component } from 'react';
import { Button, View, Text, TextInput} from 'react-native';

export default class ButtonClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'http://192.168.1.20:3001',
            formContentType: "application/x-www-form-urlencoded;charset=UTF-8", 
            name: 'hello'
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
            <View style={{paddingTop: 50, paddingLeft: 50 }}>
              <Text>Test Program for Button Server</Text>
              {/* Comment: The empty View below is for vertical spacing */}
              <View style={{padding: 5}}/>   
              <Text>URL of server:</Text>
              <View style={{margin: 5, paddingLeft: 10,
                            borderStyle: 'solid', borderWidth: 2, }}>
                <TextInput
                  style={{height: 40}}
                  placeholder="URL of server"
                  onChangeText={(url) => this.setState({url})}
                  value={this.state.url}
                />
              </View>
              <View style={{padding: 10}}/>
              
              {/* RETRIEVE count */}
	      <Button onPress={() => this.handlePress('', 'GET')}
	              color='green' title='Click to see value of count'/>
              
              {/* UPDATE count */}
              <Button onPress={() => this.handlePress('', 'PUT')}
                      color='green' title='Click to increment count'/>
              <View style={{padding: 15}}/>

              {/* RETRIEVE names */}
              <Button onPress={() => this.handlePress('names','GET')} 
                      title='Click to see the value of names'/>
              <Text>New name:</Text>
              <View style={{margin: 5, paddingLeft: 10,
                            borderStyle: 'solid', borderWidth: 2, }}>
                <TextInput
                  style={{height: 40}}
                  placeholder="Name to add"
                  onChangeText={(name) => this.setState({name})}
                  value={this.state.name}
                />
	      </View>
              
              {/* CREATE a name */} 
              <Button onPress={() => this.handlePress('names', 'POST', {
                  headers: {
		      "Content-type": this.state.formContentType
		  }, 
		  body: `name=${this.state.name}`
              }
                                                     )}
                      title='Click to add new name'/>
            	{/*added navigation section*/}
        <View style={{padding: 25}}/>   
        <Button title="Button"
                onPress={() => this.props.navigation.navigate('Button')}/>
        <Button title="Home"
                onPress={() => this.props.navigation.navigate('Home')}/>
            </View> 
            
        );
    }
}

