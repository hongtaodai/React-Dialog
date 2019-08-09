import React from 'react'
import ReactDOM from 'react-dom'
import YourComponent from '../src/YourComponent'

const root = document.createElement('div');
window.document.body.appendChild(root);
ReactDOM.render(
  <YourComponent/>,
  root
)