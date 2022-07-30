import React from 'react';
import Header from './header';
import FormLogin from './view/signinform';

const Login = () => {
    function RenderLogin(){
        return (
        <div className="w-full h-full">
            <div className="bg-container w-full" style={{height: '100vh'}}>
            <div className="bg-cover bg-left sm:bg-center h-full" style={{backgroundImage: "url('img/blog-wallpaper.jpg')"}}>
                <Header />
                <div className='w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 h-fit bg-white mx-auto mt-28'>
                    <div className='w-4/5 mx-auto'>
                        <div className='w-full h-fit inline-block'>
                            <h1 className='text-rose-500 text-center text-3xl font-semibold w-full mt-5'>Đăng nhập</h1>
                        </div>
                        <hr className='border-rose-500 w-full mt-5'></hr>
                        <div className='w-full h-fit inline-block'>
                        <FormLogin/>   
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        );
    }
    return(
        <>
        <RenderLogin/>
        </>
    );
}

export default Login;