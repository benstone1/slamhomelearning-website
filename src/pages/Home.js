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
              style={{ color: '#1E90D2' }}
            >
              SLAM (Supporting Literacy And Math) provides you with tools and resources to make learning at home fun.
            </motion.h1>
            <div className="mt-6 flex gap-3">
              <a href="/videos" className="px-4 py-2 rounded-xl shadow text-white hover:opacity-90 transition-opacity" style={{backgroundColor: '#F9281B'}}>
                Explore SLAM Videos
              </a>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl bg-white border border-gray-200 shadow-inner flex items-center justify-center overflow-hidden">
              <img
                src="/images/slam-logo_new.png"
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
          <p className="text-center mb-8 max-w-2xl mx-auto text-2xl font-semibold" style={{ color: '#1E90D2' }}>
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
              title="Research-Based"
              image="/images/science.svg"
            >
              Our ideas are built on years of experience in education, a deep understanding of child development, and practical knowledge of how schools teach reading and math. Everything we share is grounded in trusted, research-based approaches so you can feel reassured that your child is getting meaningful support.
            </FeatureCard>
            <FeatureCard
              title="Accessible"
              image="/images/open_door.svg"
            >
              Parents play the most important role in a child’s learning journey. We aim to give you the tools, knowledge, and encouragement you need to feel confident guiding your child. When parents feel empowered, children have a greater chance of thriving in school and beyond.
            </FeatureCard>
          </div>
        </div>
      </section>

      <footer className="text-center text-sm text-gray-500 py-8">
        © {new Date().getFullYear()} SLAM • Supporting Literacy And Math Learning at Home
      </footer>
    </div>
  );
}

export default Home;
