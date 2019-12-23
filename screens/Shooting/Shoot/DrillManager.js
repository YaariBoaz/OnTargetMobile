import signalr from "react-native-signalr";
import React, {useState} from 'react';


export default class DrillManager {

    //Static Vars
    static BASE_URL = 'http://192.168.0.86:8089/api/';
    static GET_TARGETS_API = 'GetTargets';


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

    constructor() {
    }


    setState() {
        const [hits, setHits] = useState([]);
    }


    async getOnlineTargets() {
        console.log('in getonlinetarget');
        console.log(DrillManager.BASE_URL + DrillManager.GET_TARGETS_API);
        let response = await fetch(DrillManager.BASE_URL + DrillManager.GET_TARGETS_API);
        console.log('after response');
        if (response) {
            return await response.json();
        } else {
            return null;
        }
    }

    initConnection() {
        this.connection = signalr.hubConnection('http://192.168.0.86:8089');
        this.connection.logging = true;
        this.startConnection();
        this.createProxy();
        this.subscribeConnectionIssues();
        this.subscribeConnectionError();
        this.initStats();

    }

    createProxy() {
        this.proxy = this.connection.createHubProxy('TargetHub');
        this.subscribeToUpdates();
    }

    subscribeToUpdates() {
        this.proxy.on('update', (argOne, argTwo, argThree, argFour) => {
            if (argOne) {
                var arr = argOne.split(',');
                if (arr[0] === 'S') {
                    this.counter++;
                    this.handelShoot(arr[1], arr[2])
                }
            }
        });
    }

    handelShoot(x, y) {
        this.lastShotTime = new Date();

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


        this.hits.push({key: this.counter.toString(), x: px, y: py});
        setHits({hits: [...this.hits]});
        this.updateStats(x, y);
        if (this.counter === this.numberOfBullersPerDrill) {
            this.sendGateWayStop();
        }
    }

    notifyGatewayOnTargetId(chosenTargetId) {
        console.log('User Chose Target Number: ', chosenTargetId);
        this.proxy.invoke('start', chosenTargetId)
            .done((directResponse) => {

            }).fail(() => {
            console.warn('Something went wrong when calling server, it might not be up and running?')
        });
    }

    startConnection() {
        this.connection.start().done(() => {
            console.log('Now connected, connection ID=' + connection.id);

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
        this.proxy.invoke('stop')
            .done((directResponse) => {
                console.log('Stoped Drill!');
            }).fail(() => {
            console.warn('Something went wrong when calling server, it might not be up and running?')
        });
    }

    updateStats(x, y) {
        this.rateOfFire = (this.rateOfFire + ((new Date().getTime() - this.lastShotTime.getTime()) / 1000)) / 2;
    }

}
