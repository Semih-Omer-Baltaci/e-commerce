// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Linkedin, Github } from 'lucide-react';

// Default avatar image URL (using a reliable placeholder service)
const DEFAULT_AVATAR = "https://ui-avatars.com/api/?background=0D8ABC&color=fff";

// Team members data
const teamMembers = [
 
  {
    name: "Gökhan Özdemir",
    role: "Scrum Master",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIB4q3hcCFAgJYU0E2YDWRIZK35JAHMgb9rA&s=200",
    linkedin: "https://www.linkedin.com/in/gnozdemir/",
    github: "https://github.com/gokhanozdemir",
  },
  {
    name: "Semih Ömer Baltacı",
    role: "Frontend Developer",
    image: "https://media.licdn.com/dms/image/v2/D5603AQFVccVo2MgpIg/profile-displayphoto-shrink_800_800/B56ZQKaNMLGQAc-/0/1735341430289?e=1740614400&v=beta&t=rQBgtCVoMcbAyGbR4FojbBph8-H6jLcOUXry15_ZEfc",
    linkedin: "https://www.linkedin.com/in/semih-%C3%B6mer-baltac%C4%B1-144971340/",
    github:"https://github.com/Semih-Omer-Baltaci"
  },
  {
    name: "Furkan Ozan Yuce",
    role: "Fullstack Developer",
    image: "https://ca.slack-edge.com/T046N0ZLKU4-U07M4JJQ8MB-a6f56504a740-72",
    linkedin: "https://www.linkedin.com/in/furkan-ozan-yuce/",
    github: "https://github.com/furkanozanyuce"
  },
  {
    name: "Berk Karademir",
    role: "Fullstack Developer",
    image: "https://ca.slack-edge.com/T046N0ZLKU4-U07MLD8P3DZ-386dabb44539-192",
    linkedin: "https://www.linkedin.com/in/berk-karademir/",
    github: "https://github.com/berk-karademir"
  },
  {
    name: "Naim Kahyaoglu",
    role: "Fullstack Developer",
    image: "https://media.licdn.com/dms/image/v2/C4E03AQF1sYD_qfPQmA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1628096200967?e=1741219200&v=beta&t=29QVwqUlcV2bypWlKktvRD1exVq_5dX64se5fXNzkY0",
    linkedin: "https://www.linkedin.com/in/naim-kahyaoglu-8a0000236/",
    github: "https://github.com/Naim-Kahyaoglu"
  },
  {
    name: "Prison Mike",
    role: "Security Consultant",
    image: "https://upload.wikimedia.org/wikipedia/en/5/56/PrisonMike.png",
    linkedin: "#",
    github: "https://github.com/prison-mike",
    quote: "The worst thing about prison was the... was the Dementors."
  },
  {
    name: "Dwight K. Schrute",
    role: "Assistant to the Regional Manager",
    image: "https://upload.wikimedia.org/wikipedia/en/c/cd/Dwight_Schrute.jpg",
    linkedin: "#",
    github: "https://github.com/schrutefarms",
    quote: "Identity theft is not a joke, Jim! Millions of families suffer every year!"
  }
];

const Team = () => {
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (memberName) => {
    setImageErrors(prev => ({
      ...prev,
      [memberName]: true
    }));
  };

  const getImageUrl = (member) => {
    if (imageErrors[member.name]) {
      return `${DEFAULT_AVATAR}&name=${encodeURIComponent(member.name)}`;
    }
    return member.image;
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <h1 className="text-3xl font-bold text-center mb-8">Our Team</h1>

      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center transition-transform hover:scale-105">
            <img
              src={getImageUrl(member)}
              alt={member.name}
              className="w-40 h-40 rounded-full mx-auto mb-4 object-cover bg-gray-100"
              onError={() => handleImageError(member.name)}
            />
            <h2 className="text-xl font-semibold mb-2">{member.name}</h2>
            <p className="text-gray-600 mb-4">{member.role}</p>
            {member.quote && (
              <p className="text-gray-600 mb-4 italic">&quot;{member.quote}&quot;</p>
            )}
            <div className="flex justify-center space-x-4">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-blue-600 hover:text-blue-700 transition-colors"
                  title="LinkedIn Profile"
                >
                  <Linkedin size={24} />
                </a>
              )}
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-800 hover:text-gray-900 transition-colors"
                  title="GitHub Profile"
                >
                  <Github size={24} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-4 text-center">
            <img
              src={getImageUrl(member)}
              alt={member.name}
              className="w-32 h-32 rounded-full mx-auto mb-3 object-cover bg-gray-100"
              onError={() => handleImageError(member.name)}
            />
            <h2 className="text-lg font-semibold mb-2">{member.name}</h2>
            <p className="text-gray-600 mb-3">{member.role}</p>
            {member.quote && (
              <p className="text-gray-600 mb-3 italic">&quot;{member.quote}&quot;</p>
            )}
            <div className="flex justify-center space-x-4">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-blue-600 hover:text-blue-700 transition-colors"
                  title="LinkedIn Profile"
                >
                  <Linkedin size={24} />
                </a>
              )}
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-800 hover:text-gray-900 transition-colors"
                  title="GitHub Profile"
                >
                  <Github size={24} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
