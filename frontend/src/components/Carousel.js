import React, { useState } from 'react';
import { Carousel, Container } from 'react-bootstrap'
import './Categories.css'


function ControlledCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Container className="p-1">
            <div className="Carouselbg">
                <div className='pt-4 carousel' >
                    <Carousel activeIndex={index} onSelect={handleSelect} >
                        <Carousel.Item>
                            <img
                                className="d-block w-70 img"
                                src="/images/59c152f99803c51e008b781b.jpeg"
                                alt="First slide"
                            // height="300px"
                            // width="200px"

                            />

                            <Carousel.Caption>
                                <h3 className="text-white">NIKE,ADIDAS & PUMA</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item>
                            <img
                                className="d-block w-90 img"
                                src="/images/MR-Future-Products-2020-2.png"
                                alt="Second slide"
                            // height="300px"
                            // width="200px"
                            />

                            <Carousel.Caption>
                                <h3 className="text-white">MacBook Pro</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-90 img"
                                src="/images/20217-leggings-clothing-dancer-sportswear-trousers-4216x2529.jpg"
                                alt="Third slide"
                            // height="300px"
                            />

                            <Carousel.Caption>
                                <h3 className="text-white">NIKE LEGGINGS</h3>
                                <p>
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        </Container>
    );
}

export default ControlledCarousel;
