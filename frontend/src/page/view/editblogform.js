import React, { useEffect } from "react";
import { useState } from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import vietnameseConvert from "../accessible/vietnameseConvert";
import {messageSweetAlert, messageToastr} from "../accessible/message";
import { GetBlogDetail } from "../accessible/axiosdata";

function FormEditBlog(){
    var {id} = useParams();
    var blogs = GetBlogDetail(id);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    function handleTitleChange(e){
        setTitle(e.target.value);
        document.getElementById('preview_render_blog_title').innerHTML = e.target.value;
    }
    function handleContentChange(e){
        let contentlength = document.getElementById('blog-content').value;
        document.getElementById('content_length').innerHTML = '(' + contentlength.length + '/255)';
        setContent(e.target.value);
        document.getElementById('preview_render_blog_content').innerHTML = e.target.value;
    }
    function handleCategoryChange(e){
        setCategory(e.target.value);
        document.getElementById('preview_render_blog_category').innerHTML = 'HoLim / ' + e.target.value;
    }

    function LineBreak(type){
        switch(type){
            case 'break':
                const withBreak = document.getElementById('blog-content').value + '<br><br>';
                document.getElementById('blog-content').value = withBreak;
                break;
            case 'bold':
                const withBold = document.getElementById('blog-content').value + '<b></b>';
                document.getElementById('blog-content').value = withBold;
                break;
            case 'italic':
                const withItalic = document.getElementById('blog-content').value + '<i></i>';
                document.getElementById('blog-content').value = withItalic;
                break;
            case 'underline':
                const withUnderline = document.getElementById('blog-content').value + '<u></u>';
                document.getElementById('blog-content').value = withUnderline;
                break;
            default: 
                break;
        }
    }

    function postBlog(){
        if(title === '' || content === '' || category === '') messageToastr('Hãy nhập đầy đủ thông tin','error') 
        else {
         var idTitle = vietnameseConvert(title);
            axios.post('/editblog',{
                idTitle: idTitle,
                idOld: id,
                title: title,
                content: content,
                category: category,
            }).then(res=>{
                res.data.status === 'error' ? messageSweetAlert('Đăng blog thất bại',`${res.data.content}`,'error') : messageSweetAlert('Đăng blog thành công',`${res.data.content}`,'success')
            }).catch(function(err){
                messageSweetAlert('Đăng blog thất bại',`Xuất hiện lỗi khi sửa blog`,'error');
            });
        }  
    }
    return(
        <>
        <form className="mt-5">
            <label className='text-rose-500 text-md' >Tiêu đề: </label>
            <input type="text" defaultValue={blogs[0].title} id="blog-title" onChange={handleTitleChange} className='w-full my-3 px-3 py-2 border shadow-sm focus:outline-rose-500 rounded-md' placeholder="Nhập tiêu đề của bài blog"/>
            <label className='text-rose-500 text-md' >Content: </label>
            <div className="grid grid-cols-5 gap-4">
                <button type="button" className="w-full my-3 py-2 border hover:border-rose-500 rounded-md" onClick={()=>LineBreak('break')}>Xuống dòng</button>
                <button type="button" className="w-full my-3 py-2 border hover:border-rose-500 rounded-md" onClick={()=>LineBreak('bold')}><b>Bold</b></button>
                <button type="button" className="w-full my-3 py-2 border hover:border-rose-500 rounded-md" onClick={()=>LineBreak('italic')}><i>Italic</i></button>
                <button type="button" className="w-full my-3 py-2 border hover:border-rose-500 rounded-md" onClick={()=>LineBreak('underline')}><u>Underline</u></button>
            </div>                
            <p id='content_length'>(0/255)</p>
            <textarea defaultValue={blogs[0].content} id="blog-content" onChange={handleContentChange} className='w-full h-80 my-3 px-3 py-3 border shadow-sm focus:outline-rose-500 rounded-md' placeholder="Nhập nội dung của bài blog" />
            <label className='text-rose-500 text-md' >Thể loại: </label>
            <select defaultValue={blogs[0].category} id="blog-category" onInput={handleCategoryChange} className='w-full my-3 px-3 py-2 border shadow-sm rounded-md'>
                <option>Hãy chọn thể loại</option>
                <option value={'Blog'}>Blog</option>
                <option value={'Story'}>Story</option>
                <option value={'Life'}>Life</option>
            </select>
            <button type="button" onClick={postBlog} className="w-full my-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-md">Sửa bài</button>
        </form>    
        <div className="w-full h-fit">
        <h2 className="text-3xl text-rose-500 my-5 text-center">Preview</h2>
        <div className="w-full h-fit">
                <h2 className="text-rose-500 text-3xl mt-5 text-center break-all" id='preview_render_blog_title'></h2>
                <p className="text-rose-500 text-xl mt-5 text-center break-all" id='preview_render_blog_category'></p>
                <hr className="border-rose-500 mt-5"></hr>
                <p className="text-xl font-mono my-6 break-all" id='preview_render_blog_content'></p>
            </div>  
        </div>
        </>
    );
}

export default FormEditBlog;