import React from 'react';
import { motion } from "framer-motion";

const FeatureCard = ({ image, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="rounded-2xl shadow-lg p-6 bg-white/90 backdrop-blur border border-gray-100"
  >
    <div className="flex items-center gap-3 mb-3">
      {image && (
        <img
          src={image}
          alt={title}
          className="h-12 w-12 rounded-lg"
          style={{ objectFit: 'contain' }}
        />
      )}
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="text-gray-700 leading-relaxed">{children}</p>
  </motion.div>
);

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-emerald-50 text-gray-900">

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-3xl md:text-4xl font-bold leading-tight mb-4"
            >
              SLAM's goal is to provide you with tools and resources to make learning at home joyful and meaningful.
            </motion.h1>
            <div className="mt-6 flex gap-3">
              <a href="/parent-resources" className="px-4 py-2 rounded-xl shadow bg-emerald-600 text-white hover:bg-emerald-700">
                Explore Parent Resources
              </a>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl border border-gray-200 shadow-inner flex items-center justify-center overflow-hidden" style={{backgroundColor: '#F6F6F6'}}>
              <img
                src="/images/slam-logo.png"
                alt="SLAM Home Learning logo"
                className="w-full h-full object-contain p-8"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Principles */}
      <section id="principles" className="bg-white/70 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto text-xl font-semibold">
            At the heart of everything we do at SLAM, we follow three guiding principles which shape the way we support families.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              title="Playful"
              image="/images/kite.svg"
            >
              Children thrive when learning feels like fun rather than work. That's why we suggest activities and games that spark curiosity, laughter, and joy. When kids are engaged in play, they're more open to practicing new skills with less stress.
            </FeatureCard>
            <FeatureCard
              title="Experienced"
              image="/images/tree.svg"
            >
              Our ideas are built on years of experience in education, a deep understanding of child development, and practical knowledge of how schools teach reading and math. Everything we share is grounded in trusted, research-based approaches so you can feel reassured that your child is getting meaningful support.
            </FeatureCard>
            <FeatureCard
              title="Empowering"
              image="/images/hands.svg"
            >
              Parents play the most important role in a child’s learning journey. We aim to give you the tools, knowledge, and encouragement you need to feel confident guiding your child. When parents feel empowered, children have a greater chance of thriving in school and beyond.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* Reading & Math quick links */}
      <section id="reading" className="bg-white/70 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Reading</h2>
            <p className="text-gray-700 mb-4">
              Practical tips, activities, and printables to build phonics, fluency, and comprehension from kindergarten through 2nd grade.
            </p>
            <div className="flex gap-3">
              <a href="/reading" className="px-4 py-2 rounded-xl shadow bg-emerald-600 text-white hover:bg-emerald-700">
                Printable Activities
              </a>
            </div>
          </div>
          <div id="math">
            <h2 className="text-2xl font-semibold mb-2">Math</h2>
            <p className="text-gray-700 mb-4">
              Simple, playful games and everyday strategies to strengthen number sense and early problem-solving skills in your child.
            </p>
            <div className="flex gap-3">
              <a href="/math" className="px-4 py-2 rounded-xl shadow bg-emerald-600 text-white hover:bg-emerald-700">
                At-Home Games
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center text-sm text-gray-500 py-8">
        © {new Date().getFullYear()} SLAM • Joyful, manageable, meaningful learning at home
      </footer>
    </div>
  );
}

export default Home;
