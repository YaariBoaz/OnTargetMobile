import {Text, View, StyleSheet, Dimensions,Platform} from "react-native";
import {PieChart} from "react-native-svg-charts";
import React, {Component} from 'react';

class HitRatioSlide extends Component {
    constructor() {
        super();
        this.state = {
            selectedSlice: {
                label: '',
                value: 0
            },
            labelWidth: 0
        }
    }

    render() {
        const keys = ['hit', 'missed'];
        const values = [75, 25];
        const colors = ['#D98F2D', '#EEEEEE']
        const data = keys.map((key, index) => {
            return {
                key,
                value: values[index],
                svg: {fill: colors[index]},
                padAngle: 0,
            }
        })
        const deviceWidth = Dimensions.get('window').width
        const {labelWidth, selectedSlice} = this.state;


        return (
            <View style={styles.slide}>
                <View style={{height: Platform.OS === 'ios' ? '20%' : '10%', paddingTop: 20, paddingLeft: 20}}>
                    <View>
                        <Text style={{color: '#886F1A', fontSize: 30}}> HIT RATIO</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: '#886F1A', fontSize: 30}}>96/</Text>
                        <Text style={{color: '#555555', fontSize: 30}}>200</Text>
                    </View>
                </View>
                <View style={{height: Platform.OS === 'ios' ? '80%' : '70%', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{
                        backgroundColor: '#F4F4F4',
                        height: '80%',
                        width: Platform.OS === 'ios' ? '65%' : '45%',
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
                                left: Platform.OS === 'ios' ? deviceWidth * 0.65 / 2 - labelWidth / 2 : deviceWidth * 0.45 / 2 - labelWidth / 2,
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
        )
    }
}

const styles = StyleSheet.create({
    slide: {
        width: '100%',
        height: '100%',
    }
})

export default HitRatioSlide;
