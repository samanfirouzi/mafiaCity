import React, { Component } from 'react';
import { View, ScrollView, SafeAreaView, StyleSheet, ImageBackground } from 'react-native';
import { theme, Text, Input, Button } from 'galio-framework'
import { myStyles } from './MyStyle'
import Footer from './Footer'


const LoadingScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={myStyles.container}>
            <ImageBackground source={require('../resources/vector_city.jpg')} style={myStyles.backgroundImage} >
                <View style={myStyles.empty1} />
                <View style={myStyles.scrollViewHeader}>
                    <View style={{ flexDirection: 'row', }}>
                        <Text color="#fd91e5" h6>Mafia</Text>
                        <Text color="#fdf1f5" h8> (2/10)</Text>
                    </View>
                    <Text color="#fdf1f5" h7 style={{
                        backgroundColor: '#EE000030',
                        padding: 5,
                        margin: 5,
                        borderWidth: 1,
                        borderRadius: 5,
                    }}>Wating for players.. </Text>
                </View>
                <View style={[myStyles.empty14, myStyles.scrollView,]}>
                    <ScrollView contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'flex-end',
                        flexDirection: 'column',
                        padding: 10
                    }} >
                        <Text style={{ paddingTop: 5, color: '#EBC6FC' }}>Saman Firouzi: hi everyone. asd a d asd  aweqw
                            asd  asd  as da ds asd a sda sd asd a sdkasdjnhjakhdjka asda sd </Text>
                        <Text color='white' style={{ paddingTop: 5 }}>Ayal: Salam</Text>
                        <Text color='white' style={{ paddingTop: 5, }}>Ayal: khobi. baghiye kojan?</Text>
                    </ScrollView>
                </View>
                <View style={[myStyles.TBView]}>
                    <Input placeholder="Room name.." color={theme.COLORS.WARNING}
                        style={myStyles.textInput}
                        placeholderTextColor={theme.COLORS.WARNING} />
                    {/* <Button 
                        style={[{ width: 32, opacity: .7 }]}
                        size="small" color={theme.COLORS.WARNING}>Send</Button> */}
                    <Button onlyIcon icon="send" iconFamily="Feather" iconSize={25} color="blue" iconColor="#fff" style={{ width: 40, height: 40 }} />
                    <Button onlyIcon icon="like1" iconFamily="antdesign" iconSize={25} color="green" iconColor="#fff" style={{ width: 40, height: 40 }} />
                    <Button onlyIcon icon="dislike1" iconFamily="antdesign" iconSize={25} color="red" iconColor="#fff" style={{ width: 40, height: 40 }} />

                </View>

                <View style={myStyles.empty2} />
            </ImageBackground>
        </SafeAreaView>
    )
};


const styles = StyleSheet.create({

});

export default LoadingScreen;