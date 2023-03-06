var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import { createContext, useState, useContext, Component, useRef, useEffect } from "react";
import { Link, useNavigate, useParams, Routes, Route } from "react-router-dom";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as jsxRuntime from "react/jsx-runtime";
import { createPortal } from "react-dom";
const AdoptedPetContext = createContext();
const jsx = jsxRuntime.jsx;
const jsxs = jsxRuntime.jsxs;
const Pet = ({
  name,
  animal,
  breed,
  images,
  location,
  id
}) => {
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    hero = images[0];
  }
  return /* @__PURE__ */ jsxs(Link, {
    to: `/details/${id}`,
    className: "pet",
    children: [/* @__PURE__ */ jsx("div", {
      className: "image-container",
      children: /* @__PURE__ */ jsx("img", {
        src: hero,
        alt: name
      })
    }), /* @__PURE__ */ jsxs("div", {
      className: "info",
      children: [/* @__PURE__ */ jsx("h1", {
        children: "Name"
      }), /* @__PURE__ */ jsxs("h2", {
        children: [animal, " - ", breed, " - ", location]
      })]
    })]
  });
};
const Results = ({
  pets
}) => {
  return /* @__PURE__ */ jsx("div", {
    className: "search",
    children: !pets.length ? /* @__PURE__ */ jsx("h1", {
      children: "No Pets Found"
    }) : pets.map((pet) => /* @__PURE__ */ jsx(Pet, {
      id: pet.id,
      animal: pet.animal,
      name: pet.name,
      breed: pet.breed,
      images: pet.images,
      location: `${pet.city}, ${pet.state}`
    }, pet.id))
  });
};
const fetchBreedList = async ({ queryKey }) => {
  const animal = queryKey[1];
  if (!animal) {
    return [];
  }
  const apiRes = await fetch(
    `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
  );
  if (!apiRes.ok) {
    throw new Error(`breeds/${animal} fetch not ok`);
  }
  return apiRes.json();
};
function useBreedList(animal) {
  var _a, _b;
  const results = useQuery(["breeds", animal], fetchBreedList);
  return [(_b = (_a = results == null ? void 0 : results.data) == null ? void 0 : _a.breeds) != null ? _b : [], results.status];
}
async function fetchSearch({ queryKey }) {
  const { animal, location, breed } = queryKey[1];
  const res = await fetch(
    `https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  );
  if (!res.ok) {
    throw new Error(
      `pet search not ok with query => ?animal=${animal}&location=${location}&breed=${breed}`
    );
  }
  return res.json();
}
const ANIMALS = ["dog", "bird", "cat", "rabbit", "reptile"];
const SearchParams = () => {
  var _a, _b;
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: ""
  });
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);
  const [adoptedPet] = useContext(AdoptedPetContext);
  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = (_b = (_a = results == null ? void 0 : results.data) == null ? void 0 : _a.pets) != null ? _b : [];
  return /* @__PURE__ */ jsxs("div", {
    className: "search-params",
    children: [/* @__PURE__ */ jsxs("form", {
      onSubmit: (e) => {
        var _a2, _b2, _c;
        e.preventDefault();
        const formData = new FormData(e.target);
        const obj = {
          animal: (_a2 = formData.get("animal")) != null ? _a2 : "",
          breed: (_b2 = formData.get("breed")) != null ? _b2 : "",
          location: (_c = formData.get("location")) != null ? _c : ""
        };
        setRequestParams(obj);
      },
      children: [adoptedPet ? /* @__PURE__ */ jsx("div", {
        className: "pet image-container",
        children: /* @__PURE__ */ jsx("img", {
          src: adoptedPet.images[0],
          alt: adoptedPet.name
        })
      }) : null, /* @__PURE__ */ jsxs("label", {
        htmlFor: "location",
        children: ["Location", /* @__PURE__ */ jsx("input", {
          id: "location",
          placeholder: "Location",
          name: "location"
        })]
      }), /* @__PURE__ */ jsxs("label", {
        htmlFor: "animal",
        children: ["Animal", /* @__PURE__ */ jsxs("select", {
          id: "animal",
          name: "animal",
          value: animal,
          onChange: (e) => setAnimal(e.target.value),
          children: [/* @__PURE__ */ jsx("option", {}), ANIMALS.map((a) => /* @__PURE__ */ jsx("option", {
            children: a
          }, a))]
        })]
      }), /* @__PURE__ */ jsxs("label", {
        htmlFor: "breed",
        children: ["Breed", /* @__PURE__ */ jsxs("select", {
          id: "breed",
          disabled: breeds.length === 0,
          name: "breed",
          children: [/* @__PURE__ */ jsx("option", {}), breeds.map((a) => /* @__PURE__ */ jsx("option", {
            children: a
          }, a))]
        })]
      }), /* @__PURE__ */ jsx("button", {
        children: "Submit"
      })]
    }), /* @__PURE__ */ jsx(Results, {
      pets
    })]
  });
};
const fetchPet = async ({ queryKey }) => {
  const id = queryKey[1];
  const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);
  if (!apiRes.ok) {
    throw new Error(`details/${id} fetch not ok`);
  }
  return apiRes.json();
};
class Carousel extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "state", {
      active: 0
    });
    __publicField(this, "handleIndexClick", (e) => {
      this.setState({
        active: +e.target.dataset.index
      });
    });
  }
  render() {
    const {
      active
    } = this.state;
    const {
      images
    } = this.props;
    return /* @__PURE__ */ jsxs("div", {
      className: "carousel",
      children: [/* @__PURE__ */ jsx("img", {
        src: images[active],
        alt: "animal hero"
      }), /* @__PURE__ */ jsx("div", {
        className: "carousel-smaller",
        children: images.map((photo, index) => /* @__PURE__ */ jsx("img", {
          onClick: this.handleIndexClick,
          "data-index": index,
          src: photo,
          className: "{index === active ? 'active' : ''}",
          alt: "animal thumbnail"
        }, photo))
      })]
    });
  }
}
__publicField(Carousel, "defaultProps", {
  images: ["https://pets-images.dev-apis.com/pets/none.jpg"]
});
class ErrorBoundary extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "state", {
      hasError: false
    });
  }
  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsxs("h2", {
        children: ["There was an error with this listing.", " ", /* @__PURE__ */ jsx(Link, {
          to: "/",
          children: "Click here"
        }), " to back to the home page."]
      });
    }
    return this.props.children;
  }
}
const Modal = ({
  children
}) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }
  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);
    return () => modalRoot.removeChild(elRef.current);
  }, []);
  return createPortal(/* @__PURE__ */ jsx("div", {
    children
  }), elRef.current);
};
const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);
  const {
    id
  } = useParams();
  const results = useQuery(["details", id], fetchPet);
  if (results.isLoading) {
    return /* @__PURE__ */ jsx("div", {
      className: "loading-pane",
      children: /* @__PURE__ */ jsx("h2", {
        className: "loader",
        children: "\u{1F9FF}"
      })
    });
  }
  const pet = results.data.pets[0];
  return /* @__PURE__ */ jsxs("div", {
    className: "details",
    children: [/* @__PURE__ */ jsx(Carousel, {
      images: pet.images
    }), /* @__PURE__ */ jsxs("div", {
      children: [/* @__PURE__ */ jsx("h1", {
        children: pet.name
      }), /* @__PURE__ */ jsxs("h2", {
        children: [pet.animal, " - ", pet.breed, " - ", pet.city, ", ", pet.state, /* @__PURE__ */ jsxs("button", {
          onClick: () => setShowModal(true),
          children: ["Adopt ", pet.name]
        }), /* @__PURE__ */ jsx("p", {
          children: pet.description
        }), showModal ? /* @__PURE__ */ jsx(Modal, {
          children: /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsxs("h1", {
              children: ["Would you like to adopt ", pet.name, "?"]
            }), /* @__PURE__ */ jsxs("div", {
              className: "buttons",
              children: [/* @__PURE__ */ jsx("button", {
                onClick: () => {
                  setAdoptedPet(pet);
                  navigate("/");
                },
                children: "Yes"
              }), /* @__PURE__ */ jsx("button", {
                onClick: () => setShowModal(false),
                children: "No"
              })]
            })]
          })
        }) : null]
      })]
    })]
  });
};
function DetailsErrorBoundary(props) {
  return /* @__PURE__ */ jsx(ErrorBoundary, {
    children: /* @__PURE__ */ jsx(Details, {
      ...props
    })
  });
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity
    }
  }
});
const App = () => {
  const adoptedPetHook = useState(null);
  return /* @__PURE__ */ jsx(QueryClientProvider, {
    client: queryClient,
    children: /* @__PURE__ */ jsxs(AdoptedPetContext.Provider, {
      value: adoptedPetHook,
      children: [/* @__PURE__ */ jsx("header", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "/",
          children: "Adopt ME!"
        })
      }), /* @__PURE__ */ jsx("div", {
        children: /* @__PURE__ */ jsxs(Routes, {
          children: [/* @__PURE__ */ jsx(Route, {
            path: "/details/:id",
            element: /* @__PURE__ */ jsx(DetailsErrorBoundary, {})
          }), /* @__PURE__ */ jsx(Route, {
            path: "/",
            element: /* @__PURE__ */ jsx(SearchParams, {})
          })]
        })
      })]
    })
  });
};
function render(url, opts) {
  const stream = renderToPipeableStream(/* @__PURE__ */ jsx(StaticRouter, {
    location: url,
    children: /* @__PURE__ */ jsx(App, {})
  }), opts);
  return stream;
}
export {
  render as default
};
