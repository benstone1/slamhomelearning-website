import React from 'react';
import { motion } from "framer-motion";

const ResourceCard = ({ title, description, website, category }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 h-full"
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
        category === 'ADHD' ? 'bg-red-100 text-red-800' :
        category === 'Learning' ? 'bg-blue-100 text-blue-800' :
        category === 'Reading' ? 'bg-green-100 text-green-800' :
        category === 'Therapy' ? 'bg-purple-100 text-purple-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {category}
      </div>
    </div>
    
    <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
      {title}
    </h3>
    
    <p className="text-gray-700 mb-4 leading-relaxed">
      {description}
    </p>
    
    <a
      href={website}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium transition-colors group"
    >
      <span className="mr-2">Visit Website</span>
      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  </motion.div>
);

function ParentResources() {
  const resources = [
    {
      title: "ADDitude",
      description: "An online magazine that provides information, strategies and support for people with ADHD and their families. They also offer free Zoom webinars.",
      website: "https://www.additudemag.com",
      category: "ADHD"
    },
    {
      title: "Child Mind Institute",
      description: "This organization offers free, evidence-based resources to help parents and educators support children's emotional and academic well-being. ADHD/Attention are one of the topics they feature on their website.",
      website: "https://childmind.org/education/",
      category: "ADHD"
    },
    {
      title: "Children and Adults with Attention-Deficit/Hyperactivity Disorder (CHADD)",
      description: "This organization provides education, advocacy and support for individuals with ADHD and their families. It offers information, local chapters, and resources to help people better understand and manage ADHD at all ages.",
      website: "https://chadd.org",
      category: "ADHD"
    },
    {
      title: "Learning Ally",
      description: "This organization has been helping school systems and educators close the reading gap for 75 years. They have an area of support for parents on their website with dyslexia resources.",
      website: "https://learningally.org/solutions-for-home/dyslexia-resources",
      category: "Reading"
    },
    {
      title: "The Learning Disabilities Association of America (LDA)",
      description: "A national organization offering resources and support to families wanting to better understand and help children with learning disabilities. Dyslexia falls under the category of learning disabilities.",
      website: "https://ldaamerica.org",
      category: "Learning"
    },
    {
      title: "OT Mom Learning Activities",
      description: "This website provides hands-on activities and exercises to work on at home to help support your child's fine motor, gross motor and visual perception skills.",
      website: "https://www.ot-mom-learning-activities.com/",
      category: "Therapy"
    },
    {
      title: "The OT Toolbox",
      description: "A website created by an occupational therapist that provides free resources for parents, teachers, and other occupational therapists.",
      website: "https://www.theottoolbox.com/category/free-resources/",
      category: "Therapy"
    },
    {
      title: "The Neurodiversity Alliance (ND Alliance)",
      description: "This organization was founded by and for students who learn differently. It has a large online community and a national network of neurodiversity clubs in the country.",
      website: "https://thendalliance.org",
      category: "Learning"
    },
    {
      title: "Pediatric Occupational Therapy Resources",
      description: "Ann and Robert H. Lurie Children's Hospital of Chicago has a free resources section on their website that provides information about occupational therapy.",
      website: "https://www.luriechildrens.org/en/specialties-conditions/pediatric-occupational-therapy/resources/",
      category: "Therapy"
    },
    {
      title: "Reading Rockets",
      description: "This organization offers information and resources about how children learn to read, why some struggle, and what adults can do to help.",
      website: "https://www.readingrockets.org",
      category: "Reading"
    },
    {
      title: "Understood",
      description: "An organization that supports 70 million people with learning and thinking differences in the United States, providing comprehensive resources and support.",
      website: "https://www.understood.org",
      category: "Learning"
    }
  ];

  const categories = ['ADHD', 'Learning', 'Reading', 'Therapy'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-emerald-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white/70 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Parent Resources
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Discover trusted organizations and websites that provide support, strategies, and resources 
              to help you navigate your child's learning journey with confidence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {categories.map((category) => (
            <div
              key={category}
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                category === 'ADHD' ? 'bg-red-100 text-red-800' :
                category === 'Learning' ? 'bg-blue-100 text-blue-800' :
                category === 'Reading' ? 'bg-green-100 text-green-800' :
                category === 'Therapy' ? 'bg-purple-100 text-purple-800' :
                'bg-gray-100 text-gray-800'
              }`}
            >
              {category === 'ADHD' ? 'ADHD Support' :
               category === 'Learning' ? 'Learning Differences' :
               category === 'Reading' ? 'Reading Support' :
               category === 'Therapy' ? 'Occupational Therapy' :
               category}
            </div>
          ))}
        </motion.div>
      </section>

      {/* Resources Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Trusted Organizations & Websites ({resources.length})
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource, idx) => (
              <ResourceCard
                key={idx}
                {...resource}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Additional Support Section */}
      <section className="bg-white/70 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Need More Support?
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Remember that every child learns differently, and it's okay to seek help. These resources 
              are here to support you and your child on your unique learning journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/reading" 
                className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium"
              >
                Browse Reading Resources
              </a>
              <a 
                href="/math" 
                className="inline-flex items-center px-6 py-3 border border-emerald-600 text-emerald-600 rounded-xl hover:bg-emerald-50 transition-colors font-medium"
              >
                Explore Math Resources
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default ParentResources;
