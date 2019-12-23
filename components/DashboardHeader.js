import {Text, View, StyleSheet, Dimensions, Image, Platform} from "react-native";
import React, {Component} from 'react';

class DashboardHeader extends Component {

    constructor() {
        super()
    }

    render() {
        return (
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
        )
    }
}

const styles = StyleSheet.create({
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

});
export default DashboardHeader;
