import {Text, View, StyleSheet, SafeAreaView} from "react-native";
import {Grid, LineChart, G, XAxis, YAxis} from "react-native-svg-charts";
import React, {Component} from 'react';
import * as scale from 'd3-scale'
import moment from "moment";
import dateFns from 'date-fns'
import setHours from 'date-fns/setHours'
class RateOfFireSlide extends Component {
    constructor() {
        super()
    }

    render() {

        const xAxisHeight = 30;
        const verticalContentInset = {top: 10, bottom: 10};
        const data = [
            {
                value: 50,
                date: setHours(new Date(2018, 0, 0), 1),
            },
            {
                value: 10,
                date: setHours(new Date(2018, 0, 0), 9),
            },
            {
                value: 150,
                date: setHours(new Date(2018, 0, 0), 10),
            },
            {
                value: 10,
                date:  setHours(new Date(2018, 0, 0), 13),
            },
            {
                value: 100,
                date: setHours(new Date(2018, 0, 0), 21),
            },
            {
                value: 20,
                date: setHours(new Date(2018, 0, 0), 24),
            },
            {
                value: 115,
                date:  setHours(new Date(2018, 0, 0), 32),
            },
            {
                value: 75,
                date: setHours(new Date(2018, 0, 0), 34),
            },
            {
                value: 25,
                date: setHours(new Date(2018, 0, 0), 40),
            },
            {
                value: 125,
                date:  setHours(new Date(2018, 0, 0), 41),
            },
            {
                value: 66,
                date:  setHours(new Date(2018, 0, 0), 42),
            },
            {
                value: 85,
                date:  setHours(new Date(2018, 0, 0), 50),
            },
        ]

        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.container}>
                    <View style={styles.topTextContainer}>
                        <Text style={styles.rateOfFireText}> Rate Of Fire</Text>
                        <Text style={styles.secText}> 2 Sec</Text>
                        <Text style={styles.perBullet}>per bullet</Text>
                    </View>
                    <View style={{
                        height: '60%',
                        width: "90%",
                        flexDirection: "row",
                        backgroundColor: 'white',
                        alignSelf: 'center',
                        marginTop: 10
                    }}>
                        <YAxis
                            style={{marginBottom: xAxisHeight, color: 'black'}}
                            data={data}
                            contentInset={verticalContentInset}
                            yAccessor={({item}) => item.value}
                            xAccessor={({item}) => item.date}
                            svg={{
                                fill: "#000"
                            }}
                            numberOfTicks={5}
                            formatLabel={value => `${value} ºC`}
                        />
                        <View style={{flex: 1, marginLeft: 10}}>
                            <LineChart
                                style={{flex: 1}}
                                data={data}
                                contentInset={verticalContentInset}
                                yAccessor={({item}) => item.value}
                                xAccessor={({item}) => item.date}
                                svg={{
                                    stroke: "#81B0C0"
                                }}
                                scale={scale.scaleTime}
                                numberOfTicks={10}
                            >
                                <Grid/>
                            </LineChart>
                            <XAxis
                                data={data}
                                svg={{
                                    fill: "#000",
                                    fontSize: 8,
                                    fontWeight: "bold",
                                    rotation: 20,
                                    originY: 30,
                                    y: 5
                                }}
                                xAccessor={({item}) => item.date}
                                 numberOfTicks={12}
                                style={{height: xAxisHeight+20}}
                                contentInset={verticalContentInset}
                                formatLabel={value => moment(value).format("HH:mm")}
                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView>

        )
    }

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    topTextContainer: {
        paddingLeft: 20,
        paddingTop: 20,
        textAlign: 'left'

    },
    rateOfFireText: {
        fontSize: 35,
        color: '#926F1A'
    },
    secText: {
        color: '#409FD3',
        fontSize: 30,
        fontWeight: 'bold'
    },
    perBullet: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    slide: {
        width: '100%',
        height: '100%',
    }
})

export default RateOfFireSlide;
