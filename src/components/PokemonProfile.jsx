import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/PokemonProfile.css";
import { cardBackgoundStyle, capitalize } from "../utils";
import { ArrowBack } from "@mui/icons-material";
import { Fab, Skeleton } from "@mui/material";
import Header from "./Header";
import Back from "./Back";
import imgPokeballWire from "../assets/img/pokeball_wire.svg";
import PokemonProfile2 from "./PokemonProfile2";

const ProgressBars = ({ stat }) => {
    const [beforeAnimation, setBeforeAnimation] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            //setBeforeAnimation((stat?.base_state * 100) / 250);
            const realValue = (stat.base_stat * 100) / 250;

            setBeforeAnimation(realValue);
        }, 500);
    }, []);

    const calculateWidthByStat = () => {
        const total = (beforeAnimation * 100) / 250;
        return total + "%";
    };

    return (
        <div className="stat-container">
            <div className="properties-stats-container">
                <h3>{stat.stat.name}</h3>
                <h3>{stat.base_stat}/250</h3>
            </div>
            <div className="posible-bar-stat">
                <div
                    className="bar-stat bar-animation "
                    style={{
                        width: `${beforeAnimation}%`,
                    }}
                ></div>
            </div>
        </div>
    );
};

const PokemonProfile = () => {
    const name = useParams("name").name;
    const [pokemon, setPokemon] = useState({});
    const navigate = useNavigate();
    const [isChargin, setIsChargin] = useState(true);
    const [imgLoaded, setImgLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const imageLoaded = (e) => {
        setIsLoading(!e.target.complete);
    };

    useEffect(() => {
        if (name) {
            axios
                .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
                .then((res) => {
                    setIsChargin(false);
                    setPokemon(res.data);
                })
                .catch(() => {
                    navigate("/pokedex");
                });
        }
    }, []);
    useEffect(() => {
        // var pokeImg = new Image
        // pokeImg.src = pokemon.sprites?.other["official-artwork"]["front_default"]
        // pokeImg.onload = function () {
        //     setTimeout(() => {
        //         setImgLoaded(true)
        //     }, 250);
        //     //imgContainer.innerHTML = "<img src='images/test.png'>";
        // };
    }, [pokemon]);

    const getStyleByKey = (key, type) => {
        if (pokemon) {
            return cardBackgoundStyle[type ? type : pokemon?.types[0].type.name][key];
        } else {
            return cardBackgoundStyle["normal"][key];
        }
    };

    const getStyleByKeyType = (key) => {
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

                    <section className="pokemon-profile__container">
                        <Back />
                        <article className="pokemon-profile_main-container box-shadow">
                            <div
                                className={`pokemon-profile__img-container ${getStyleByKey(
                                    "background"
                                )}`}
                            >
                                {/* imagen pokemon */}
                                <img
                                    onLoad={imageLoaded}
                                    className="pokemon-profile__img"
                                    src={
                                        pokemon.sprites?.other["official-artwork"]["front_default"]
                                    }
                                    alt={pokemon.name}
                                />

                                {isLoading && (
                                    <Skeleton
                                        className="imgProfile"
                                        variant="circular"
                                        width={440}
                                        height={440}
                                        sx={{ bgcolor: "grey.400" }}
                                    />
                                )}
                            </div>
                            {/* datos generales */}
                            <h2 className="pokemon-profile__h1_id">#{pokemon.id}</h2>
                            <div className="pokemos-profile__h1-container">
                                <h1 className="pokemon-profile__h1_name">{pokemon.name}</h1>
                            </div>
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
                            {/* tipos y habilidades */}
                            <ul className="pokemon-profile__skills1">
                                <li>
                                    <ul>
                                        <li>
                                            <h2>Type</h2>
                                        </li>
                                        <li>
                                            <ul className="tags-grids">
                                                {pokemon.types.map((type) => (
                                                    //pendiente poner color segun la clase
                                                    <li key={type.type.name}>
                                                        <div
                                                            title="cosa"
                                                            className={`tags-type ${getStyleByKey(
                                                                "background",
                                                                type.type.name
                                                            )}`}
                                                        >
                                                            {type.type.name}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <ul>
                                        <li>
                                            <h2>Skills</h2>
                                        </li>
                                        <li>
                                            <ul className="tags-grids">
                                                {pokemon.abilities.map((skill) => (
                                                    //pendiente poner color segun la clase
                                                    <li key={skill.ability.name}>
                                                        <div>{skill.ability.name}</div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            {/* titulo stats */}
                            <div className="pokemon-profile__stats-title">
                                <h2 className="pokemon-profile__h1_name pokemon-profile__stats-title__h1">
                                    Stats
                                </h2>
                                <img src={imgPokeballWire} alt="pokeball wire" />
                            </div>

                            {/* aqui estan las barras de stats */}
                            <section className="stats-section">
                                <div className="stats-container">
                                    {pokemon.stats.map((stat, index) => (
                                        <ProgressBars key={stat.stat.name + index} stat={stat} />
                                    ))}
                                </div>
                            </section>
                        </article>
                        {/* seccion movimientos que puede aprender el pokemon */}
                        <section className="moves-section-container">
                            <div className="pokemon-profile__stats-title">
                                <h1 className="pokemon-profile__h1_name pokemon-profile__stats-title__h1">
                                    Movements
                                </h1>
                                <img src={imgPokeballWire} alt="pokeball wire" />
                            </div>
                            {pokemon.moves.map((move, index) => (
                                <div
                                    key={move[0]?.move.name + index.toString()}
                                    className="move-card"
                                >
                                    <p>{move.move.name}</p>
                                </div>
                            ))}
                        </section>
                    </section>
                </div>
            )}
        </div>
    );
};

export default PokemonProfile;