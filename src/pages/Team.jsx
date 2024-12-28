// eslint-disable-next-line no-unused-vars
import React from 'react';

const Team = () => {
  const teamMembers = [
    {
      name: "Erhan FIRAT",
      role: "Project Owner",
      image: "https://media.licdn.com/dms/image/v2/D4D35AQHT4v0sJDcHRA/profile-framedphoto-shrink_800_800/profile-framedphoto-shrink_800_800/0/1732526126122?e=1735948800&v=beta&t=4mEbtAGkZFJLUHYbLuYiGk5TIDlgfZf65416yUsyHvU",
      linkedin: "https://www.linkedin.com/in/erhan-firat/"
    },
    {
      name: "Gökhan Özdemir",
      role: "Scrum Master",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIB4q3hcCFAgJYU0E2YDWRIZK35JAHMgb9rA&s=200",
      linkedin: "https://www.linkedin.com/in/gnozdemir/"
    },
    {
      name: "Semih Ömer Baltacı",
      role: "Frontend Developer",
      image: "https://media.licdn.com/dms/image/v2/D5603AQFVccVo2MgpIg/profile-displayphoto-shrink_800_800/B56ZQKaNMLGQAc-/0/1735341430289?e=1740614400&v=beta&t=rQBgtCVoMcbAyGbR4FojbBph8-H6jLcOUXry15_ZEfc",
      linkedin: "https://www.linkedin.com/in/semih-%C3%B6mer-baltac%C4%B1-144971340/"
    },
    {
      name: "Prison Mike",
      role: "Assistant Regional Manager",
      image: "https://upload.wikimedia.org/wikipedia/en/5/56/PrisonMike.png",
      linkedin: "#",
      quote: "The worst thing about prison was the... was the Dementors."
    },
    {
      name: "Dwight K. Schrute",
      role: "Assistant to the Regional Manager",
      image: "https://upload.wikimedia.org/wikipedia/en/c/cd/Dwight_Schrute.jpg",
      linkedin: "#"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <h1 className="text-3xl font-bold text-center mb-8">Our Team</h1>
      
      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center transition-transform hover:scale-105">
            <img
              src={member.image}
              alt={member.name}
              className="w-40 h-40 rounded-full mx-auto mb-4 object-cover"
            />
            <h2 className="text-xl font-semibold mb-2">{member.name}</h2>
            <p className="text-gray-600 mb-4">{member.role}</p>
            {member.quote && (
              <p className="text-gray-600 mb-4">{member.quote}</p>
            )}
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              LinkedIn Profile
            </a>
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-4 text-center">
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 rounded-full mx-auto mb-3 object-cover"
            />
            <h2 className="text-lg font-semibold mb-1">{member.name}</h2>
            <p className="text-gray-600 mb-2">{member.role}</p>
            {member.quote && (
              <p className="text-gray-600 mb-2">{member.quote}</p>
            )}
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              LinkedIn Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;