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
              About SLAM
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Supporting Literacy And Math through evidence-based resources and compassionate guidance for families.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Bio Section */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-100"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Founder</h2>
            <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full"></div>
          </div>

          {/* Bio Content */}
          <div className="prose prose-lg mx-auto max-w-none">
            <div className="bg-emerald-50 rounded-2xl p-6 mb-8">
              <h3 className="text-2xl font-semibold text-emerald-900 mb-3">Lisbeth Stone</h3>
              <p className="text-emerald-800 font-medium">
                Master's in Teaching and Learning Disabilities • 30+ Years in Education
              </p>
            </div>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                Lisbeth Stone holds a master's degree in Teaching and in Learning Disabilities. With over 
                30 years of experience working in schools, she has supported children from preschool 
                through fifth grade who were struggling academically. Through this work, Lisbeth 
                witnessed first-hand the power of early intervention—helping students catch up more 
                quickly and helping them maintain a positive view of themselves as learners.
              </p>

              <div className="bg-blue-50 rounded-2xl p-6">
                <h4 className="text-xl font-semibold text-blue-900 mb-3">The Birth of SLAM</h4>
                <p className="text-blue-800">
                  Lisbeth co-founded Supporting Literacy And Math (SLAM) to address the 
                  needs of the youngest learners, from kindergarten through second grade, who were at 
                  risk of falling behind. She designed a community-based afterschool program where she 
                  collaborated with classroom teachers and the principal to find students who would 
                  benefit from additional academic support two days a week from mid-October to mid-
                  May.
                </p>
              </div>

              <p>
                The program was designed for small group instruction to give students the chance 
                to strengthen their reading and math skills, while also fostering a sense of what it means 
                to be in a learning community. They practiced soft skills such as waiting patiently and 
                sharing materials, skills often not prevalent in one-to-one tutoring programs.
              </p>

              <div className="bg-purple-50 rounded-2xl p-6">
                <h4 className="text-xl font-semibold text-purple-900 mb-3">Expanding During the Pandemic</h4>
                <p className="text-purple-800">
                  During the pandemic, Lisbeth became even more aware of how challenging it was for 
                  parents, many of whom shared that they weren't always sure how to best support their 
                  children at home. This experience planted the seeds for expanding SLAM beyond the 
                  afterschool space.
                </p>
              </div>

              <p>
                More recently, SLAM has shifted its focus to create a home learning 
                platform. Lisbeth's mission is to provide this support free to families so that they feel 
                they have the guidance and tools needed to support their child's academic learning with 
                confidence.
              </p>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Beyond Education</h4>
                <p className="text-gray-700">
                  Outside of her professional work, Lisbeth serves as a volunteer mediator and enjoys 
                  reading, hiking, cooking, traveling and spending time with her friends and family.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Mission Statement */}
      <section className="bg-white/70 border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
              To provide free, evidence-based resources and guidance that empower families to support 
              their children's academic learning with confidence, ensuring every child has the opportunity 
              to thrive in their educational journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/reading" 
                className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium"
              >
                Explore Reading Resources
              </a>
              <a 
                href="/math" 
                className="inline-flex items-center px-6 py-3 border border-emerald-600 text-emerald-600 rounded-xl hover:bg-emerald-50 transition-colors font-medium"
              >
                Discover Math Activities
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default About;
