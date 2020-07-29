//This component is handling the graph showing events
//The graph default state illustrates one series
//By getting the second value from dropdown
//we can have two series for comparison
import React from "react";
import './Graph.css';
import Chart from "react-apexcharts";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './MenuSlider.css';
import 'react-day-picker/lib/style.css';
import GraphOptions from './GraphOptions';
let UM = '';
class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myloc: {},
            selected: 0,
            DSobs: this.props.clickedThingObs,
            series: [],
            options: GraphOptions(['ºC'], true, null),
        };
    }
    //Initialize the uom symbol for the graph options
    //just to avoid null values
    async componentDidMount() {
        this.setState({ options: await GraphOptions('ºC', true, null) });
    }
    //By changing the datastream, GraphOptions is updated
    async componentDidUpdate(prevProps, prevState, context) {
        let showlabels;
        if (this.props.datastreamVals != prevProps.datastreamVals || this.props.footerDS[this.props.selectedDSNumber] && prevProps.footerDS[prevProps.selectedDSNumber]) {
            if (this.props.datastreamVals != prevProps.datastreamVals || this.props.footerDS[this.props.selectedDSNumber].uom != prevProps.footerDS[prevProps.selectedDSNumber].uom && this.props.footerDS != null) {
                let um;
                if (this.props.secondData == null) {
                    let inputUoM = [];
                    inputUoM.push(this.props.footerDS[this.props.selectedDSNumber].uom);

                    if (this.props.clickedThingObs.length < 2 || this.props.datastreamVals < 2) {
                        showlabels = false;
                    } else {
                        showlabels = true;
                        // console.log(this.props.clickedThingObs);
                    }
                    um = await GraphOptions(inputUoM, showlabels, null);
                    this.setState({ options: um });
                }
            }
        }
        if (this.props.secondData != null) {
            if (this.props.secondData != prevProps.secondData) {
                {
                    let um;
                    let inputUoM = [];
                    inputUoM.push(this.props.footerDS[this.props.selectedDSNumber].uom);
                    inputUoM.push(this.props.secondUoM)
                    um = await GraphOptions(inputUoM, true, null);
                    this.setState({ options: um });
                }
            }
        }
    }
    render() {
        let graphObs = '';
        let final_series = [];
        if (this.props.clickedThingObs != null) {
            if (this.props.clickedThingObs[0] != null) {
                graphObs = this.props.clickedThingObs[0]['result'];
                let series = [];
                for (var i in this.props.clickedThingObs) {
                    let chart_object = [];
                    var localtime = Date.parse(this.props.clickedThingObs[i]['time']);
                    chart_object.push(localtime);
                    chart_object.push(this.props.clickedThingObs[i]['result']);
                    series.push(chart_object);
                }
                let final_json = { name: this.props.firstGraphText, "data": series };
                final_series.push(final_json);
                //This part is triggered by requesting the second series
                //Then it builds the second series on the graph
                if (this.props.secondData != null) {
                    if (this.props.secondData[0] != null) {
                        let seriesSecond = [];
                        for (var i in this.props.secondData) {
                            let chart_objectSecond = [];
                            var localtimeSecond = Date.parse(this.props.secondData[i]['time']);
                            chart_objectSecond.push(localtimeSecond);
                            chart_objectSecond.push(this.props.secondData[i]['result']);
                            seriesSecond.push(chart_objectSecond);
                        }
                        let final_jsonSecond = { name: this.props.secondGraphText, "data": seriesSecond };
                        final_series.push(final_jsonSecond);
                    }
                }
            }
        } else {
            graphObs = null;
        }
        //return nothing in case of having no data
        if (graphObs == null) {
            return (<div>
                {}
            </div>);
        } else {
            return (<div>
                <div id="chart" >
                    <Chart options={this.state.options}
                        series={final_series}
                        type="area"
                        height={300}
                    />
                </div>
            </div>

            );
        }
    }
}

export default Graph;
