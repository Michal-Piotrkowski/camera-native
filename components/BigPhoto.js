import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MyButton from './MyButton';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { Dimensions } from 'react-native';
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { Share } from "react-native"

export default class BigPhoto extends Component {
  constructor(props) {
    super(props);
  }

  share = async() => {
    try {
      await Sharing.shareAsync('file://' + (this.props.route.params.uri).slice(5))
    } catch (error) {
        alert(error.message);
    }
  }

  delete = async() => {
    await MediaLibrary.deleteAssetsAsync([this.props.route.params.id]);
    await this.props.route.params.refresh()
    this.props.navigation.navigate("s2")
  }

  render() {
    return (
      <View style={styles.container}>
          <Image
              style={styles.image}
              source={{uri: this.props.route.params.uri}}
          >
          </Image>
          <View>
            <Text style={styles.text}>{this.props.route.params.width} x {this.props.route.params.height}</Text>
          </View>
          <View style={styles.buttons}>
            <MyButton type = "Bshare"  testPress={() => {this.share()}}></MyButton>
            <MyButton type = "Bdelete" testPress={() => {this.delete()}} ></MyButton>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: 'rgb(255, 220, 212)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        borderRadius: 20,
        width : Dimensions.get("window").width-100,
        height : Dimensions.get("window").height-200,
        resizeMode: "cover"
    },
    buttons: {
        flexDirection: 'row',
    },
    text: {
        textAlign: 'center',
        fontFamily: 'myfont',
    }
})