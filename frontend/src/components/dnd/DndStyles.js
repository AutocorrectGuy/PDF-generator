export const cardSizes = [ 
  { 
    width: 225,
    card: `w-[225px] h-[96px] text-[8px] leading-[9px]`, 
    h1: `h-7`
  },
  { 
    width: 300,
    card: `w-[300px] h-[128px] text-[11px] leading-[14px]`, 
    h1: `h-9`
  } 
];
export const cardStyles = {
  card: `flex flex-row bg-white hover:bg-neutral-100 border border-black cursor-grab select-none rounded-sm font-OpenSans shadow-md shadow-[#2D2D30]`,
  h1: `h-9 flex items-center bg-[#0873BB] text-white px-1`,
  icons: {
    faTrashCanStyles: "absolute w-6 h-6 p-[6px] top-0 right-0 text-neutral-200 hover:text-red-600 cursor-pointer rounded-full",
    faCheckStyles: "absolute w-9 h-9 p-[6px] top-0 right-0 cursor-pointer rounded-full",
    faSearchStyles: "w-3 h-3 text-neutral-500 translate-y"
  }
}
export const dndPanelStyles = {
  container: "flex flex-wrap content-start gap-[2px] pb-1 mx-2 relative",
  splitContainer: "flex flex-grow place-content-center bg-[#44494d]",
  splitLeftPlaceholder: {
    placeholderLeftCon: "absolute flex justify-center items-center w-full h-96 select-none overflow-hidden",
    placeholderLeftText: "text-white text-2xl text-center opacity-40",
    placeholderLeftCount: "text-white text-lg text-left pt-2 pl-2 opacity-10 select-none"
  },
  gutter: {
    gutterWidth: 64,
    gapW: 4,
    colCountForCheck: 5
  },
  dropdowns: {
    list: {
      btnClass: "h-full whitespace-nowrap flex items-center justify-end bg-neutral-700 text-neutral-400 px-2 gap-1 h-full relative cursor-pointer hover:bg-[#464646] select-none shadow-sm shadow-neutral-800 active:shadow-none",
      menuClass: "bg-neutral-700 rounded-sm overflow-hidden absolute top-[41px] left-0 z-20 shadow-sm shadow-neutral-800 select-none min-w-full",
      menuItemClass: "flex items-center justify-start text-neutral-400 px-2 h-9 relative cursor-pointer hover:text-white select-none whitespace-nowrap",
      iconLeftCass: "w-5 h-5 pointer-events-none",
      iconRightCass: "w-3 h-3 text-neutral-400 -translate-y-[2px] select-none pointer-events-none",
    },
    item: {
      btnClass: "flex items-center justify-end bg-neutral-700 text-neutral-400 px-2 gap-1 h-full relative cursor-pointer hover:bg-[#464646] select-none",
      menuClass: "bg-neutral-700 rounded-sm overflow-hidden absolute top-[41px] right-0 z-20 shadow-sm shadow-neutral-800 select-none",
      menuItemClass: "flex items-center justify-start text-neutral-400 px-2 h-9 relative cursor-pointer hover:text-white select-none whitespace-nowrap",
      iconRightCass: "w-3 h-3 text-neutral-400 -translate-y-[2px] select-none pointer-events-none",
    }
  },
  searchBar: {
    searchBarContainer: "flex w-full justify-center items-center bg-[#323639] pt-1 pb-3 px-2 mb-3 gap-2 rounded-sm",
    searchBarInputContainer: "relative flex min-w-[1px] max-w-[450px] flex-grow items-center h-9 bg-neutral-700 rounded-sm shadow-sm shadow-neutral-800 active:shadow-none",
    sarchBarBtnKatalogs: "flex items-center justify-center w-6 h-9 bg-neutral-700 rounded-sm hover:bg-[#464646] active:bg-neutral-800",
    sarchBarInputDOM: "flex-grow min-w-[1px] h-full px-2 bg-[#535353] text-white placeholder:text-neutral-300 rounded-sm focus:outline-none"
  }
}