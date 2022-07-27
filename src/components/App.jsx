import React,{useState} from 'react'

//redux
import { connect } from 'react-redux'

//components
import MemoryBoard from './MemoryBoard'
import Modal from './Modal'

//styles 
import './../styles/app.css'

//data
import { movies } from '../movies/movies'

const App = ({ modalSettings }) =>{

    const [moviesCards] = useState(movies)

    //mix randomly the order of the cards
    const dupAndshuffle = (array) => {

        //duplicate array to get 2 kinds of every image
        //this method will create deep copy of the objects 
        let copiedArray = array.map((obj)=>{
            return {...obj}
        })
        
        let dupShuffleArray = [...array, ...copiedArray]
        dupShuffleArray.forEach(card => card.status = 'unrevelaed')

        //shuffle array
        var currentIndex = dupShuffleArray.length, temporaryValue, randomIndex
      
        //while there remain elements to shuffle
        while (0 !== currentIndex) {
      
          //pick a remaining element
          randomIndex = Math.floor(Math.random() * currentIndex)
          currentIndex -= 1
      
          //and swap it with the current element.
          temporaryValue = dupShuffleArray[currentIndex]
          dupShuffleArray[currentIndex] = dupShuffleArray[randomIndex]
          dupShuffleArray[randomIndex] = temporaryValue
        }

        for(let i=0; i<dupShuffleArray.length; i++){
            dupShuffleArray[i].id = `${dupShuffleArray[i].name}-${i}`
        }
      
        return dupShuffleArray
    }

    return (
        <>
            <div className={"main-app-center"}>
                <MemoryBoard movies={dupAndshuffle(moviesCards)} gameName={"Blast From The Past..."}/>
            </div>
            <Modal 
                show={modalSettings.showModal} 
                modalTitle={modalSettings.headerTitle}
                heroImage={modalSettings.heroImage}
                >
                <div className="row">
                    <div className="col-1">
                        <h2>{modalSettings.contentTitle}</h2>
                        <p className="line-break">{modalSettings.contentRunningText}</p>
                    </div>
                </div>
            </Modal>
        </>
    )
}

const mapStateToProps = (state) =>{
    return { modalSettings: state.modalSettings }
}

export default connect(mapStateToProps)(App)
