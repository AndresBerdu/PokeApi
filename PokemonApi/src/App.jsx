//Hooks
import React, {useState, useEffect} from 'react';
//Components
import { Button } from './components/Button';
import { CardPokemon } from './components/CardPokemon';
//Styles
import { TiArrowLeftOutline } from "react-icons/ti";
import { TiArrowRightOutline } from "react-icons/ti";
import './sass/App.scss'

const App = () => {

  const [pokemonId, setPokemonId] = useState(1);
  const [pokemonEvolutions, setPokemonEvolutions] = useState([]);

  useEffect(()=>{
    getEvolutions(pokemonId);
  }, [pokemonId]);

  const getEvolutions = async function(id){
    const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`);
    const data = await response.json();

    let pokemonEvoArray = [];

    let pokemon_v1 = data.chain.species.name;
    let pokemon_v1Img = await getPokemonImgs(pokemon_v1);
    pokemonEvoArray.push([pokemon_v1, pokemon_v1Img]);
    
    if(data.chain.evolves_to.lentgth !== 0){
      let pokemon_v2 = data.chain.evolves_to[0].species.name;
      let pokemon_v2Img = await getPokemonImgs(pokemon_v2);
      pokemonEvoArray.push([pokemon_v2, pokemon_v2Img]);

      if(data.chain.evolves_to[0].evolves_to.lentgth !== 0){
        let pokemon_v3 = data.chain.evolves_to[0].evolves_to[0].species.name;
        let pokemon_v3Img = await getPokemonImgs(pokemon_v3);
        pokemonEvoArray.push([pokemon_v3, pokemon_v3Img]);
      }
    }
    setPokemonEvolutions(pokemonEvoArray);
  }

  const getPokemonImgs = async function(name){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    const data = await response.json();
    return data.sprites.other['official-artwork'].front_default;
  }

  const prevClick = function(){
      (pokemonId === 1) ? 
      setPokemonId(1):setPokemonId(pokemonId - 1);
  }

  const nextClick = function(){
      setPokemonId(pokemonId + 1)
  }

  return (
    <div className='app'>
      <div className={`card-container card${pokemonEvolutions}`}>
        {pokemonEvolutions.map(pokemon => 
          <CardPokemon 
            key={pokemon[0]}
            name={pokemon[0]}
            img={pokemon[1]}
          />
        )}
      </div>

      <div className='buttons-container'>
        <Button icon={<TiArrowLeftOutline/>} handleClick={prevClick}
        />
        <Button icon={<TiArrowRightOutline/>} handleClick={nextClick}
        />
      </div>
    </div>
  )
}

export {App}