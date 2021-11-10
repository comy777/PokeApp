import {useEffect, useState} from 'react';
import {PokemonResult} from '../interfaces/pokemonInterfaces';
import {pokemonApi} from '../api/pokemonApi';

const useGetPokemon = (id: string) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState<PokemonResult>(
    {} as PokemonResult,
  );
  const getPokemon = async () => {
    const res = await pokemonApi.get<PokemonResult>(url);
    setPokemonData(res.data);
    setIsLoading(false);
  };
  useEffect(() => {
    getPokemon();
  }, []);
  return {
    isLoading,
    pokemonData,
    getPokemon,
  };
};

export default useGetPokemon;
