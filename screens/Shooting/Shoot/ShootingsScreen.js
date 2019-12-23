import React, {Component, useState} from 'react';
import {
    FlatList,
    Share,
    TouchableHighlight,
    Text,
    Platform,
    Modal,
    StyleSheet,
    View,
    Image,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import {Button} from "native-base";
import {ViewShot, captureScreen} from "react-native-view-shot";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import DrillManager from "./DrillManager";
import SharingManager from "./SharingManager";
import signalr from "react-native-signalr";


class ShootingsScreen extends Component {

    imageX;
    imageY;
    hits = [];
    sharingManager: SharingManager;

    //Static Vars
    static BASE_URL = 'http://172.20.10.11:8089';
    static GET_TARGETS_API = 'GetTargets';


    avgDist = 0;
    totalTime = 0;
    avgSplit = '00:00';
    points = 0;




    //Gateway Vars
    connection;
    proxy;
    hits = [];
    counter = 0;
    numberOfBullersPerDrill = 0;
    distanceFromCenter = 0;
    splitTime = 0;
    rateOfFire = 0;
    lastShotTime;

    details;


    constructor(props) {
        super(props);
        this.sharingManager = new SharingManager();
        this.state = {
            selectedSlice: {
                label: '',
                value: 0
            },
            modalVisible: false,
            labelWidth: 0,
            drillFinished: false
        }
        this.state = {
            selected: "key1"
        };
        const {navigation} = this.props;
        this.details = navigation.getParam('details');
        this.state = {
            sight: this.details.sight,
            weapon: this.details.weapon,
            ammo: this.details.ammo,
            rangeUnits: this.details.rangeUnit,
            range: this.details.range,
            numberOfBullets: this.details.numOfBullets,
            counter: 0,
            avgDist: 0,
            totalTime: 0,
            splitTime: 0,
            points: 0,
            numOfBullets: this.details.numOfBullets

        }
    }

    async componentDidMount() {
        this.setState({loading: false});
        try {
            // let targets = await this.getOnlineTargets();
            // targets = JSON.parse(targets);
            let targets = [11];
            if (targets) {
                this.state.targets = [...targets];
                this.setState({modalVisible: true});

            } else {
                console.error('Targets not recieved!!!');
            }
        } catch (error) {
            console.error(error);
        }
    }


    async onCapture(uri) {
        this.sharingManager.shareTarget(uri);
    }


    render() {


        if (!this.state.drillFinished) {

            return (
                <SafeAreaView style={styles.droidSafeArea}>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onDismiss={() => {
                            this.notifyGatewayOnTargetId(this.state.chosenTarget);
                        }}>
                        <SafeAreaView>
                            <Image style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                opacity: 0.3
                            }}
                                   source={require('../../../assets/images/tabsBG.png')}>
                            </Image>
                            <View

                                style={{height: '100%', width: '100%', alignItems: 'center'}}>
                                <View style={{
                                    width: '100%',
                                    padding: 20,
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#000000c4',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}>
                                    <View style={{width: '100%'}}>
                                        <Text style={{width: '100%', fontSize: 30, alignSelf: 'center'}}>Please Select A
                                            Target</Text>
                                    </View>
                                </View>
                                <FlatList
                                    scrollEnabled={true}
                                    style={{
                                        height: '60%',
                                        width: '100%',
                                    }}
                                    data={this.state.targets}
                                    renderItem={({item}) =>
                                        <View
                                            style={{width: '100%', alignItems: 'center'}}>
                                            <TouchableHighlight
                                                onPress={() => {
                                                    this.setState({modalVisible: false, chosenTarget: item})
                                                }}>
                                                <View style={{
                                                    width: 250,
                                                    alignItems: 'center',
                                                    padding: 20,
                                                    borderColor: '#000000c4',
                                                    borderWidth: 1
                                                }}>
                                                    <Image style={{height: 200, width: 200}}
                                                           resizeMode='contain'
                                                           source={require('../../../assets/icons/bullseye_red.png')}/>
                                                    <Text style={{fontSize: 30, fontWeight: 'bold'}}>{item}</Text>
                                                </View>
                                            </TouchableHighlight>
                                        </View>
                                    }
                                />

                                <Button
                                    title="Press me"
                                    style={{marginBottom: '20%'}}
                                />
                            </View>
                        </SafeAreaView>
                    </Modal>
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
                                <Text style={styles.goldText}>{this.details.numOfBullets}</Text>
                                <Text style={styles.grayText}>Bullets</Text>
                            </View>
                            <View style={styles.numBulletsContainer}>
                                <Text style={styles.goldText}>{this.details.range}</Text>
                                <Text style={styles.grayText}>{this.details.rangeUnit}</Text>
                            </View>
                        </View>
                        <View style={{
                            height: Dimensions.get('window').width,
                            width: Dimensions.get('window').width ,
                             borderRadius: 100,
                            backgroundColor:'purple',
                            justifyContent:'center'
                        }}
                              onLayout={(event) => {
                                  var {x, y, width, height} = event.nativeEvent.layout;
                                  this.setState({parentImageHeight: height});
                                  this.setState({parentImageWidth: width});

                              }}
                        >
                            <Image
                                onLoad={(event) => {
                                    const {width, height} = event.nativeEvent.source;
                                    this.setState({imageX: width});
                                    this.setState({imageY: height});
                                }}
                                style={{
                                    justifyContent: 'center',
                                    flex: 1,
                                    height: undefined,
                                    width: undefined,
                                    backgroundColor: 'transparent',
                                }}
                                source={require('../../../assets/images/target_svg_fixed.png')}
                                resizeMode="cover"
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
                                renderItem={({item, index}) =>
                                    <View>
                                        <Image style={{
                                            height: 45, width: 45, flex: 1, position: 'absolute',
                                            left: item.x,
                                            top: item.y,
                                            bottom: 0,
                                            right: 0
                                        }}
                                               resizeMode='contain'
                                               source={require('../../../assets/images/bullethit.png')}/>
                                    </View>
                                }
                            />

                        </View>
                        <View style={styles.summaryWrapper}>
                            <View style={styles.summaryStatContainer}>
                                <Text style={styles.statsGold}>Hits</Text>
                                <Text style={styles.statsGray}>{this.state.counter}/{this.state.numOfBullets}</Text>
                            </View>
                            <View style={styles.summaryStatContainer}>
                                <Text style={styles.statsGold}>AVG-DIS</Text>
                                <Text style={styles.statsGray}>{this.state.avgDist}</Text>
                            </View>
                            <View style={styles.summaryStatContainer}>
                                <Text style={styles.statsGold}>Tot. Time</Text>
                                <Text style={styles.statsGray}>{this.state.totalTime}</Text>
                            </View>
                            <View style={styles.summaryStatContainer}>
                                <Text style={styles.statsGold}>AVG. Split</Text>
                                <Text style={styles.statsGray}>{this.state.splitTime}</Text>
                            </View>
                            <View style={styles.summaryStatContainer}>
                                <Text style={styles.statsGold}>Points</Text>
                                <Text style={styles.statsGray}>{this.state.points}</Text>
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
                        <View style={styles.numBulletsContainer}>
                            <Text style={styles.goldText}>{this.details.numOfBullets}</Text>
                            <Text style={styles.grayText}>Bullets</Text>
                        </View>
                        <View style={styles.numBulletsContainer}>
                            <Text style={styles.goldText}>{this.details.range}</Text>
                            <Text style={styles.grayText}>{this.details.rangeUnit}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            padding: 10,
                            height: '100%',
                            width: '100%',
                            justifyContent: 'center',

                        }}
                    >
                        <Image
                            onLoad={(event) => {
                                const {width, height} = event.nativeEvent.source;
                                this.setState({imageX: width});
                                this.setState({imageY: height});
                            }}
                            style={{
                                justifyContent: 'center',
                                flex: 1,
                                height: undefined,
                                width: undefined,
                                backgroundColor: 'transparent',
                            }}
                            source={require('../../../assets/images/target_charcoal.png')}
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
                            <Text style={styles.statsGray}>{this.state.counter}/{this.state.numOfBullets}</Text>
                        </View>
                        <View style={styles.summaryStatContainer}>
                            <Text style={styles.statsGold}>AVG-DIS</Text>
                            <Text style={styles.statsGray}>{this.state.avgDist}</Text>
                        </View>
                        <View style={styles.summaryStatContainer}>
                            <Text style={styles.statsGold}>Tot. Time</Text>
                            <Text style={styles.statsGray}>{this.state.totalTime}</Text>
                        </View>
                        <View style={styles.summaryStatContainer}>
                            <Text style={styles.statsGold}>AVG. Split</Text>
                            <Text style={styles.statsGray}>{this.state.splitTime}</Text>
                        </View>
                        <View style={styles.summaryStatContainer}>
                            <Text style={styles.statsGold}>Points</Text>
                            <Text style={styles.statsGray}>{this.state.points}</Text>
                        </View>
                    </View>
                    <Button onPress={this.onCapture} title="Share Social: Email"><Text>Share</Text></Button>
                </View>

            </SafeAreaView>);
        }
    }

    // setState() {
    //     const [hits, setHits] = useState([]);
    // }


    async getOnlineTargets() {
        let response = await fetch(ShootingsScreen.BASE_URL + '/api/' + +ShootingsScreen.GET_TARGETS_API);
        if (response) {
            return await response.json();
        } else {
            return null;
        }
    }

    initConnection() {
        this.connection = signalr.hubConnection(ShootingsScreen.BASE_URL);
        this.connection.logging = true;
        this.createProxy();
        this.startConnection();
        this.subscribeConnectionIssues();
        this.subscribeConnectionError();
        this.initStats();

    }

    createProxy() {
        this.proxy = this.connection.createHubProxy('TargetHub');
        this.subscribeToUpdates();
    }


    subscribeToUpdates() {
        this.proxy.on('update', (argOne) => {
            if (argOne) {
                var arr = argOne.split(',');
                if (arr[0] === 'S') {
                    this.handelShoot(arr[1], arr[2])
                } else if (arr[0] === 'B') {

                }
            }
        });
    }

    handelShoot(x, y) {

        var width = this.state.parentImageWidth;
        var height = this.state.parentImageHeight;
        console.log('imageX', width);
        console.log('imageY', height);


        var deltaX = width / 8;
        var deltaY = height / 8;


        console.log('deltaX', deltaX);
        console.log('deltaY', deltaY);


        var normalizeX = x / 8;
        var normalizeY = y / 8;

        console.log('normalizeX', normalizeX);
        console.log('normalizeY', normalizeY);

        var px = deltaX * normalizeX;
        var py = deltaY * normalizeY;
        py=py-deltaY;
        console.log('px', px);
        console.log('py', py);

        this.hits.push({key: this.counter.toString(), x: this.state.parentImageWidth - px, y: py});
        this.setState({hits: [...this.hits]});
        this.updateStats(x, y);
        console.log('this.state.numOfBullets', this.state.numOfBullets);
        console.log('this.state.counter', this.state.counter);


        if (this.state.counter === parseInt(this.state.numOfBullets)) {
            this.setState({drillFinished: true});
            this.sendGateWayStop();
        }



    }

    notifyGatewayOnTargetId(chosenTargetId) {
        this.initConnection();
    }

    startConnection() {

        console.log('in startConnection');
        this.connection.start().done(() => {
            console.log('START SUCCED');
            this.proxy.invoke('start', this.state.chosenTarget)
                .done((directResponse) => {

                }).fail(() => {
                console.warn('Something went wrong when calling server, it might not be up and running?')
            });
        }).fail(() => {
            console.log('Failed');
        });
    }

    subscribeConnectionIssues() {
        this.connection.connectionSlow(() => {
            console.log('We are currently experiencing difficulties with the connection.')
        });
    }

    subscribeConnectionError() {
        this.connection.error((error) => {
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
    }

    initStats() {
        this.counter = 0;
        this.numberOfBullersPerDrill = 0;
        this.distanceFromCenter = 0;
        this.splitTime = 0;
        this.rateOfFire = 0;
    }

    sendGateWayStop() {
        this.connection.stop();
    }


    updateStats(x, y) {
        this.counter++;
        this.setState({counter: this.counter});
        console.log('counter:', this.counter);
        let currentdist = this.calculateBulletDistanceFromCenter(x, y).toFixed(1);
        this.points += this.calcScore(currentdist);
        this.setState({points: this.points += 1});
        this.avgDist = (parseFloat((this.avgDist + currentdist), 2) / this.counter).toFixed(2);
        this.setState({avgDist: this.avgDist});

        if (!this.lastShotTime) {
            this.lastShotTime = new Date();
        }
        this.totalTime = (this.totalTime + ((new Date().getTime() - this.lastShotTime.getTime()) / 1000));
        this.setState({totalTime: this.totalTime});
        this.lastShotTime = new Date();

        this.setState({splitTime: (this.totalTime / this.counter).toFixed(2)});
    }


    componentWillUnmount(): void {
        this.connection.stop();
    }

    calculateBulletDistanceFromCenter(xT, yT) {
        // Calculate distance from center:
        // Get number of sensor on the X axis:
        var xSensorNumber = -1.0;
        var xDistanceFromCenter = -1.0;
        if (xT % 8 == 0) {
            xSensorNumber = xT / 8.0;
            if (xSensorNumber <= 4) {
                xDistanceFromCenter = Math.abs(xSensorNumber - 4) * 3.6 + 3.6 / 2;
            } else {
                xDistanceFromCenter = Math.abs(xSensorNumber - 4) * 3.6 - 3.6 / 2;
            }

        } else if (xT % 4 == 0) {
            xSensorNumber = Math.floor(xT / 8.0);
            xDistanceFromCenter = Math.abs(xSensorNumber - 4) * 3.6;
        } else {
            // Resh:
            xSensorNumber = Math.Round(xT / 8.0);
            if (xT < 8.0 * xSensorNumber) {
                if (xSensorNumber <= 4) {
                    xDistanceFromCenter = 1 + Math.abs(xSensorNumber - 4) * 3.6 + 3.6 / 2;
                } else {
                    xDistanceFromCenter = Math.abs(xSensorNumber - 4) * 3.6 + 3.6 / 2 - 1;
                }
            } else {
                if (xSensorNumber <= 4) {
                    xDistanceFromCenter = Math.abs(xSensorNumber - 4) * 3.6 + 3.6 / 2 - 1;
                } else {
                    xDistanceFromCenter = Math.abs(xSensorNumber - 4) * 3.6 + 3.6 / 2 + 1;
                }

            }
        }
        var ySensorNumber = -1.0;
        var yDistanceFromCenter = -1.0;
        if (yT % 8 == 0) {
            ySensorNumber = yT / 8.0;
            if (ySensorNumber <= 4) {
                yDistanceFromCenter = Math.abs(ySensorNumber - 4) * 3.6 + 3.6 / 2;
            } else {
                yDistanceFromCenter = Math.abs(ySensorNumber - 4) * 3.6 - 3.6 / 2;
            }

        } else if (yT % 4 == 0) {
            ySensorNumber = Math.floor(yT / 8.0);
            yDistanceFromCenter = Math.abs(ySensorNumber - 4) * 3.6;
        } else {
            // Resh:
            ySensorNumber = (double)
            Math.Round(yT / 8.0);
            if (yT < 8.0 * ySensorNumber) {
                if (ySensorNumber <= 4) {
                    yDistanceFromCenter = 1 + Math.abs(ySensorNumber - 4) * 3.6 + 3.6 / 2;
                } else {
                    yDistanceFromCenter = Math.abs(ySensorNumber - 4) * 3.6 + 3.6 / 2 - 1;
                }
            } else {
                if (ySensorNumber <= 4) {
                    yDistanceFromCenter = Math.abs(ySensorNumber - 4) * 3.6 + 3.6 / 2 - 1;
                } else {
                    yDistanceFromCenter = Math.abs(ySensorNumber - 4) * 3.6 + 3.6 / 2 + 1;
                }

            }
        }

        if (xSensorNumber <= 4) {
            xDistanceFromCenter = -1 * xDistanceFromCenter;
        }

        if (ySensorNumber <= 4) {
            yDistanceFromCenter = -1 * yDistanceFromCenter;
        }
        return Math.sqrt(Math.pow(xDistanceFromCenter, 2) + Math.pow(yDistanceFromCenter, 2))

    }

    calcScore(dis) {
        if (dis < 5) {
            return 1;
        } else if (dis >= 5 && dis < 10) {
            return 2;
        } else if (dis >= 10 && dis < 15) {
            return 3;
        } else if (dis >= 15 && dis < 20) {
            return 4;
        } else if (dis >= 20 && dis < 25) {
            return 5;
        } else {
            return 6;
        }
    }

}


ShootingsScreen.navigationOptions = {
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
        alignItems: 'center',
        justifyContent:'space-around'

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
export default ShootingsScreen;










