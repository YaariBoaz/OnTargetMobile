import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    Image,
    ScrollView,
    Dimensions, Platform
} from 'react-native';
import Swiper from 'react-native-swiper'
import {PieChart} from "react-native-svg-charts";
import {TargetService} from '../TargetService';

class HomeScreen extends Component {
    service = new TargetService();

    constructor(props) {
        super(props);
        this.state = {
            selectedSlice: {
                label: '',
                value: 0
            },
            labelWidth: 0
        }


        // this.service.getAvailableTargets().then((data) => {
        //     console.log(data);
        // });
        // this.service.startTraining();
    }

    componentDidMount() {

    }

    render() {

        const deviceWidth = Dimensions.get('window').width
        const keys = ['hit', 'missed'];
        const values = [75, 25];
        const colors = ['#D98F2D', '#EEEEEE']
        const {labelWidth, selectedSlice} = this.state;
        const {label, value} = selectedSlice;

        const data = keys.map((key, index) => {
            return {
                key,
                value: values[index],
                svg: {fill: colors[index]},
                padAngle: 0,
            }
        })

        return (
            <SafeAreaView style={styles.safeareViewContainer}>
                <View style={styles.container}>
                    <View style={styles.topStatsContainer}>
                        <Text style={styles.nameTitle}> Boaz Yaari</Text>
                        <Text style={styles.weaponTitle}> M4 </Text>
                        <View style={styles.pointsContiner}>
                            <View style={styles.points}>
                                <Text style={{fontSize: 30, color: '#886F1A', fontWeight: 'bold'}}>180</Text>
                                <Text>Points</Text>
                            </View>

                            <View style={styles.imageContainer}>
                                <Image
                                    source={require('../assets/evi.png')}
                                    style={{width: 70, height: 70, borderRadius: 70 / 2}}
                                />
                            </View>
                            <View style={styles.points}>
                                <Text style={{fontSize: 30, color: '#886F1A', fontWeight: 'bold'}}>3rd</Text>
                                <Text>Place</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{width: '100%', height: '100%'}}>
                        <Image style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            opacity: 0.3
                        }}
                               source={require('../assets/images/tabsBG.png')}>
                        </Image>

                        <View style={{height: '55%'}}>
                            <Swiper style={styles.wrapper}
                                    dot={<View style={{
                                        backgroundColor: '#6D6969',
                                        width: 13,
                                        height: 13,
                                        borderRadius: 7,
                                        marginLeft: 7,
                                        marginRight: 7
                                    }}/>}
                                    activeDot={<View style={{
                                        backgroundColor: '#D9902C',
                                        width: 13,
                                        height: 13,
                                        borderRadius: 7,
                                        marginLeft: 7,
                                        marginRight: 7
                                    }}/>}
                                    paginationStyle={{
                                        bottom: '2%'
                                    }}
                                    loop={false}
                                    style={{height: '100%%'}} showsButtons={false}>
                                <View style={styles.slide}>
                                    <View style={{height: '20%', paddingTop: 20, paddingLeft: 20}}>
                                        <View>
                                            <Text style={{color: '#886F1A', fontSize: 30}}> HIT RATIO</Text>
                                        </View>
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={{color: '#886F1A', fontSize: 30}}>96/</Text>
                                            <Text style={{color: '#555555', fontSize: 30}}>200</Text>
                                        </View>
                                    </View>
                                    <View style={{height: '80%', justifyContent: 'center', alignItems: 'center'}}>
                                        <View style={{
                                            backgroundColor: '#F4F4F4',
                                            height: '80%',
                                            width: '65%',
                                            padding: 10,
                                            borderRadius: 300
                                        }}>
                                            <PieChart
                                                style={{height: '100%'}}
                                                outerRadius={'100%'}
                                                innerRadius={'60%'}
                                                data={data}
                                            />
                                            <Text
                                                onLayout={({nativeEvent: {layout: {width}}}) => {
                                                    this.setState({labelWidth: width});
                                                }}
                                                style={{
                                                    position: 'absolute',
                                                    left: deviceWidth * 0.65 / 2 - labelWidth / 2,
                                                    top: '45%',
                                                    textAlign: 'center',
                                                    fontSize: 30,
                                                    color: '#D98F2D'
                                                }}>
                                                75%
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.slide2}>
                                    <Text style={styles.text}>Beautiful</Text>
                                </View>
                                <View style={styles.slide3}>
                                    <Text style={styles.text}>And simple</Text>
                                </View>
                            </Swiper>
                        </View>
                        <View style={{
                            height: '45%',
                            borderTopWidth: 1,
                            width: '60%',
                            alignSelf: 'center',
                            marginTop: 10,
                        }}>
                            <View style={{}}>
                                <View style={styles.textContainerFirst}>
                                    <Text style={styles.nameText}>Longest Shoot</Text>
                                    <Text style={styles.valueText}>1250yds</Text>
                                </View>

                                <View style={styles.textContainer}>
                                    <Text style={styles.nameText}>Fastest Avg Split</Text>
                                    <Text style={styles.valueText}>2 Sec</Text>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.nameText}>Best Avg distance</Text>
                                    <Text style={styles.valueText}>3 CM</Text>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.nameText}>Last Shooting</Text>
                                    <Text style={styles.valueText}>08.07.18</Text>
                                </View>
                            </View>

                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

}


HomeScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    safeareViewContainer: {flex: 1},
    container1: {
        flex: 1,
        backgroundColor: 'transparent',

    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        height: '100%'
    },
    nameTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#886F1A',

    },
    weaponTitle: {
        color: '#fff',
        fontSize: 15,
        paddingBottom: 15
    },
    topStatsContainer: {
        backgroundColor: '#3B3838',
        alignItems: 'center',
        height: Platform.OS === 'ios' ? '20%' : 190,
        paddingTop: Platform.OS === 'ios' ? 10 : 30, paddingBottom: Platform.OS === 'ios' ? 0 : 20
    },
    pointsContiner: {
        backgroundColor: '#D9D9D9',
        width: '60%',
        borderRadius: 40,
        flexDirection: 'row',
        height: Platform.OS === 'ios' ? '40%' : 70,
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
        alignItems: 'center',
    },
    textContainerFirst:{
        width: '100%',
        textAlign: 'left',
        alignItems: 'center',
        marginTop:10
    },
    nameText: {
        color: '#707070',
        fontSize: 15
    },
    valueText: {
        color: "#93711C",
        fontSize: 20
    },
    slide: {
        width: '100%',
        height: '100%',
    }
});

export default HomeScreen;
