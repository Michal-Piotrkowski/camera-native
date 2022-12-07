import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Pressable} from 'react-native';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selected : false,
          color: ''
        };
    }

    press = () => {
        if (typeof onPress != "function"){
          this.props.showPhoto(this.props.id, this.props.uri)
        }
      }

    longpress = () => {
      if (typeof onSelect != "function"){
        if(this.state.selected == true){
          this.setState({
            selected : false,
            color: ''
          })
        }else{
          this.setState({
            selected : true,
            color: 'white'
          })
        }
        this.props.onSelect()
      }
    }

    render() {
        if(this.props.isSelected == true){
          this.setState({
            selected: false
          })
          this.props.isSelectedChange()
        }
        return(
          <Pressable
            onPress = {this.press}
            onLongPress = {this.longpress}
            style={{backgroundColor: this.state.color}}
          >
            <Image
              style={this.props.styleimg}
              source={{uri: this.props.uri}}
            />
            <Text style={{
              textAlign: 'center',
              fontFamily: 'myfont',
              fontSize: 8,
              marginLeft: 2,
              marginTop: 2,
              marginBottom: 20,
            }}>{this.props.id}</Text>
          </Pressable>
        );
    }
}

const styles = StyleSheet.create({
});

export default Item;
