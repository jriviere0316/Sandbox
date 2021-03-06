import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import './Calculator.css';
// Basic class component structure for React with default state
// className="calcBtn" value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class Calculator extends Component {
    state = {
        equation: '',
        recentEquation: ''
    };

    componentDidMount(){
        this.props.dispatch({
            type: 'GET_EQUATIONS'
        })
        var element = document.getElementById("calcInput");
        element.classList.add("hiddenInput");
        
        // const audioEl = document.getElementsByClassName("audio-element")[0]
        // audioEl.play()
    }


    clearEquation = ()=>{
        this.setState({
            ...this.state,
            equation: '',
            recentEquation: ''
        });
        //add hide class
        var element = document.getElementById("calcInput");
        element.classList.add("hiddenInput");
    }
  
    handlechange = (event) => {
    // console.log('in handlechange with', event.target.value);
    const updatedEquation = this.state.equation + event.target.value 
    // console.log(updatedEquation);
        this.setState({
            ...this.state,
            equation: updatedEquation
        });
        var element = document.getElementById("calcInput");
        element.classList.remove("hiddenInput");
    };

    sendEquation=()=>{
        // console.log('sending equation:', this.state.equation);
        this.props.dispatch({
            type: 'SEND_EQUATION',
            payload: this.state.equation
        })
        this.setState({
            ...this.state,
            equation: ''
        })
    }

    setPreviousEquation=(event)=>{
        // console.log('in setPreviousEquation', event);
        if(event === this.state.recentEquation){
            // console.log('event & this.state.recentEquation MATCH:',event, this.state.recentEquation, ', stopping');
            return
        }else{
            // console.log('setting state');
            this.setState({
                recentEquation: event
            })
        }
    }

    partyMode=()=>{
        console.log('in party mode');
        var element = document.getElementById("calcBack");
        element.classList.toggle("partyCalcBackground");

        const audioEl = document.getElementsByClassName("audio-element")[0]


        if(audioEl.paused){
            audioEl.play();
        }else {
            audioEl.pause();
        }

        
    }


    
    render() {
    var previousEquation = this.props.store.equations[0];
    // if(this.state.equation === '' && this.state.recentEquation === ''){
    //     console.log(`both equation and recent equation are ''`);
    // }
    if(previousEquation !== undefined){
        // console.log('previousEquation', previousEquation.fullEquation);
        var fullPrevious = previousEquation.fullEquation;
        // console.log('fullPrevious', fullPrevious);
        // if (this.state.previousEquation.length > 0){
        if (previousEquation.fullEquation !== this.state.previousEquation){
            // console.log('does notmatch');
            this.setPreviousEquation(previousEquation.fullEquation)
        }else{
            // console.log('MATCH! stopping');
            return
        }
    }
    console.log('state is', this.state);
    console.log('fullPrevious', fullPrevious);
    
    return (
      <div id="mainCalcDiv" >
            {/* <audio id="myAudio" source="./partyMusic.mp3" preload="auto"></audio>    */}
            <audio className="audio-element">
                <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"></source>
            </audio>


        <div id="calcBack" className="calcBackground"></div>
        <br/>
        <h2 className="centeredText">Server Side Party Calculator</h2>
        <div className="calcDiv">
            <br/>
            <div className="calcScreen">
                <div className="hidyDiv">
                    {this.state.equation.length > 0 ?
                        <input id="calcInput" className="centeredText, calcText" defaultValue={this.state.equation}></input>
                        :
                        <input id="calcInput" className="centeredText, calcText" defaultValue={this.state.recentEquation}></input>
                    }
                </div>
            </div>

            <br/>
            <table className="centered">
                <tbody>
                    <tr>

                        <td>
                            <button className="calcBtn" value="7" onClick={(value)=>this.handlechange(value)}> 7 </button>
                        </td>
                        <td>
                            <button className="calcBtn" value="8" onClick={(value)=>this.handlechange(value)}> 8 </button>
                        </td>
                        <td>
                            <button className="calcBtn" value="9" onClick={(value)=>this.handlechange(value)}> 9 </button>
                        </td>
                        <td>
                            <button className="calcBtn" value="*" onClick={(value)=>this.handlechange(value)}> x </button>

                        </td>
                    </tr>
                    <tr>

                        <td>
                            <button className="calcBtn" value="4" onClick={(value)=>this.handlechange(value)}> 4 </button>
                        </td>
                        <td>
                            <button className="calcBtn" value="5" onClick={(value)=>this.handlechange(value)}> 5 </button>
                        </td>
                        <td>
                            <button className="calcBtn" value="6" onClick={(value)=>this.handlechange(value)}> 6 </button>
                        </td>
                        <td>
                        <button className="calcBtn" value="-" onClick={(value)=>this.handlechange(value)}> - </button>

                        </td>
                    </tr>
                    <tr >
                        <td>
                            <button className="calcBtn" value="1" onClick={(value)=>this.handlechange(value)}> 1 </button>
                        </td>
                        <td>
                            <button className="calcBtn" value="2" onClick={(value)=>this.handlechange(value)}> 2 </button>
                        </td>
                        <td>
                            <button className="calcBtn" value="3" onClick={(value)=>this.handlechange(value)}> 3 </button>
                        </td>
                        <td>
                            <button className="calcBtn" value="+" onClick={(value)=>this.handlechange(value)}> + </button>
                        </td>
                    </tr>
                    <tr>

                        <td >
                            <button className="calcBtn" value="0" onClick={(value)=>this.handlechange(value)}> 0 </button>
                        </td>
                        <td>
                            <button className="calcBtn" value="." onClick={(value)=>this.handlechange(value)}> . </button>
                        </td>
                        <td>
                        <button className="equalsbtn" className="calcBtn, equalsbtn" value="=" onClick={this.sendEquation}> = </button>
                        </td>
                        <td>
                        <button className="calcBtn" value="/" onClick={(value)=>this.handlechange(value)}> ÷ </button>
                        </td>
                    </tr>
                    <tr>
                        <td height="35px">
                            {/* <div ></div> */}
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <button className="clearbtn" onClick={this.clearEquation}> C </button>
                        </td>

                        <td>
                        </td>

                        <td>
                        </td>

                        <td>
                            <button className="party" onClick={this.partyMode}>Party Mode</button>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Calculator);