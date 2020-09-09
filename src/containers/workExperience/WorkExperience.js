import React from "react";
import "./WorkExperience.css";
import ExperienceCard from "../../components/experienceCard/ExperienceCard";
import {workExperiences} from "../../portfolio";
import {Fade} from "react-reveal";

export default function WorkExperience() { 
    if(workExperiences.viewExperiences){
        return (
            <div id="experience">
                <Fade bottom duration={4000} distance="20px">
                    <div className="experience-container" id="workExperience">
                        <div>
                            {/* <h1 className="experience-heading">Experiences 👨 </h1> */}
                            {/* <h1 className="experience-heading">Experiences {emoji("👨")}</h1> */}
                            <h1 className="experience-heading">Experiences <i style={{color:'#55198b'}} class="fas fa-briefcase"></i></h1>

                            <div className="experience-cards-div">
                            {workExperiences.experience.map((card) => {
                                return (
                                    <ExperienceCard
                                        cardInfo={{
                                            company: card.company,
                                            desc: card.desc,
                                            date: card.date,
                                            companylogo: card.companylogo,
                                            role: card.role,
                                            descBullets: card.descBullets,
                                            url:card.url
                                        }}
                                    />
                                );
                            })}
                            </div>
                        </div>
                    </div>
                </Fade>
            </div>
        );
    }
    return null;
}
