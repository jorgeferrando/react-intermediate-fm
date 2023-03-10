import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetPetQuery } from "./PetApiService";
import { adopt } from "./AdoptedPetSlice";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";

const Details = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { isLoading, data: pet } = useGetPetQuery(id);
    const dispatch = useDispatch();

    if (isLoading) {
        return (
            <div className="loading-pane">
                <h2 className="loader">🧿</h2>
            </div>
        );
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
                                            dispatch(adopt(pet));
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

function DetailsErrorBoundary(props) {
    //it is the only case when you use the chain operator to pass props
    return (
        <ErrorBoundary>
            <Details {...props} />
        </ErrorBoundary>
    );
}

export default DetailsErrorBoundary;
