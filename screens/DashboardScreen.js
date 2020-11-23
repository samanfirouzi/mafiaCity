import React, { Component, useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Image, ImageBackground } from 'react-native';
import { Text, Button } from 'galio-framework'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from 'react-native-google-signin';
import auth from "@react-native-firebase/auth";
import { myStyles } from './MyStyle'
import Footer from './Footer'
import Header from './Header';


const DashboardScreen = ({ navigation }) => {
    const [loggedIn, setloggedIn] = useState(false);
    const [user, setUser] = useState([]);

    _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const { accessToken, idToken } = await GoogleSignin.signIn();
            setloggedIn(true);
            const credential = auth.GoogleAuthProvider.credential(
                idToken,
                accessToken,
            );
            await auth().signInWithCredential(credential);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                alert('Cancel');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                alert('Signin in progress');
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert('PLAY_SERVICES_NOT_AVAILABLE');
                // play services not available or outdated
            } else {
                alert('error.code: ' + error.code);
                alert('error: ' + error);
                // some other error happened
            }
        }
    };
    function onAuthStateChanged(user) {
        setUser(user);
        console.log(user);
        if (user) setloggedIn(true);
    };
    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
            webClientId:
                '716702386565-gu79dq7tuvl6h95smsio2tpgretps1fa.apps.googleusercontent.com',
            // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        });
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            auth()
                .signOut()
            // .then(() => alert('Your are signed out!'));
            setloggedIn(false);
            // setuserInfo([]);
        } catch (error) {
            console.error(error);
        }
    };

    goToPublicCity = () => {
        console.log(user);
        navigation.navigate('PublicCity', {
            sesion: user.uid,
        });
    }

    return (
        <SafeAreaView style={myStyles.container}>
            <ImageBackground source={require('../resources/vector_city.jpg')} style={myStyles.backgroundImage} >
                <Header />

                <View style={myStyles.empty3} >
                    <View style={myStyles.selfCenter}>
                        {user && <Image source={{ uri: user.photoURL }} style={{ width: 80, height: 80 }} />}
                        {user && <Text muted>{user.displayName}</Text>}
                        {!user && <Text muted>You are currently logged out</Text>}
                    </View>
                </View>
                {/* <View style={myStyles.empty1} /> */}
                <View style={myStyles.empty3} >
                    <View style={myStyles.selfCenter}>
                        <Button color="info" style={{ width: 250, opacity: .7 }}
                            onPress={() => goToPublicCity()}>public City</Button>
                        <Button color="info" style={{ width: 250, opacity: .7 }}>Private City</Button>
                        <Button color="warning" style={{ width: 250, opacity: .7 }}>Setting</Button>
                    </View>
                </View>
                <View style={myStyles.empty3} />

                <View style={myStyles.empty2} >
                    <View style={myStyles.selfCenter}>
                        {!loggedIn && (
                            <GoogleSigninButton
                                style={{ width: 250, height: 54, opacity: .8 }}
                                size={GoogleSigninButton.Size.Wide}
                                color={GoogleSigninButton.Color.Dark}
                                onPress={() => this._signIn()}
                            />
                        )}
                    </View>
                    <View style={myStyles.selfCenter}>
                        {loggedIn && (
                            <View>
                                <Button style={{ width: 250, opacity: .8 }}
                                    onPress={() => this.signOut()}
                                    color="red">LogOut</Button>
                            </View>
                        )}
                    </View>
                </View>
                <Footer />
            </ImageBackground>
        </SafeAreaView >
    );
};


export default DashboardScreen;