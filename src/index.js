import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Cesium  from "cesium";
import {  BrowserRouter  } from 'react-router-dom';
import 'bootstrap-daterangepicker/daterangepicker.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import registerServiceWorker from './registerServiceWorker';
import {Ion} from "cesium";

let MapBoxAccessToken = "sk.eyJ1Ijoic29yb3VzaG9qYWdoIiwiYSI6ImNrNXgycGJ5dzIxYXUzbG41YnBnZ2VrZncifQ.OPS1IHAiYk-6Lm_vbpFmdQ"
//Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjZGIwMWM3Yi0zMjEwLTRkMmQtYjZjYi1lYWQwY2QzN2Y0OGEiLCJpZCI6MTYyNjksInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1ODMxNzcyMTd9.0whJKFWimljjwHDTp3h0PibQIwjYrLQ2kmLHfKdtsS8";
Ion.defaultAccessToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MjcwZmE1Mi1mMjBjLTRkYjktODI2OS00YTQzY2NjZGFiZTMiLCJpZCI6MTAyNTUsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1ODMyNDkzNzB9.HV080mvpn5i7CMTI0SnFZaWN-8pn5uCVfAbb8ScoKqQ'
axios.defaults.baseURL = 'https://ogc-3d-iot-pilot.sensorup.com/v1.0';
// axios.defaults.headers.common['Authorization'] = 'Auth TOKEN';
// axios.defaults.headers.post['Content-Type'] = 'application/json';

const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
