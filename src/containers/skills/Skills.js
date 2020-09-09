import React from "react";
import "./Skills.css";
import SoftwareSkill from "../../components/softwareSkills/SoftwareSkill";
import {skillsSection} from "../../portfolio";
import {Fade} from "react-reveal";

export default function Skills() {
  return (
    <div className="main" id="skills">
      <div className="skills-main-div">
        <Fade left duration={2000} >
          <div className="skills-image-div">
            <img alt="Kevin Working" src={require("../../assets/images/code.svg")}></img>
          </div>
        </Fade>
        <Fade right duration={2000}>
          <div className="skills-text-div">
            <h1 className="skills-heading">{skillsSection.title} </h1>
            <p className="subTitle skills-text-subtitle">{skillsSection.subTitle}</p>
            <SoftwareSkill />
            <div>
              {skillsSection.skills.map(skills => {
                return <p className="subTitle skills-text">{skills}</p>;
              })}
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
}
