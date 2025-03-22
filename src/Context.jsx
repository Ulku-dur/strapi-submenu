import { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({children}) => {
 const [isSidebarOpen, setIsSidebarOpen] = useState(false);   
 const [pageId, setPageId] = useState(null);

 const openSidebar = () => {
    setIsSidebarOpen(true); 
 }

 const closeSidebar = () => {
    setIsSidebarOpen(false); 
 };
 return <AppContext.Provider value={{isSidebarOpen, openSidebar, closeSidebar, pageId, setPageId}}>
    {children}
 </AppContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
    return useContext(AppContext);
};