import React from "react";
import {Link } from "react-router-dom";

const Footer = () => {
    return(
        <div className="container-fluid w-full z-10 inline-block bg-white">
            <hr className="mt-7 w-full mx-auto border-rose-500"></hr>
            <div className="h-auto w-full">
            <div className="h-fit w-5/6 mx-auto">
                <div className="h-10 w-full mt-10">
                <h2 className="text-3xl text-rose-500 text-center">Cảm ơn đã ghé thăm web của mình</h2>    
                </div>
                <div className="h-10 w-full mt-3 inline-block">
                    <div className="w-fit sm:w-2/4 mx-auto">
                    <Link to="/"><div className="text-lg my-3 mt-10 md:mt-3 mx-5 font-sans hover:text-rose-500 text-center">Trang chính</div></Link>
                    <Link to="/aboutme"><div className="text-lg my-3 mx-5 font-sans hover:text-rose-500 text-center">Tôi là ai?</div></Link>
                    <Link to="/blogs"><div className="text-lg my-3 mx-5 font-sans hover:text-rose-500 text-center">Blog</div></Link>
                    </div>
                </div>
                <div className="h-10 w-full mt-10">
                <div className="justify-items-center w-1/4 mx-auto grid grid-cols-3">
                    <a href="https://www.facebook.com/tea.limho/" target="_blank" rel="noreferrer"><img className="h-full ..." src="/img/icon/icon_fb.svg" alt="FBIcon"></img></a>
                    <a href="https://www.instagram.com/millohh_/" target="_blank" rel="noreferrer"><img className="h-full ..." src="/img/icon/icon_insta.svg" alt="InstagramIcon"></img></a>
                    <a href="https://github.com/holimm" target="_blank" rel="noreferrer"><img className="h-full ..." src="/img/icon/icon_github.svg" alt="GitIcon"></img></a>
                </div>
                </div>
                <div className="h-10 w-full mt-10">
                <h2 className="text-md text-black text-center pb-16">Bản quyền thuộc về &#169; Nguyễn Lim Thái Hồ</h2>    
                </div>
            </div>
            </div>
        </div>
    );
}

export default Footer;