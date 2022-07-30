import {React, useState} from 'react';
import Footer from '../constant/footer';
import { Link, useParams } from "react-router-dom";
import {GetBlogs} from './accessible/axiosdata';
import { formatDate } from './accessible/message';
import TypeAnimation from 'react-type-animation';

const Home = () => {
    const [blogs,setBlogs] = useState();
    // var blogs = GetBlogs();

    // blogs.splice(indexOfBlogs);
    function RenderTextGlitch(){
        return (
        <div className="mt-16 mb-16 z-20 block">
            <div className="container-fluid w-fit mx-auto">
                <font className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl text-rose-500 font-semibold">
                <TypeAnimation
                    cursor={true}
                    sequence={['Welcome To My Blog', 1000,'Xin chào đến với blog của mình',1000]}
                    wrapper="h2"
                    repeat={Infinity}
                />   
                </font>
            </div>
        </div>
        );
    }
    function RenderBlogPost(){
        var {page} = useParams()
        if(!page) page=1;
        var index=-1;
        var from = (page-1)*6;
        var to = from + 6;
        var RenderSingleBlog;
        if(blogs){
            RenderSingleBlog = blogs.map((items,id) => {
                index++;
                if(index >= from && index < to){
                    return(
                        <div className="h-96 w-full bg-white shadow-md" key={id}>
                            <div className="h-4/6 bg-cover bg-center" style={{backgroundImage: `url('/${items.image}')`}}></div>
                            <div className="container w-11/12 mx-auto mt-2">
                            <h4 className="text-2xl truncate">{items.title}</h4>
                            <p className="truncate ...">{items.content}</p>
                            <div className="h-full w-full mt-5">
                                <Link to={`/detail-blog/${items.id}`} ><p className="text-blue-700 mt-2 cursor-pointer float-left">Read more...</p></Link>
                                <p className="mt-2 float-right">{(items.date)}</p>
                            </div>
                            </div>
                        </div>
                    ); 
                }
                else{
                    return '';
                }
            }) 
        } else {
            RenderSingleBlog = <p className='text-white text-xl'>Chưa có blog mới</p>
        }
        
        return <>{RenderSingleBlog}</>;
    }
    function RenderPagination(){
        var length,numberPage,renderPagination=[];
        if(blogs){
            var length = blogs.length;
            var numberPage = Math.ceil(length/6)
            var renderPagination=[];
            for(var i=1;i<=numberPage;i++){
                renderPagination.push(
                    <Link to={`/page=${i}`}><div className='bg-white hover:bg-slate-50 text-rose-500 py-3 px-4 mx-1 float-left cursor-pointer'>{i}</div></Link>
                );
            }
        }
        
        return renderPagination;
    }
    function RenderWhatsNew(){
        return (
            <div className="container-fluid w-full z-10 bg-gradient-to-tr from-orange-600 via-red-500 to-rose-500 inline-block">
                <div className="h-fit w-5/6 mx-auto">
                    <div className="h-20 w-full mt-10">
                        <h2 className="text-3xl text-white text-center">Có gì mới?</h2>
                        <p className="text-lg md:text-xl mt-2 text-white text-center">Những blog mới của mình được cập nhật ở đây</p>        
                    </div>
                    <hr className="mt-6 md:mt-3 mb-7 w-full mx-auto"></hr>
                    <div className="h-fit w-full mx-auto inline-block">
                        <div className="h-fit w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 float-left">
                        <RenderBlogPost/>
                        </div>
                    </div>
                    <div className="w-full h-fit mt-5 text-xl text-white">
                        <RenderPagination/>
                    </div>
                    <div className="w-full h-20 mt-6 text-xl text-white float-right ">Xem thêm blog...</div>
                </div>
            </div>
        );
    }
    const about_me_line1 = "Mình tên là Nguyễn Lim Thái Hồ. Hiện tại mình đang là sinh viên năm 4 ngành Kỹ thuật phần mềm tại trường Đại Học Sài Gòn.";
    const about_me_line2 = "Blog này được xem như một Project để mình thực hiện vào mùa hè, để nghiên cứu và học hỏi thêm về React JS, NodeJS cũng như TailwindCSS.";
    const about_me_line3 = "Ngoài ra thì đây cũng là nơi để mình upload những suy nghĩ, câu chuyện hay cuộc sống của mình. ";
    function RenderAboutMe(props){
        return (
            <div className="container-fluid w-full z-10 bg-white inline-block">
            <div className="h-fit w-5/6 mx-auto">
            <div className="h-12 w-full mt-10">
                <h2 className="text-3xl text-rose-500 text-center">Mình là ai?</h2>      
            </div>
            <hr className="mb-7 w-full mx-auto border-rose-500"></hr>
            <div className="h-fit w-full sm:w-2/6 md-2/6 float-left bg-black mb-9">
                <div className="h-96 w-full bg-white shadow-md outline outline-offset-2 outline-rose-500 rounded">
                    <div className="h-full bg-cover bg-center rounded" style={{backgroundImage: `url('img/myAvatar.jpg')`}}></div>
                </div>
            </div>
            <div className="h-fit w-full sm:w-4/6 float-left">
                <div className="container sm:ml-10 md:ml-10 xl:ml-20">
                <h1 className="text-2xl text-rose-500 font-bold">Xin chào,</h1>
                    <p className="text-xl mt-3">{props.line1}</p>
                    <p className="text-xl mt-3">{props.line2}</p>
                    <p className="text-xl mt-3">{props.line3}</p>
                    <p className="text-xl mt-5 mb-10 text-rose-500"><Link to="/aboutme">Xem thêm...</Link></p>
                </div>
            </div>
            </div>
        </div>
        );
    }
    function RenderInstagramPost(){
        function RenderInstaTab(props){
            return(
            <div className="h-80 w-full bg-white shadow-md">
                <div className="h-full bg-cover bg-center" style={{backgroundImage: `url('${props.image}')`}}>
                    <div className='w-full h-full bg-slate-50 bg-opacity-20 backdrop-blur-sm opacity-0 hover:opacity-100 transition-all hover:ease-in ease-out inline-block'>
                        <div className='h-fit w-fit mx-auto mt-48'>
                            <a href={`${props.url}`} target={'_blank'} rel='noreferrer'><button className="px-3 py-4 bg-gradient-to-r from-rose-400 via-red-500 to-rose-600 rounded-lg text-white font-semibold">&lt; Visit /&gt;</button></a>
                        </div>
                    </div>
                </div>
            </div>
            );
        }
        return(
            <div className="container-fluid w-full z-10 bg-gradient-to-tr from-orange-600 via-red-500 to-rose-500 inline-block">
            <div className="h-fit w-5/6 mx-auto">
            <div className="h-12 w-full mt-10">
                <h2 className="text-3xl text-white text-center">My Instagram</h2>      
            </div>
            <hr className="mt-3 mb-7 w-full mx-auto"></hr>
            <div className="h-fit w-full mx-auto inline-block">
                <div className="h-fit w-full grid sm:grid-cols-2 md:grid-cols-4 gap-5 float-left">
                    <RenderInstaTab image='img/insta1.jpg' url='https://www.instagram.com/p/CcayuYop6-o/'/>
                    <RenderInstaTab image='img/insta2.jpg' url='https://www.instagram.com/p/CZnyMI3JYcT/'/>
                    <RenderInstaTab image='img/insta3.jpg' url='https://www.instagram.com/p/CY_2ijzJCkM/'/>
                    <RenderInstaTab image='img/insta4.jpg' url='https://www.instagram.com/p/CV-zAjWvYms/'/>
                </div>
            </div>
            <a href="https://www.instagram.com/millohh_/" target="_blank" rel="noreferrer"><div className="w-full h-20 mt-9 text-xl text-white float-right ">Xem thêm trên instagram của tôi...</div></a>
            </div>
            </div>
        );
    }
    return(
        <>
        <RenderTextGlitch/>
        <RenderWhatsNew/>
        <RenderAboutMe line1={about_me_line1} line2={about_me_line2} line3={about_me_line3}/>
        <RenderInstagramPost/>
        <Footer/>
        </>
    );
}

export default Home;