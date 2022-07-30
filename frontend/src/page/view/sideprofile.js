import React from "react";

function SideProfile(){
    function RenderInstaTab(props){
        return(
        <div className="h-80 mt-8 w-full bg-white shadow-md">
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
        <div className="w-11/12 float-right">
            <a href="https://www.instagram.com/millohh_/" target="_blank" rel="noreferrer">
                <div className="w-fit h-fit inline-block">
                <div className="w-12 h-12 bg-cover bg-center rounded-lg float-left" style={{backgroundImage: `url('/img/icon/instaicon.png')`}}></div>
                <div className="flex items-center text-lg w-12 h-12 ml-3 float-left">millohh_</div>
            </div></a>
                <RenderInstaTab image='/img/insta1.jpg' url='https://www.instagram.com/p/CcayuYop6-o/'/>
                <RenderInstaTab image='/img/insta2.jpg' url='https://www.instagram.com/p/CZnyMI3JYcT/'/>
                <RenderInstaTab image='/img/insta3.jpg' url='https://www.instagram.com/p/CY_2ijzJCkM/'/>
                <RenderInstaTab image='/img/insta4.jpg' url='https://www.instagram.com/p/CV-zAjWvYms/'/>
            <div className="w-full mt-5 h-fit">
                <div className="w-fit mx-auto h-fit">
                <a href="https://www.instagram.com/millohh_/" target="_blank" rel="noreferrer"><button className="bg-gradient-to-r from-rose-400 via-red-500 to-rose-600 mx-auto text-white p-2 rounded-md ">Follow on Instagram</button></a>
                </div>
            </div>
        </div>
    );
}

export default SideProfile;