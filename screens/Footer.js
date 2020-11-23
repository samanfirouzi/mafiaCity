import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'galio-framework'
import { myStyles } from './MyStyle'
const Footer = () => {
    return (
        <View style={myStyles.footer}>
            <Text muted>Paprika Game Studio.</Text>
        </View>
    )
}

export default Footer;