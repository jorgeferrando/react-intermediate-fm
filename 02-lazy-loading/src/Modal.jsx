import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
    const elRef = useRef(null);
    // if you initialize useRef() to document.createElement("div") by default it will be slower
    // all that starts with "document dot" it is slow and unperformant
    // so create arbitrary number of divs and cast away is not a good use of the CPU
    if (!elRef.current) {
        elRef.current = document.createElement("div");
    }

    useEffect(() => {
        const modalRoot = document.getElementById("modal");
        modalRoot.appendChild(elRef.current);

        // all returned in an effect will run when component unmounts
        return () => modalRoot.removeChild(elRef.current);
    }, []);

    return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
