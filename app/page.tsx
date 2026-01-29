import Link from 'next/link';
import { Shield, Clock, CheckCircle, BarChart3, Send, Users, Globe, ChevronDown, Search } from 'lucide-react';
import SubmissionForm from '@/components/SubmissionForm';

export default function LandingPage() {
  const trustIndicators = [
    { icon: Shield, label: 'Secure Submissions', sublabel: 'End-to-end encryption' },
    { icon: Clock, label: '24/7 Availability', sublabel: 'Submit anytime' },
    { icon: CheckCircle, label: 'Instant Confirmation', sublabel: 'Tracking ID provided' },
    { icon: BarChart3, label: 'Real-Time Status', sublabel: 'Monitor progress' }
  ];

  const processSteps = [
    { step: '01', title: 'Submit', desc: 'Fill out the form and upload your documents through our secure portal.', icon: Send },
    { step: '02', title: 'Confirm', desc: 'Receive instant confirmation with a unique tracking ID via email.', icon: CheckCircle },
    { step: '03', title: 'Process', desc: 'Our team reviews and routes your submission to the appropriate department.', icon: Users },
    { step: '04', title: 'Resolve', desc: 'Track progress in real-time and receive notifications on updates.', icon: Globe }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-20 relative overflow-hidden mesh-gradient pattern-overlay">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Left: Content - 50% */}
            <div className="w-full lg:w-1/2 space-y-5 opacity-0 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse-glow"></span>
                Official Digital Gateway
              </div>
              
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-emerald-950 leading-tight">
                Submit to NDDC
                <span className="block text-emerald-600">Digitally & Securely</span>
              </h1>
              
              <p className="text-base text-stone-600 max-w-md leading-relaxed">
                The official portal for all proposals, reports, requests and feedback to the Niger Delta Development Commission. Every submission is tracked, timestamped, and processed transparently.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {trustIndicators.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-emerald-900 text-sm">{item.label}</p>
                      <p className="text-stone-500 text-xs">{item.sublabel}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-5 pt-4 border-t border-stone-200">
                {/* <div>
                  <p className="font-display text-2xl font-semibold text-emerald-700">10K+</p>
                  <p className="text-stone-500 text-xs">Submissions Processed</p>
                </div> */}
                <div className="w-px h-10 bg-stone-200"></div>
                <div>
                  <p className="font-display text-2xl font-semibold text-emerald-700">48hr</p>
                  <p className="text-stone-500 text-xs">Avg. Response Time</p>
                </div>
                <div className="w-px h-10 bg-stone-200"></div>
                {/* <div>
                  <p className="font-display text-2xl font-semibold text-emerald-700">9</p>
                  <p className="text-stone-500 text-xs">State Offices</p>
                </div> */}
              </div>
            </div>

            {/* Right: Form Card - 50% */}
            <div className="w-full lg:w-1/2 opacity-0 animate-slide-in delay-200">
              <SubmissionForm />
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <a href="#process" className="flex flex-col items-center gap-2 text-stone-400 hover:text-emerald-600 transition-colors">
              <span className="text-sm">Learn more about the process</span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </a>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">How It Works</span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-emerald-950 mt-3">
              Simple, Transparent Process
            </h2>
            <p className="text-stone-600 mt-4 max-w-2xl mx-auto">
              From submission to resolution, every step is tracked and visible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {processSteps.map((item, i) => (
              <div key={i} className="relative group">
                <div className="bg-stone-50 rounded-2xl p-6 hover:bg-emerald-50 transition-colors border border-stone-100 hover:border-emerald-200 h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-white rounded-xl shadow-md flex items-center justify-center flex-shrink-0 group-hover:shadow-lg transition-shadow">
                      <item.icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <span className="font-display text-3xl font-bold text-emerald-200">{item.step}</span>
                      <h3 className="font-display text-lg font-semibold text-emerald-900 mt-1">{item.title}</h3>
                      <p className="text-stone-600 mt-2 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-stone-50 to-emerald-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-emerald-950">
            Already Submitted?
          </h2>
          <p className="text-stone-600 mt-4 text-lg">
            Track your submission status using your tracking ID
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link 
              href="/track"
              className="bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/30"
            >
              Track Submission
              <Search className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
