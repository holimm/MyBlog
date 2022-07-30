import React, {useEffect, useState} from "react";
import Header from "./header";
import Footer from "../constant/footer";
import axios from "axios";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {GetBlogs, GetDeletedBlogs} from "./accessible/axiosdata";
import { messageSweetAlert, formatDate } from "./accessible/message";
import Swal from "sweetalert2";

function BlogsManager(){
    var showingBlogs = GetBlogs();
    var deletedBlogs = GetDeletedBlogs();
    var navigate = useNavigate();
    var {visible} = useParams();
    const [blogs,setBlogs] = useState([]);
    console.log(blogs);
    function DeletePost(id){
        Swal.fire({
            title: "Bạn có chắc muốn xóa blog này?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Có, xóa',
            cancelButtonText: 'Không',
            cancelButtonColor: '#f43f5e',
            confirmButtonColor: '#10b981'
        }).then((result)=>{
            if(result.isConfirmed){
                axios.post('/deleteblog',{
                    id: id
                }).then(res=>{
                    if(res.data.status === 'error'){
                        messageSweetAlert('Thất bại',res.data.content,'error');
                    }
                    if(res.data.status === 'success'){
                        messageSweetAlert('Thành công',res.data.content,'success');
                        window.location.reload();
                    }           
                }).catch(function(err){
                    messageSweetAlert('Thất bại','Xuất hiện lỗi khi xóa bài viết','error');
                });
            }
        })
    }
    function RestorePost(id){
        Swal.fire({
            title: "Bạn có chắc muốn phục hồi blog này?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Có, phục hồi',
            cancelButtonText: 'Không',
            cancelButtonColor: '#f43f5e',
            confirmButtonColor: '#10b981'
        }).then((result)=>{
            if(result.isConfirmed){
                axios.post('/restoreblog',{
                    id: id
                }).then(res=>{
                    if(res.data.status === 'error'){
                        messageSweetAlert('Thất bại',res.data.content,'error');
                    }
                    if(res.data.status === 'success'){
                        messageSweetAlert('Thành công',res.data.content,'success');
                        window.location.reload();
                    }           
                }).catch(function(err){
                    messageSweetAlert('Thất bại','Xuất hiện lỗi khi phục hồi bài viết','error');
                });
            }
        })
    }
    function RenderShowButton(){
        function reloadPage(statetype){
            navigate(`/manage-blogs/visibility=${statetype}`);
            statetype === 'showing' ? setBlogs(showingBlogs) : setBlogs(deletedBlogs);        
        }
        return(
            <div className="h-fit w-full mb-7">
            {/* <Link to='/manage-blogs/visibility=showing'><button type="button" className="px-8 py-3 hover:text-white hover:bg-gradient-to-r hover:from-rose-400 hover:via-red-500 hover:to-rose-600 border">Hiện hữu</button></Link>
            <Link to='/manage-blogs/visibility=deleted'><button type="button" className="px-8 py-3 hover:text-white hover:bg-gradient-to-r hover:from-rose-400 hover:via-red-500 hover:to-rose-600 mx-3 border">Đã xóa</button></Link> */}
            <button type="button" onClick={()=>reloadPage('showing')} className="px-8 py-3 hover:text-white hover:bg-gradient-to-r hover:from-rose-400 hover:via-red-500 hover:to-rose-600 border">Hiện hữu</button>
            <button type="button" onClick={()=>reloadPage('deleted')} className="px-8 py-3 hover:text-white hover:bg-gradient-to-r hover:from-rose-400 hover:via-red-500 hover:to-rose-600 mx-3 border">Đã xóa</button>
            </div>
        );
    }
    function RenderContentPost(){
        var {page} = useParams()
        if(!page) page=1;
        var index=-1;
        var from = (page-1)*5;
        var to = from + 5;
        var RenderRelatedBlog = [];
        if(blogs){
            RenderRelatedBlog = blogs.map((items,id) => {
                index++;
                if(index >= from && index < to){
                    return(   
                        <div className="w-full h-fit" key={id}>
                            <div className="w-full h-72 bg-cover bg-center" style={{backgroundImage: `url('/${items.image}')`}}></div>
                            <Link to={`/detail-blog/${items.id}`}><h2 className="text-rose-500 text-4xl mt-5">{items.title}</h2></Link>
                            <p className="text-rose-500 text-xl mt-5">{formatDate(items.date)}</p>                   
                            <div className="h-fit w-full">
                                {visible === 'showing' ? <ShowingButton id={items.id}/> : <RestoreButton id={items.id}/>}
                            </div>
                            <hr className="border-rose-500 w-2/4 mx-auto my-8"></hr>
                        </div>   
                    );        
                } 
                else{
                    return '';
                }          
          })
        }
        else if(!blogs) {
            RenderRelatedBlog = <p className="text-center text-3xl mb-3">Không có bài viết nào</p>;
        }
        
        function ShowingButton(props){
            return(
                <>
                <Link to={`/edit-blog/id=${props.id}`}><button type="button" className="px-8 py-3 text-white bg-lime-600 mt-5 border">Sửa</button></Link>
                <button type="button" onClick={()=>DeletePost(props.id)} className="px-8 py-3 text-white bg-red-600 mx-3 mt-5 border">Xóa</button>
                </>
            );
        }
        function RestoreButton(props){
            return(
                <>
                <button type="button" onClick={()=>RestorePost(props.id)} className="px-8 py-3 text-white bg-lime-600 mt-5 border">Phục hồi</button>
                </>
            );
        }
        function RenderRelatedPostContainer() {
            return(
                <div className="w-full h-fit">
                    <RenderShowButton/>
                    {RenderRelatedBlog}
                </div>
            );       
        }
        return <RenderRelatedPostContainer/>
    }
    function RenderPagination(){
        var length=blogs.length;
        var numberPage = Math.ceil(length/5);
        var renderPagination=[];
        for(var i=1;i<=numberPage;i++){
            renderPagination.push(
                <Link to={`/manage-blogs/visibility=${visible}/page=${i}`}><div className='bg-white hover:bg-slate-50 text-rose-500 py-3 px-4 mx-1 float-left cursor-pointer'>{i}</div></Link>
            );
        }
        return renderPagination;
    }
    function RenderPost(){
        return(
            <div className="w-5/6 h-full mt-12 mx-auto">
                <div className="w-full h-fit">
                    <RenderContentPost/>
                    <div className="w-full h-fit text-xl text-white">
                        <div className="w-fit h-fit mx-auto">
                        <RenderPagination/>
                        </div>
                    </div>
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

export default BlogsManager;