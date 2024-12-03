import React from "react";
import PageTitle from "./PageTitle";
import { useMediaQueries } from "../utils/functions";

export const Header = ({
  text,
  img = "",
  extraItem = "",
  imgAlt = "img",
  style,
}) => {
  const { xs, sm, md, lg, xl } = useMediaQueries();

  return (
    <div
      className="d-flex align-items-center justify-content-around"
      style={{
        background: "linear-gradient(90deg, #fad000, #ffd700, #f5e694)",
        boxShadow: "5px 5px 25px 5px rgba(144, 142, 142, 0.2)",
        borderRadius: 10,
        marginBottom: 15,
        width: xs && 290,
        ...style,
      }}
    >
      <section className="d-flex align-items-center">
        <PageTitle>{text}</PageTitle>
        {extraItem && <div>{extraItem}</div>}
      </section>
      {img && (
        <img
          src={img}
          alt={imgAlt}
          width={150}
          height={55}
          style={{ marginRight: 7 }}
        />
      )}
    </div>
  );
};
