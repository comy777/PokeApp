import {useEffect, useRef, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {
  PokemonPaginatedResponse,
  Result,
  SimplePokemon,
} from '../interfaces/pokemonInterfaces';

const usePokemonPagination = () => {
  const nextPageUrl = useRef(`https://pokeapi.co/api/v2/pokemon?limit=40`);
  const [isLoading, setIsLoading] = useState(true);
  const [pokemons, setPokemons] = useState<SimplePokemon[]>([]);
  const loadPokemons = async () => {
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(
      nextPageUrl.current,
    );
    nextPageUrl.current = resp.data.next;
    mapPokemonList(resp.data.results);
  };
  const mapPokemonList = (pokemonList: Result[]) => {
    const newPokemonList: SimplePokemon[] = pokemonList.map(({name, url}) => {
      const urlParst = url.split('/');
      const id = urlParst[urlParst.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      return {id, picture, name};
    });
    setPokemons([...pokemons, ...newPokemonList]);
    setIsLoading(false);
  };
  useEffect(() => {
    loadPokemons();
  }, []);

  return {
    isLoading,
    pokemons,
    loadPokemons,
  };
};

export default usePokemonPagination;
