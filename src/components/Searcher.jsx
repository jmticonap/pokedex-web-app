import { Autocomplete, Box, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import './css/Searcher.css'

export const Searcher = () => {
    const navigate = useNavigate();
    const [isSearching, setIsSearching] = useState(false);
    const [pokemonSearch, setPokemonSearch] = useState("");
    const [pokemonTypeList, setPokemonTypeList] = useState([])
    const [pokemonType, setPokemonType] = useState('*')
    const [names, setNames] = useState([]);

    const changePokemonTypeHandler = evt => {
        setPokemonType(evt.target.value)
    }

    const renderPokemonTypeItems = () => {
        if (pokemonTypeList.length > 0) {
            const _pokemonTypeList = [{ name: 'Explor All', url: '*' }, ...pokemonTypeList]
            return _pokemonTypeList
                .map(itm => (<MenuItem key={itm.name} value={itm.url}>{itm.name}</MenuItem>))
        }
    }

    const loadPokemonTypeList = async () => {
        const res = await axios.get('https://pokeapi.co/api/v2/type/')
        setPokemonTypeList([...res.data.results])
    }

    const searchPokemon = (pokemon) => {
        setIsSearching(true);
        if (!pokemon) {
            alert("primero escriba o seleccione el nombre del pokemon");
            setIsSearching(false);
        } else
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

    useEffect(() => {
        //Load pokemon type list
        loadPokemonTypeList()
        if (localStorage.getItem("arrayPokes")) {
            // cargamos los pokes desde el localStorage
            const LOCALPOKES = localStorage.getItem("arrayPokes");
            setNames(JSON.parse(LOCALPOKES));
        } else {
            // hacemos la petición a la api por primera vez
            axios
                .get(`https://pokeapi.co/api/v2/pokemon?limit=1200`)
                .then((res) => {
                    const f = res.data.results.map((item) => item.name);
                    localStorage.setItem("arrayPokes", JSON.stringify(f));
                    setNames([...f]);
                });
        }
    }, []);
    useEffect(() => {
        console.log(pokemonType)
        if (pokemonType != '*') {
            //Change global state [exploreBy]

        }
    }, [pokemonType])

    return (
        <section className="searcher-section">
            <h2>
                <span>Welcome {"Name"}</span> Here you can find your favorite pokemons!
            </h2>

            <div className="search-container">
                <div className="search-input-container shadow">
                    <Autocomplete
                        onChange={e => setPokemonSearch(e.target.innerText)}
                        disablePortal={true}
                        id="combo-box-demo"
                        options={names}
                        sx={{ width: 300, borderRadius: 0 }}
                        renderInput={(params) => <TextField {...params} label="name" />}
                    />
                    <button
                        onClick={() => searchPokemon(pokemonSearch)}
                        className="shadow btn"
                        disabled={isSearching}>
                        Search
                    </button>
                </div>
                <Box sx={{ boxShadow: '0px 3px 10px -2px rgba(0, 0, 0, 0.44)' }}>
                    <Select
                        sx={{ width: '450px' }}
                        id="pokemon-type-select"
                        value={pokemonType}
                        onChange={changePokemonTypeHandler}>
                        {renderPokemonTypeItems()}
                    </Select>
                </Box>
            </div>
        </section>
    );
};