import React from 'react';
import { motion } from 'framer-motion';

const platforms = [
  { name: 'YouTube', detail: 'Watch the video podcast' },
  { name: 'Spotify', detail: 'Listen on Spotify' },
  { name: 'Apple Podcasts', detail: 'Listen on Apple Podcasts' }
];

const episodes = [
  {
    number: '01',
    title: 'Welcome to From Classroom to Home',
    description: 'In this brief introductory episode, I share a little about my background, why I created From Classroom to Home, and what you can expect from the podcast.'
  },
  {
    number: '02',
    title: "Understanding Your Child's Reading Progress",
    description: "How do you know if your child is on track with reading? In this episode, I am joined by Alexandra Needle, a Reading Specialist who currently works as a Curriculum Designer with McGraw Hill Publishing, to talk about how reading typically develops from kindergarten through second grade.",
    points: [
      'The reading skills children should have by the end of each grade',
      'What might cause a teacher to have concerns about a child\'s progress',
      'Simple activities you can do at home to support your child\'s reading'
    ]
  }
];

function Podcast() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-emerald-50 text-gray-900">
      <section className="relative overflow-hidden border-b border-gray-200 bg-white/75">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr] md:py-20">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-sky-600">A SLAM podcast</p>
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-6xl">
              From <span className="text-red-600">Classroom</span> to <span className="text-sky-600">Home</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-sky-700 sm:text-xl">
              Learn more about your child&apos;s learning and school experience through conversations with experts.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.15 }} className="flex justify-center md:justify-end">
            <img src="/images/FCH_Podcast%20Art.png" alt="From Classroom to Home podcast artwork" className="h-auto w-full max-w-sm object-contain" />
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mb-12">
          <h2 className="mb-5 text-3xl font-bold text-sky-700">From Classroom to Home</h2>
          <p className="text-lg leading-relaxed text-gray-700">From Classroom to Home is a podcast from Supporting Literacy And Math (SLAM) for parents of children in kindergarten through second grade.</p>
          <p className="mt-5 text-lg leading-relaxed text-gray-700">In each episode, I am joined by an expert guest to talk about an important part of your child&apos;s school experience, helping you better understand what is happening in the classroom and offering helpful ideas for supporting your child at home.</p>
        </motion.div>

        <div className="mb-12 border-y border-gray-200 py-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div><p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-red-600">Listen soon</p><h2 className="text-3xl font-bold text-gray-900">Find the podcast</h2></div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {platforms.map((platform) => (
              <div key={platform.name} className="flex items-center justify-between gap-4 border border-gray-200 bg-white p-4 shadow-sm">
                <div><p className="font-bold text-gray-900">{platform.name}</p><p className="text-sm text-gray-600">{platform.detail}</p></div>
                <span className="shrink-0 text-xs font-bold uppercase tracking-wide text-red-600">Coming soon</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-sky-600">Episodes</p>
          <h2 className="mb-7 text-3xl font-bold text-gray-900">Conversations you can use at home</h2>
          <div className="space-y-5">
            {episodes.map((episode) => (
              <motion.article key={episode.number} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45 }} className="border border-gray-200 bg-white p-6 shadow-md sm:p-8">
                <div className="flex gap-5"><span className="text-3xl font-bold text-red-600">{episode.number}</span><div><h3 className="mb-3 text-xl font-bold text-gray-900">{episode.title}</h3><p className="leading-relaxed text-gray-700">{episode.description}</p>{episode.points && <ul className="mt-5 space-y-3 text-gray-700">{episode.points.map((point) => <li key={point} className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />{point}</li>)}</ul>}</div></div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Podcast;