import {Poppins} from "next/font/google";
import {cn} from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// Import your desired Lucide icons
import { ShieldCheck, Database, Users, Info } from 'lucide-react';
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Home() {
  return (
    <main className="bg-gray-50 h-full flex flex-col justify-center items-center text-center p-6">
      <div className="space-y-6 text-center">
        <h1 className={cn("text-4xl font-bold mb-4 animate-fade-in drop-shadow-md text-blue-600", font.className,)}>
          Network Security Platform
        </h1>
        <p className="text-lg animate-fade-in delay-100 text-blue-500">
            Real-time threat detection and intelligence for your systems.
        </p>
      </div>
      <div className="">
        <LoginButton>
          <Button className="bg-blue-900" size="lg">Sign in</Button>
        </LoginButton>
      </div>
      
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 container mx-auto">
        <Card className="p-6 border rounded-lg shadow-md transition-transform transform hover:scale-105">
          <ShieldCheck className="w-10 h-10 text-blue-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Real-Time Threat Detection</h2>
          <p>Using machine learning to identify cybersecurity threats as they occur.</p>
        </Card>
        <Card className="p-6 border rounded-lg shadow-md transition-transform transform hover:scale-105">
          <Database className="w-10 h-10 text-green-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Data Integration</h2>
          <p>Integrates with VirusTotal API for enhanced threat intelligence.</p>
        </Card>
        <Card className="p-6 border rounded-lg shadow-md transition-transform transform hover:scale-105">
          <Users className="w-10 h-10 text-purple-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">User-Friendly Interface</h2>
          <p>Designed for users of all technical levels to easily navigate.</p>
        </Card>
        <Card className="p-6 border rounded-lg shadow-md transition-transform transform hover:scale-105">
          <Info className="w-10 h-10 text-orange-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Localized Solutions</h2>
          <p>Tailored for organizations in Maiduguri, Nigeria.</p>
        </Card>
      </div>
      <Button className="mt-8 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 animate-bounce">
        Get Started
      </Button>
    </main>
  );
}