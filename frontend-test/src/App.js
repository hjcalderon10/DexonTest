import React, {Fragment, useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { Server } from './api/Server'
import Container from 'react-bootstrap/Container';

function App() {

  const [value, setValue] = useState('')
  const [record, setRecord] = useState({})

  const verifyInput = (evt) => {
    const number = (`${evt.target.value}`).split("")
    const length = number.length
    let x = number.filter(element => element !== '-' && element !== '1')
    if(x.length > 0){
      setValue(x.reduce((acc, actual) => `${acc}${actual}`))
      //console.log(x.reduce((acc, actual) => `${acc}${actual}`)) 
    }
    else{
      setValue('')
    }
  }

  useEffect(() => {
    if(value !== ''){
      Server.searchResults(value)
        .then(results => {
          setRecord(results)
        })
    }
  }, [value])

  const list = record.data
  return (
    <Container className="app">
      <h1 className="title">PhoneWord App</h1>
      <row>
        <p className="explanation"> En esta aplicación, deberás colocar un input numérico para encontrar
           todas las posibles combinaciones que este pueda tener dentro de un teclado como el que se muestra
            en la imagen.</p>
        <img className="image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Telephone-keypad2.svg/800px-Telephone-keypad2.svg.png"
          alt="Teclado de un celular no inteligente"/>
        <p> Los valores que acepta el programa incluyen el 0 y el intervalo [2,9]</p>
      </row>
      
      <br/>
      <input type="number" placeholder="Ingrese un número" min="0" onChange={verifyInput}/>
      {value !== '' ? <p className="realquery">El valor a consultar es {value}</p> : 
        <p className="realquery">No hay un valor identificable dentro del campo</p>}
      {list === undefined ? <p className="empty"> No hay resultados para mostrar </p> :
        list.map((element,key) => <p key={key}> {element} </p>)}
    </Container>
  )   
  
}

export default App;
