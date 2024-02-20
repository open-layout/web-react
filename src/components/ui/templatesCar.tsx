import React from "react";
import webicon from '@/assets/web.png'
import reacticon from '@/assets/react.png'

const TemplatesCard: React.FC= () => {
  return (
    
    <article className="group text-white backdrop-blur-md border border-title px-3 py-4 rounded-xl w-80  relative flex flex-col gap-4">
      <div className="p-2 flex flex-col bg-title/80 rounded-md text-center ">
        <h2 className="text-xl">Plantilla 1</h2>
        </div>
        <div className="flex justify-between items-center">
          <img
            className=" rounded-md border border-title shadow-2xl h-32 w-full bg-slate-400"
            src={webicon}
            
          />
          
        </div>
        <div className="text-white text-md flex justify-between items-center pl-1">
            <img src={reacticon} className="w-6"/>
            <p >2024/2/19</p>
          </div>
      
      <p className="text-white text-sm pl-1">asdadadadasdasda</p>
      <a  target="_blank" className=""></a>
      <div className="flex flex-row gap-5 justify-between">
        <a
          className="px-8 py-3 bg-blue-500 text-white rounded-full shadow-inner-xl font-semibold"
        
          target="_blank">
          Github
        </a>
        <a
          className="px-8 py-3 bg-green-500 text-white rounded-full shadow-inner-xl font-semibold   "
        
          target="_blank">
          +
        </a>
      </div>
    </article>
  );
};

export default TemplatesCard;
