import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/pokemonProfile.css";
import { cardBackgoundStyle, capitalize } from "../utils";

import Header from "./Header";

const PokemonProfile = () => {
  const name = useParams("name").name;
  const [pokemon, setPokemon] = useState({});
  const navigate = useNavigate();
  const [isChargin, setIsChargin] = useState(true);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => {
        setIsChargin(false);
        setPokemon(res.data);
      })
      .catch(() => {
        navigate("/pokedex");
      });
  }, []);

  const getStyleByKey = (key) => {
    if (pokemon) {
      return cardBackgoundStyle[pokemon?.types[0].type.name][key];
    } else {
      return cardBackgoundStyle["normal"][key];
    }
  };
  console.log(pokemon);
  const calculateWidthByStat = (base_state) => {
    const total = (base_state * 100) / 250;
    return total + "%";
  };

  return (
    <div>
      {isChargin ? (
        <div className="loader-container">
          <img
            src="https://img1.picmix.com/output/stamp/normal/0/9/0/4/1604090_a14a5.gif"
            className="chargin-gi"
            alt={name + "Picture"}
          />
        </div>
      ) : (
        <div>
          <Header />

          <div className="card-profile-primary">
            <div className={`background-poke ${getStyleByKey("background")}`}>
              <img
                className="imgProfile"
                src={
                  pokemon.sprites?.other["official-artwork"]["front_default"]
                }
                alt={name}
              />
            </div>
            <section className="info-profile">
              <div className="data1-profile">
                <h2 className="title2-profile">#{pokemon.id}</h2>
                <h1 className="title-profile">{pokemon.name}</h1>

                <div className="data-profile">
                  <div>
                    <h4 className="sub-title-profile">Weight</h4>
                    <p>{pokemon.weight}</p>
                  </div>
                  <div>
                    <h4 className="sub-title-profile">Height</h4>
                    <p>{pokemon.height}</p>
                  </div>
                </div>
                <div className="data2-profile">
                  <div className="types-profile-container">
                    <h3 className="title3-profile">Type</h3>
                    <div className="types-profile">
                      {pokemon.types.map((type) => (
                        //pendiente poner color segun la clase
                        <div key={type.type.name}>{type.type.name}</div>
                      ))}
                    </div>
                  </div>

                  <div className="hability-profile-container">
                    <h3 className="title3-profile">Skills</h3>
                    <div className="types-profile">
                      {pokemon.abilities.map((skill) => (
                        //pendiente poner color segun la clase
                        <div key={skill.ability.name}>{skill.ability.name}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="stats-section">
              <h2>
                Stats <hr />
              </h2>
              <div className="stats-container">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className="stat-container">
                    <div className="properties-stats-container">
                      <h3>{stat.stat.name}</h3>
                      <h3>{stat.base_stat}/250</h3>
                    </div>
                    <div className="posible-bar-stat">
                      <div
                        className="bar-stat bar-animation "
                        style={{
                          width: calculateWidthByStat(stat.base_stat),
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonProfile;
