import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./pricing.style.scss";
import Feature from "./feature";
import Slider from "./slider";
import { data } from "./data";
import "@splidejs/react-splide/css";
import useAppProvider from "../../hooks/useAppProvider";
import conatctLocatonIconStar from "../../assets/svgs/Conatct-locaton-icon-star.svg";

function Pricing({ amountHandler }) {
  const { access } = useAppProvider();
  const [value, setValue] = useState(0);

  const { per } = data[value];

  const [disabled, setDisabled] = useState(false);

  function disabledHandler(
    e,
    subType,
    subAmount,
    subPer,
    subHeader,
    subText,
    subSubText
  ) {
    if (subType === "Basic") {
      e.preventDefault();
    }
    amountHandler(subType, subAmount, subPer, subHeader, subText, subSubText);
    setDisabled(true);
  }

  return (
    <main>
      <section className="pricing">
        <article className="text">
          <p>PRICING</p>

          <h3>We've got a plan to suit any need.</h3>

          <p>
            Buy a plan that's right for you. With Certgo you can tailor your
            plan to suit your budget and needs. We accept all major payment
            methods and process payments immediately.
          </p>
        </article>

        <article className="plans">
          <div className="btnContainer">
            {data.map((item, index) => {
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setValue(index);
                  }}
                  className={`plan-btn ${index === value && "active-btn"}`}
                >
                  {item.plan}
                </div>
              );
            })}
          </div>

          <div className="plansContainer" id="pc">
            {data[value].subscription.map(item => {
              const { id, sub } = item;
              return (
                <div className={sub.subType} key={id}>
                  {sub.subType === "Standard" ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        marginBottom: "0.5rem"
                      }}
                    >
                      <h4>{sub.subType}</h4>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "6px 16px",
                          borderRadius: "12px",
                          backgroundColor: "#08372F1A"
                        }}
                      >
                        <p style={{ fontSize: "12px" }}>Recommended</p>
                        <img
                          style={{ width: "13px" }}
                          src={conatctLocatonIconStar}
                          alt="Conatct-locaton-icon-star"
                        />
                      </div>
                    </div>
                  ) : (
                    <h4 style={{ marginBottom: "0.5rem" }}>{sub.subType}</h4>
                  )}

                  <p>{sub.header}</p>

                  <h3 style={{ paddingTop: "0.8rem", paddingBottom: "0.8rem" }}>
                    {sub.amount}
                    <span>{per}</span>
                  </h3>

                  <p>{sub.text}</p>

                  <article>
                    {sub.subText.map(item => {
                      const { id, img, txt } = item;
                      return (
                        <div className="others" key={id}>
                          <img src={img} alt={txt} />
                          <span>{txt}</span>
                        </div>
                      );
                    })}
                  </article>

                  {access ? (
                    <Link
                      to={`${sub.subType !== "Basic" ? "/payment" : ""}`}
                      style={
                        sub.subType === "Basic" ? { display: "none" } : {}
                        // disabled && sub.subType === "Basic"
                        //   ? {
                        //       cursor: "not-allowed",
                        //       backgroundColor: "#8ab9b2",
                        //       pointerEvents: "none"
                        //     }
                        //   : {}
                      }
                      onClick={e =>
                        disabledHandler(
                          e,
                          sub.subType,
                          sub.amount,
                          per,
                          sub.header,
                          sub.text,
                          sub.subText
                        )
                      }
                    >
                      {sub.linkText}
                    </Link>
                  ) : (
                    <Link to={sub.linkTo}>{sub.linkText}</Link>
                  )}
                </div>
              );
            })}
          </div>

          <div className="sliderContainer">
            <Slider
              value={value}
              disabledHandler={disabledHandler}
              per={per}
              access={access}
            />
          </div>
        </article>
      </section>

      <Feature />

      {/* <section>
            <div className="testimonial">
        <h1>Testimonials</h1>
        <p className = 'testimonial-para'>What our users have to say about us</p>

        <Splide
          className="testimonial-wrapper"
          options={{
            gap: "20px",
            perPage: 3,

            breakpoints: {
              1200: {
                perPage: 2,
              },
              768: {
                perPage: 1,
              },
            },

            arrows: true,
            pagination: true,
            drag: "free",
          }}
        >
          <SplideSlide>
            <div className="testimonial-boxn test">
              <div className="testimonial-flex">
                <img src={person_1} alt="user" />
                <div className="text">
                  <p className="testimonial-name">Lindsay Favazza</p>
                  <p className="testimonial-state">United States</p>
                </div>
              </div>
              <p className="testimonial-test">
                “Certgo is an incredible website for designing certificates! A
                huge selection of templates, fonts, and colors; endless choices
                at the tip of your fingers; easy editing and sending/sharing.
                Best certificate generator I've used for a long time. If you
                haven't tried it... try it! Victor Hayworth”
              </p>
            </div>
          </SplideSlide>

          <SplideSlide>
            <div className="testimonial-boxn">
              <div className="testimonial-flex">
                <img src={person_2} alt="user" />
                <div className="text">
                  <p className="testimonial-name">Valerie Tan</p>
                  <p className="testimonial-state">Singapore</p>
                </div>
              </div>
              <p className="testimonial-test">
                “Certgo is a fantastic piece of software! It saves us a lot of
                time, as we were able to generate bulk certificates for our
                students automatically. The customer support is also excellent
                and helps us navigate the software and recommend a solution for
                the changes we need.”
              </p>
            </div>
          </SplideSlide>

          <SplideSlide>
            <div className="testimonial-boxn">
              <div className="testimonial-flex">
                <img src={person_3} alt="user" />
                <div className="text">
                  <p className="testimonial-name">Lea Botha</p>
                  <p className="testimonial-state">South Africa</p>
                </div>
              </div>
              <p className="testimonial-test">
                “Certgo is great for designing certificates for my students
                enrolled in my courses. The various letter font styles and font
                colors are wonderful to choose from. The final look and design
                of the certification are professional. I enjoy using this easy
                website.”
              </p>
            </div>
          </SplideSlide>

          <SplideSlide>
            <div className="testimonial-boxn">
              <div className="testimonial-flex test-image2">
                <img src={person_1} alt="user" />
                <div className="text">
                  <p className="testimonial-name">Jessica Anoke</p>
                  <p className="testimonial-state">Nigeria</p>
                </div>
              </div>
              <p className="testimonial-test">
                “Easy, simple, and fast. The ease of use is really commendable.
                Setup and configuration is quite fast and simple. I found it
                really handy in sending out digital certificates for our
                bootcamp. The certification process has become seamless with
                only 3 steps to take in order to issue the credentials.”
              </p>
            </div>
          </SplideSlide>

          <SplideSlide>
            <div className="testimonial-boxn">
              <div className="testimonial-flex test-image">
                <img src={person_5} alt="user" />
                <div className="text">
                  <p className="testimonial-name">Todd Holgate</p>
                  <p className="testimonial-state">Poland</p>
                </div>
              </div>
              <p className="testimonial-test">
                “I came across this website when I needed a bulk certificate
                generator for my course. It is straightforward and I like the
                frames as they look very professional. It is quite affordable.”
              </p>
            </div>
          </SplideSlide>
        </Splide>
      </div>
            </section> */}

      {/* <section className="bg"></section> */}
    </main>
  );
}

export default Pricing;
