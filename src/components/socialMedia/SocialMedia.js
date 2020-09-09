import React from "react";
import "./SocialMedia.css";
import { socialMediaLinks } from "../../portfolio";

export default function socialMedia() {
  return (
    <div className="social-media-div">
      
      {socialMediaLinks.github ? 
      (<a href={socialMediaLinks.github} rel="noopener noreferrer" className="icon-button github" target="_blank">
        <i className="fab fa-github"></i>
        <span></span>
      </a>)
      :
      null}

      {socialMediaLinks.linkedin ?
      <a href={socialMediaLinks.linkedin} rel="noopener noreferrer" className="icon-button linkedin" target="_blank">
        <i className="fab fa-linkedin-in"></i>
        <span></span>
      </a>
      :
      null}

      {socialMediaLinks.gmail ?
      <a href={`mailto:${socialMediaLinks.gmail}`} rel="noopener noreferrer" className="icon-button google" target="_blank">
        <i className="fab fa-google"></i>
        <span></span>
      </a>
      :
      null}

      {socialMediaLinks.gitlab ?
      <a href={socialMediaLinks.gitlab} rel="noopener noreferrer" className="icon-button gitlab" target="_blank">
        <i className="fab fa-gitlab"></i>
        <span></span>
      </a>
      :
      null }

      {socialMediaLinks.facebook ?
      <a href={socialMediaLinks.facebook} rel="noopener noreferrer" className="icon-button facebook" target="_blank">
        <i className="fab fa-facebook-f"></i>
        <span></span>
      </a>
      :
      null}

       {socialMediaLinks.instagram ?
      <a href={socialMediaLinks.instagram} rel="noopener noreferrer" className="icon-button instagram" target="_blank">
        <i className="fab fa-instagram"></i>
        <span></span>
      </a>
      :
      null}

      {socialMediaLinks.twitter ?
      <a href={socialMediaLinks.twitter} rel="noopener noreferrer" className="icon-button twitter" target="_blank">
        <i className="fab fa-twitter"></i>
        <span></span>
      </a>
      :
      null}

      {socialMediaLinks.medium ? 
      (<a href={socialMediaLinks.medium} rel="noopener noreferrer" className="icon-button medium" target="_blank">
        <i className="fab fa-medium"></i>
        <span></span>
      </a>)
      :
      null}

      {socialMediaLinks.stackoverflow ? 
      (<a href={socialMediaLinks.stackoverflow} rel="noopener noreferrer" className="icon-button stack-overflow" target="_blank">
        <i className="fab fa-stack-overflow"></i>
        <span></span>
      </a>)
      :
      null}
    </div>
  );
}
