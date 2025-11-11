import React from 'react';
import { Shield, Microscope, FileCheck, Globe } from 'lucide-react';

function Quality() {
  return (
    <div data-testid="quality-page">
      {/* Page Header */}
      <section className="page-header" style={{ backgroundImage: 'url(/assets/hero_image.jpg)' }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Quality Assurance</h1>
          <p className="text-xl md:text-2xl">Excellence in Every Ingredient</p>
        </div>
      </section>

      {/* Quality Promise */}
      <section className="py-20 bg-white dark:bg-black" data-testid="quality-promise">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="w-16 h-16 text-rk-green mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Quality Promise</h2>
            <div className="w-24 h-1 bg-rk-green mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              At RawKart, quality is not just a standard—it's our unwavering commitment to you. Every ingredient we supply undergoes rigorous testing and verification processes to ensure it meets the highest standards of purity, safety, and efficacy. Our quality assurance program is built on scientific rigor, transparency, and continuous improvement.
            </p>
          </div>
        </div>
      </section>

      {/* Quality Pillars */}
      <section className="py-20 bg-gray-50 dark:bg-black" data-testid="quality-pillars">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Four Pillars of Quality</h2>
            <div className="w-24 h-1 bg-rk-green mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center">
              <Globe className="w-12 h-12 text-rk-green mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Sourcing Excellence</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We partner with certified suppliers worldwide, conducting regular audits and maintaining complete supply chain transparency.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center">
              <Microscope className="w-12 h-12 text-rk-green mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Laboratory Testing</h3>
              <p className="text-gray-600 dark:text-gray-300">
                State-of-the-art testing facilities perform comprehensive analysis including identity, purity, potency, and contamination testing.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center">
              <FileCheck className="w-12 h-12 text-rk-green mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Certification & Compliance</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Full compliance with FDA, EFSA, and international standards, with comprehensive documentation for every batch.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center">
              <Shield className="w-12 h-12 text-rk-green mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Traceability</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Complete batch tracking from raw material to final delivery, enabling full product recall capability if needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testing Standards */}
      <section className="py-20 bg-white dark:bg-black" data-testid="testing-standards">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">Comprehensive Testing Standards</h2>
            <div className="w-24 h-1 bg-rk-green mx-auto mb-12"></div>
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Identity & Purity Testing</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Using advanced analytical methods including HPLC, GC-MS, and spectroscopy to verify ingredient identity and assess purity levels.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Microbiological Analysis</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Comprehensive microbial testing to ensure products are free from harmful bacteria, yeast, mold, and other pathogens.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Heavy Metals & Contaminants</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Rigorous screening for heavy metals, pesticides, and other environmental contaminants to ensure ingredient safety.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Stability & Shelf Life</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Long-term stability studies to determine optimal storage conditions and accurate expiration dating.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-gray-50 dark:bg-black" data-testid="certifications">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Industry Certifications</h2>
            <div className="w-24 h-1 bg-rk-green mx-auto mb-12"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                <p className="font-bold text-gray-900 dark:text-white">ISO 9001:2015</p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                <p className="font-bold text-gray-900 dark:text-white">GMP Certified</p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                <p className="font-bold text-gray-900 dark:text-white">HACCP</p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                <p className="font-bold text-gray-900 dark:text-white">FSSC 22000</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Quality;