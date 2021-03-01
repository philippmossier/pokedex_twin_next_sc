import tw from 'twin.macro';

export const FlexContainer = tw.main`flex flex-col items-center pt-4`;

export const Header = tw.h1`text-3xl text-center pb-1`;
export const Number = tw.span`text-gray-400 ml-2`;

export const ImageContainer = tw.div`m-auto w-60 h-60 text-center`;
export const Image = tw.img`mt-1 max-w-full bg-transparent`;

export const DataTable = tw.table`min-w-full`;
export const TableBody = tw.tbody`text-left`;

export const StatsSection = tw.div`pt-2`;
export const Stat = tw.div`text-left font-bold capitalize`;
export const StatLabel = tw.div`pb-1`;

export const MovesSection = tw.div`pt-2`;
export const MoveList = tw.div`flex flex-col flex-wrap h-full md:h-screen`;
export const MoveItem = tw.div`px-1 border-solid`;
