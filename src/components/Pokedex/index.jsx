import React, { useEffect, useState } from "react";

import "../css/PokemonCardWrapper.css";
import "../css/PokemonCard.css";
import "../css/pokedexHeader.css";
import "../css/searchPokemon.css";


import axios from "axios";
import Skeleton from "@mui/material/Skeleton";

import { STATE_LOAD } from "../../store/slices/pokeList.slice";
import useAPIPokemonList from "../../hooks/useAPIPokemonList";
import Header from "../Header";
import { cardBackgoundStyle, capitalize } from "../../utils";
import { useNavigate } from "react-router-dom";

export const Searcher = () => {
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);
  const [pokemonSearch, setPokemonSearch] = useState("");

  const searchPokemon = (pokemon) => {
    setIsSearching(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then((res) => {
        setPokemonSearch(res.data);
        if (pokemonSearch) {
          navigate(`/pokemon/${pokemon}`);
        }
      })
      .catch(() => {
        setIsSearching(false);
        alert("no se encontró el pokemon");
      });
  };

  const submit = (e) => {
    e.preventDefault();
    searchPokemon(pokemonSearch);
  };

  return (
    <section className="searcher-section">
      <h2>
        <span>Bienvenido {"Name"}</span> Aquí podrás encontrar tus pokémons
        favoritos!
      </h2>
      <div className="search-container">
        <form onSubmit={(e) => submit(e)}>
          <input
            className="shadow"
            type="text"
            required
            placeholder="Busca un pokémon"
            onChange={(e) => setPokemonSearch(e.target.value)}
            value={pokemonSearch}
          />
          <button className="shadow" disabled={isSearching}>
            Buscar
          </button>
        </form>
        <select className="select-type-search shadow">
          <option className="option-type-search" default value="0">
            Seleciona un tipo de pokemon
          </option>
          {}
        </select>
      </div>
    </section>
  );
};

export const PokemonCardWrapper = (props) => {
  return <div className="cards-wrapper">{props.children}</div>;
};

export const PokemonCard = ({ url }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  //key = [background, head, color]
  const getStyleByKey = (key) => {
    if (data) {
      return cardBackgoundStyle[data?.types[0].type.name][key];
    } else {
      return cardBackgoundStyle["normal"][key];
    }
  };
  //speed, defense, hp, attack
  const getStat = (stat_name) =>
    data?.stats.find((itm) => itm.stat.name === stat_name)["base_stat"];

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setData(res.data))
      .finally(() => setIsLoaded(true));
  }, []);

  return (
    <section
      className={`card-container__border ${getStyleByKey("background")}`}
    >
      <a href="">
        <div
          onClick={(e) => {
            e.preventDefault();
            navigate(`/pokemon/${data.name}`);
          }}
          className="card-container"
        >
          <div className={`card__header ${getStyleByKey("head")}`}>
            <div className="card__header-inner">
              {isLoaded ? (
                <img
                  src={data?.sprites.other["official-artwork"]["front_default"]}
                  alt="imagen"
                />
              ) : (
                <Skeleton
                  sx={{ backgroundColor: "rgba(136,136,136,0.75)" }}
                  animation="pulse"
                  variant="circular"
                  width={120}
                  height={120}
                />
              )}
            </div>
          </div>
          <div className="card__body">
            <div>
              <h2 className={getStyleByKey("color")}>
                {capitalize(data?.name)}
              </h2>
              {/* Join type name with format [name / name / ...] */}
              <p>{data?.types.map((t) => t.type.name).join(" / ")}</p>
              <small className="subtitle_color">type</small>
            </div>
            <div>
              <div className="card__body__grid">
                <div>
                  <h6 className="subtitle_color">HP</h6>
                  <h3 className={getStyleByKey("color")}>{getStat("hp")}</h3>
                </div>
                <div>
                  <h6 className="subtitle_color">ATTACK</h6>
                  <h3 className={getStyleByKey("color")}>
                    {getStat("attack")}
                  </h3>
                </div>
                <div>
                  <h6 className="subtitle_color">DEFENSE</h6>
                  <h3 className={getStyleByKey("color")}>
                    {getStat("defense")}
                  </h3>
                </div>
                <div>
                  <h6 className="subtitle_color">SPEED</h6>
                  <h3 className={getStyleByKey("color")}>{getStat("speed")}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </section>
  );
};

export const Pokedex = () => {
  const { pokeData, loadStatus } = useAPIPokemonList();

  const renderPokemons = () => {
    if (loadStatus === STATE_LOAD.SUCCEEDED)
      return pokeData.results.map((pokemon) => (
        <PokemonCard url={pokemon.url} key={pokemon.name} />
      ));
  };

  return (
    <div>
      <Header />
      <Searcher />
      <PokemonCardWrapper>{renderPokemons()}</PokemonCardWrapper>
    </div>
  );
};
