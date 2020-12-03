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
    equation: ''
  };


  clearEquation = ()=>{
    this.setState({
        equation: ''
    });
  }
  
  handlechange = (event) => {
    console.log('in handlechange with', event.target.value);
    const updatedEquation = this.state.equation + event.target.value 
    console.log(updatedEquation);

        this.setState({
            ...this.state,
            equation: updatedEquation
        });
    };

    sendEquation=()=>{
        console.log('sending equation:', this.state.equation);
        this.props.dispatch({
            type: 'SEND_EQUATION',
            payload: this.state.equation
        })

    }

  render() {
    return (
      <div>
        <h2 className="centeredText">Server Side Party Calculator</h2>
        <div className="calcDiv">
            <br/>
            <div className="calcScreen">

                <input className="centeredText, calcText" defaultValue={this.state.equation}></input>
            
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
                        <button className="equalsbtn" className="calcBtn" value="=" onClick={this.sendEquation}> = </button>
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
                            <button className="party">Party Mode</button>
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