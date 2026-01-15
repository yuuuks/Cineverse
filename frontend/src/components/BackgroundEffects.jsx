import React from 'react';

export default function BackgroundEffects() {
  return (
    <>
      {/* Gradient mesh background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 -left-20 w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-float"></div>
        <div 
          className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-cyan-500 rounded-full mix-blend-screen filter blur-[120px] opacity-15 animate-float-delayed"
        ></div>
        <div 
          className="absolute bottom-0 left-1/3 w-[550px] h-[550px] bg-pink-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-float-slow"
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-15 animate-float"
          style={{ animationDelay: '3s' }}
        ></div>
        
        {/* Subtle grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>

        {/* Radial gradient vignette */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(9, 9, 11, 0.4) 100%)'
          }}
        ></div>

        {/* Animated light streaks */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-20 animate-slide-right"></div>
        <div 
          className="absolute bottom-20 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-20 animate-slide-left"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-40px, 30px) scale(0.95);
          }
          66% {
            transform: translate(30px, -20px) scale(1.05);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          50% {
            transform: translate(-30px, -30px) rotate(5deg) scale(1.1);
          }
        }

        @keyframes slide-right {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes slide-left {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 30s ease-in-out infinite;
        }

        .animate-slide-right {
          animation: slide-right 8s linear infinite;
        }

        .animate-slide-left {
          animation: slide-left 10s linear infinite;
        }
      `}</style>
    </>
  );
}