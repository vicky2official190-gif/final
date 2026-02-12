import React from 'react';
import { ArrowLeft, Users, Target, Zap, Code, Heart, CheckCircle, ExternalLink } from 'lucide-react';

interface AboutProps {
  onNavigate: (view: 'store' | 'about' | 'admin') => void;
}

const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: Users,
      title: "Community Focused",
      description: "Connecting learners and educators with the tools they need to succeed"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance for seamless browsing and instant access"
    },
    {
      icon: Code,
      title: "Open Ecosystem",
      description: "Supporting developers with APIs and integrations"
    },
    {
      icon: Heart,
      title: "User Centric",
      description: "Designed with your feedback and learning journey in mind"
    }
  ];

  const milestones = [
    { year: "2020", achievement: "Platform Launch" },
    { year: "2021", achievement: "1M+ Users" },
    { year: "2022", achievement: "10M+ Downloads" },
    { year: "2024", achievement: "2.8M Active Learners" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#131520] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('store')}
          className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold mb-12 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Store
        </button>

        {/* Hero Section */}
        <div className="mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-500/30 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
            About Us
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
            Empowering Education,<br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
              One App at a Time
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed font-medium">
            AS Universe is a premier educational app marketplace dedicated to connecting learners with powerful tools for knowledge, skill development, and personal growth. We believe education should be accessible, engaging, and transformative.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group bg-white dark:bg-[#1c1f2e] border border-gray-200 dark:border-white/5 rounded-2xl p-8 hover:border-indigo-500 dark:hover:border-indigo-500/50 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="text-indigo-600 dark:text-indigo-400" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mission Section */}
        <div className="bg-white dark:bg-[#1c1f2e] border border-gray-200 dark:border-white/5 rounded-3xl p-12 mb-16 shadow-lg dark:shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            To create an inclusive, innovative platform that democratizes access to quality educational apps and learning resources. We aim to inspire lifelong learners by providing curated, reliable, and transformative tools that help individuals unlock their true potential.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-white/5">
            {[
              { icon: Target, label: "Quality", desc: "Carefully curated apps" },
              { icon: Users, label: "Community", desc: "Engaged user base" },
              { icon: Zap, label: "Innovation", desc: "Cutting-edge technology" }
            ].map((item, idx) => {
              const ItemIcon = item.icon;
              return (
                <div key={idx} className="text-center">
                  <ItemIcon className="text-indigo-500 dark:text-indigo-400 mx-auto mb-3" size={32} />
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">{item.label}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Milestones */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Our Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {milestones.map((milestone, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#1c1f2e] border border-gray-200 dark:border-white/5 rounded-2xl p-6 text-center hover:shadow-lg dark:hover:shadow-2xl transition-all group hover:border-indigo-500 dark:hover:border-indigo-500/50"
              >
                <div className="text-4xl font-black bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  {milestone.year}
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  {milestone.achievement}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 dark:from-indigo-500/5 dark:to-cyan-500/5 border border-indigo-200 dark:border-indigo-500/20 rounded-3xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Our Core Values
          </h2>
          <div className="space-y-4">
            {[
              "Accessibility - Education should be available to everyone",
              "Excellence - We maintain high standards in everything we do",
              "Innovation - We continuously evolve and improve",
              "Integrity - We operate with transparency and honesty",
              "Impact - We measure success by the positive change we create"
            ].map((value, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <CheckCircle className="text-green-600 dark:text-green-400 shrink-0 mt-1" size={24} />
                <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact/Social Section */}
        <div className="bg-white dark:bg-[#1c1f2e] border border-gray-200 dark:border-white/5 rounded-3xl p-12 text-center shadow-lg dark:shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
            Have feedback, suggestions, or want to contribute? We'd love to hear from you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <a
              href="https://whatsapp.com/channel/0029Vb6zTvX6RGJAjEHiAC0u/108"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg dark:shadow-none"
            >
              WhatsApp <ExternalLink size={18} />
            </a>
            <a
              href="https://t.me/+kDo-4-vpWLNlZGFl"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg dark:shadow-none"
            >
              Telegram <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
