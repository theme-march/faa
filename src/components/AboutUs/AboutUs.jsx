import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useGetHomeSliderQuery } from "../../features/home/homeApiIn";

export default function AboutUs() {
  const swiperTestimonialRef = useRef();

  const { data: sliderData } = useGetHomeSliderQuery();

  return (
    <div>
      <div className="ak-slider ak-slider-about">
        <Swiper
          loop={true}
          effect="fade"
          speed={1500}
          modules={[Autoplay]}
          autoplay={{ delay: 2000 }}
          slidesPerView={"1"}
          onSwiper={(swiper) => {
            swiperTestimonialRef.current = swiper;
          }}
        >
          {sliderData?.result?.map((item, index) => (
            <SwiperSlide key={index}>
              <img
                className="slider-img"
                src={`/images/home_slider_image/${item.image}`}
                alt="..."
              />
              <div className="over-lay"></div>

              <div className="container">
                <div className="about-content">
                  <h1 className="title" data-swiper-parallax="300">
                    {item.title}
                  </h1>
                  <div className="ak-height-25 ak-height-lg-20"></div>
                  <p
                    className="desp"
                    data-swiper-parallax="100"
                    dangerouslySetInnerHTML={{ __html: item.details }}
                  />
                  <div className="ak-height-25 ak-height-lg-20"></div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="ak-swiper-controll-about">
          <div
            className="controll-btn"
            aria-disabled="false"
            onClick={() => swiperTestimonialRef.current.slideNext()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="46"
              height="46"
              viewBox="0 0 46 46"
              fill="none"
            >
              <g filter="url(#filter0_b_464_103)">
                <rect
                  width="45.0429"
                  height="45.0429"
                  rx="22.5215"
                  transform="matrix(1 0 0 -1 0.948364 45.1777)"
                  fill="white"
                />
                <rect
                  x="0.450429"
                  y="-0.450429"
                  width="44.142"
                  height="44.142"
                  rx="22.071"
                  transform="matrix(1 0 0 -1 0.948364 44.2768)"
                  stroke="black"
                  strokeOpacity="0.15"
                  strokeWidth="0.900858"
                />
              </g>
              <path
                d="M13.8242 23.2933C13.4724 22.9414 13.4724 22.3711 13.8242 22.0192L19.5573 16.2862C19.9091 15.9344 20.4795 15.9344 20.8313 16.2862C21.1831 16.638 21.1831 17.2084 20.8313 17.5602L15.7352 22.6562L20.8313 27.7523C21.1831 28.1041 21.1831 28.6745 20.8313 29.0263C20.4795 29.3781 19.9091 29.3781 19.5573 29.0263L13.8242 23.2933ZM14.4612 21.7554H32.4784V23.5571H14.4612V21.7554Z"
                fill="#31328A"
              />
              <defs>
                <filter
                  id="filter0_b_464_103"
                  x="-179.223"
                  y="-180.037"
                  width="405.386"
                  height="405.386"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur
                    in="BackgroundImageFix"
                    stdDeviation="90.0858"
                  />
                  <feComposite
                    in2="SourceAlpha"
                    operator="in"
                    result="effect1_backgroundBlur_464_103"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_backgroundBlur_464_103"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
          <div
            className="controll-btn"
            onClick={() => swiperTestimonialRef.current.slidePrev()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="46"
              height="46"
              viewBox="0 0 46 46"
              fill="none"
            >
              <g filter="url(#filter0_b_464_100)">
                <rect
                  width="45.0429"
                  height="45.0429"
                  rx="22.5215"
                  transform="matrix(1 0 0 -1 -0.00872803 45.1777)"
                  fill="white"
                />
                <rect
                  x="0.450429"
                  y="-0.450429"
                  width="44.142"
                  height="44.142"
                  rx="22.071"
                  transform="matrix(1 0 0 -1 -0.00872803 44.2768)"
                  stroke="black"
                  strokeOpacity="0.15"
                  strokeWidth="0.900858"
                />
              </g>
              <path
                d="M32.1583 22.0192C32.5101 22.3711 32.5101 22.9414 32.1583 23.2933L26.4252 29.0263C26.0734 29.3781 25.503 29.3781 25.1512 29.0263C24.7994 28.6745 24.7994 28.1041 25.1512 27.7523L30.2473 22.6562L25.1512 17.5602C24.7994 17.2084 24.7994 16.638 25.1512 16.2862C25.503 15.9344 26.0734 15.9344 26.4252 16.2862L32.1583 22.0192ZM13.5041 21.7554H31.5213V23.5571H13.5041V21.7554Z"
                fill="#31328A"
              />
              <defs>
                <filter
                  id="filter0_b_464_100"
                  x="-180.18"
                  y="-180.037"
                  width="405.386"
                  height="405.386"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur
                    in="BackgroundImageFix"
                    stdDeviation="90.0858"
                  />
                  <feComposite
                    in2="SourceAlpha"
                    operator="in"
                    result="effect1_backgroundBlur_464_100"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_backgroundBlur_464_100"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
