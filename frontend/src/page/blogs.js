import React from "react";
import Header from "./header";
import Footer from "../constant/footer";
import SideProfile from "./view/sideprofile";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {GetBlogs} from "./accessible/axiosdata";
import { formatDate } from "./accessible/message";

function Blogs(){
    var blogs = GetBlogs();

    function RenderContentPost(){
        var {page} = useParams()
        if(!page) page=1;
        var index=-1;
        var from = (page-1)*5;
        var to = from + 5;
        const RenderRelatedBlog = blogs.map((items,id) => {
            index++;
            if(index >= from && index < to){
                return(   
                    <div className="w-full h-fit" key={id}>
                        <div className="w-full h-96 bg-cover bg-center" style={{backgroundImage: `url('/${items.image}')`}}></div>
                        <Link to={`/detail-blog/${items.id}`}><h2 className="text-rose-500 text-4xl mt-5 text-center">{items.title}</h2></Link>
                        <p className="text-rose-500 text-xl mt-5 text-center">{formatDate(items.date)}</p>
                        <hr className="border-rose-500 w-2/4 mx-auto my-8"></hr>
                    </div>   
                );        
            } 
            else{
                return '';
            }
        })
        function RenderRelatedPostContainer() {
            return(
                <div className="w-full h-fit">
                    {RenderRelatedBlog}
                </div>
            );       
        }
        return <RenderRelatedPostContainer/>
    }
    function RenderPagination(){
        var length = blogs.length;
        var numberPage = Math.ceil(length/5)
        var renderPagination=[];
        for(var i=1;i<=numberPage;i++){
            renderPagination.push(
                <Link to={`/blogs/page=${i}`}><div className='bg-white hover:bg-gradient-to-r hover:from-rose-400 hover:via-red-500 hover:to-rose-600 hover:text-white text-black py-3 px-4 mx-1 float-left cursor-pointer'>{i}</div></Link>
            );
        }
        return renderPagination;
    }
    function RenderPost(){
        return(
            <div className="w-5/6 h-full mt-12 mx-auto">
                <div className="w-full md:w-9/12 h-fit float-left">
                    <RenderContentPost/>
                    <div className="w-full h-fit text-xl text-white">
                        <div className="w-fit h-fit mx-auto">
                        <RenderPagination/>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-3/12 h-fit float-left">
                    <SideProfile/>
                </div>
            </div>
        );
    }
    return(
        <>        
        <Header/>
        <hr className="border-rose-500 mt-2"></hr>
        <RenderPost/>
    
        <Footer/>
        </>
    );
}

export default Blogs;