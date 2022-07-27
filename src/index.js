// Import the React and ReactDOM libraries
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'

// Import components
import App from  './components/App'

// Take the react component and show it on the screen
ReactDOM.render(
<Provider store={createStore(reducers)}>
    <App />
</Provider>, document.querySelector('#root'))