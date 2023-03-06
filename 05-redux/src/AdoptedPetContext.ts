import { createContext } from "react";
import { Pet } from "./APIResponsesTypes";

const AdoptedPetContext = createContext<[Pet | null, (adopted: Pet) => void]>([
    {
        id: 1227,
        name: "Fido",
        animal: "dog",
        description: "Lorem ipsum",
        breed: "Beagre",
        images: [],
        city: "Seattle",
        state: "WA"
    },
    () => {}
]);

export default AdoptedPetContext;
