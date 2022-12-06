import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList} from 'react-native';
import * as Font from "expo-font";
import MyButton from './MyButton';
import { Dimensions} from "react-native";
import { ToastAndroid } from "react-native";
import * as MediaLibrary from 'expo-media-library';

class Menu extends Component {
    constructor(props) {
        super(props);
         this.state = {numColumns: 0, data: [], photosloaded: false};
    }

    componentDidUpdate = () => {
        this.downloadPhotos();
    }
    
    downloadPhotos = async () => {
        const album = await MediaLibrary.getAlbumAsync("DCIM")
        let obj = await MediaLibrary.getAssetsAsync({
        first: 1,           // ilość pobranych assetów
        mediaType: 'photo'    // typ pobieranych danych, photo jest domyślne
        })
        ToastAndroid.showWithGravity(
            'Pobrano zdjęcia!',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
        obj.assets.forEach(object=> {
            this.state.data.push(object);
        });
        this.setState({ photosloaded: true })
    }

    deletePhotos = async () => {
        await MediaLibrary.deleteAssetsAsync(this.state.data);
    }

    render() {
        let i = 1;
        this.downloadPhotos();
        if(this.state.photosloaded != false){
            const renderItem = ({ item }) => {
                <Item uri={item.uri} width={item.width} height={item.height}/>
            }
            return(
                <View style={styles.container}>
                    <View style={styles.header}>
                        <MyButton type="layout"/>
                        <MyButton type="camera" testPress={() => this.props.navigation.navigate("s3")}/>
                        <MyButton type="delete" testPress={() => this.deletePhotos()}/>
                    </View>
                    <FlatList
                        data={this.state.data}
                        item={renderItem}
                        keyExtractor={item => item.id}
                        numColumns={this.state.numColumns}
                    />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(255, 220, 212)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainText: {
        fontFamily: 'myfont',
        fontSize: 90,
        color: 'rgb(255, 120, 212)'
    },
    image: {
        width: 350,
        height: 350
    },
    header: {
        flex: 1,
        marginTop: 150,
        justifyContent: 'space-between',
        flexDirection: 'row',
    }
});

export default Menu;
