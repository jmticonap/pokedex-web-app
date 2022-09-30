import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import imgPokeballWire from '../assets/img/pokeball_wire.svg'
import './css/PokemonProfile2.css'
import './css/PokemonCard.css'
import { useParams } from 'react-router-dom';
import Header from "./Header";
import Back from "./Back";


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
        <ul className='flex-column_0_5 stat__progress__bar-control'>
            <li className='progress-container__label'>
                <p>{stat.stat.name}:</p>
                <span>{stat.base_stat}/250</span>
            </li>
            <li>
                <div className='progress-container'>
                    <div style={{ width: `${beforeAnimation}%` }} className='progress-bar'></div>
                </div>
            </li>
        </ul>
    );
};

const PokemonProfile2 = () => {
    const name = useParams("name").name;
    const [pokemon, setPokemon] = useState({});
    const navigate = useNavigate();
    const [isChargin, setIsChargin] = useState(true);
    const [imgLoaded, setImgLoaded] = useState(false)

    useEffect(() => {

        
    }, []);
    useEffect(() => {
        var pokeImg = new Image
        pokeImg.src = pokemon.sprites?.other["official-artwork"]["front_default"]

        pokeImg.onload = function () {
            setTimeout(() => {
                setImgLoaded(true)
            }, 250);
            //imgContainer.innerHTML = "<img src='images/test.png'>";
        };
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
            <Header />
            <Back />

            <section className='pokemon-profile__container'>
                <article className='pokemon-profile_main-container box-shadow'>
                    <div className='pokemon-profile__img-container plant_background__header'>
                        <img
                            className='pokemon-profile__img'
                            src={pokemon.sprites?.other["official-artwork"]["front_default"]} alt="" />
                    </div>
                    <h1 className='pokemon-profile__h1_id'>#{pokemon.id}</h1>
                    <div className='pokemos-profile__h1-container'>
                        <h1 className='pokemon-profile__h1_name'>{pokemon.name}</h1>
                    </div>
                    <ul className='pokemon-profile__feature'>
                        <li>
                            <ul>
                                <li><h5>Weight</h5></li>
                                <li><span>{pokemon.weight}</span></li>
                            </ul>
                        </li>
                        <li>
                            <ul>
                                <li><h5>Height</h5></li>
                                <li><span>{pokemon.height}</span></li>
                            </ul>
                        </li>
                    </ul>
                    <ul className='pokemon-profile__skills1'>
                        <li>
                            <ul>
                                <li>
                                    <h2>Type</h2>
                                </li>
                                <li>
                                    <ul className='tags-grids'>
                                        {pokemon.types?.map((type) => (
                                            //pendiente poner color segun la clase
                                            <li><div>{type.type.name}</div></li>
                                        ))}
                                        <li><div>Venenoso</div></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <ul>
                                <li>
                                    <h2>Habilidades</h2>
                                </li>
                                <li>
                                    <ul className='tags-grids'>
                                        <li><div>Crecimiento</div></li>
                                        <li><div>Clorofila</div></li>
                                        <li><div>Crecimiento</div></li>
                                        <li><div>Clorofila</div></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div className='pokemon-profile__stats-title'>
                        <h1 className='pokemon-profile__h1_name pokemon-profile__stats-title__h1'>Stats</h1>
                        <img src={imgPokeballWire} alt='pokeball wire' />
                    </div>
                    <ul className='stat__progress__ul'>
                        <li>
                            <ul className='flex-column_0_5 stat__progress__bar-control'>
                                <li className='progress-container__label'>
                                    <p>HP:</p>
                                    <span>45/150</span>
                                </li>
                                <li>
                                    <div className='progress-container'>
                                        <div className='progress-bar'></div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <ul className='flex-column_0_5 stat__progress__bar-control'>
                                <li className='progress-container__label'>
                                    <p>Attack:</p>
                                    <span>49/150</span>
                                </li>
                                <li>
                                    <div className='progress-container'>
                                        <div className='progress-bar'></div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <ul className='flex-column_0_5 stat__progress__bar-control'>
                                <li className='progress-container__label'>
                                    <p>Defense:</p>
                                    <span>49/150</span>
                                </li>
                                <li>
                                    <div className='progress-container'>
                                        <div className='progress-bar'></div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <ul className='flex-column_0_5 stat__progress__bar-control'>
                                <li className='progress-container__label'>
                                    <p>Speed:</p>
                                    <span>49/150</span>
                                </li>
                                <li>
                                    <div className='progress-container'>
                                        <div className='progress-bar'></div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </article>
                <article className='pokemon-profile_main-container box-shadow movements-container'>
                    <div className='pokemon-profile__stats-title'>
                        <h1 className='pokemon-profile__h1_name pokemon-profile__stats-title__h1'>Movements</h1>
                        <img src={imgPokeballWire} alt='pokeball wire' />
                    </div>
                    <div className='movements-item-list'>
                        <span>Razor-wind</span>
                        <span>Cut</span>
                        <span>Bind</span>
                        <span>Head-butt</span>
                        <span>Toxic</span>
                        <span>Rage</span>
                        <span>Razor-wind</span>
                        <span>Cut</span>
                        <span>Bind</span>
                        <span>Head-butt</span>
                        <span>Toxic</span>
                        <span>Rage</span>
                    </div>
                </article>
            </section>
        </div>
    );
};

export default PokemonProfile2;