"use client";
import Drift from "drift-zoom";
import Image from "next/image";
import {useEffect, useMemo, useRef, useState} from "react";
import {Gallery, Item} from "react-photoswipe-gallery";
import {Navigation, Thumbs} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import {Swiper as SwiperType} from "swiper";

interface FirstImageProps {
    src: string;
}

interface SlideProps {
    src: string | FirstImageProps;
    width: number;
    height: number;
}

export default function SliderZoomOuter({id}:{id: number}) {

    const imageUrl = "http://localhost:8080/backend/products-images/"
    const imagePath = imageUrl + id
    const image1 = "/image1.png"
    const image2 = "/image2.png"
    const image3 = "/image3.png"
    const image4 = "/image4.png"


    const images = useMemo(
        () => [
            {
                id: 1,
                src: `${imagePath}${image1}`,
                alt: "",
                width: 770,
                height: 1075,
                dataValue: "beige",
            },
            {
                id: 2,
                src: `${imagePath}${image2}`,
                alt: "",
                width: 713,
                height: 1070,
                dataValue: "beige",
            },
            {
                id: 3,
                src: `${imagePath}${image3}`,
                alt: "img-compare",
                width: 713,
                height: 1070,
                dataValue: "beige",
            },
            {
                id: 4,
                src: `${imagePath}${image4}`,
                alt: "img-compare",
                width: 713,
                height: 1070,
                dataValue: "beige",
            },

        ],
        [imagePath]
    ); // Memoize based on firstImage, which can change
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const swiperRef = useRef<SwiperType | null>(null);
    // useEffect(() => {
    //     const slideIndex =
    //         images.filter(
    //             (elm) => elm.dataValue.toLowerCase() == currentColor.toLowerCase()
    //         )[0]?.id - 1;
    //     if (swiperRef.current) {
    //         swiperRef.current.slideTo(slideIndex);
    //     }
    // }, [currentColor, images]);

    useEffect(() => {
        // Function to initialize Drift
        const imageZoom = () => {
            const driftAll = Array.from(document.querySelectorAll(".tf-image-zoom"));

            driftAll.forEach((el) => {
                if (el instanceof HTMLElement) {
                    new Drift(el, {
                        zoomFactor: 2,
                        paneContainer: document.querySelector(
                            ".tf-zoom-main"
                        ) as HTMLElement,
                        inlinePane: 0,
                        handleTouch: false,
                        hoverBoundingBox: true,
                        containInline: true,
                    });
                }
            });
        };
        imageZoom();

        const zoomElements = document.querySelectorAll(".tf-image-zoom");

        const handleMouseOver = (event: MouseEvent) => {
            const target = event.target;
            if (target instanceof HTMLElement) {
                const parent = target.closest(".section-image-zoom");
                if (parent) {
                    parent.classList.add("zoom-active");
                }
            }
        };

        const handleMouseLeave = (event: MouseEvent) => {
            const target = event.target;
            if (target instanceof HTMLElement) {
                const parent = target.closest(".section-image-zoom");
                if (parent) {
                    parent.classList.remove("zoom-active");
                }
            }
        };

        zoomElements.forEach((element) => {
            element.addEventListener("mouseover", handleMouseOver as EventListener);
            element.addEventListener("mouseleave", handleMouseLeave as EventListener);
        });

        // Cleanup event listeners on component unmount
        return () => {
            zoomElements.forEach((element) => {
                element.removeEventListener(
                    "mouseover",
                    handleMouseOver as EventListener
                );
                element.removeEventListener(
                    "mouseleave",
                    handleMouseLeave as EventListener
                );
            });
        };
    }, []); // Empty dependency array to run only once on mount

    return (
        <>
            <Swiper
                dir="ltr"
                direction="vertical"
                spaceBetween={10}
                slidesPerView={6}
                className="tf-product-media-thumbs other-image-zoom"
                onSwiper={setThumbsSwiper}
                modules={[Thumbs]}
                breakpoints={{
                    0: {
                        direction: "horizontal",
                    },
                    1150: {
                        direction: "vertical",
                    },
                }}
            >
                {images.map((slide, index) => (
                    <SwiperSlide key={index} className="stagger-item">
                        <div className="item">
                            <Image
                                className="lazyload"
                                data-src={slide.src}
                                alt={""}
                                src={slide.src} // Optional fallback for non-lazy loading
                                width={slide.width}
                                height={slide.height}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <Gallery>
                <Swiper
                    dir="ltr"
                    spaceBetween={10}
                    slidesPerView={1}
                    navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    }}
                    className="tf-product-media-main"
                    id="gallery-swiper-started"
                    thumbs={{swiper: thumbsSwiper}}
                    modules={[Thumbs, Navigation]}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    // onSlideChange={(swiper) => {
                    //     handleColor(images[swiper.activeIndex].dataValue);
                    // }}
                >
                    {images.map((slide: SlideProps, index) => (

                        <SwiperSlide key={index}>
                            <Item
                                original={slide.src as string}
                                thumbnail={slide.src as string}
                                width={slide.width}
                                height={slide.height}
                            >
                                {({ref, open}) => (
                                    <a
                                        className="item"
                                        data-pswp-width={slide.width}
                                        data-pswp-height={slide.height}
                                        onClick={open}
                                    >
                                        <Image
                                            className="tf-image-zoom lazyload"
                                            data-zoom={slide.src}
                                            data-src={slide.src}
                                            ref={ref}
                                            alt="image"
                                            width={slide.width}
                                            height={slide.height}
                                            src={slide.src as string} // Optional fallback for non-lazy loading
                                        />
                                    </a>
                                )}
                            </Item>
                        </SwiperSlide>
                    ))}

                    {/* Navigation buttons */}
                    <div className="swiper-button-next button-style-arrow thumbs-next"></div>
                    <div className="swiper-button-prev button-style-arrow thumbs-prev"></div>
                </Swiper>{" "}
            </Gallery>
        </>
    );
}
