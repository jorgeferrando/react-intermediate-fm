import { Component } from "react";

// CAN'T USE HOOKS, IF YOU WANT TO USE HOOKS NEED TO CREATE A FUNCTION COMPONENT AS BRIDGE
class Carousel extends Component {
    state = {
        active: 0,
    };

    static defaultProps = {
        images: ["https://pets-images.dev-apis.com/pets/none.jpg"],
    };

    handleIndexClick = (e) => {
        this.setState({
            active: +e.target.dataset.index,
        });
    };

    render() {
        const { active } = this.state;
        const { images } = this.props;

        return (
            <div className="carousel">
                <img
                    data-testid="hero"
                    src={images[active]}
                    alt="animal hero"
                />
                <div className="carousel-smaller">
                    {images.map((photo, index) => (
                        // eslint-disable-next-line
                        <img
                            onClick={this.handleIndexClick}
                            data-index={index}
                            data-testid={`thumbnail${index}`}
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
