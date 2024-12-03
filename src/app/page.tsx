"use client"

import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShieldCheck, Database, Users, Search, FileSearch, Globe, Lock, Zap, ArrowRight } from 'lucide-react';
import { LoginButton } from "@/components/auth/login-button";
import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"]
})

export default function Home() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start(i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 }
    }));
  }, [controls]);

  const features = [
    { icon: ShieldCheck, title: "Real-Time Threat Detection", description: "Using machine learning to identify cybersecurity threats as they occur." },
    { icon: Search, title: "URL Scanning", description: "Scan and analyze URLs for potential security threats and malicious content." },
    { icon: FileSearch, title: "File Scanning", description: "Upload and scan files to detect viruses, malware, and other security risks." },
    { icon: Database, title: "Data Integration", description: "Integrates with VirusTotal API for enhanced threat intelligence." },
    { icon: Users, title: "User-Friendly Interface", description: "Designed for users of all technical levels to easily navigate." },
    { icon: Globe, title: "Global Threat Intelligence", description: "Access to a worldwide network of threat data and analysis." },
  ];

  const springConfig = {
    type: "spring",
    damping: 10,
    stiffness: 100
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-100 dark:from-gray-900 dark:to-blue-900">
      <nav className="container mx-auto p-6 flex justify-between items-center">
        <motion.div 
          className="flex items-center space-x-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={springConfig}
        >
          <Lock className="w-8 h-8 text-blue-600" />
          <span className={cn("text-2xl font-bold text-blue-600", poppins.className)}>SecureNet</span>
        </motion.div>
        <LoginButton>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" className="bg-white text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-300">
              Sign In
            </Button>
          </motion.div>
        </LoginButton>
      </nav>

      <header className="container mx-auto text-center py-20 px-6">
        <motion.h1 
          className={cn("text-5xl md:text-6xl font-bold mb-6 text-blue-600 dark:text-blue-400", poppins.className)}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springConfig}
        >
          Network Security Platform
        </motion.h1>
        <motion.p 
          className="text-xl mb-8 text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springConfig, delay: 0.2 }}
        >
          Real-time threat detection and intelligence for your systems.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springConfig, delay: 0.4 }}
        >
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
            Get Started <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
      </header>

      <section className="container mx-auto py-20 px-6">
        <motion.h2 
          className={cn("text-3xl md:text-4xl font-bold mb-12 text-center text-blue-600 dark:text-blue-400", poppins.className)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springConfig}
        >
          Protect Your Network with Powerful Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="p-6 h-full border-2 border-blue-100 dark:border-blue-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800">
                <feature.icon className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className={cn("text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400", poppins.className)}>{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-blue-600 dark:bg-blue-800 py-20 px-6">
        <div className="container mx-auto text-center">
          <motion.h2 
            className={cn("text-3xl md:text-4xl font-bold mb-6 text-white", poppins.className)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springConfig}
          >
            Take Action to Secure Your Network
          </motion.h2>
          <motion.p 
            className="text-xl mb-12 text-blue-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springConfig, delay: 0.2 }}
          >
            Our platform provides powerful tools to keep your network safe.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...springConfig, delay: 0.4 }}
            >
              <Card className="p-6 h-full bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                <Search className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
                <h3 className={cn("text-2xl font-semibold mb-2 text-blue-600", poppins.className)}>Scan URLs</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Analyze web addresses for potential threats and malicious content.</p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Start URL Scan
                </Button>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...springConfig, delay: 0.6 }}
            >
              <Card className="p-6 h-full bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                <FileSearch className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
                <h3 className={cn("text-2xl font-semibold mb-2 text-blue-600", poppins.className)}>Scan Files</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Upload and analyze files to detect viruses and security risks.</p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Start File Scan
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="container mx-auto py-20 px-6">
        <motion.h2 
          className={cn("text-3xl md:text-4xl font-bold mb-12 text-center text-blue-600 dark:text-blue-400", poppins.className)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springConfig}
        >
          See Our Platform in Action
        </motion.h2>
        <div className="relative w-full max-w-3xl mx-auto rounded-lg overflow-hidden shadow-2xl">
          {!isVideoPlaying && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-100"
                onClick={() => setIsVideoPlaying(true)}
              >
                <Zap className="mr-2" /> Play Demo
              </Button>
            </motion.div>
          )}
          <Image
            src="/placeholder.svg?height=450&width=800"
            alt="Video Thumbnail"
            width={800}
            height={450}
            className="w-full"
          />
          {isVideoPlaying && (
            <iframe
              width="100%"
              height="450"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Product Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          )}
        </div>
      </section>

      <footer className="bg-gray-100 dark:bg-gray-900 py-12 px-6">
        <div className="container mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            © 2023 SecureNet. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">Terms of Service</a>
            <a href="#" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">Privacy Policy</a>
            <a href="#" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">Contact Us</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

