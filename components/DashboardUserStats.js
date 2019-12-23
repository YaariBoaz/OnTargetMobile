import {Text, View, StyleSheet, Dimensions, Platform} from "react-native";
import {Grid, LineChart, PieChart, XAxis, YAxis} from "react-native-svg-charts";
import React, {Component} from 'react';
import Swiper from "react-native-swiper";

class DashboardUserStats extends Component {

    constructor() {
        super()
    }

    render() {
        return (
            <View style={{
                height: Platform.OS === 'ios' ? '45%' : '60%',
                borderTopWidth: 1,
                width: '60%',
                alignItems:'center',
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
        )
    }
}


const styles = StyleSheet.create({
    textContainerFirst: {
        width: '100%',
        textAlign: 'left',
        alignItems: 'center',
        marginTop: 10
    },
    textContainer: {
        width: '100%',
        textAlign: 'left',
        alignItems: 'center',
     },
    nameText: {
        color: '#707070',
        fontSize: 15
    },
    valueText: {
        color: "#93711C",
        fontSize: 20
    }
});

export default DashboardUserStats
