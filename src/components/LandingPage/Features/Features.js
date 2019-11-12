import React from "react";
import "./Features.scss";

import FeatureCard from "./FeatureCard";

export default function Features() {
  return (
    <div>
      <h2>Features</h2>
      <div className="features-wrapper">
        <button className="scroll-btn left-scroll">&lsaquo;</button>
        <div className="container">
          <FeatureCard
            imgUrl={
              "https://creartfuldodger.files.wordpress.com/2013/07/quails.jpg"
            }
            title={"InterviewQ"}
            description={
              "Get mock interviewed by experienced professionals in your field. Become confident in your ability to ace real job interviews."
            }
          />
          <FeatureCard
            imgUrl={
              "https://i.pinimg.com/originals/36/7f/5d/367f5d2e3e6866191dc20c2ed77c7976.jpg"
            }
            title={"DesignQ"}
            description={
              "Get your portfolio reviewed by experienced UX designers. Receive specific and actionable feedback on your writing and designs."
            }
          />
          <FeatureCard
            imgUrl={
              "https://image.freepik.com/free-photo/chicken-quail-eggs-feathers-bowl-near-big-quills-old-can_23-2148073855.jpg"
            }
            title={"ResumeQ"}
            description={
              "Get your resume reviewed by experts in your field. Improve your chances of getting hired."
            }
          />
          {/* <FeatureCard 
            imgUrl={
              'https://imaging.broadway.com/images/regular-43/w735/101411-11.jpg'
            } 
            title={'AvenueQ'} 
            description={
              'Avenue Q is an American musical comedy featuring puppets and human actors with music and lyrics by Robert Lopez and Jeff Marx and book by Jeff Whitty. The show won Best Musical, Book, and Score at the 2004 Tony Awards.'
            } 
          />
          <FeatureCard 
            imgUrl={
              'https://i5.walmartimages.com/asr/3edb9c47-badf-435d-9492-735c6ab4f469_1.54fb512b53ad78de39448aeff44b8dfb.png?odnHeight=450&odnWidth=450&odnBg=FFFFFF'
            } 
            title={'SuzyQ'} 
            description={
              `Suzy Q's are a brand of snack cake formerly produced and distributed by Hostess Brands and currently owned by private equity firms Apollo Global Management and Metropoulos & Co.`
            } 
          /> */}
        </div>
        <button className="scroll-btn right-scroll">&rsaquo;</button>
      </div>
    </div>
  );
}
