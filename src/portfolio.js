
/* Change this file to get your personal Portfolio */

// Your Summary And Greeting Section

import emoji from "react-easy-emoji";

const greeting = {
  /* Your Summary And Greeting Section */
  username: "Kevin Kiwango",
  title: "Hi all, I'm Kevin",
  subTitle: emoji("A passionate Software Developer 🚀 having an experience of building Web and Mobile applications with JavaScript / Reactjs / Nodejs / React Native and some other cool libraries and frameworks. In a previous lifetime, I was a Telecommunications engineer and Data Scientist well versed in R and Python."),
  resumeLink: "https://drive.google.com/file/d/1KkJSazXMOsO0Rt4YgcXJ5zpQl35kT0gg/view?usp=sharing"
};

// Your Social Media Link

const socialMediaLinks = {
  github: "https://github.com/iamkk11",
  linkedin: "https://www.linkedin.com/in/kevinkiwango/",
  gmail: "kevinkiwango0@gmail.com",
  instagram:"https://www.instagram.com/kevn_kiwan/",
  // gitlab: "https://gitlab.com/saadpasta",
  facebook: "https://web.facebook.com/iamkk11",
  twitter:"https://twitter.com/kevnkiwan",
  medium: "https://medium.com/@kevinkiwango",
  stackoverflow: "https://stackoverflow.com/users/9308366/kevin-kiwango"
  // Instagram and Twitter are also supported in the links!
};

// Your Skills Section

const skillsSection = {
  title: "What I do 😀 ",
  subTitle: "CRAZY FULL STACK DEVELOPER WHO WANTS TO EXPLORE EVERY TECH STACK",
  skills: [
    emoji("⚡ Integration of third party services such as Firebase/ AWS / Heroku"),
    emoji("⚡ Create and develop dashboards for Data Analysis and visualization"),
    emoji("⚡ Responsive and lightweight data collection forms"),
    emoji("⚡ Create Deep Learning AI models with Keras and Tensorflow")
  ],

/* Make Sure You include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

  softwareSkills: [
    {
      skillName: "html-5",
      fontAwesomeClassname:require("./assets/images/html5.png")
    },
    {
      skillName: "css3",
      fontAwesomeClassname: require("./assets/images/css-3.svg")
    },
    {
      skillName: "sass",
      fontAwesomeClassname: require("./assets/images/sass.svg")
    },
    {
      skillName: "JavaScript",
      fontAwesomeClassname: require("./assets/images/javascript.svg")
    },
    {
      skillName: "python",
      fontAwesomeClassname: require("./assets/images/python.png")
    },
    {
      skillName: "R",
      fontAwesomeClassname: require("./assets/images/R-min.png")
    },
    {
      skillName: "reactjs",
      fontAwesomeClassname: require("./assets/images/react-logo.png")
    },
    {
      skillName: "flask",
      fontAwesomeClassname: require("./assets/images/flask.png")
    },
    {
      skillName: "keras",
      fontAwesomeClassname: require("./assets/images/keras.jpg")
    },
    {
      skillName: "tensorflow",
      fontAwesomeClassname: require("./assets/images/tensorflow.png")
    },
    {
      skillName: "nodejs",
      fontAwesomeClassname: require("./assets/images/nodejs.svg")
    },
    {
      skillName: "npm",
      fontAwesomeClassname: require("./assets/images/npm.png")
    },
    {
      skillName: "sql-database",
      fontAwesomeClassname: require("./assets/images/sql.svg")
    },
    {
      skillName: "mongo-db",
      fontAwesomeClassname: require("./assets/images/mongodb.png")
    },
    {
      skillName: "aws",
      fontAwesomeClassname: require("./assets/images/aws.png")
    },
    {
      skillName: "heroku",
      fontAwesomeClassname: require("./assets/images/heroku.svg")
    },
    {
      skillName: "docker",
      fontAwesomeClassname: require("./assets/images/docker.svg")
    },
    {
      skillName: "firebase",
      fontAwesomeClassname: require("./assets/images/firebase.webp")
    },


  ]
};

// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: true, //Set it to true to show Proficiency Section
  experience: [
    {
      Stack: "Frontend",  //Insert stack or technology you have experience in
      progressPercentage: "60%"  //Insert relative proficiency in percentage
    },
    {
      Stack: "Backend",
      progressPercentage: "70%"
    },
    {
      Stack: "Data Analytics",
      progressPercentage: "75%"
    },
    {
      Stack: "Project Management",
      progressPercentage: "65%"
    }
  ]
};

// Your top 3 work experiences

const workExperiences = {
  viewExperiences: true, //Set it to true to show workExperiences Section
  experience: [
    {
      role: "Manager: Digital & Self Service",  
      company: "Vodacom Tanzania",
      companylogo: require("./assets/images/voda.jpg"),
      date: "June 2019 – Present",
      url:"https://vodacom.co.tz/",
      desc: "Customer Service is going digital. I create and market, new products and services that drive this transformation.",
      descBullets: [
        "Growing Digital Channels and Adoption",
        "Enhancing and developing new Self Service Products and Services"
      ]
    },
    {
      role: "Data Analyst",  
      company: "Costech",
      companylogo: require("./assets/images/costech.png"),
      date: "March 2018 – June 2019",
      url:"https://costech.or.tz/",
      desc: "Analyzing and developing data collection tools for the commission. Extracting data from various sources and implementing automation tools to aid in the commission's efforts."
    },
    {
      role: "Self Service Systems Analyst",   
      company: "NMB",
      companylogo: require("./assets/images/nmb.jpg"),
      date: "Jan 2015 – Dec 2015",
      url:"https://nmbbank.co.tz/",
      desc: "Working with consultants and stakeholders to deliver Self Service products to our customers."
    },

  ]
};

/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  githubConvertedToken: process.env.REACT_APP_GITHUB_TOKEN,
  githubUserName: "iamkk11", // Change to your github username to view your profile in Contact Section.
  showGithubProfile :"true" // Set true or false to show Contact profile using Github, defaults to false 
};


// Some Big Projects You have worked with your company

const bigProjects = {
  title: emoji("Side Projects 🖥️"),
  subtitle: "SOME STARTUPS AND COMPANIES THAT I HELPED TO CREATE THEIR TECH",
  projects: [
    {
      image: require("./assets/images/pangishapp.png"),
      link: "https://pangishaapp.herokuapp.com/"
    },
    {
      image: require("./assets/images/ucc.png"),
      link: "https://www.ucc.ie/en/misl/"
    },
    {
      image: require("./assets/images/amreflogo.png"),
      link: "https://amref.org/tanzania/"
    },
    {
      image: require("./assets/images/costech.png"),
      link: "https://www.costech.or.tz"
    },

  ]
};

// Your Achievement Section Include Your Certification Talks and More

const achievementSection = {

  title: emoji("Education And Certifications 🏆 "),
  subtitle: "Education, Achievements, Certifications, Award Letters and Some Cool Stuff that I have done !",

  achivementsCards: [
    {
      title: "MSc Data Science & Analytics",
      url:"https://www.ucc.ie/en/ckr49/",
      subtitle: "Awared a 50% reduction towards my tuition fee at University College Cork. This allowed me to earn a Masters in Data Science & Analytics",
      image: require("./assets/images/ucc.png"),
      footerLink: [
        { name: "Certificate", url: "https://drive.google.com/file/d/1Ap8cvtBcgbmuN21gKubUPFbsabhiDsLJ/view?usp=sharing"},
        { name: "TCU Translation", url: "https://drive.google.com/file/d/1WsqJ51a6urv7CwT4kWxkllTYaFXqJi1C/view?usp=sharing"},
      ]
    },
    {
      title: "AGIS Africa Scholarship",
      url:"https://www.ul.ie/",
      subtitle: "One in five applicants from Africa awared scholarship to study for a short course at the Localization Research Center in Ireland inorder to localize African Languages",
      image: require("./assets/images/ul.jpg"),
      footerLink: [{
        name: "Award Letter", url: "https://drive.google.com/file/d/1IUrS0EYI3vgMJjRFb6qCFGQORmBvNpVa/view?usp=sharing"
      }]
    },

    {
      title: "EdX Online Learning",
      url:"https://www.edx.org/",
      subtitle: "Completed Certifcation from EdX with collaboration from Microsoft for Data Science & Machine Learning Essentials",
      image: require("./assets/images/ms.png"),
      footerLink: [
        { name: "View Certificate", url: "https://drive.google.com/file/d/1ewfLrK5VhVW3hjkvvWYBDIrrNl14Ir_p/view?usp=sharing" },
        // { name: "Final Project", url: "https://pakistan-olx-1.firebaseapp.com/" }
      ]
    },
  ]
};

// Blogs Section

const blogSection = {

  title: 'Blog Posts',
  subtitle: "With Love for Developing cool stuff, I love to write and teach others what I have learnt.",

  blogs: [
    {
      url: "https://www.linkedin.com/pulse/black-swan-theory-kevin-kiwango/",
      title: "Nassim Nicholas Taleb's Black Swan Events",
      description: "Humans are wired to act irrational without knowing it. In this blog, we delve into the different types of Cognitive and Statistical Bisasses which we encounter in our daily lives."
    },
    {
      url: "https://rpubs.com/iamkk11/319313",
      title: "Predicting English Premier League match results using Machine Learning",
      description: "Trying to predict English Premier League scores using historical odds data using R."
    },
    {
      url: "https://rpubs.com/iamkk11/304467",
      title: "Mapping CSEE School Rankings",
      description: "Can we visualize best performing schools in a map and derive clustering insights?. In this Rpub blog post, we do just that."
    }
  ]
};

const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle: "Discuss a project or just want to say hi? My Inbox is open for all.",
  number: "+255 754 710 799",
  email_address: "kevinkiwango@gmail.com"
};

//Twitter Section

const twitterDetails = {
  userName : "kevnkiwan"//Replace "twitter" with your twitter username without @
};

export { greeting, socialMediaLinks, skillsSection, techStack, workExperiences, openSource, bigProjects, achievementSection, blogSection, contactInfo , twitterDetails};
