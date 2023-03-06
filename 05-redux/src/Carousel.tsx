import { Component, MouseEvent } from "react";

interface IProps {
    images: string[];
}

// CAN'T USE HOOKS, IF YOU WANT TO USE HOOKS NEED TO CREATE A FUNCTION COMPONENT AS BRIDGE
class Carousel extends Component<IProps> {
    state = {
        active: 0,
    };

    static defaultProps = {
        images: ["https://pets-images.dev-apis.com/pets/none.jpg"],
    };

    handleIndexClick = (event: MouseEvent<HTMLElement>) => {
        if (!(event.target instanceof HTMLElement)) {
            return;
        }
        if (event.target.dataset.index) {
            this.setState({
                active: +event.target.dataset.index,
            });
        }
    };

    render() {
        const { active } = this.state;
        const { images } = this.props;

        return (
            <div className="carousel">
                <img src={images[active]} alt="animal hero" />
                <div className="carousel-smaller">
                    {images.map((photo, index) => (
                        // eslint-disable-next-line
                        <img
                            onClick={this.handleIndexClick}
                            data-index={index}
                            key={photo}
                            src={photo}
                            className="{index === active ? 'active' : ''}"
                            alt="animal thumbnail"
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default Carousel;
