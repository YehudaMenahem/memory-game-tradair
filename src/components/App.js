// import the React and ReactDOM libraries
import React from 'react';

// import components
import MemoryBoard from './MemoryBoard'
// import home page

// import Css 
import './../styles/app.css'

const MemoizedMemoryBoardComponent = React.memo(MemoryBoard);

const App = () =>{
    return (
        <div className={`main-app-center`}>
            <MemoizedMemoryBoardComponent gameName={'Blast From The Past...'}/>
        </div>
    )
}

export default App;