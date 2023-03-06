import { useGetBreedsQuery } from "./PetApiService";

export default function useBreedList(animal) {
    const { data: breeds, isLoading } = useGetBreedsQuery(animal, {
        skip: !animal,
    });
    if (!animal) {
        return [[], "loaded"];
    }
    return [breeds ?? [], isLoading ? "loading" : "loaded"];
}
