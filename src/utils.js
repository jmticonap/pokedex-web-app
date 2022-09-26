export const cardBackgoundStyle = {
    //Change
    normal: {
        color: 'plant_color',
        background: 'plant_background',
        head: 'plant_background__header'
    },
    fighting: {
        color: 'fighter_color',
        background: 'fighter_background',
        head: 'fighter_background__header'
    },
    flying: {
        color: 'flyer_color',
        background: 'flyer_background',
        head: 'flyer_background__header'
    },
    poison: {
        color: 'poisons_color',
        background: 'poisons_background',
        head: 'poisons_background__header'
    },
    ground: {
        color: 'terrestrial_color',
        background: 'terrestrial_background',
        head: 'terrestrial_background__header'
    },
    rock: {
        color: 'rock_color',
        background: 'rock_background',
        head: 'rock_background__header'
    },
    bug: {
        color: 'bug_color',
        background: 'bug_background',
        head: 'bug_background__header'
    },
    ghost: {
        color: 'ghost_color',
        background: 'ghost_background',
        head: 'ghost_background__header'
    },
    steel: {
        color: 'steel_color',
        background: 'steel_background',
        head: 'steel_background__header'
    },
    fire: {
        color: 'fire_color',
        background: 'fire_background',
        head: 'fire_background__header'
    },
    water: {
        color: 'watter_color',
        background: 'watter_background',
        head: 'watter_background__header'
    },
    grass: {
        color: 'plant_color',
        background: 'plant_background',
        head: 'plant_background__header'
    },
    electric: {
        color: 'electric_color',
        background: 'electric_background',
        head: 'electric_background__header'
    },
    //change
    psychic: {
        color: 'plant_color',
        background: 'plant_background',
        head: 'plant_background__header'
    },
    ice: {
        color: 'ice_color',
        background: 'ice_background',
        head: 'ice_background__header'
    },
    dragon: {
        color: 'dragon_color',
        background: 'dragon_background',
        head: 'dragon_background__header'
    },
    dark: {
        color: 'dark_color',
        background: 'dark_background',
        head: 'dark_background__header'
    },
    fairy: {
        color: 'magic_color',
        background: 'magic_background',
        head: 'magic_background__header'
    },
    //change
    unknown: {
        color: 'dark_color',
        background: 'dark_background',
        head: 'dark_background__header'
    },
    //change
    shadow: {
        color: 'dark_color',
        background: 'dark_background',
        head: 'dark_background__header'
    }
}

export const capitalize = (str) => {
    if (str)
        return str[0].toUpperCase() + str.slice(1, str.length)
}

export const getStat = (data, stat_name) => (
    data?.stats
        .find(itm => itm.stat.name === stat_name)['base_stat']
)

class DataSchema {
    constructor(
        id, 
        name, 
        types, 
        hp, 
        attack, 
        defense, 
        speed, 
        image) {
        this.id = id
        this.name = name
        this.types = types
        this.hp = hp
        this.attack = attack
        this.defense = defense
        this.speed = speed
        this.image = image
    }
}

export const localDb = {
    name: 'pokemon_page_data',
    data: [],
    loadData: () => {
        const str_db = window.localStorage.getItem(localDb.name)
        if (str_db) {
            const _data = JSON.parse(str_db)

            localDb.data = _data
            .map(i => new DataSchema(
                i.id,
                i.name,
                i.types,
                i.hp,
                i.attack,
                i.defense,
                i.speed,
                i.image
            ))
        }
        else
            window.localStorage.setItem(localDb.name, JSON.stringify([]))

        return localDb
    },
    append: item => {
        localDb.loadData()
        if (item.__proto__ === ([]).__proto__)
            localDb.data.push(...item)
        else
            localDb.data.push(item)

        window
            .localStorage
            .setItem(localDb.name, JSON.stringify(localDb.data))

        return localDb
    }
}