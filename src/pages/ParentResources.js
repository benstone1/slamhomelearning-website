import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

const ResourceCard = ({ title, description, website, category }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 h-full"
  >
    <div className="flex items-center gap-2 mb-4">
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
        category === 'ADHD' ? 'bg-red-100 text-red-800' :
        category === 'Learning' ? 'bg-blue-100 text-blue-800' :
        category === 'Reading' ? 'bg-green-100 text-green-800' :
        category === 'OT' ? 'bg-purple-100 text-purple-800' :
        category === 'Speech/Language' ? 'bg-indigo-100 text-indigo-800' :
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

const GuideCard = ({ title, description, filename }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 h-full cursor-pointer group"
    onClick={() => {
      window.open(`/worksheets/parent_resources/${filename}`, '_blank');
    }}
  >
    <div className="flex items-center gap-2 mb-4">
      <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
        PDF
      </div>
    </div>
    
    <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight group-hover:text-emerald-700 transition-colors">
      {title}
    </h3>
    
    <p className="text-gray-700 mb-4 leading-relaxed">
      {description}
    </p>
    
    <div className="flex items-center text-emerald-600 group-hover:text-emerald-700 font-medium transition-colors">
      <span className="mr-2">View PDF</span>
      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </motion.div>
);

function ParentResources() {
  const [activeTab, setActiveTab] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ADHD'); // Default to ADHD
  const [guides, setGuides] = useState([]);

  // Categories for filtering with icons
  const categories = [
    { key: 'ADHD', label: 'ADHD', icon: '🧠' },
    { key: 'Learning', label: 'Learning Differences', icon: '📚' },
    { key: 'Reading', label: 'Reading Support', icon: '📖' },
    { key: 'OT', label: 'Occupational Therapy', icon: '✋' },
    { key: 'Speech/Language', label: 'Speech/Language', icon: '🗣️' }
  ];

  // Helper function to parse CSV lines properly handling quoted values
  const parseCSVLine = (line) => {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  };

  // Load guides from CSV
  useEffect(() => {
    fetch(`/worksheets/worksheet_metadata.csv?v=${Date.now()}`)
      .then(res => res.text())
      .then(text => {
        const lines = text.split('\n').filter(line => line.trim());
        const headers = parseCSVLine(lines[0]);
        const data = lines.slice(1).map(line => {
          const values = parseCSVLine(line);
          const obj = {};
          headers.forEach((h, i) => {
            obj[h] = values[i] || '';
          });
          return obj;
        });
        
        // Filter for Parent Resources Guide items only
        const parentResourceGuides = data.filter(item => 
          item.Subject === 'Parent Resources Guide'
        ).map(item => ({
          title: item.Filename.trim(),
          description: item.Description || 'Parent resource guide',
          filename: `${item.Filename.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.pdf`
        }));
        
        setGuides(parentResourceGuides);
      })
      .catch(error => {
        console.error('Error loading guides:', error);
      });
  }, []);
  const organizationsAndWebsites = [
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
      category: "OT"
    },
    {
      title: "The OT Toolbox",
      description: "A website created by an occupational therapist that provides free resources for parents, teachers, and other occupational therapists.",
      website: "https://www.theottoolbox.com/category/free-resources/",
      category: "OT"
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
      category: "OT"
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
    },
    {
      title: "American Speech-Language-Hearing Association (ASHA)",
      description: "ASHA is the national, professional, scientific and credentialing association for audiologists and speech-language pathologists, dedicated to promoting high-quality services and advocating for people with speech, language, hearing and swallowing challenges. They have a range of family/parent resources including checklists of developmental milestones and tips for how families can support communication at home.",
      website: "https://www.asha.org",
      category: "Speech/Language"
    },
    {
      title: "National Stuttering Association (NSA)",
      description: "NSA is the largest nonprofit in the world focused on children and adults who stutter, offer peer support groups, educational tools, advocacy and research to help build confidence and community. They have a dedicated section for parents/families of children who stutter.",
      website: "https://westutter.org",
      category: "Speech/Language"
    },
    {
      title: "The Stuttering Foundation",
      description: "This nonprofit provides free online publications, videos and other resources for people who stutter and their families. They also support research into stuttering causes. They have free brochures, books and videos.",
      website: "https://www.stutteringhelp.org",
      category: "Speech/Language"
    }
  ];

  const tabs = ['Organizations & Websites', 'Guides'];

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#1E90D2' }}>
              Parent Resources
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Discover trusted organizations, websites, and helpful guides to support your child.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab Selection */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <h2 className="text-2xl font-semibold mb-8" style={{ color: '#1E90D2' }}>
            Choose a Resource Type
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-emerald-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 shadow-md hover:shadow-lg'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Organizations & Websites Content */}
      {activeTab === 'Organizations & Websites' && (
        <section className="max-w-6xl mx-auto px-4 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
              Trusted Organizations & Websites
            </h3>
            
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar Filter */}
              <div className="lg:w-64 flex-shrink-0">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Filter by Category
                  </h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.key}
                        onClick={() => setSelectedCategory(category.key)}
                        className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                          selectedCategory === category.key
                            ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-300 shadow-sm'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-transparent hover:border-gray-200'
                        }`}
                      >
                        <span className="text-xl mr-3">{category.icon}</span>
                        <div>
                          <div className="font-medium">{category.label}</div>
                          <div className="text-xs text-gray-500">
                            {organizationsAndWebsites.filter(org => org.category === category.key).length} items
                          </div>
                        </div>
                        {selectedCategory === category.key && (
                          <div className="ml-auto">
                            <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  
                  {/* Clear filter option */}
                  <button
                    onClick={() => setSelectedCategory('')}
                    className="w-full mt-4 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Show All Categories
                  </button>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1">
                {organizationsAndWebsites.filter(org => !selectedCategory || org.category === selectedCategory).length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">🔍</div>
                    <p className="text-gray-600 text-lg">
                      No organizations found for {selectedCategory ? categories.find(c => c.key === selectedCategory)?.label : 'this category'}
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {organizationsAndWebsites
                      .filter(org => !selectedCategory || org.category === selectedCategory)
                      .map((resource, idx) => (
                        <ResourceCard
                          key={idx}
                          {...resource}
                        />
                      ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Guides Content */}
      {activeTab === 'Guides' && (
        <section className="max-w-6xl mx-auto px-4 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
              Helpful Parent Guides
            </h3>
            
            {guides.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📄</div>
                <p className="text-gray-600 text-lg">
                  No guides available at this time
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {guides.map((guide, idx) => (
                  <GuideCard
                    key={idx}
                    {...guide}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </section>
      )}
    </div>
  );
}

export default ParentResources;
