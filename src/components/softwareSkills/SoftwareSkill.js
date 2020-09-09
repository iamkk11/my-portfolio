import React from "react";
import "./SoftwareSkill.css";
import {skillsSection} from "../../portfolio";

export default function SoftwareSkill() {
  return (
    <div>
      <div className="software-skills-main-div">
        <ul className="dev-icons">
          {skillsSection.softwareSkills.map(skills => {
            return (
              <li className="software-skill-inline" name={skills.skillName} >
                <img className="dev-icons-img" alt="dev-icon" src={skills.fontAwesomeClassname} ></img>
                <p className="img-name" >{skills.skillName}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
