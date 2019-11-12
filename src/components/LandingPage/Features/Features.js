import React from "react";
import "./Features.scss";

import FeatureCard from "./FeatureCard";

export default function Features() {
  return (
    <div>
      <h2>Features</h2>
      <div className="features-wrapper">
        <button className="scroll-btn left-scroll">&lsaquo;</button>
        <div className="card-wrapper">
          <FeatureCard
            imgUrl={"https://creartfuldodger.files.wordpress.com/2013/07/quails.jpg"}
            title={"InterviewQ"}
            description={
              "Get mock interviewed by experienced professionals in your field. Become confident in your ability to ace real job interviews."
            }
          />
          <FeatureCard
            imgUrl={"https://i.pinimg.com/originals/36/7f/5d/367f5d2e3e6866191dc20c2ed77c7976.jpg"}
            title={"DesignQ"}
            description={
              "Get your portfolio reviewed by experienced UX designers. Receive specific and actionable feedback on your writing and designs."
            }
          />
          <FeatureCard
            imgUrl={"https://image.freepik.com/free-photo/chicken-quail-eggs-feathers-bowl-near-big-quills-old-can_23-2148073855.jpg"}
            title={"ResumeQ"}
            description={
              "Get your resume reviewed by experts in your field. Improve your chances of getting hired."
            }
          />
          {/* <FeatureCard imgUrl={''} title={'AvenueQ'} description={'Avenue Q is an American musical comedy featuring puppets and human actors with music and lyrics by Robert Lopez and Jeff Marx and book by Jeff Whitty. The show won Best Musical, Book, and Score at the 2004 Tony Awards.'} />
          <FeatureCard imgUrl={''} title={'SusieQ'} description={`"Susie Q" is a song by musician Dale Hawkins recorded late in the rockabilly era in 1957. He wrote it with bandmate Robert Chaisson, but when released, Stan Lewis, the owner of Jewel/Paula Records and whose daughter Susan was the inspiration for the song, and Eleanor Broadwater, the wife of Nashville DJ Gene Nobles, were credited as co-writers to give them shares of the royalties.`} /> */}
        </div>
        <button className="scroll-btn right-scroll">&rsaquo;</button>
      </div>
    </div>
  );
}
