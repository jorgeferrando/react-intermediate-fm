import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchQuery } from "./PetApiService";
import Results from "./Results";
import useBreedList from "./useBreedList";
import { all } from "./SearchParamsSlice";

const ANIMALS = ["dog", "bird", "cat", "rabbit", "reptile"];

const SearchParams = () => {
    const adoptedPet = useSelector((state) => state.adoptedPet.value);
    const searchParams = useSelector((state) => state.searchParams.value);
    const [animal, setAnimal] = useState("");
    const [breeds] = useBreedList(animal);
    const dispatch = useDispatch();

    let { data: pets } = useSearchQuery(searchParams);
    pets = pets ?? [];

    return (
        <div className="search-params">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const obj = {
                        animal: formData.get("animal") ?? "",
                        breed: formData.get("breed") ?? "",
                        location: formData.get("location") ?? "",
                    };
                    dispatch(all(obj));
                }}
            >
                {adoptedPet ? (
                    <div className="pet image-container">
                        <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
                    </div>
                ) : null}
                <label htmlFor="location">
                    Location
                    <input
                        id="location"
                        placeholder="Location"
                        name="location"
                    />
                </label>
                <label htmlFor="animal">
                    Animal
                    <select
                        id="animal"
                        name="animal"
                        value={animal}
                        onChange={(e) => setAnimal(e.target.value)}
                    >
                        <option />
                        {ANIMALS.map((a) => (
                            <option key={a}>{a}</option>
                        ))}
                    </select>
                </label>
                <label htmlFor="breed">
                    Breed
                    <select
                        id="breed"
                        disabled={breeds.length === 0}
                        name="breed"
                    >
                        <option />
                        {breeds.map((a) => (
                            <option key={a}>{a}</option>
                        ))}
                    </select>
                </label>
                <button>Submit</button>
            </form>

            <Results pets={pets} />
        </div>
    );
};

export default SearchParams;
