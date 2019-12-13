import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, SafeAreaView, ScrollView} from 'react-native';
import Swiper from "react-native-swiper";
import {Button, Item, Input, Icon, Picker, Form} from "native-base";

class ShootingSetupScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sight: "Trijicon",
            weapon: "M4",
            ammo: "Plain tip",
            rangeUnits: "Feet",
            range: 0,
            numberOfBullets: "25"
        }
    }

    async componentDidMount() {
        this.setState({loading: false})
    }

    onValueChange(value: string) {
        console.log(value);
        this.setState({
            selected: value
        });
    }

    onRangeChanged(value: string) {

    }

    onWeaponChanged(value: string) {

    }

    onAmmoChanged(value: string) {

    }

    onSightChanged(value: string) {

    }

    render() {
        const {navigate} = this.props.navigation;

        return (<SafeAreaView>
            <View style={styles.container}>
                <View style={{height: '50%'}}>
                    <View style={{height: '100%'}}>
                        <View style={styles.topStatsContainer}>
                            <Text style={styles.nameTitle}> Edit Drill</Text>
                        </View>
                        <View style={styles.chooseTargetWrapper}>
                            <View style={styles.chooseTargetTextAndIconWrapper}>
                                <Image style={styles.targetIcon}
                                       source={require('../../../assets/images/brown_icon_target.png')}/>
                                <Text style={{fontSize: 25, fontWeight: '100'}}> Choose Target Type</Text>
                            </View>
                        </View>
                        <Swiper height={400}
                                showsButtons={true}>
                            <View style={styles.targetImageWrapper}>
                                <Image resizeMode="contain" style={styles.imageTarget}
                                       source={require('../../../assets/icons/Zero.png')}></Image>
                                <Text style={styles.targetName}>Name</Text>
                            </View>
                            <View style={styles.targetImageWrapper}>
                                <Image resizeMode='contain' style={styles.imageTarget}
                                       source={require('../../../assets/icons/Hostage.png')}></Image>
                                <Text style={styles.targetName}>Name</Text>

                            </View>
                            <View style={styles.targetImageWrapper}>
                                <Image resizeMode={"contain"} style={styles.imageTarget}
                                       source={require('../../../assets/icons/bullseye_red.png')}></Image>
                                <Text style={styles.targetName}>Name</Text>
                            </View>
                        </Swiper>
                    </View>
                </View>
                <ScrollView>
                    <View>
                        {/* Number Of Bullets */}

                        <View style={styles.infoContainer}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                            }}>
                                <Image style={{width: 40, height: 40}} resizeMethod={"auto"}
                                       source={require('../../../assets/images/ic_illust_half_fullbullet.png')}></Image>
                                <Text style={{width: '60%'}}>Number Of Bullets</Text>
                            </View>
                            <Item regular style={{width:'20%'}}>
                                <Input style={{}} onChangeText={(text) => this.setState({numberOfBullets: text})}
                                       value={this.state.numberOfBullets} placeholder='Enter number of bullets'/>
                            </Item>
                        </View>

                        {/* Range */}

                        <View style={styles.infoContainer}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-evenly',
                            }}>
                                <Image style={{width: 40, height: 40}} resizeMethod={"auto"}
                                       source={require('../../../assets/images/ic_illust_half_fullbullet.png')}></Image>
                                <Text style={{width: '40%'}}>Range</Text>
                            </View>
                            <Item style={{width: '20%'}}>
                                <Input placeholder='50'/>
                            </Item>
                            <Picker
                                mode="dropdown"
                                iosHeader="Select your SIM"
                                iosIcon={<Icon name="arrow-down"/>}
                                style={{width: undefined}}
                                selectedValue={this.state.rangeUnits}
                                onValueChange={this.onValueChange.bind(this)}
                            >
                                <Picker.Item label="Meter" value="Feet"/>
                                <Picker.Item label="Feet" value="Meters"/>
                            </Picker>
                        </View>

                        {/* Weapon */}

                        <View style={styles.infoContainer}>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
                                <Image style={{width: 40, height: 40}} resizeMethod={"auto"}
                                       source={require('../../../assets/images/ic_illust_half_fullbullet.png')}></Image>
                                <Text style={{width: '40%'}}>Weapon</Text>
                            </View>
                            <Picker
                                mode="dropdown"
                                iosHeader="Select Weapon"
                                iosIcon={<Icon name="arrow-down"/>}
                                style={{width: undefined}}
                                selectedValue={this.state.weapon}
                                onValueChange={this.onValueChange.bind(this)}
                            >
                                <Picker.Item label="M-4" value="M4"/>
                                <Picker.Item label="M-16" value="M16"/>
                                <Picker.Item label="AKM" value="AKM"/>
                                <Picker.Item label="M5" value="M5"/>
                            </Picker>
                        </View>

                        {/* Sight */}

                        <View style={styles.infoContainer}>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
                                <Image style={{width: 40, height: 40}} resizeMethod={"auto"}
                                       source={require('../../../assets/images/ic_illust_half_fullbullet.png')}></Image>
                                <Text style={{width: '40%'}}>Sight</Text>
                            </View>
                            <Picker
                                mode="dropdown"
                                iosHeader="Select Sight"
                                iosIcon={<Icon name="arrow-down"/>}
                                style={{width: undefined}}
                                selectedValue={this.state.sight}
                                onValueChange={this.onValueChange.bind(this)}
                            >
                                <Picker.Item label="Trijicon" value="Trijicon"/>
                                <Picker.Item label="Red Dot" value="Red Dot"/>
                            </Picker>
                        </View>

                        {/* Ammo */}
                        <View style={styles.infoContainer}>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
                                <Image style={{width: 40, height: 40}} resizeMethod={"auto"}
                                       source={require('../../../assets/images/ic_illust_half_fullbullet.png')}></Image>
                                <Text style={{width: '40%'}}>Ammo</Text>
                            </View>
                            <Picker
                                mode="dropdown"
                                iosHeader="Select your SIM"
                                iosIcon={<Icon name="arrow-down"/>}
                                style={{width: undefined}}
                                selectedValue={this.state.ammo}
                                onValueChange={this.onValueChange.bind(this)}
                            >
                                <Picker.Item label="Plain tip (M134)" value="Plain tip"/>
                                <Picker.Item label="5.56" value="5.56"/>
                                <Picker.Item label="9mm" value="9mm"/>
                            </Picker>
                        </View>

                    </View>
                </ScrollView>
                <Button block style={{margin: 10, backgroundColor: '#3B3838'}}
                        onPress={() => navigate('ShootingsScreen')}>
                    <Text style={{color: '#886F1A', fontWeight: 'bold', fontSize: 20}}>Start Session!</Text>
                </Button>
            </View>

        </SafeAreaView>);
    }
}

ShootingSetupScreen.navigationOptions = {
    title: 'Edit Drill',
    header: null,
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#E7E7E7',


    },
    nameTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#886F1A',
        paddingTop: 10,

    },
    weaponTitle: {
        color: '#fff',
        fontSize: 20,
        padding: 10
    },
    topStatsContainer: {
        backgroundColor: '#3B3838',
        alignItems: 'center',
        justifyContent: 'center',
        height: '20%'

    },
    pointsContiner: {
        backgroundColor: '#D9D9D9',
        width: '60%',
        borderRadius: 40,
        flexDirection: 'row',
        height: '40%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    points: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        justifyContent: 'center',
        height: '100%',
        alignItems: 'center'
    },
    textContainer: {
        width: '100%',
        textAlign: 'left',
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderBottomWidth: 1,
        borderBottomColor: '#1d1c1c78'
    },
    nameText: {
        color: '#707070',
        fontSize: 20
    },
    valueText: {
        color: "#70524b",
        fontSize: 20
    },
    chooseTargetWrapper: {
        padding: 10
    },
    chooseTargetTextAndIconWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    targetIcon: {
        height: 45,
        width: 45,
        paddingRight: 10
    },

    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    imageTarget: {
        width: undefined,
        height: undefined,
        flex: 1,
        alignSelf: 'stretch',


    },
    targetImageWrapper: {
        width: '50%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    infoContainer: {
        marginRight: 10,
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        height: '25%'
    },
    targetName: {
        fontSize: 20, color: '#886F1A'
    }
});
export default ShootingSetupScreen;
