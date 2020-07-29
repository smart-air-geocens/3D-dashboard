//The parent of all components. Most of the components callback
//to this component and all other components are inherited by
//this component.
import React, {Component} from 'react';
import './App.css';
import Layout from './Components/Layout/Layout';
import MQTT from './Components/MQTT/MQTT';
import RequestDS from './Components/STA/RequestDS';
import LatestObservation from "./Components/STA/LatestObservation";
import RequestSTA from './Components/STA/RequestSTA';
import GraphSTA from './Components/STA/GraphSTA';
import timesta from './Components/STA/timeSTA';
import RequestDSFooter from './Components/STA/RequestDSFooter';
import RequestStatus from "./Components/STA/RequestStatus";
import FindDSNumber from './Components/STA/FindDsNumber';
import Snackbar from "./Components/Snackbar/SnackBar";
import MqttUnSubscribe from './Components/MQTT/MqttUnSubscribe'
import DistanceMeasure from "./Components/DTW/DistanceMeasure";
import splitgraph from "./Components/Graph/SplitGraph";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Components/Graph/CustomToast.css';

//Setting const variables
const timeInterval = 1000; // 1 second
class App extends Component {

    constructor(props) {
        super(props);

        // DistanceMeasure();
        this.state = {
            clients: [],
            errorType: null,
            errorMessage: null,
            dsList: [],
            thingsInfo: null,
            datastreamsInfo: null,
            clickedThingID: null,
            datastreamVals: null,
            myposition: null,
            secondData: null,
            FirstText: null,
            SecondText: null,
            secUoM: null,
            sensorKitInfo: null,
            selectedKitDatastreamId: null,
            HttpLatestObservations: null,
            hasValue: false,
            datastreamFooter: null,
            selectedKit: null,
            inputSelectedThingName: null,
            inputSelectedLocation: null,
            progressValue: null,
            shifterHolder: null,
            isShifter: false,
            isQuery: false
        }
    }

    //After mountung the app component all things are returened and sent to map layer component to show
    // their location and also their status
    async componentDidMount() {
        toast.configure({
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
        const {thingListArray, datastreamInfo, messageType, message} = await RequestSTA(); // Will bring back all information about Things and their DSs

        // First message display showing the result of sending first request to the STA
        if (messageType !== "SUCCESS") this.setState({errorType: messageType, errorMessage: message})
        else {

        }

        //Will check that if there was no information, resend the query every 2 seconds
        if (thingListArray.length < 1) {
            this.intervalRequestThings = setInterval(async () => {
                const {thingListArray, datastreamInfo, messageType, message} = await RequestSTA()
                if (thingListArray.length > 0) {
                    await this.setState({
                        thingsInfo: thingListArray,
                        datastreamsInfo: datastreamInfo,
                        errorType: messageType,
                        errorMessage: message
                    })
                    clearInterval(this.intervalRequestThings);
                } else this.setState({errorType: messageType, errorMessage: message})
            }, timeInterval * 2);
        } else {
            if (datastreamInfo.length > 0) {
                let {thingsInfo, messageType, message} = await RequestStatus(datastreamInfo, thingListArray); // Return the status of each Thing
                if (messageType === "FAILURE") await this.setState({
                    thingsInfo: thingsInfo,
                    datastreamsInfo: datastreamInfo,
                    errorType: messageType,
                    errorMessage: message
                });
                else {
                    await this.setState({thingsInfo: thingsInfo, datastreamsInfo: datastreamInfo});
                }
            }
        }

        this.interval = setInterval(async () => {

            let {thingsInfo, messageType, message} = await RequestStatus(datastreamInfo, thingListArray); // Return the status of each Thing

            if (messageType === "FAILURE") await this.setState({
                thingsInfo: thingsInfo,
                datastreamsInfo: datastreamInfo,
                errorType: messageType,
                errorMessage: message
            });
            else await this.setState({thingsInfo: thingsInfo});

        }, 60 * timeInterval); // Every minute the status of all devices will be checked
    }

    //This method will be called when user select a kit from sensor kit menu and set the datastream Id for the selected kit
    onSelectSensorKit = async (kitName) => {
        let dsFoorList = this.state.datastreamFooter;
        let dslist;
        let dsID = [];
        for (var i in dsFoorList) {
            if (dsFoorList[i]['name'] === kitName) {
                if (dsFoorList[i] != null) {
                    dslist = await GraphSTA(0, dsFoorList[i]['id']);
                    dsID = i;
                    break;
                }
            }
        }
        if (dsFoorList[dsID] != null)
            this.setState({firstText: dsFoorList[dsID].name});
        this.setState({datastreamVals: dslist, selectedKitDatastreamId: dsID, secondData: null});

    }

    //This method is called when user select a device from the header input
    inputSelectedThingHandler = (thingName) => {
        this.setState({inputSelectedThingName: thingName})
        if (this.state.thingsInfo && this.state.thingsInfo.length > 0) {
            for (let i = 0; i < this.state.thingsInfo.length; i++) {
                if (this.state.thingsInfo[i].thingName === thingName) {
                    this.setState({
                        inputSelectedThingName: thingName,
                        inputSelectedLocation: [this.state.thingsInfo[i].longitude, this.state.thingsInfo[i].latitude]
                    }) // Setting the selected Thing name and its location in the state
                }
            }
        }
    }

    //Clear intervals after exiting the app component
    componentWillUnmount() {
        clearInterval(this.interval); // Stop sending request for the latest observations
    }

    //Handle go to my location callback and set props to the MapLayer
    clickedGoToLocation = (myPosition) => {

        this.setState({inputSelectedLocation: [myPosition.lon, myPosition.lat]})
    }

    //Handle DateQueries callbacks comes from description and query classes
    updateDateGraph = async (clickedID, FromIso, ToIso) => {
        let dslist;
        dslist = await timesta(this.state.datastreamFooter[this.state.selectedKitDatastreamId].id, FromIso, ToIso);
        if (dslist.length > 2)
            this.setState({
                datastreamVals: dslist,
                secondData: null,
                shifterHolder: {from: dslist[dslist.length - 1].time, to: dslist[0].time},
                isQuery: true
            });
        else
            this.setState({datastreamVals: dslist, secondData: null, isQuery: true});
        let slecetedItem = await FindDSNumber(this.state.secondText, this.state.datastreamFooter);
        if (slecetedItem != null && this.state.secondText != 'None') {
            let dslistSec = await timesta(this.state.datastreamFooter[slecetedItem].id, FromIso, ToIso);
            if (dslistSec.length > 2)
                this.setState({
                    secondData: dslistSec,
                    shifterHolder: {from: dslist[dslist.length - 1].time, to: dslist[0].time}
                });
            //                this.setState({shifterHolder:{from:dslist[dslist.length-1].time,to:dslist[0].time}});
        }
    }
    updateShifter = async (clickedID, FromIso, ToIso) => {
        let dslist;
        dslist = await timesta(this.state.datastreamFooter[this.state.selectedKitDatastreamId].id, FromIso, ToIso);
        if (dslist.length > 2) {
            this.setState({datastreamVals: dslist, secondData: null});
            this.setState({shifterHolder: {from: FromIso, to: ToIso}, isQuery: true});
        } else {
            toast("There is no observations in this side. Move graph to other side", {
                className: 'background',
                bodyClassName: "body" //,
                // progressClassName: 'progressbar'
            });
        }
        let slecetedItem = await FindDSNumber(this.state.secondText, this.state.datastreamFooter);
        if (slecetedItem != null && this.state.secondText != 'None') {
            let dslistSec = await timesta(this.state.datastreamFooter[slecetedItem].id, FromIso, ToIso);
            if (dslistSec.length > 2)
                this.setState({secondData: dslistSec, shifterHolder: {from: FromIso, to: ToIso}});
            //                this.setState({shifterHolder:{from:dslist[dslist.length-1].time,to:dslist[0].time}});
        }
    }
    //Handles second graph series callbacks
    setSecondGraph = async (txt, isSecond, clickedID, FromIso, ToIso) => {
        let slecetedItem = await FindDSNumber(txt, this.state.datastreamFooter);
        let dslist = await timesta(this.state.datastreamFooter[slecetedItem].id, FromIso, ToIso);
        if (isSecond) {

            this.setState({
                secondData: dslist,
                secondText: txt,
                secUoM: this.state.datastreamFooter[slecetedItem].uom
            });
        } else {
            this.setState({
                firstText: this.state.datastreamFooter[slecetedItem].name,
                selectedKitDatastreamId: slecetedItem,
                datastreamVals: dslist,
                secondData: null,
                secondText: 'None'
            });
        }
        // console.log(this.state.firstText,this.state.secondText);

    }


    //Returen observations by changing datastreams from sensorkit
    clickedKitHandler = async (dsID) => {
        let dslist;
        if (this.state.datastreamFooter[dsID] != null) {
            dslist = await GraphSTA(0, this.state.datastreamFooter[dsID]['id']);
            // console.log(dslist)
        } else {
            dslist = [];
        }
        this.setState({datastreamVals: dslist});
    }

    // This method will be called to reset the sensor kits when the user clicks on a new device
    updatingSensorKitInfo = (sensorKitInfo) => {

        console.log("APP SensorKitInfo",sensorKitInfo)
        let sensorkitVals = {};
        let graphData = this.state.datastreamVals;
        for (let i in sensorKitInfo) {
            sensorkitVals[i] = sensorKitInfo[i][0];
            // if (sensorKitInfo[i][0])
            //     sensorkitVals[i] = sensorKitInfo[i][0];
            // else{
            //     sensorkitVals[i] = sensorKitInfo[i];
            // }

            if (i == this.state.datastreamFooter[this.state.selectedKitDatastreamId].name)
                if (sensorKitInfo[i][1]) {
                    graphData.unshift({result: sensorKitInfo[i][0], time: sensorKitInfo[i][1]});
                }
        }

        this.setState({sensorKitInfo: sensorkitVals, datastreamVals: graphData});

    }

    // This function is responsible to keep the state up to date regarding subscribed clients
    updatingClinets = (client) => {
        let updatedClient = [...this.state.clients]
        updatedClient.push(client)
        this.setState({clients: updatedClient})
    }


    //Handle MQTT requests for real time updating sensor kits
    //and graph and description data observations inputs data
    clickedThingHandler = async (clickedThing) => {

        // If user has already subscribed to MQTT topics, they should be unsubscribed before any other actions for the sake of faster response.
        if (this.state.clients.length > 0 && this.state.datastreamsInfo.length > 0) {
            for (let i = 0; i < this.state.datastreamsInfo.length; i++) {
                if (this.state.datastreamsInfo[i].ThingId === this.state.clickedThingID) {
                    MqttUnSubscribe(this.state.datastreamsInfo[i], this.state.clients)
                }
            }
        }

        // Setting the clients array empty to make sure new payloads weill be considered
        this.setState({clickedThingID: clickedThing, isQuery: false, clients: []})

        for (let i = 0; i < this.state.datastreamsInfo.length; i++) {
            if (this.state.datastreamsInfo[i].ThingId === clickedThing) {
                // If user select a Station, it will wait for new Observations using MQTT protocol
                // However, it might take time to something happens and reported by MQTT protocol
                // So, the first reading of observations will be retrieved using HTTP for the last observation.
                let {HttpLatestObservations, dsList, messageType, message} = await LatestObservation(this.state.datastreamsInfo[i]); // Retrieve all datastrreams and their latest observations for the selected Thing

                if (messageType === "FAILURE") await this.setState({
                    errorType: messageType,
                    errorMessage: message
                });
                else {
                    this.setState({sensorKitInfo: HttpLatestObservations, dsList: dsList})
                    MQTT(this.state.datastreamsInfo[i], this.updatingSensorKitInfo, this.state.sensorKitInfo, this.updatingClinets) // Subscribe to datastreams for latest observations
                }
            }
        }

        let {dsFooter, messageType, message} = await RequestDSFooter(clickedThing);

        if (messageType === "FAILURE") await this.setState({
            errorType: messageType,
            errorMessage: message
        });
        else {
            let defaultDSNumber = await FindDSNumber('temperature', dsFooter);
            let dslist = await GraphSTA(clickedThing, dsFooter[defaultDSNumber].id);
            this.setState({
                firstText: dsFooter[defaultDSNumber].name,
                datastreamVals: dslist,
                datastreamFooter: dsFooter,
                selectedKitDatastreamId: defaultDSNumber
            });

            if (dslist.length > 0)
                this.setState({shifterHolder: {from: dslist[dslist.length - 1].time, to: dslist[0].time}});
            if (dslist != null)
                this.setState({hasValue: true});
            else
                this.setState({hasValue: false});
            if (dslist === null) {
                this.interval = setInterval(async () => {
                    let dslist = await GraphSTA(clickedThing, dsFooter[defaultDSNumber].id);
                    this.setState({datastreamVals: dslist});
                }, timeInterval);
            }
            this.setState({secondData: null})
        }

    }

    render() {
        return (
            <div className="App" id='List-container'>
                {
                    this.state.errorType ? < Snackbar messageType={this.state.errorType}
                                                      message={this.state.errorMessage}/> : null
                }
                < Layout myLocation={this.state.myposition}
                         clickedGoTo={this.clickedGoToLocation}
                         datastreamVals={this.state.datastreamVals}
                         thingsInfo={this.state.thingsInfo}
                         clicked={this.clickedThingHandler}
                         clickedID={this.state.clickedThingID}
                         sensorKits={this.state.sensorKitInfo}
                         footerDS={this.state.datastreamFooter}
                         datastreamListofClickedDevice={this.state.dsList}
                         updateShift={this.updateShifter}
                         inputSelectedName={this.inputSelectedThingHandler}
                         progressPrecet={this.state.progressValue}
                         searchedSelectedLocation={this.state.inputSelectedLocation ? this.state.inputSelectedLocation : -1}
                         selectedDSNumber={this.state.selectedKitDatastreamId}
                         pointHasValue={this.state.hasValue}
                         updateDateChart={this.updateDateGraph}
                         secondGraph={this.setSecondGraph}
                         secondData={this.state.secondData}
                         firstGraphText={this.state.firstText}
                         secondUoM={this.state.secUoM}
                         shiferDS={this.state.shifterHolder}
                         secondGraphText={this.state.secondText}
                         selectedDSKit={this.clickedKitHandler}
                         selectedSensorKit={this.onSelectSensorKit}
                />
            </div>);
    }
}

export default App;
