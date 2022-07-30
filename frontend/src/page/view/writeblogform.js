import React from "react";
import { useState } from "react";
import axios from "axios";
import moment from "moment";
import vietnameseConvert from "../accessible/vietnameseConvert";
import {messageSweetAlert, messageToastr} from "../accessible/message";

function FormWriteBlog(){
    let myFullname = sessionStorage.getItem('fullname');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [imgfile, setImgFile] = useState();
    
    function handleTitleChange(e){
        setTitle(e.target.value);
        document.getElementById('preview_render_blog_title').innerHTML = e.target.value;
    }
    function handleContentChange(e){
        let contentlength = document.getElementById('write-blog-content').value;
        document.getElementById('content_length').innerHTML = '(' + contentlength.length + '/255)';
        document.getElementById('preview_render_blog_content').innerHTML = e.target.value;
        setContent(e.target.value);
    }
    function handleCategoryChange(e){
        setCategory(e.target.value);
        document.getElementById('preview_render_blog_category').innerHTML = 'HoLim / ' + e.target.value;
    }
    function handleImgFileChange(e){
        setImgFile(e.target.files[0]);
    }
    function LineBreak(type){
        switch(type){
            case 'break':
                const withBreak = document.getElementById('write-blog-content').value + '<br><br>';
                document.getElementById('write-blog-content').value = withBreak;
                break;
            case 'bold':
                const withBold = document.getElementById('write-blog-content').value + '<b></b>';
                document.getElementById('write-blog-content').value = withBold;
                break;
            case 'italic':
                const withItalic = document.getElementById('write-blog-content').value + '<i></i>';
                document.getElementById('write-blog-content').value = withItalic;
                break;
            case 'underline':
                const withUnderline = document.getElementById('write-blog-content').value + '<u></u>';
                document.getElementById('write-blog-content').value = withUnderline;
                break;
            default: 
                break;
        }
    }
    setInterval(dateChange,1000)
    function dateChange(){
        document.getElementById('write-blog-date').value = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    }
    function postBlog(){
        if(title === '' || content === '' || category === '' || !imgfile) messageToastr('Hãy nhập đầy đủ thông tin','error') 
        else {
            var idTitle = vietnameseConvert(title);
            axios.post('/uploadImage',{
                image: imgfile
            },{
                headers: {
                    "Content-Type" : "multipart/form-data"
                },
            }).then(res=>{
                res.data.status === 'error' ? messageSweetAlert('Đăng hình ảnh thất bại',`${res.data.content}`,'error') : 
                    axios.post('/writeblog',{
                        idTitle: idTitle,
                        title: title,
                        content: content,
                        category: category,
                        date: document.getElementById('write-blog-date').value,
                        author: document.getElementById('write-blog-author').value,
                        imageName: 'img/blog/' + res.data.content
                    }).then(res=>{
                        res.data.status === 'error' ? messageSweetAlert('Đăng blog thất bại',`${res.data.content}`,'error') : messageSweetAlert('Đăng blog thành công',`${res.data.content}`,'success')
                    }).catch(function(err){
                        messageSweetAlert('Đăng blog thất bại',`Xuất hiện lỗi khi đăng blog`,'error')
                    });
            }).catch(function(err){
                messageSweetAlert('Đăng blog thất bại',`Xuất hiện lỗi khi đăng hình`,'error')
            });
        }  
    }
    return(
        <>
        <form className="mt-5">
            <label className='text-rose-500 text-md' >Tiêu đề: </label>
            <input type="text" id="write-blog-title" onChange={handleTitleChange} className='w-full my-3 px-3 py-2 border shadow-sm focus:outline-rose-500 rounded-md' placeholder="Nhập tiêu đề của bài blog"/>
            <label className='text-rose-500 text-md' >Content: </label>
            <div className="grid grid-cols-5 gap-4">
                <button type="button" className="w-full my-3 py-2 border hover:border-rose-500 rounded-md" onClick={()=>LineBreak('break')}>Xuống dòng</button>
                <button type="button" className="w-full my-3 py-2 border hover:border-rose-500 rounded-md" onClick={()=>LineBreak('bold')}><b>Bold</b></button>
                <button type="button" className="w-full my-3 py-2 border hover:border-rose-500 rounded-md" onClick={()=>LineBreak('italic')}><i>Italic</i></button>
                <button type="button" className="w-full my-3 py-2 border hover:border-rose-500 rounded-md" onClick={()=>LineBreak('underline')}><u>Underline</u></button>
            </div>                
            <p id='content_length'>(0/255)</p>
            <textarea id="write-blog-content" onChange={handleContentChange} className='w-full h-80 my-3 px-3 py-3 border shadow-sm focus:outline-rose-500 rounded-md' placeholder="Nhập nội dung của bài blog"/>
            <label className='text-rose-500 text-md' >Thể loại: </label>
            <select id="write-blog-category" onInput={handleCategoryChange} className='w-full my-3 px-3 py-2 border shadow-sm rounded-md'>
                <option>Hãy chọn thể loại</option>
                <option value={'Blog'}>Blog</option>
                <option value={'Story'}>Story</option>
                <option value={'Life'}>Life</option>
            </select>
            <label className='text-rose-500 text-md' >Hình ảnh: </label>
            <input type="file" name="write-blog-image-file" onChange={handleImgFileChange} className='w-full my-3 px-3 py-2 border shadow-sm focus:outline-rose-500 rounded-md' placeholder="Hãy chọn file hình"/>
            <label className='text-rose-500 text-md' >Viết vào ngày: </label>
            <input type="text" id="write-blog-date" defaultValue={moment(new Date()).format("YYYY-MM-DD HH:MM:ss")} className='w-full my-3 px-3 py-2 border shadow-sm focus:outline-rose-500 rounded-md' placeholder="Date" readOnly/>
            <label className='text-rose-500 text-md' >Viết bởi: </label>
            <input type="text" id="write-blog-author" defaultValue={myFullname} className='w-full my-3 px-3 py-2 border shadow-sm focus:outline-rose-500 rounded-md' placeholder="Nhập tiêu đề của bài blog" readOnly/>
            <button type="button" onClick={postBlog} className="w-full my-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-md">Đăng bài</button>
        </form>  
        <hr className="border-rose-500 mt-2"></hr>
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

export default FormWriteBlog;