import React, { Component, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import { Text } from 'galio-framework'


const LoadingScreen = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => navigation.navigate('DashboardScreen'), 1000);
    });

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../resources/vector_city.jpg')} style={styles.backgroundImage} >
                <ActivityIndicator size='large' color='#fff' />
                <Text style={{ position: 'absolute', textAlign: 'right', bottom: 4 }} muted>Paprika Game Studio.</Text>
            </ImageBackground>
        </SafeAreaView>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#080000',
        alignItems: "center",
        justifyContent: "center"
    },
    footer: {
        textAlign: 'right',
        bottom: 2
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: "center",
    },
});

export default LoadingScreen;