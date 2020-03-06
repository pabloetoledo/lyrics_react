import React, {useState, useEffect, Fragment} from 'react';
import Formulario from './components/Formulario';
import Cancion from './components/Cancion';
import Informacion from './components/Informacion';
import axios from 'axios';

function App(){

  const [artista, agregarArtista] = useState('');
  const [letra, agregarLetra] = useState([]);
  const [info, agergarInfo] = useState('');

  //metodo para consultar la api de letra de canciones
  const consultarAPILetra = async busqueda => {
    const {artista, cancion} = busqueda;
    const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;

    //consultar la api
    const resultado = await axios(url); 
    
    agregarArtista(artista);
    agregarLetra(resultado.data.lyrics);
  }

  //metodo para consultar la api de informacion
  const consultarAPIInfo = async () =>{
    if(artista){
      const url = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;
      const resultado = await axios(url);
      agergarInfo(resultado.data.artists[0]);
    }
  }

  useEffect(
    () =>{
      consultarAPIInfo() //a la segunda api la debemos llamar desde useeffec para que se llame por callback
    }, [artista]
  )

  return (
    <Fragment>  
      <Formulario
        consultarAPILetra = {consultarAPILetra}
      />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Informacion
              info = {info}
            />
          </div>
          <div className="col-md-6">
            <Cancion
              letra = {letra}
            />
          </div>
        </div>
      </div>


    </Fragment>
  )
}

export default App;