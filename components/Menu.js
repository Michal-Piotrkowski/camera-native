import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList} from 'react-native';
import * as Font from "expo-font";
import MyButton from './MyButton';
import { Dimensions} from "react-native";
import { ToastAndroid } from "react-native";
import * as MediaLibrary from 'expo-media-library';
import Item from './Item'

class Menu extends Component {
    constructor(props) {
        super(props);
         this.state = {numColumns: 0, data: [], photosloaded: false, display: 5, selected: [], isSelected: false};
    }

    componentDidMount = async() => {
        let { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('brak uprawnień do czytania image-ów z galerii')
        }
        else{
            this.refreshGallery()
        }
    }

    refreshGallery = async() => {
        this.setState({
            selected : []
        })
        let dcim = await MediaLibrary.getAlbumAsync("DCIM")
        let obj = await MediaLibrary.getAssetsAsync({
            album: dcim,
            first: 100,           // ilość pobranych assetów
            mediaType: 'photo'    // typ pobieranych danych, photo jest domyślne
        })
        ToastAndroid.showWithGravity(
            'Pobrano zdjęcia!',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
        obj = JSON.stringify(obj.assets)
        this.setState({
            data : JSON.parse(obj),
            photosloaded: true
        })
    }

    dispaly = () => {
        if(this.state.display == 1){
            this.setState({
                display : 5
            })
        }else{
            this.setState({
                display : 1
            })
        }
        this.refreshGallery();
    }

    cameraScreen = () => {
        this.props.navigation.navigate("s3", {refresh: this.refreshGallery})
    }

    deletePhotos = async () => {
        await MediaLibrary.deleteAssetsAsync(this.state.selected);
        this.setState({
            isSelected: false
        })
        await this.refreshGallery();
    }

    showPhoto = (id, uri, width, height) => {
        this.props.navigation.navigate("s4", {id: id, uri: uri, refresh: this.refreshGallery, width:width, height:height})
    }

    select = (id) => {
        if((this.state.selected).includes(id) == true){
            this.setState({
                selected : (this.state.selected).filter(ids => ids !== id)
            })
        }else{
           let selectedPhotos = this.state.selected;
           selectedPhotos.push(id);
            this.setState({
                selected : selectedPhotos,
            })
        }
        console.log(this.state.selected);
    }

    render() {
        if(this.state.photosloaded != false){
            console.log(this.state.data[0].uri)
            return(
                <View style={styles.container}>
                    <View style={styles.header}>
                        <MyButton type="layout" testPress={() => this.dispaly()}/>
                        <MyButton type="camera" testPress={() => this.cameraScreen()}/>
                        <MyButton type="delete" testPress={() => this.deletePhotos()}/>
                    </View>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        style={styles.photos}
                        numColumns = {this.state.display}
                        key={this.state.display}
                        data = {this.state.data}
                        renderItem={({ item }) => 
                            <Item
                                uri = {item.uri}
                                isSelected = {this.state.isSelected}
                                isSelectedChange  = {()=>{this.setState({isSelected: true})}}
                                onSelect={()=>this.select(item.id)}
                                showPhoto = {() => this.showPhoto(item.id,item.uri,item.width,item.height)}
                                id = {item.id}
                                styleimg = {{
                                    borderRadius: 20,
                                    width : (Dimensions.get("window").width / this.state.display)-8,
                                    height : Dimensions.get("window").height / 5, 
                                    marginLeft: 3,
                                    marginRight: 3,
                                }}
                            ></Item>
                        }
                        keyExtractor={(item, index) => index.toString()}
                        />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
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
        marginTop: 120,
        flexDirection: 'row',
        marginBottom: 30,
    },
    photos: {
        flex: 1,
    }
});

export default Menu;
