import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
}from 'react-router-dom'
export default class App extends Component{
  apiKey = process.env.REACT_APP_NEWS_API
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  
render(){
  return (
    
    <div className="App">
      <Router>
      <Navbar/>
      <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        
      />
      <Routes>
      <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" category="sports" country="in" pageSize={20}/>}/>
      <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" category="science" country="in" pageSize={18}/>}/>
      <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" category="entertainment" country="in" pageSize={16}/>}/>
      <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" category="business" country="in" pageSize={14}/>}/>
      <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" category="technology" country="in" pageSize={12}/>}/>
      </Routes>
      </Router>

      
    </div>
  );
}
}
