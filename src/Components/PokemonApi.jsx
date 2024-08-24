import { useEffect, useState } from "react";
import '../App.css'
import PokemonCards from "./PokemonCards";
import Loader from "./Loader";


const PokemonApi = () => {
    const API = "https://pokeapi.co/api/v2/pokemon?limit=124";
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const FetchAPI = async () => {
        try {
            const res = await fetch(API);
            const data = await res.json(); // Await here to ensure we get the parsed JSON data
            
            const detailedPokemonData = await Promise.all(
                data.results.map(async (curPokemon) => {
                    const res = await fetch(curPokemon.url);
                    const data = await res.json();
                    return data;
                })
            );

            setPokemon(detailedPokemonData);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        FetchAPI();
    }, []);

    if (loading) {
        return <div className="w-full h-screen"><Loader /></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex items-center justify-center flex-col">
            <h1>Pokemon List</h1>
            <div className="flex flex-wrap justify-center gap-6 items-center" id="card">
    {pokemon.map((currData) => (
        <PokemonCards key={currData.id} pokemonData={currData}/>
    ))}
</div>

        </div>
    );
};

export default PokemonApi;
