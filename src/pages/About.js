import React from 'react';
import { motion } from "framer-motion";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-emerald-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white/70 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About
            </h1>
          </motion.div>
        </div>
      </section>

      {/* About SLAM Section */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About SLAM</h2>
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              SLAM was originally created to address the needs of the youngest learners from kindergarten 
              through second grade, who were at risk of falling behind. A community-based afterschool 
              program was created which provided small-group instruction in reading and math giving students 
              a chance to strengthen their skills, while also fostering a sense of what it means to be a in a 
              learning community. In addition to math and reading skills, students also practiced soft skills 
              such as waiting patiently and sharing materials, skills often not prevalent in one-to-one tutoring 
              programs.
            </p>
            <p>
              During the pandemic parents began sharing that they weren't always sure how best to support 
              their children at home. These conversations planted the seeds for expanding SLAM beyond the 
              afterschool space.
            </p>
            <p>
              Today, SLAM has shifted its focus to create a home learning platform. Its mission is to provide 
              this support free to families so they feel they have the guidance and tools needed to support their 
              child's academic learning with confidence.
            </p>
          </div>
        </motion.div>

        {/* About Jeannine Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-12"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0">
              <img
                src="/images/Jeannine_Cleary.jpg"
                alt="Jeannine Cleary"
                className="w-48 h-48 rounded-2xl object-cover shadow-lg"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Jeannine (Co-Founder)</h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              Jeannine is a dedicated advocate for educational equity, with extensive experience supporting 
              children with diverse learning needs. As a parent, she actively guided her children through their 
              academic journeys, leveraging advocacy, research and deep involvement in the IEP (Individual 
              Education Plan) process to help them achieve their goals.
            </p>
            <p>
              Her commitment to educational empowerment extend to roles as a board member of VOCEL (Viewing Our Children as 
              Emerging Leaders) and the Adult Down Syndrome Center (ADSC).
            </p>
            <p>
              In addition to her leadership roles, Jeannine volunteers as a bilingual book buddy with 
              SitStayRead and serves as a one-on-one tutor for first graders in an after-school program, 
              continuing her hands-on support for young learners.
            </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* About Lisbeth Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0">
              <img
                src="/images/Lisbeth_Stone.jpg"
                alt="Lisbeth Stone"
                className="w-48 h-48 rounded-2xl object-cover shadow-lg"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Lisbeth (Co-Founder)</h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              Lisbeth holds master's degrees in Teaching and in Learning Disabilities. With over 30 
              years of experience in education, she has supported children from preschool through 
              fifth grade who were struggling academically. Through this work, Lisbeth saw first-hand 
              the power of early intervention, helping students catch up more quickly and maintain a 
              positive sense of themselves as learners.
            </p>
            <p>
              Lisbeth is now passionate about working with the youngest students (K-2) and their 
              families. She believes that when parents have practical tools and clear guidance, they 
              can make learning at home meaningful and joyful which will help their children thrive in 
              school.
            </p>
            <p>
              Outside of her professional work, Lisbeth volunteers as a mediator and enjoys spending time 
              with family and friends. She also enjoys reading, hiking, cooking, and traveling.
            </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default About;
