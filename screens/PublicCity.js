import React, { Component } from 'react';
import { ScrollView, View, SafeAreaView, StyleSheet, ImageBackground } from 'react-native';
import { theme, Input, Text, Button } from 'galio-framework'
import { myStyles } from './MyStyle'
var constants = require('./Constant.js');
import Footer from './Footer'


// const DashboardScreen = ({ navigation }) => {

class LoadingScreen extends Component {

    // socket = new WebSocket('ws://nodeawstest-env.eba-vjg2qn3w.us-east-2.elasticbeanstalk.com/');
    // socket = new WebSocket('ws://192.168.2.232:3000/');

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            rooms: null,
            msg: 'msg',
            ws: null,
            newRoom: ""
        };

    }

    componentDidMount() {
        this.connect();
    }

    timeout = 250; // Initial timeout duration as a class variable
    connect = () => {
        // var ws = new WebSocket("ws://nodeawstest-env.eba-vjg2qn3w.us-east-2.elasticbeanstalk.com/");
        var ws = new WebSocket("ws://192.168.2.232:3000/");
        let that = this; // cache the this
        var connectInterval;
        // websocket onopen event listener
        ws.onopen = () => {
            console.log("connected websocket main component");

            this.setState({ ws: ws });

            const ses = this.props.route.params.sesion;
            const msg = {
                t: constants.C_Hi,
                s: ses
            }
            ws.send(JSON.stringify(msg));

            that.timeout = 250; // reset timer to 250 on open of websocket connection 
            clearTimeout(connectInterval); // clear Interval on on open of websocket connection
        };

        ws.onmessage = evt => {
            // listen to data sent from the websocket server
            const message = JSON.parse(evt.data)
            console.log(message);
            switch (message.t) {
                case constants.S_PublicRoomList:
                    that.setState({ rooms: message.m.rms });
                    break;
                case constants.S_RoomData:
                    that.props.navigation.navigate('RoomScreen');
                default:
                    console.log(message)
                    break;
            }
        }


        // websocket onclose event listener
        ws.onclose = e => {
            console.log(
                `Socket is closed. Reconnect will be attempted in ${Math.min(
                    10000 / 1000,
                    (that.timeout + that.timeout) / 1000
                )} second.`,
                e.reason
            );

            that.timeout = that.timeout + that.timeout; //increment retry interval
            connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
        };

        // websocket onerror event listener
        ws.onerror = err => {
            console.error(
                "Socket encountered error: ",
                err.message,
                "Closing socket"
            );

            ws.close();
        };
    };


    joinToRoom = (roomId) => {
        const { ws } = this.state;
        const ses = this.props.route.params.sesion;
        const msg = {
            t: constants.C_JoinToPublicRoom,
            s: ses,
            m: { rid: roomId }
        }
        ws.send(JSON.stringify(msg));
    }

    createRoom = () => {
        const { ws } = this.state;
        const ses = this.props.route.params.sesion;
        const msg = {
            t: constants.C_RegisterPublicRoom,
            s: ses,
            m: { rnm: this.state.newRoom }
        }
        ws.send(JSON.stringify(msg));
    }
    check = () => {
        const { ws } = this.state;
        if (!ws || ws.readyState == WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
    };

    render() {
        return (
            <SafeAreaView style={myStyles.container}>
                <ImageBackground source={require('../resources/vector_city.jpg')}
                    style={myStyles.backgroundImage} >
                    <View style={[myStyles.empty2, myStyles.TBView]}>
                        <Input placeholder="Room name.." color={theme.COLORS.WARNING}
                            style={myStyles.textInput}
                            placeholderTextColor={theme.COLORS.WARNING}
                            value={this.state.newRoom} />
                        <Button onPress={() => this.joinToRoom('mafia 1')}
                            style={[myStyles.empty1, { width: 50, opacity: .7 }]}
                            size="small" color={theme.COLORS.WARNING}>Create</Button>
                    </View>
                    <View style={myStyles.scrollViewHeader}>
                        <Text color="#fd91e5" h6>Public room list ({this.state.rooms &&
                            this.state.rooms.length})</Text>
                    </View>
                    <View style={[myStyles.scrollView, myStyles.empty9]}>
                        <ScrollView >
                            {this.state.rooms && this.state.rooms.map((room, index) => {
                                return (
                                    <View key={room.name} style={myStyles.items}>
                                        <Text color="#ffaa66dd" h7 >{room.name} ({room.ju}/10) </Text>
                                        <Button onPress={() => this.joinToRoom(room.rid)}
                                            round size="small" color="#90571790"
                                            style={[{ width: 60, height: 35, opacity: .77 }]}>Join</Button>
                                    </View>
                                )
                            })}
                        </ScrollView>
                    </View>
                    <Footer />
                </ImageBackground>
            </SafeAreaView>
        )
    };
};

const styles = StyleSheet.create({



});

export default LoadingScreen;