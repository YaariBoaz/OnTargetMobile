import React, {Component} from 'react';
import {Share, Text, Platform, StyleSheet, View, Image, SafeAreaView, Icon, FlatList,} from 'react-native';
import {Button} from "native-base";
import {ViewShot, captureScreen} from "react-native-view-shot";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import signalr from 'react-native-signalr';


class ShootingSetupScreen extends Component {
    imageX;
    imageY;
    hits = [];
    counter = 0;

    constructor(props) {
        super(props);
        this.state = {
            selectedSlice: {
                label: '',
                value: 0
            },
            labelWidth: 0,
            drillFinished: false
        }
        this.state = {
            selected: "key1"
        };


    }

    async componentDidMount() {
        this.setState({loading: false});

        try {
            console.log('Before fetch')
            let response = await fetch(
                'http://192.168.43.86:8089/api/GetTargets',
            );
            let responseJson = await response.json();
            console.log(responseJson);


            const connection = signalr.hubConnection('http://192.168.43.86:8089');
            connection.logging = true;


            //Create Hub
            const proxy = connection.createHubProxy('TargetHub');

            proxy.on('update', (argOne, argTwo, argThree, argFour) => {
                if (argOne) {
                    var arr = argOne.split(',');
                    if (arr[0] === 'S') {
                        this.handleshoot(arr[1], arr[2])
                    }
                }
                console.log('message-from-server', argOne);
                //Here I could response by calling something else on the server...
            });

            // atempt connection, and handle errors
            connection.start().done(() => {
                console.log('Now connected, connection ID=' + connection.id);

                proxy.invoke('start', responseJson[0])
                    .done((directResponse) => {
                        console.log('direct-response-from-server', directResponse);
                    }).fail(() => {
                    console.warn('Something went wrong when calling server, it might not be up and running?')
                });

            }).fail(() => {
                console.log('Failed');
            });

            //connection-handling
            connection.connectionSlow(() => {
                console.log('We are currently experiencing difficulties with the connection.')
            });

            connection.error((error) => {
                const errorMessage = error.message;
                let detailedError = '';
                if (error.source && error.source._response) {
                    detailedError = error.source._response;
                }
                if (detailedError === 'An SSL error has occurred and a secure connection to the server cannot be made.') {
                    console.log('When using react-native-signalr on ios with http remember to enable http in App Transport Security https://github.com/olofd/react-native-signalr/issues/14')
                }
                console.debug('SignalR error: ' + errorMessage, detailedError)
            });

            this.setState({targets: responseJson});
        } catch (error) {
            console.error(error);
        }


    }

    handleshoot(x, y) {
        var width = this.state.imageX;
        var height = this.state.imageY;


        var deltaX = width / 8;
        var deltaY = height / 8;

        var normalizeX = x / 8;
        var normalizeY = y / 8;


        console.log(normalizeX);
        console.log(normalizeY);


        var px = deltaX * normalizeX;
        var py = deltaY * normalizeY;

        this.counter++;
        this.hits.push({key: this.counter.toString(), x: px, y: py});
        this.setState({hits: [...this.hits]});

    }


    setRandomHits(x, y) {
        // this.hits = [
        //     {key: 'Devin'},
        //     {key: 'Dan'},
        //     {key: 'Dominic'},
        //     {key: 'Jackson'},
        //     {key: 'James'},
        //     {key: 'Joel'},
        //     {key: 'John'},
        //     {key: 'Jillian'},
        //     {key: 'Jimmy'},
        //     {key: 'Julie'},
        // ];
        // console.log('xMax', x);
        // console.log('yMax', y);
        // for (var i = 0; i < this.hits.length; i++) {
        //     var x = this.getRandomInt(100, x);
        //     var y = this.getRandomInt(100, y);
        //     this.hits[i].x = x;
        //     this.hits[i].y = y;
        // }

    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    onValueChange(value
                      :
                      string
    ) {
        this.setState({
            selected: value
        });
    }


    async onCapture(uri) {
        const temp = captureScreen({
            format: "png",
            quality: 0.8,
            width: 1080,
            height: 1350
        }).then(
            (uri) => {
                try {
                    const temo = Share.share(
                        {
                            title: 'My last drill',
                            url: uri,
                            message: 'You think you can do better? :)'
                        },
                        {
                            excludedActivityTypes: [
                                'com.apple.UIKit.activity.PostToWeibo',
                                'com.apple.UIKit.activity.Print',
                                'com.apple.UIKit.activity.CopyToPasteboard',
                                'com.apple.UIKit.activity.AssignToContact',
                                'com.apple.UIKit.activity.SaveToCameraRoll',
                                'com.apple.UIKit.activity.AddToReadingList',
                                'com.apple.UIKit.activity.PostToFlickr',
                                'com.apple.UIKit.activity.PostToVimeo',
                                'com.apple.UIKit.activity.PostToTencentWeibo',
                                'com.apple.UIKit.activity.AirDrop',
                                'com.apple.UIKit.activity.OpenInIBooks',
                                'com.apple.UIKit.activity.MarkupAsPDF',
                                'com.apple.reminders.RemindersEditorExtension',
                                'com.apple.mobilenotes.SharingExtension',
                                'com.apple.mobileslideshow.StreamShareService',
                                // 'com.linkedin.LinkedIn.ShareExtension',
                                // 'pinterest.ShareExtension',
                                // 'com.google.GooglePlus.ShareExtension',
                                // 'com.tumblr.tumblr.Share-With-Tumblr',
                                // 'net.whatsapp.WhatsApp.ShareExtension', //WhatsApp
                            ],
                        });


                    // setResult(JSON.stringify(ShareResponse, null, 2));
                } catch (error) {
                    console.log('Error =>', error);
                    //setResult('error: '.concat(getErrorString(error)));
                }
            },
            error => console.error("Oops, snapshot failed", error)
        );
    }


    render() {


        if (!this.state.drillFinished) {
            return (<SafeAreaView style={styles.droidSafeArea}>
                <View style={styles.container}>
                    <View style={styles.topStatsContainer}>
                        <Text style={styles.nameTitle}> Shooting Session</Text>
                        <Menu onSelect={value => alert(`Selected number: ${value}`)}>
                            <MenuTrigger customStyles={triggerStyles} text='⋮'/>
                            <MenuOptions>
                                <MenuOption value={1} text='One'/>
                                <MenuOption value={2}>
                                    <Text style={{color: 'red'}}>Two</Text>
                                </MenuOption>
                                <MenuOption value={3} disabled={true} text='Three'/>
                            </MenuOptions>
                        </Menu>
                    </View>
                    <View style={styles.statsContainer}>
                        <View style={styles.numBulletsContainer}>
                            <Text style={styles.goldText}>8</Text>
                            <Text style={styles.grayText}>Bullets</Text>
                        </View>
                        <View style={styles.numBulletsContainer}>
                            <Text style={styles.goldText}>100</Text>
                            <Text style={styles.grayText}>M</Text>
                        </View>
                    </View>
                    <View style={{
                        padding: 10,
                        height: '70%',
                        width: '100%',
                        justifyContent: 'center',
                        borderRadius: 100
                    }}>
                        <Image
                            onLoad={(event) => {
                                const {width, height} = event.nativeEvent.source;
                                this.setState({imageX: width});
                                this.setState({imageY: height});
                                console.log('x', width)
                                console.log('y', height);
                                this.setRandomHits(width, height);
                            }}
                            style={{
                                justifyContent: 'center',
                                flex: 1,
                                height: undefined,
                                width: undefined,
                                backgroundColor: 'transparent',
                            }}
                            source={require('../../../assets/images/target_svg_fixed.png')}
                            resizeMode="contain"
                        />

                        <FlatList
                            scrollEnabled={false}
                            style={{
                                position: 'absolute',
                                left: 10,
                                top: 10,
                                bottom: 0,
                                right: 0,
                                flex: 1,
                                height: '100%',
                                width: '100%'
                            }}
                            data={this.state.hits}
                            renderItem={({item}) => <Image style={{
                                height: 45, width: 45, flex: 1, position: 'absolute',
                                left: item.x,
                                top: item.y,
                                bottom: 0,
                                right: 0
                            }}
                                                           resizeMode='contain'
                                                           source={require('../../../assets/images/bullethit.png')}/>}
                        />

                    </View>
                    <View style={styles.summaryWrapper}>
                        <View style={styles.summaryStatContainer}>
                            <Text style={styles.statsGold}>Hits</Text>
                            <Text style={styles.statsGray}>5/8</Text>
                        </View>
                        <View style={styles.summaryStatContainer}>
                            <Text style={styles.statsGold}>AVG-DIS</Text>
                            <Text style={styles.statsGray}>2.5</Text>
                        </View>
                        <View style={styles.summaryStatContainer}>
                            <Text style={styles.statsGold}>Tot. Time</Text>
                            <Text style={styles.statsGray}>01:15</Text>
                        </View>
                        <View style={styles.summaryStatContainer}>
                            <Text style={styles.statsGold}>AVG. Split</Text>
                            <Text style={styles.statsGray}>00:02</Text>
                        </View>
                        <View style={styles.summaryStatContainer}>
                            <Text style={styles.statsGold}>Points</Text>
                            <Text style={styles.statsGray}>30/48</Text>
                        </View>
                    </View>
                </View>

            </SafeAreaView>);
        } else {
            return (<SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.topStatsContainer}>
                        <Text style={styles.nameTitle}> Shooting Session</Text>
                        <Button onPress={() => {
                            this.setState({drillFinished: true})
                        }} block light style={{width: '20%', alignSelf: 'center'}}>
                            <Text>Finish</Text>
                        </Button>
                    </View>
                    <View style={styles.statsContainer}>
                        <Text style={styles.grayText}>Bullseye Drill</Text>
                        <View style={styles.numBulletsContainer}>
                            <Text style={styles.goldText}>8</Text>
                            <Text style={styles.grayText}>Bullets</Text>
                        </View>
                        <View style={styles.numBulletsContainer}>
                            <Text style={styles.goldText}>100</Text>
                            <Text style={styles.grayText}>M</Text>
                        </View>
                    </View>
                    <View style={{padding: 10, height: '70%', width: '100%', justifyContent: 'center'}}>
                        <Image
                            style={{
                                justifyContent: 'center',
                                flex: 1,
                                height: undefined,
                                width: undefined,
                                backgroundColor: 'transparent'
                            }}
                            source={require('../../../assets/images/target_charcoal.png')}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.summaryWrapper}>
                        <View style={styles.summaryStatContainer}>
                            <Text style={styles.statsGold}>Hits</Text>
                            <Text style={styles.statsGray}>5/8</Text>
                        </View>
                        <View style={styles.summaryStatContainer}>
                            <Text style={styles.statsGold}>AVG-DIS</Text>
                            <Text style={styles.statsGray}>2.5</Text>
                        </View>
                        <View style={styles.summaryStatContainer}>
                            <Text style={styles.statsGold}>Tot. Time</Text>
                            <Text style={styles.statsGray}>01:15</Text>
                        </View>
                        <View style={styles.summaryStatContainer}>
                            <Text style={styles.statsGold}>AVG. Split</Text>
                            <Text style={styles.statsGray}>00:02</Text>
                        </View>
                        <View style={styles.summaryStatContainer}>
                            <Text style={styles.statsGold}>Points</Text>
                            <Text style={styles.statsGray}>30/48</Text>
                        </View>
                    </View>
                    <Button onPress={this.onCapture} title="Share Social: Email"><Text>Share</Text></Button>
                </View>

            </SafeAreaView>);
        }
    }


}


ShootingSetupScreen.navigationOptions = {
    title: 'Edit Drill',
    header: null,
};

const triggerStyles = {
    triggerText: {
        color: 'white',
        fontSize: 40
    },
    triggerWrapper: {
        paddingRight: 10
    },
    triggerTouchable: {
        activeOpacity: 70,
    },
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#E7E7E7',
        alignItems: 'center'

    },
    nameTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#886F1A',

    },
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    topStatsContainer: {
        backgroundColor: '#3B3838',
        alignItems: 'center',
        height: '10%',
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row'
    },
    statsContainer: {
        flexDirection: 'row',
        width: '90%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#717171a3'
    },
    grayText: {
        color: '#595959',
        fontSize: 25,
        fontWeight: 'bold'
    },
    numBulletsContainer: {
        flexDirection: 'row'
    },
    goldText: {
        color: '#886F1A',
        fontSize: 25,
        fontWeight: 'bold'
    },
    imageWrapper: {
        height: '60%',
        width: '100%',
    },
    summaryWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%'
    },
    statsGold: {
        color: '#886F1A',
        fontWeight: 'bold',
        fontSize: 15
    },
    statsGray: {
        color: '#A9A9A9',
        fontWeight: 'bold',
        fontSize: 15
    },
    summaryStatContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default ShootingSetupScreen;










