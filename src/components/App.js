// import the React and ReactDOM libraries
import React,{useState} from 'react';

// redux
import { connect } from 'react-redux';
import { setModal } from './../actions';

// import components
import MemoryBoard from './MemoryBoard'
import Modal from './Modal'

// import Css 
import './../styles/app.css'
import './../styles/modal.css'

const App = (props) =>{

    const [imgsArr] = useState([
        {key:'amelie', path:require('./../assets/images/amelie.jpg').default},
        {key:'back_to_the_future', path:require('./../assets/images/back_to_the_future.jpg').default},
        {key:'paris_is_burning', path:require('./../assets/images/parris_is_burning.jpg').default},
        {key:'pulp_fiction', path:require('./../assets/images/pulp_fiction.jpg').default},
        {key:'reservior_dogs', path:require('./../assets/images/reservior_dogs.jpg').default},
        {key:'terminator', path:require('./../assets/images/terminator.jpg').default},
        {key:'aladdin', path:require('./../assets/images/aladdin.jpg').default},
        {key:'dirty_dancing', path:require('./../assets/images/dirty_dancing.jpg').default},
        {key:'nightmare_elem_street', path:require('./../assets/images/nightmare_elem_street.jpg').default},
        {key:'big', path:require('./../assets/images/big.jpg').default},
        {key:'mission_impossible', path:require('./../assets/images/mission_impossible.jpg').default},
        {key:'indiana_jones', path:require('./../assets/images/indiana_jones.jpeg').default},
        {key:'fight_club', path:require('./../assets/images/fight_club.jpg').default},
        {key:'the_shining', path:require('./../assets/images/the_shining.jpg').default},
        {key:'scream', path:require('./../assets/images/scream.jpg').default},
        {key:'home_alone', path:require('./../assets/images/home_alone.jpg').default},
        {key:'matrix', path:require('./../assets/images/matrix.jpg').default},
        {key:'lambs_silience', path:require('./../assets/images/lambs_silience.jpg').default},
    ]);

    const closeModal = () =>{
        props.setModal({showModal:false});
    }

    //mix randomly the order of the cards
    const dupAndshuffle = (array) => {

        //duplicate array for 2 kinds of every image
        array = [...array, ...array]

        //shuffle array
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle
        while (0 !== currentIndex) {
      
          // Pick a remaining element
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
    }

    return (
        <React.Fragment>
            <div className={`main-app-center`}>
                <MemoryBoard imgs={dupAndshuffle(imgsArr)} gameName={'Blast From The Past...'}/>
            </div>
            <Modal 
                show={props.modalSettings.showModal} 
                closeModal={closeModal}
                modalTitle={props.modalSettings.headerTitle}
                heroImage={props.modalSettings.heroImage}
                >
                <div className="row">
                    <div className="col-1">
                        <h2>{props.modalSettings.contentTitle}</h2>
                        <p className="line-break">{props.modalSettings.contentRunningText}</p>
                    </div>
                </div>
            </Modal>
        </React.Fragment>
    )
}

const mapStateToProps = (state) =>{
    return {
        modalSettings: state.modalSettings
    }
}

export default connect(mapStateToProps,{setModal})(App);