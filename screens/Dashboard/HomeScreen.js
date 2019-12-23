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
 import {TargetService} from '../../TargetService';
import HitRatioSlide from './HitRatioSlide';
import RateOfFireSlide from './RateOfFireSlide'
import DashboardUserStats from '../../components/DashboardUserStats'
import DashboardHeader from "../../components/DashboardHeader";

class HomeScreen extends Component {
    service = new TargetService();

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {


        return (
            <SafeAreaView style={styles.safeareViewContainer}>
                <View style={styles.container}>
                    <DashboardHeader/>
                    <View style={{width: '100%', height: '100%'}}>
                        <Image style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            opacity: 0.3
                        }}
                               source={require('../../assets/images/tabsBG.png')}>
                        </Image>
                        <View style={{height: Platform.OS === 'ios' ? '55%' : '50%'}}>
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
                                        bottom: Platform.OS === 'ios' ? '2%' : '10%'
                                    }}
                                    loop={false}
                                    style={{height: '100%'}} showsButtons={false}>
                                <HitRatioSlide/>
                                <View style={styles.slide2}>
                                    <Text style={styles.text}>Beautiful</Text>
                                </View>
                                <RateOfFireSlide/>
                            </Swiper>
                        </View>
                        <DashboardUserStats/>
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
    }
});

export default HomeScreen;
