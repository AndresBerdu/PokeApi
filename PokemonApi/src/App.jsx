import React, {useState} from 'react'
import {Button} from './components/Button';
import { TiArrowLeftOutline } from "react-icons/ti";
import { TiArrowRightOutline } from "react-icons/ti";
import './sass/App.scss'

const App = () => {

  const [pokemonId, setPokemonId] = useState(1);

  const prevClick = function(){
      (pokemonId === 1) ? 
      setPokemonId(1):setPokemonId(pokemonId - 1);
  }

  const nextClick = function(){
      setPokemonId(pokemonId + 1)
  }

  return (
    <>
      {/* tarjetas*/}
      <div className='buttons-container'>
        <Button icon={<TiArrowLeftOutline/>} handleClick={prevClick}
        />
        {pokemonId}
        <Button icon={<TiArrowRightOutline/>} handleClick={nextClick}
        />
      </div>
    </>
  )
}

export {App}