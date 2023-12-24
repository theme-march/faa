import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

export default function MovingImg() {
  const swiperTestimonialRef = useRef(null);
  return (
    <div className="container">
      <div className="event-sponors">
        <h3 className="event-title">Event Sponsors:</h3>
        <div className="ak-slider ak-slide-event-sponors">
          <Swiper
            loop={true}
            slidesPerView={"auto"}
            modules={[Autoplay]}
            autoplay={{ delay: 800 }}
            onSwiper={(swiper) => {
              swiperTestimonialRef.current = swiper;
            }}
          >
            <SwiperSlide>
              <img
                src="eventssponsors/eventssponsors_1.png"
                className="ak-bg slider-img"
                alt="Partner"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="eventssponsors/eventssponsors_2.png"
                className="ak-bg slider-img"
                alt="Partner"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="eventssponsors/eventssponsors_3.png"
                className="ak-bg slider-img"
                alt="Partner"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="eventssponsors/eventssponsors_4.png"
                className="ak-bg slider-img"
                alt="Partner"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="eventssponsors/eventssponsors_5.png"
                className="ak-bg slider-img"
                alt="Partner"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="eventssponsors/eventssponsors_1.png"
                className="ak-bg slider-img"
                alt="Partner"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="eventssponsors/eventssponsors_2.png"
                className="ak-bg slider-img"
                alt="Partner"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="eventssponsors/eventssponsors_3.png"
                className="ak-bg slider-img"
                alt="Partner"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="eventssponsors/eventssponsors_4.png"
                className="ak-bg slider-img"
                alt="Partner"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="eventssponsors/eventssponsors_5.png"
                className="ak-bg slider-img"
                alt="Partner"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
