import { Globe, Lock, ShieldCheck, Github, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

const Home = () => {
  const logged = Boolean(localStorage.getItem("token"))

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <main className="container mx-auto px-6">
        {/* Hero Section - Now centered and full-width */}
        <section className="pt-20 pb-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 mb-8 leading-tight">
              Democratizing Carbon Trading
            </h1>
            <div className="inline-block bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              Powered by Blockchain Technology
            </div>
            <p className="text-xl text-slate-700 mb-10 leading-relaxed max-w-3xl mx-auto">
              Transparent, secure, and accessible carbon credit trading powered by Ethereum (Sepolia Testnet). Empower
              your sustainability efforts with verifiable, tradable carbon credits.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link to="/login">
                <button className="group bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-4 rounded-full hover:from-indigo-700 hover:to-blue-700 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center gap-2 font-semibold">
                  {logged ? "Go to Dashboard" : "Get Started"}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <a href="https://github.com/aarushi-sharma-09/Blue-carbon-registry" target="_blank" rel="noreferrer">
                <button className="flex items-center gap-2 border-2 border-slate-300 text-slate-700 px-6 py-4 rounded-full hover:bg-slate-50 hover:border-slate-400 transition-all transform hover:scale-105 font-medium">
                  <Github size={20} />
                  <span>View Source Code</span>
                </button>
              </a>
            </div>

            <div className="text-sm text-slate-600">
              Smart Contract:
              <a
                href="https://sepolia.etherscan.io/address/0x15Ef15a50a2F72126EBcDC6989044Ce6ae322802"
                className="ml-2 font-mono text-indigo-600 hover:text-indigo-800 transition-colors underline decoration-dotted"
                target="_blank"
                rel="noreferrer"
              >
                View on Etherscan →
              </a>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Platform Features</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Built on cutting-edge blockchain technology to ensure transparency, security, and global accessibility
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl border border-white/50 transition-all hover:-translate-y-2">
              <div className="bg-gradient-to-br from-indigo-500 to-blue-500 text-white p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <Globe size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Global Carbon Market</h3>
              <p className="text-slate-600 leading-relaxed">
                Trade credits across international boundaries with seamless cross-border transactions and compliance
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl border border-white/50 transition-all hover:-translate-y-2">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <Lock size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Blockchain Security</h3>
              <p className="text-slate-600 leading-relaxed">
                Immutable and transparent transaction records secured by Ethereum's proven blockchain infrastructure
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl border border-white/50 transition-all hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Verified Credits</h3>
              <p className="text-slate-600 leading-relaxed">
                Every credit authenticated and traceable with comprehensive verification and audit trails
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white/60 backdrop-blur-sm border-t border-slate-200/50 px-6 py-8">
        <div className="container mx-auto text-center">
          <p className="text-slate-600">
            © 2024 Carbon Credits Platform. Powering a Sustainable Future through Blockchain Technology.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home




// import React from 'react';
// import { Globe, Lock, ShieldCheck, Github } from 'lucide-react';
// import { Link } from 'react-router-dom';


// const Home = () => {

//   const logged = Boolean(localStorage.getItem('token'));
//   // if(!token){

//   // }
//   // const decodedToken = jwtDecode(token);
//   // const logged = decodedToken.exp * 1000 < Date.now();

//   return (
//     // CHANGED: Background gradient to the new blue/indigo theme.
//     <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      

//       <main className="px-6 mt-16 flex-grow grid md:grid-cols-2 gap-12 items-center">

//         <div>
//           {/* CHANGED: Text colors to match the new theme. */}
//           <h2 className="text-5xl font-bold text-indigo-900 mb-6">
//             Democratizing Carbon Trading on the Blockchain
//           </h2>
//           <p className="text-xl text-indigo-800 mb-8">
//             Transparent, secure, and accessible carbon credit trading powered by Ethereum (Sepolia Testnet). 
//             Empower your sustainability efforts with verifiable, tradable carbon credits.
//             <br/>
//             View contract on <a href='https://sepolia.etherscan.io/address/0x15Ef15a50a2F72126EBcDC6989044Ce6ae322802'
//               // CHANGED: Link color.
//               className=" text-indigo-600 hover:text-blue-800" target="_blank" >
//                 Etherscan
//                 </a> 
//           </p>
//           <div className="flex space-x-4">
//             <Link to='/login'>
//                 {/* CHANGED: Main button color. */}
//                 <button className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition">
//                 {logged? 'Dashboard': 'Login'}
//                 </button>
//             </Link>
//             <a href='https://www.rogueone.us/projects/carbon-credits/' target='_blank'>
//             {/* CHANGED: Secondary button border and text colors. */}
//             <button className="border-2 border-indigo-600 text-indigo-700 px-6 py-3 rounded-full hover:bg-blue-50 transition">
//               Learn More
//             </button>
//             </a>
//             <a href='https://github.com/devansh-srv/Carbon-Credit/' target='_blank'>
//             <button className="border-2 border-indigo-600 text-indigo-700 px-6 py-3 rounded-full hover:bg-blue-50 transition">
//               <Github/>
//             </button>
//             </a>
//           </div>
//         </div>

//         <div className="bg-white/50 backdrop-blur-lg p-8 rounded-2xl shadow-2xl">
//            {/* CHANGED: Heading text color. */}
//           <h3 className="text-2xl font-semibold text-indigo-900 mb-6">Platform Features</h3>
//           <div className="space-y-4">
//             <div className="flex items-center space-x-4">
//                {/* CHANGED: Icon color. */}
//               <Globe className="text-indigo-600" size={40} />
//               <div>
//                 <h4 className="font-bold text-indigo-800">Global Carbon Market</h4>
//                 <p className="text-indigo-700">Trade credits across international boundaries</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <Lock className="text-indigo-600" size={40} />
//               <div>
//                 <h4 className="font-bold text-indigo-800">Blockchain Security</h4>
//                 <p className="text-indigo-700">Immutable and transparent transaction records</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <ShieldCheck className="text-indigo-600" size={40} />
//               <div>
//                 <h4 className="font-bold text-indigo-800">Verified Credits</h4>
//                 <p className="text-indigo-700">Every credit authenticated and traceable</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       <footer className="px-6 py-8 mt-16 text-center">
//          {/* CHANGED: Footer text color. */}
//         <p className="text-indigo-800">
//           © 2024 Carbon Credits. Powering Sustainable Future through Blockchain Technology.
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default Home;