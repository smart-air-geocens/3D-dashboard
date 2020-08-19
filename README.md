# Air Quality Simulator Dashboard

The 3D web dashboard is designed to visualize synthesized air quality data generated using air quality simulator node cli [application](https://github.com/smart-air-geocens/air-quality-simulator-cli) on 3D Cesium map and also on a graph.

## Development Environment

This project is created using [Create React App](https://github.com/facebook/create-react-app) and you don’t need to install or configure tools like webpack or Babel.
To install this dashboard you need to do following steps:

### Step 1: Clone the project in your local machine

Run the following command in your terminal:

``` git clone https://github.com/smart-air-geocens/3D-dashboard.git ```

### Step 2: Install dependencies

Please install all the required packages/dependencies by running one of following methods on you terminal:

#### Yarn

``` yarn ``` or ``` yarn install ```

#### NPM

``` npm install ```

Please note that the npm install command will install dependencies from the package.json file and allows you to add new packages. Yarn install only installs the dependencies listed in yarn.lock or package.json, in that order.

You can check dependencies [here](https://github.com/smart-air-geocens/3D-dashboard/blob/master/package.json)

#### Step 3: Start local development server

Serve the app to browser by running following codes on your terminal:

``` yarn start ```

Finally you should be able to see the dashboard running on your browser: [http://localhost:3000/](http://localhost:3000/)

![alt text](https://github.com/smart-air-geocens/3D-dashboard/blob/master/images/fig1.PNG "3D Dashboard")

## Dashboard Explanation

Generally, the content of 3D dashboard can be categorized into 3 main components including Header, Map, and Footer. As seen in the following image, each component has its own subcomponents. In this section, different components will be briefly explained.

![alt text](https://github.com/smart-air-geocens/3D-dashboard/blob/master/images/fig2.PNG "3D Dashboard Components")

### Header

In this component, a search service is implemented. In the search box, all the connected devices to the OGC SensorThings API endpoint are listed based on their name on the endpoint. Users can choose their favorite device, and then the camera will be moved to the location of the selected device on the Map. As shown in the following image, a list of 5 connected devices which starts with letter "GeoCENS" is shown in the search box.

![alt text](https://github.com/smart-air-geocens/3D-dashboard/blob/master/images/fig3.PNG "Header Serach Components")

### Map

n the map component, we used [Resium](https://resium.darwineducation.com/) which is a library of React components for 🌍[CesiumJS](https://cesium.com/cesiumjs/). CesiumJS is an open source JavaScript library for creating world-class 3D globes and maps with the best possible performance, precision, visual quality, and ease of use [1](https://cesium.com/cesiumjs/). It released under the [Apache 2.0 license](https://github.com/CesiumGS/cesium/blob/master/LICENSE.md) and is free for both commercial and non-commercial use. In our dashboard, the Map component has some features as shown in the following image.  

![alt text](https://github.com/smart-air-geocens/3D-dashboard/blob/master/images/fig4.PNG "Map Components")

#### Features

##### 1. Display Devices

In this feature, each connected devices to the [OGC SensorThings API](https://developers.sensorup.com/docs/#introduction)'s endpoit will be automatically added to the Map component. Two colors are chosen to display the status of each device including gray and yellow color. The status of each device can be:

- Online: Circles with yellow color represents devices in online status.

- Offline: Circles with gray color represents devices in offiline status.

**Note**: The status of each device is **Online** if the phenomenonTime of the latest reported observation is before **three hours ago**.

When a user clicks a device on the map, an animated boundary will be added to the selected device. The color of the animated boundary is according to the status (Online/Offline) of the target device. We added this feature to the Cesium Javascript library to make the selected device easier to detect.

##### 2. Infobox

The Infobox is designed to show information about the selected device. It will be shown when a user clicks on each device. Then,  when mouse movements happen, it will be disappeared. The content of the Infobox includes device name, the name of Internet of Thing Standard, the time of last received observation, and the device status.  

##### 3. Device Clusters

To provide better representation in lower zoom levels, the built-in [Cesium clustering library](https://cesium.com/docs/cesiumjs-ref-doc/EntityCluster.html) is used. In this feature, the K-Nearest-Neighbor algorithm is applied on Euclidean distance between devices. The result of clustering devices is shown as a number. For example, the number ```2``` in the map shows that two devices are clustered based on their Euclidean distance in this cluster.

##### 4. Geolocating Service

Using this map feature, users can search for their desired address. Then, the camera will be moved to their desired address.

##### 5. 3D Map Representation

This feature provides users with ability to switch between 2D or 3D map representation.

##### 6. Map Views

Using this feature, users provides with an option to choose the base map views between a variety of different base map views such as Mapbox Street Classic, Bing Maps Aerial with labels, and so on.  

##### 7. Navigation Instructions

Using this feature, instructions of using Cesium mapping library using Mouse or Touch are provided.

##### 8. List of Supported Map Views

A variety of map views are available using Cesium mapping library including:

- Bing Maps Aerial
- Bing Maps Aerial with Labels
- Bing Maps Roads
- Sentinel-2
- Blue Marble
- Earth at night
- Natural Earth II
- Mapbox Satellite
- Mapbox Streets
- Mapbox Streets Classic
- ESRI World Imagery
- ESRI World Street Map
- ESRI National Geography
- OpenStreetMap
- Stamen Watercolor
- Stamen Toner

### Footer

The main objective of this component is to let users get queries of sensors observations and visualize them on the graph. An overview of this component along with its subcomponents is shown in the following image:

![Footer overview](https://github.com/smart-air-geocens/3D-dashboard/blob/master/images/fig5.PNG "Footer Components")

#### Subcomponents

##### 1. Header

In the Header users can observe the clicked sensor name and the last observation time. By clicking on the sensor name in the left side of the header the map zooms to the selected device.

The name of the selected device is shown in the left side. Icon's color shows the status of the selected device which can be gray (i.e., Offline) or yellow (i.e., Online). Also, users can click on the device name. Then, the camera will be moved to the location of the selected device.
Also, the date and time of the latest observation that has been sent to the server is shown in the middle.

##### 2. SensorKit

This section includes the clicked sensors different datastreams latest observations. The values of the sensorKit items will be updated as soon as the server gets a new observation. MQTT subscription has been employed to get latest observation of every datastream. By clicking on every datastream in the sensor kit, users can see last 20 observations in the graph.
In this component, latest observations of all included datastreams in the selected device are shown. This Menu is automatically created. In other words, all the datastreams included in the selected device will be automatically added to this menu. For example, the first item shows that the value of the latest observation of ``` Temperature ```'s sensor is ```12```. The ```red down arrow``` next to the observation depicts that the current value reported by ``` Teperature ```'s sensor is less than the previous observation.

##### 3. Last Query Observation

Users can see the last observation of the selected sensorkit item here. In other words, it returns the last observation of the last user's query. Also the unit of measurement of every item comes from STA datastream UoM properties.

##### 4. DropDown Datastreams

Users can select every datastream to visualize values on the graph.

##### 5. The Datastream Description

Users can see a brief description of every selected datastream. The app gets it from STA datastream description properties.

##### 6. Comparison DropDown

To compare and observe two datastreams results in the graph users can select items from this component.

##### 7. Temporal Query

In this section users can determine a time range for visualizing sensors observations. Using dropdown users can get last observations of 1hour, 1month, or 1day ago. Using From-To calenders users can observe query results on the graph in the desired time range. Users can also shift graph to the left or right by using the MoveLeft/MoveRight module.

##### 8. Graph

Here users can see all query results in the graph. It can be zoomed in/out, panned, and exported the graph results in svg,png, and excel formats. Also, observations on the graph legend can be turned of/on. By hovering the mouse on the graph users can observe time/value of observations on the graph.
