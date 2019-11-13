import React from "react";

export default function FeatureCard(props) {
  return (
    <div className="feature-card">
      <img className="feature-img" src={props.imgUrl} alt="" />
      <div className="feature-txt">
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <hr />
        <a href={props.link} target="_blank" rel="noopener noreferrer">
          <p>Learn More &rarr;</p>
        </a>
      </div>
    </div>
  );
}
