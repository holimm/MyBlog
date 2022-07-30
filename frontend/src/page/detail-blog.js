import React from "react";
import Header from "./header";
import Footer from "../constant/footer";
import SideProfile from "./view/sideprofile";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {GetBlogs,GetBlogDetail} from "./accessible/axiosdata";
import { formatDate } from "./accessible/message";

function DetailBlog(){
    var blogsAxios = GetBlogs();
    var blogs = blogsAxios.filter(object =>{
        return object.state !== 0;
    });
    var { id } = useParams();
    function RenderContentPost(){
        const blogs = GetBlogDetail(id);
        return(
            <div className="w-full h-fit">
                <div className="w-full h-96 bg-cover bg-center" style={{backgroundImage: `url('/${blogs[0].image}')`}}></div>
                <h2 className="text-rose-500 text-3xl mt-5 text-center break-all">{blogs[0].title}</h2>
                <p className="text-rose-500 text-xl mt-5 text-center">{blogs[0].category}</p>
                <p className="text-rose-500 text-xl mt-5 text-center">{(blogs[0].date)}</p>
                <hr className="border-rose-500 mt-5"></hr>
                <p className="text-md md:text-lg lg:text-xl font-mono my-6 break-all" dangerouslySetInnerHTML={{__html: blogs[0].content}}></p>
                <p className="text-rose-500 text-xl mt-5 text-right">- {blogs[0].author} -</p>
            </div>   
        );
    }
    // function RenderPrevNextPost(){
    //     return(
    //         <div className="w-full h-fit mt-5 inline-block">
    //             <div className="w-3/6 h-full float-left">
    //                 <h2 className="text-rose-500 text-3xl text-left">&#8592; Blog Trước</h2>
    //             </div>
    //             <div className="w-3/6 h-full float-left">
    //                 <h2 className="text-rose-500 text-3xl text-right">Blog Sau &#8594;</h2>
    //             </div>
    //         </div>
    //     );
    // }
    function RenderRelatedPost(){
        var {page} = useParams()
        if(!page) page=1;
        var index=-1;
        var from = (page-1)*3;
        var to = from + 3;
        const RenderRelatedBlog = blogs.map((items,id) => {
            index++;
            if(index >= from && index < to){
                return(   
                    <Link to={`/detail-blog/${items.id}`}><div className="w-full h-full" key={id}>
                        <div className="w-full h-56 bg-cover bg-center" style={{backgroundImage: `url('/${items.image}')`}}></div>
                        <p className="text-rose-500 text-md">{items.category}</p>
                        <h2 className="text-rose-500 text-xl mb-1 truncate">{items.title}</h2>
                        <p className="text-rose-500 text-md mb-10">{formatDate(items.date)}</p>
                    </div></Link>
                );  
            }
            else {
                return '';
            }
        })
        function RenderRelatedPostContainer() {
            return(
                <div className="w-full h-fit mt-5 inline-block">
                    <h2 className="text-rose-500 text-3xl">Related Post</h2>
                    <div className="w-full mt-5 grid gap-4 grid-cols-3">
                    {RenderRelatedBlog}
                    </div>
                </div>
            );       
        }
        return <RenderRelatedPostContainer/>
    }
    function RenderPagination(){
        var length = blogs.length;
        var numberPage = Math.ceil(length/3)
        var renderPagination=[];
        for(var i=1;i<=numberPage;i++){
            renderPagination.push(
                <Link to={`/detail-blog/${id}/page=${i}`}><div className='bg-white hover:bg-rose-500 text-rose-500 hover:text-white py-3 px-4 mx-1 float-left cursor-pointer'>{i}</div></Link>
            );
        }
        return renderPagination;
    }
    // function RenderComment(){
    //     return(
    //         <div className="w-full h-fit mt-5">
    //             <h2 className="text-rose-500 text-3xl">Comments</h2>
    //         </div>
    //     );
    // }
    function RenderPost(){
        return(
            <div className="w-5/6 h-full mt-12 mx-auto">
                <div className="w-full md:w-9/12 h-fit float-left">
                    <RenderContentPost/>
                    {/* <hr className="border-rose-500 mt-5"></hr>
                    <RenderPrevNextPost/> */}
                    <hr className="border-rose-500 mt-5"></hr>
                    <RenderRelatedPost/>
                    <div className="w-full h-fit text-xl text-white inline-block">
                        <RenderPagination/>
                    </div>
                    {/* <hr className="border-rose-500 mt-5 w-full"></hr>
                    <RenderComment/> */}
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

export default DetailBlog;