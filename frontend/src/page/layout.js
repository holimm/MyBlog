import React from 'react';
import Header from './header';
import { Outlet } from "react-router-dom";

const Layout = () => {
    function RenderWallpaper(){
        return (
        <div className="w-full h-full">
            <div className="bg-container w-full" style={{height: '100vh'}}>
            <div className="bg-cover bg-left sm:bg-center h-full" style={{backgroundImage: "url('img/blog-wallpaper.jpg')"}}>
                <Header />
            </div>
            </div>
        </div>
        );
    }
    return(
        <>
        <RenderWallpaper/>
        <Outlet/>
        </>
    );
}

export default Layout;