import React, { useRef } from "react";
import { ButtonMore } from "../Button/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetMilestoneProgramQuery } from "../../features/home/homeApiIn";
import HomeLoading from "../UI/HomeLoading";
import ErrorShow from "../UI/ErrorShow";
import SectionTitle from "../SectionTitle/SectionTitle";

export default function MilestoneProgram() {
  const swipermilestoneProgramsRef = useRef();
  const {
    data: milestonePrograms,
    isLoading,
    isError,
  } = useGetMilestoneProgramQuery();

  let content = null;
  if (isLoading) {
    content = <HomeLoading />;
  }

  if (!isLoading && isError) {
    content = <ErrorShow message={"Item not found"} />;
  }
  if (!isLoading && !isError && milestonePrograms?.success === false) {
    content = <ErrorShow message={"No data found"} />;
  }
  if (!isLoading && !isError && milestonePrograms?.success === true) {
    content = (
      <div className="container">
        <SectionTitle>Milestone Program</SectionTitle>
        <Swiper
          loop={true}
          effect="fade"
          speed={1200}
          slidesPerView={"1"}
          onSwiper={(swiper) => {
            swipermilestoneProgramsRef.current = swiper;
          }}
        >
          {milestonePrograms?.result?.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="card border-1 cursor-pointer">
                <div className="row g-0">
                  <div className="col-md-6 col-12 h-00">
                    <div className="card-body">
                      <h4 className="card-title">{item.title}</h4>
                      <p
                        className="card-text"
                        dangerouslySetInnerHTML={{ __html: item.details }}
                      />
                      <div className="pt-3">
                        <ButtonMore to={`/programs-details/${item?.id}`}>
                          VIEW MORE
                        </ButtonMore>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <img
                      src={`/images/programs/${item.image}`}
                      className="img-fluid rounded w-100 p-2"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="ak-swiper-controll-milestone-programs d-flex gap-3 mt-3 justify-content-center">
          <div
            className="controll-btn cursor-pointer"
            aria-disabled="false"
            onClick={() => swipermilestoneProgramsRef.current.slideNext()}
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
            className="controll-btn cursor-pointer"
            onClick={() => swipermilestoneProgramsRef.current.slidePrev()}
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
    );
  }
  return content;
}
