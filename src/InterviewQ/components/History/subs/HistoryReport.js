import React from "react";
// import Star from "src/global/icons/iconConstants.js";
import { ICONS } from "../../../../global/icons/iconConstants.js";
import Icon from "../../../../global/icons/Icon";

export default function HistoryReport({ booking }) {
  let impressStars = [];
  let resumeStars = [];
  let proStars = [];
  let attStars = [];
  let techStars = [];
  let contentStars = [];
  let commStars = [];

  let Stars = [
    [impressStars, booking.report.firstImpression_rating],
    [resumeStars, booking.report.resume_rating],
    [proStars, booking.report.professionalism_rating],
    [attStars, booking.report.generalAttitude_rating],
    [techStars, booking.report.technicalProficiency_rating],
    [contentStars, booking.report.contentOfAnswers_rating],
    [commStars, booking.report.communication_rating]
  ];

  Stars.map(star => {
    for (let i = 0; i < star[1]; i++) {
      star[0].push(1);
    }
  });

  console.log(Stars);

  return (
    <div className="history-report">
      <div>
        <h3 style={{ fontSize: "1.8rem" }}>First Impression</h3>
        {impressStars.map(i => (
          <Icon
            icon={ICONS.STAR_YELLOW}
            width={26}
            height={24}
            color="#FA8C16"
          />
        ))}
      </div>
      <p>{booking.report.firstImpression_comment}</p>
      <div>
        <h3 style={{ fontSize: "1.8rem" }}>Resume</h3>
        {resumeStars.map(i => (
          <Icon
            icon={ICONS.STAR_YELLOW}
            width={26}
            height={24}
            color="#FA8C16"
          />
        ))}
      </div>
      <p>{booking.report.resume_comment}</p>
      <div>
        <h3 style={{ fontSize: "1.8rem" }}>Professionalism</h3>
        {proStars.map(i => (
          <Icon
            icon={ICONS.STAR_YELLOW}
            width={26}
            height={24}
            color="#FA8C16"
          />
        ))}
      </div>
      <p>{booking.report.professionalism_comment}</p>
      <div>
        <h3 style={{ fontSize: "1.8rem" }}>General Attitude</h3>
        {attStars.map(i => (
          <Icon
            icon={ICONS.STAR_YELLOW}
            width={26}
            height={24}
            color="#FA8C16"
          />
        ))}
      </div>
      <p>{booking.report.generalAttitude_comment}</p>
      <div>
        <h3 style={{ fontSize: "1.8rem" }}>Technical Proficiency</h3>
        {techStars.map(i => (
          <Icon
            icon={ICONS.STAR_YELLOW}
            width={26}
            height={24}
            color="#FA8C16"
          />
        ))}
      </div>
      <p>{booking.report.technicalProficiency_comment}</p>
      <div>
        <h3 style={{ fontSize: "1.8rem" }}>Content of Answers</h3>
        {contentStars.map(i => (
          <Icon
            icon={ICONS.STAR_YELLOW}
            width={26}
            height={24}
            color="#FA8C16"
          />
        ))}
      </div>
      <p>{booking.report.contentOfAnswers_comment}</p>
      <div>
        <h3 style={{ fontSize: "1.8rem" }}>Communication</h3>
        {commStars.map(i => (
          <Icon
            icon={ICONS.STAR_YELLOW}
            width={26}
            height={24}
            color="#FA8C16"
          />
        ))}
      </div>
      <p>{booking.report.communication_comment}</p>
    </div>
  );
}
