import React from 'react';
import { Globe, Lock, ShieldCheck, Github } from 'lucide-react';
import { Link } from 'react-router-dom';


const Home = () => {

  const logged = Boolean(localStorage.getItem('token'));
  // if(!token){

  // }
  // const decodedToken = jwtDecode(token);
  // const logged = decodedToken.exp * 1000 < Date.now();

  return (
    // CHANGED: Background gradient to the new blue/indigo theme.
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      

      <main className="px-6 mt-16 flex-grow grid md:grid-cols-2 gap-12 items-center">

        <div>
          {/* CHANGED: Text colors to match the new theme. */}
          <h2 className="text-5xl font-bold text-indigo-900 mb-6">
            Democratizing Carbon Trading on the Blockchain
          </h2>
          <p className="text-xl text-indigo-800 mb-8">
            Transparent, secure, and accessible carbon credit trading powered by Ethereum (Sepolia Testnet). 
            Empower your sustainability efforts with verifiable, tradable carbon credits.
            <br/>
            View contract on <a href='https://sepolia.etherscan.io/address/0x15Ef15a50a2F72126EBcDC6989044Ce6ae322802'
              // CHANGED: Link color.
              className=" text-indigo-600 hover:text-blue-800" target="_blank" >
                Etherscan
                </a> 
          </p>
          <div className="flex space-x-4">
            <Link to='/login'>
                {/* CHANGED: Main button color. */}
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition">
                {logged? 'Dashboard': 'Login'}
                </button>
            </Link>
            <a href='https://www.rogueone.us/projects/carbon-credits/' target='_blank'>
            {/* CHANGED: Secondary button border and text colors. */}
            <button className="border-2 border-indigo-600 text-indigo-700 px-6 py-3 rounded-full hover:bg-blue-50 transition">
              Learn More
            </button>
            </a>
            <a href='https://github.com/devansh-srv/Carbon-Credit/' target='_blank'>
            <button className="border-2 border-indigo-600 text-indigo-700 px-6 py-3 rounded-full hover:bg-blue-50 transition">
              <Github/>
            </button>
            </a>
          </div>
        </div>

        <div className="bg-white/50 backdrop-blur-lg p-8 rounded-2xl shadow-2xl">
           {/* CHANGED: Heading text color. */}
          <h3 className="text-2xl font-semibold text-indigo-900 mb-6">Platform Features</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
               {/* CHANGED: Icon color. */}
              <Globe className="text-indigo-600" size={40} />
              <div>
                <h4 className="font-bold text-indigo-800">Global Carbon Market</h4>
                <p className="text-indigo-700">Trade credits across international boundaries</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Lock className="text-indigo-600" size={40} />
              <div>
                <h4 className="font-bold text-indigo-800">Blockchain Security</h4>
                <p className="text-indigo-700">Immutable and transparent transaction records</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ShieldCheck className="text-indigo-600" size={40} />
              <div>
                <h4 className="font-bold text-indigo-800">Verified Credits</h4>
                <p className="text-indigo-700">Every credit authenticated and traceable</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="px-6 py-8 mt-16 text-center">
         {/* CHANGED: Footer text color. */}
        <p className="text-indigo-800">
          © 2024 Carbon Credits. Powering Sustainable Future through Blockchain Technology.
        </p>
      </footer>
    </div>
  );
};

export default Home;