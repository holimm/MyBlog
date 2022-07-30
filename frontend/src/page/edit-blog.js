import React from "react";
import Header from "./header";
import Footer from "../constant/footer";
import FormEditBlog from "./view/editblogform";

function EditBlog(){
    return(
        <>
        <Header/>
        <hr className="border-rose-500 mt-2"></hr>
        <div className="w-5/6 md:w-3/6 h-full mt-12 mx-auto">
            <div className="w-full h-fit">
                  <FormEditBlog/>
            </div>
        </div>
        <Footer/>
        </>
    );
}

export default EditBlog;