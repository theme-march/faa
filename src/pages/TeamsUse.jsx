import React from "react";
import CommonHero from "../components/CommonHero/CommonHero";

export default function TeamsUse() {
  const teamsUseData = [
    {
      title: "Acceptance of Terms",
      desp: "By accessing or using the Website, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site",
    },
    {
      title: "Use License Permission",
      desp: "is granted to temporarily download one copy of the materials (information or software) on the Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.",
    },
    {
      title: "Disclaimer",
      desp: "The materials on the Website are provided on an 'as is' basis. The Finance Alumni Association makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.",
    },
    {
      title: "Acceptance of Terms",
      desp: "By accessing or using the Website, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site",
    },
    {
      title: "Acceptance of Terms",
      desp: "By accessing or using the Website, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site",
    },
    {
      title: "Acceptance of Terms",
      desp: "By accessing or using the Website, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site",
    },
    {
      title: "Acceptance of Terms",
      desp: "By accessing or using the Website, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site",
    },
    {
      title: "Acceptance of Terms",
      desp: "By accessing or using the Website, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site",
    },
    {
      title: "Acceptance of Terms",
      desp: "By accessing or using the Website, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site",
    },
    {
      title: "Acceptance of Terms",
      desp: "By accessing or using the Website, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site",
    },
  ];
  return (
    <>
      <CommonHero title={"Terms Of Use"} />
      <div className="ak-height-100 ak-height-lg-60"></div>
      <div className="container container-max-width-910">
        <h2 className="team-section-title">
          Finance Alumni Association Website - Terms of Use
        </h2>
        {teamsUseData?.map((data, index) => (
          <div className="team-use" key={index}>
            <h6 className="team-titel">{data.title}</h6>
            <p className="team-desp">{data.desp}</p>
          </div>
        ))}
      </div>
      <div className="ak-height-100 ak-height-lg-60"></div>
    </>
  );
}
