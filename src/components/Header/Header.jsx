import React from "react";
import pokedexImg from "../../assets/img/pokedex.png";
const Header = () => {
  return (
    <header className="header-pokedex">
      <div className="pokedex-header-back">
        <img src={pokedexImg} className="img-pokedex-header" alt="" />
      </div>
    </header>
  );
};

export default Header;
