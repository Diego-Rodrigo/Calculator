
import React, { Component } from 'react';
import {Platform, View, Text, StyleSheet} from 'react-native';
import Button from './components/Button';
import Display from './components/Display';

const initialState = {
  DisplayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0,0],
  current: 0,
}

export default class App extends Component {
    state ={...initialState}

    addDigit = n => {
      const  clearDisplay = this.state.DisplayValue === '0' 
        || this.state.clearDisplay

      if(n === '.' && !clearDisplay 
        && this.state.DisplayValue.includes('.')){
        return
      }

      const currentValue = clearDisplay ? '' : this.state.DisplayValue
      const DisplayValue = currentValue + n
      this.setState({DisplayValue, clearDisplay: false})

      if (n != '.'){
        const newValue = parseFloat(DisplayValue)
        const values = [...this.state.values]
        values[this.state.current] = newValue
        this.setState({values})
      }
    }

    clearMemory = () => {
      this.setState({...initialState})
    }

    setOperation = operation => {
      if(this.state.current === 0){
        this.setState({operation, current: 1, clearDisplay: true})
      }else{
        const equals = operation === '='
        const values = [...this.state.values]
       try{
        values[0] = eval(`${values} ${this.state.operation} ${values[1]}`)
       }catch{
         values[0] = this.state.values[0]
       }

       values[1] = 0
       this.setState({
         DisplayValue: `${values[0]}`,
         operation: equals ? null : operation,
         current: equals ? 0 : 1,
         clearDisplay: !equals,
         values,
       })

      }
    }

    render(){
      return (
        <View style={styles.container}>
          <Display value={this.state.DisplayValue} />
          <View style={styles.buttons}>
            <Button label='C' tripe onClick={this.clearMemory} />
            <Button label='/' operation onClick={this.setOperation}/>
            <Button label='7' onClick={this.addDigit}/>
            <Button label='8' onClick={this.addDigit}/>
            <Button label='9' onClick={this.addDigit}/>
            <Button label='*' operation onClick={this.setOperation}/>
            <Button label='4' onClick={this.addDigit}/>
            <Button label='5' onClick={this.addDigit}/>
            <Button label='6' onClick={this.addDigit}/>
            <Button label='-' operation onClick={this.setOperation}/>
            <Button label='1' onClick={this.addDigit}/>
            <Button label='2' onClick={this.addDigit}/>
            <Button label='3' onClick={this.addDigit}/>
            <Button label='0' onClick={this.addDigit}/>
            <Button label='+' operation onClick={this.setOperation}/>
            <Button label='=' operation onClick={this.setOperation}/>
            <Button label='%' operation onClick={this.setOperation}/>
            <Button label=','  onClick={this.addDigit}/>
          </View>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    
  },
  buttons:{
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
})
  


