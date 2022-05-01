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
    faCheckStyles: "absolute w-9 h-9 p-[6px] top-0 right-0 cursor-pointer rounded-full"
  }
}
export const dndPanelStyles = {
  container: "flex flex-wrap content-start gap-[2px] pb-1 mx-2 relative",
  splitContainer: "flex flex-grow place-content-center bg-[#44494d]",
  splitLeftPlaceholder: {
    placeholderLeftCon: "absolute flex justify-center items-center w-full h-96 select-none overflow-hidden",
    placeholderLeftText: "text-white text-2xl text-center px-10 opacity-40"
  },
  gutter: {
    gutterWidth: 64,
    gapW: 4,
    colCountForCheck: 5
  }
}