import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Text } from 'galio-framework'
import { myStyles } from './MyStyle'
const Header = () => {
    return (
        <View style={[myStyles.headerV, myStyles.empty3]} >
            <Image style={[{
                resizeMode: "contain",
                flex: 1,
            }]} source={require("../resources/mafiacity.png")} />
        </View>
    )
}

export default Header;