import React, {Fragment, useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { Server } from './api/Server'
import {Container, Row, Col} from 'react-bootstrap/';

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

  //función de https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server
  const download = () => {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(`{"data":${JSON.stringify(record.data)}}`));
    element.setAttribute('download', 'Results.json');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  const list = record.data
  return (
    <Container className="app">
      <h1 className="title">PhoneWord App</h1>
      <Row>
        <Col xs='8'>
          <p className="explanation"> En esta aplicación, deberás colocar un input numérico para encontrar
           todas las posibles combinaciones que este pueda tener dentro de un teclado como el que se muestra
            en la imagen.</p>
          <p> Los valores que acepta el programa incluyen el 0 y el intervalo [2,9]. Son excluidos los demás
            caracteres.</p>
          <input type="number" placeholder="Ingrese un número" min="0" onChange={verifyInput}/>
          {value !== '' ? <p className="realquery">El valor a consultar es {value}</p> : 
          <p className="realquery">No hay un valor identificable dentro del campo</p>}
        </Col>
        <Col>
          <img className="image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Telephone-keypad2.svg/800px-Telephone-keypad2.svg.png"
          alt="Teclado de un celular no inteligente"/>  
        </Col>
      </Row>
      {list === undefined ? <p className="empty"> No hay resultados para mostrar </p> :
        <Fragment>
          <p> La cantidad de resultados encontrados para "<span className="description">{value}</span>" 
              fueron: <span className="result">{record.number}</span></p>
          <button type="button" onClick={download}> Descargar resultados </button>
          <Row className="results">
            {list.map((element,key) => {
              return(
                <Col key={key}>
                <p> {element} </p> 
                </Col>
              )
            })}
          </Row>
        </Fragment>
      }
    </Container>
  )   
  
}

export default App;
