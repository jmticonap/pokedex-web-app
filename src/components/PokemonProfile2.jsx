import React from 'react';
import imgPokeballWire from '../assets/img/pokeball_wire.svg'
import './css/PokemonProfile2.css'
import './css/PokemonCard.css'


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
    return (
        <section className='pokemon-profile__container'>
            <article className='pokemon-profile_main-container box-shadow'>
                <div className='pokemon-profile__img-container plant_background__header'>
                    <img className='pokemon-profile__img' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png" alt="" />
                </div>
                <h1 className='pokemon-profile__h1_id'>#1</h1>
                <div className='pokemos-profile__h1-container'>
                    <h1 className='pokemon-profile__h1_name'>Bulbasaur</h1>
                </div>
                <ul className='pokemon-profile__feature'>
                    <li>
                        <ul>
                            <li><h5>Peso</h5></li>
                            <li><span>69</span></li>
                        </ul>
                    </li>
                    <li>
                        <ul>
                            <li><h5>Altura</h5></li>
                            <li><span>7</span></li>
                        </ul>
                    </li>
                </ul>
                <ul className='pokemon-profile__skills1'>
                    <li>
                        <ul>
                            <li>
                                <h2>Tipo</h2>
                            </li>
                            <li>
                                <ul className='tags-grids'>
                                    <li><div>Planta</div></li>
                                    <li><div>Venenoso</div></li>
                                    <li><div>Planta</div></li>
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
    );
};

export default PokemonProfile2;