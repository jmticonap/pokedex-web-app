import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/PokemonProfile.css";
import { cardBackgoundStyle, capitalize } from "../utils";
import { ArrowBack } from "@mui/icons-material";
import { Fab, Skeleton } from "@mui/material";
import Header from "./Header";
import Back from "./Back";
import PokemonProfile2 from './PokemonProfile2'

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
    const [imgLoaded, setImgLoaded] = useState(false)

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
    }, [pokemon])

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
                    <Back />

                    
                    <main className="main-profile-container">
                        <div className="card-profile-primary">
                            <div className={`background-poke ${getStyleByKey("background")}`}>
                                
                                        <img                                        
                                            className="imgProfile"
                                            src={pokemon.sprites?.other["official-artwork"]["front_default"]}
                                            alt={name} />

                                        <Skeleton 
                                            className="imgProfile"
                                            variant="circular" 
                                            width={440} 
                                            height={440} 
                                            sx={{ bgcolor: 'grey.400' }} />
                                

                            </div>

                            <section className="info-profile">
                                <div className="data1-profile">
                                    <h2 className="title2-profile">#{pokemon.id}</h2>
                                    <hr className="hr-absolute" />
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
                                                    <div key={skill.ability.name}>
                                                        {skill.ability.name}
                                                    </div>
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
                                        <ProgressBars key={stat.stat.name} stat={stat} />
                                    ))}
                                </div>
                            </section>
                        </div>
                        <section className="moves-section-container">
                            {pokemon.moves.map((move) => (
                                <div key={move[0]?.move.url} className="move-card">
                                    <p>{move.move.name}</p>
                                </div>
                            ))}
                        </section>
                    </main>
                </div>
            )}
        </div>
    );
};

export default PokemonProfile;