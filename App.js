import React, {Component} from 'react';
import {Image, View, TouchableHighlight, Platform} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import Shooting from './screens/Shooting/Shoot'
import Setup from './screens/Shooting/Setup'
import {createStackNavigator} from "react-navigation-stack";
import {MenuProvider} from 'react-native-popup-menu';


export default class App extends Component {

    constructor() {
        super();
        this.state = {
            dashboardImg: require('./assets/icons/dashboard.png'),
            shootImg: require('./assets/icons/weapon-grey.png'),
            settingsIcon: require('./assets/icons/business-card-of-a-man-with-contact-info-disabled.png')
        }
    }

    componentDidMount(): void {
    }

    onPress = () => {
        console.log('iconNumber: ', iconNumber);
        switch (iconNumber) {
            case 1:
                console.log(this.props);
                this.state = {
                    dashboardImg: require('./assets/icons/dashboard.png'),
                    shootImg: require('./assets/icons/weapon-grey.png'),
                    settingsIcon: require('./assets/icons/business-card-of-a-man-with-contact-info-disabled.png')
                }
                break;
            case 2:

                this.state = {
                    dashboardImg: require('./assets/icons/dashboard-not-selected.png'),
                    shootImg: require('./assets/icons/weapon.png'),
                    settingsIcon: require('./assets/icons/business-card-of-a-man-with-contact-info-disabled.png')
                }
            case 3:
                this.state = {
                    dashboardImg: require('./assets/icons/dashboard-not-selected.png'),
                    shootImg: require('./assets/icons/weapon.png'),
                    settingsIcon: require('./assets/icons/business-card-of-a-man-with-contact-info.png')
                }
        }
    }


    render() {


        const StackNavigator = createStackNavigator({

            Setup: {
                screen: Setup,
                navigationOptions: {
                    header: null,
                },
            },
            Shooting: {
                screen: Shooting,
                navigationOptions: {
                    header: null,
                },
            },
        });

        const TabNavigator = createBottomTabNavigator({
            Home: {
                screen: HomeScreen, navigationOptions: {
                    tabBarLabel: '',
                    tabBarIcon: ({tintColor}) =>
                        (<Image
                            source={require('./assets/icons/dashboard.png')}
                            style={[{tintColor}, {height: 45, width: 45, marginTop: '20%'}]}
                        />),

                }
            },
            Shooting: {
                screen: StackNavigator, navigationOptions: {
                    tabBarLabel: '',
                    tabBarIcon: ({tintColor}) =>
                        (<Image
                            source={require('./assets/icons/weapon.png')}
                            style={[{tintColor}, {height: 45, width: 45, marginTop: '20%'}]}
                        />),
                }
            },
            Settings: {
                screen: SettingsScreen, navigationOptions: {
                    tabBarLabel: '',
                    tabBarIcon: ({tintColor}) =>
                        (<Image
                            source={require('./assets/icons/business-card-of-a-man-with-contact-info.png')}
                            style={[{tintColor}, {height: 45, width: 45, marginTop: '20%'}]}
                        />),
                }
            }
        }, {
            tabBarOptions: {
                activeTintColor: '#926F00',
                inactiveTintColor: 'white',
                style: {
                    backgroundColor: '#3B3838', paddingBottom: Platform.OS === 'ios' ? 0 : 30,
                    height: Platform.OS === 'ios' ? 50 : 70
                },
                showLabel: false
            }
        });

        App = createAppContainer(TabNavigator);

        function changeLogo(iconNumber) {
            console.log('iconNumber: ', iconNumber);
            switch (iconNumber) {
                case 1:
                    console.log(this.props);
                    this.state = {
                        dashboardImg: require('./assets/icons/dashboard.png'),
                        shootImg: require('./assets/icons/weapon-grey.png'),
                        settingsIcon: require('./assets/icons/business-card-of-a-man-with-contact-info-disabled.png')
                    }
                    break;
                case 2:

                    this.state = {
                        dashboardImg: require('./assets/icons/dashboard-not-selected.png'),
                        shootImg: require('./assets/icons/weapon.png'),
                        settingsIcon: require('./assets/icons/business-card-of-a-man-with-contact-info-disabled.png')
                    }
                case 3:
                    this.state = {
                        dashboardImg: require('./assets/icons/dashboard-not-selected.png'),
                        shootImg: require('./assets/icons/weapon.png'),
                        settingsIcon: require('./assets/icons/business-card-of-a-man-with-contact-info.png')
                    }
            }

        }

        return <MenuProvider>
            <App/>
        </MenuProvider>;
    }


}
