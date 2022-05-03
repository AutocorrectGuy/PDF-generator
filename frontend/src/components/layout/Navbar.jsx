import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from "@fortawesome/free-solid-svg-icons"
const btnCL = "text-gray-700 text-center bg-gray-400 px-4 py-2 m-2 rounded-md cursor-pointer";
const faSearchStyles = "w-6 h-6 pl-2 pr-3 text-neutral-500 hover:text-[#0873BB] cursor-pointer rounded-full"


export default function Navbar() {
  
  // function OutputLog({data}) {
  //   return(
  //     <div className="absolute top-10 z-10 flex flex-col">
  //       {data.map(({h1}, i)=> {
  //         return (
  //           <div key={`data-${i}`} className="flex bg-slate-600 text-white p-2">
  //             {h1}
  //           </div>
  //         )
  //       })}
  //     </div>
  //   )
  // } 

  return(
    <div className="flex flex-row items-center py-1 justify-between bg-white shadow-xs">
      <div className="ml-8 text-lg text-gray-700 hidden md:flex">Sveicināts!</div>
        <div className="flex flex-row mr-4 ml-4 md:hidden">
          <FontAwesomeIcon icon={faBars} className={faSearchStyles}/>
        </div>
        <div className="hidden md: flex-row md:mr-8  md:flex">
          <a className={btnCL} onClick={(e) => openWindow(e)} >Pagaidu datu avots</a>
        </div>
    </div>
  );

  function openWindow(e) {
    window.open("https://raw.githubusercontent.com/AutocorrectGuy/PDF-generator/main/frontend/src/DB_test.json", "_blank")
  }
}