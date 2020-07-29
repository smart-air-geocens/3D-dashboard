//This component provide options for the graph
//The input is the Unit of the measurement of
//the datastream observations.
const GrapgOptionsRun = async (uom, labelShow, range) => {
    function formatDate(date, range) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            Hour = '' + d.getHours(),
            minutes = '' + d.getMinutes()
        // year = d.getFullYear(); //in case wee need to show year as well

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return month + "-" + day + " " + Hour + ":" + minutes;
    }
    const GrapgOptions = {
        chart: {
            type: 'area',
            stacked: false,
            height: 350,
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
            toolbar: {
                autoSelected: 'zoom'
            }
        },
        stroke: {
            show: true,
            curve: 'straight',
            lineCap: 'butt',
            colors: undefined,
            width: 2,
            dashArray: 0,
        },
        colors: ['#EFDE8D', '#0019FF'],
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
        },
        title: {
            text: '',
            align: 'left'
        },
        fill: {
            opacity: 0.5
            /*type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 1,
                stops: [0, 90, 100]
            },*/
        },
        yaxis: {
            show: labelShow,
            labels: {
                formatter: function (val) {
                    return Math.floor(val * 10) / 10;
                },
            },
            title: {
                text: ''
            },
        },
        xaxis: {
            show: labelShow,
            tickAmount: 8,
            type: 'datetime',
            labels: {
                hideOverlappingLabels: true,
                showDuplicates: false,
                formatter: function (value, timestamp, index) {
                    if (labelShow)
                        return (formatDate(timestamp, null));
                    else
                        return;
                },
                /*datetimeFormatter: {
                    year: 'yyyy',
                    month: "MMM 'yy",
                    day: 'dd MMM',
                    hour: 'HH:mm'
                },*/

            }
            ,
            tooltip: {
                enabled: false
            }
        },
        tooltip: {
            shared: false,
            y: {
                formatter: function (val, index) {
                    return val.toFixed(2).toString() + ' ' + uom[index.seriesIndex];
                }
            },
            x: {
                formatter: function (val) {
                    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                    val = new Date(val)
                    val = val.toLocaleDateString('en-US', options) + " " + val.toLocaleTimeString('en-US');
                    //In case we need to show the date_time with - delimeter numerical format use the following format
                    //val = val.getFullYear() + "-" + val.getMonth() + "-" + val.getDay() + "  " + val.getHours() + ":" + val.getMinutes() + ":" + val.getSeconds();
                    return val;
                }
            }
        }
    };
    return await GrapgOptions;
}
export default GrapgOptionsRun;