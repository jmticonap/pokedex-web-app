import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/PokemonProfile.css";
import { cardBackgoundStyle, capitalize } from "../../utils";
import "../css/PokemonCard.css";
import Header from "../Header/Header";

export const PokemonProfile = () => {
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
          </div>
        </div>
      )}
    </div>
  );
};
