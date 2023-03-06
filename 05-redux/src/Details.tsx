import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdoptedPetContext from "./AdoptedPetContext";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";

const Details = () => {
    const { id } = useParams();

    if (!id) {
        throw new Error("Details: Give me an ID!");
    }

    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unused-vars
    const [_, setAdoptedPet] = useContext(AdoptedPetContext);
    const results = useQuery(["details", id], fetchPet);

    if (results.isLoading) {
        return (
            <div className="loading-pane">
                <h2 className="loader">🧿</h2>
            </div>
        );
    }

    const pet = results?.data?.pets[0];
    if (!pet) {
        throw new Error("There is no pet with ID: " + id);
    }
    return (
        <div className="details">
            <Carousel images={pet.images} />
            <div>
                <h1>{pet.name}</h1>
                <h2>
                    {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
                    <button onClick={() => setShowModal(true)}>
                        Adopt {pet.name}
                    </button>
                    <p>{pet.description}</p>
                    {showModal ? (
                        <Modal>
                            <div>
                                <h1>Would you like to adopt {pet.name}?</h1>
                                <div className="buttons">
                                    <button
                                        onClick={() => {
                                            setAdoptedPet(pet);
                                            navigate("/");
                                        }}
                                    >
                                        Yes
                                    </button>
                                    <button onClick={() => setShowModal(false)}>
                                        No
                                    </button>
                                </div>
                            </div>
                        </Modal>
                    ) : null}
                </h2>
            </div>
        </div>
    );
};

function DetailsErrorBoundary() {
    //it is the only case when you use the chain operator to pass props
    return (
        <ErrorBoundary>
            <Details />
        </ErrorBoundary>
    );
}

export default DetailsErrorBoundary;
