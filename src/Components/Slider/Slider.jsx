import React, { useEffect } from 'react';
import './Slider.css';

const Slider = () => {
    useEffect(() => {
        var swiper = new Swiper('.blog-slider', {
            spaceBetween: 30,
            effect: 'fade',
            loop: true,
            mousewheel: {
                invert: false,
            },
            // autoHeight: true,
            pagination: {
                el: '.blog-slider__pagination',
                clickable: true,
            },
        });
    }, []);
    return (
        <div className="container my-5">
            <div className="blog-slider">
                <div className="blog-slider__wrp swiper-wrapper">
                    <div className="blog-slider__item swiper-slide">
                        <div className="blog-slider__img">
                            <img
                                src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759872/kuldar-kalvik-799168-unsplash.webp"
                                alt=""
                            />
                        </div>
                        <div className="blog-slider__content">
                            <span className="blog-slider__code">
                                15 June 2023
                            </span>
                            <div className="blog-slider__title">Sponsored</div>
                            <div className="blog-slider__text">
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Recusandae voluptate
                                repellendus magni illo ea animi?{' '}
                            </div>
                            <a href="#" className="blog-slider__button">
                                Go There
                            </a>
                        </div>
                    </div>
                    <div className="blog-slider__item swiper-slide">
                        <div className="blog-slider__img">
                            <img
                                src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759871/jason-leung-798979-unsplash.webp"
                                alt=""
                            />
                        </div>
                        <div className="blog-slider__content">
                            <span className="blog-slider__code">
                                15 June 2023
                            </span>
                            <div className="blog-slider__title">
                                Sponsored 2
                            </div>
                            <div className="blog-slider__text">
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Recusandae voluptate
                                repellendus magni illo ea animi?
                            </div>
                            <a href="#" className="blog-slider__button">
                                Go There
                            </a>
                        </div>
                    </div>

                    <div className="blog-slider__item swiper-slide">
                        <div className="blog-slider__img">
                            <img
                                src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759871/alessandro-capuzzi-799180-unsplash.webp"
                                alt=""
                            />
                        </div>
                        <div className="blog-slider__content">
                            <span className="blog-slider__code">
                                15 June 2023
                            </span>
                            <div className="blog-slider__title">
                                Sponsored 3
                            </div>
                            <div className="blog-slider__text">
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Recusandae voluptate
                                repellendus magni illo ea animi?
                            </div>
                            <a href="#" className="blog-slider__button">
                                Go There
                            </a>
                        </div>
                    </div>
                </div>
                <div className="blog-slider__pagination"></div>
            </div>
        </div>
    );
};

export default Slider;
