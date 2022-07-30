import React from "react";
import Header from "./header";
import Footer from "../constant/footer";
import FormWriteBlog from "./view/writeblogform";

function WriteBlog(){
    return(
        <>
        <Header/>
        <hr className="border-rose-500 mt-2"></hr>
        <div className="w-5/6 md:w-3/6 h-full mt-12 mx-auto">
            <div className="w-full h-fit">
                  <FormWriteBlog/>
            </div>
        </div>
        <Footer/>
        </>
    );
}

export default WriteBlog;