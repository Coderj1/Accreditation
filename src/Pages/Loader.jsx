import { Bot } from 'lucide-react';
import React from 'react'
import imgprt from '../img/acrre.png'

export default function Loader() {
  return (
     <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900">
      <img src={imgprt} className="w-24 h-30 animate-float" />
      {/* <p className="mt-4 text-slate-300 tracking-widest animate-loading font-bold">LOADING.....</p> */}
    </div>
  );
}
