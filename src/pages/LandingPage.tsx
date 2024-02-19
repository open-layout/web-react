import DynamicIsland from "@/components/ui/dynamicIsland";
import IconCopy from "@/assets/icon-copy.svg"
// import PresentationCard from "@/components/ui/presentationCard";

function LandingPage() {
   return(
      <main>
         <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

         <section className="grid place-items-center mt-40">
            <DynamicIsland />
            <div>
               <h1 className="text-white text-6xl mb-8 text-center justify-center items-center">
                  Welcome to <span className="text-title font-bold ">Open layouts</span>
               </h1>
               <p className="text-gray-400 font-[Raleway] pl-14 text-xl w-[80%]">
                  Awesome site to find your perfect <strong>Open Source</strong> layout for your personal site.
               </p>
            </div>
            <div className="pt-10 flex flex-row gap-5">
               <a
               className="px-8 py-3 bg-white rounded-full shadow-inner-xl"
               href="https://docs.openlayout.me/"
               target="_blank"
               >
                  Get started
               </a>
               <code className="bg-code text-white rounded-lg py-3 pl-5 pr-2 w-64 border border-title flex justify-between flex-row items-center">
               <p>
                  <span className="text-gray-400">$</span> npx openlayout<span className="animate-blink">|</span>
               </p>
               <img src={IconCopy} alt="Copy" className="w-6" />
               </code>

            </div>
         </section>



         <aside>

         </aside>
         
         
         
         
         
         
         
         
         
         
         
         {/* <div className="flex flex-row gap-10">
            <PresentationCard title="IMXNOOBX" body="desc1." href="https://youtube.com" />
            <PresentationCard title="Angle" body="desc2." href="https://youtube.com" />
            <PresentationCard title="Azaldev" body="desc3." href="https://youtube.com" />
         </div> */}
      </main>
   )
}

export default LandingPage;
