import React from 'react';
import Footer from '../constant/footer';
import { Link } from "react-router-dom";

const AboutMe = () => {
    const content = { 
        title: "Đây là câu chuyện của mình,",
        line1: "Bắt đầu vào năm 2019, khi mình lần đầu tiên bước vào giảng đường Đại Học. Học những môn nền tảng như C/C++, Kiến trúc máy tính, ... , mình cảm thấy những môn học này khá khô khan và mình không có nhiều hứng thú học tập.",
        line2: "Mình bắt đầu tìm công việc làm thêm Barista tại một quán cà phê, vì là lần đầu tiên mình kiếm tiền nên mình đã rất thích thú và bỏ bê việc học, đăng ký lịch làm ngay vào ngày thi. Điều gì đến cũng đến, mình bị rớt 6 môn vào năm nhất và điểm hệ 4 là 1.81.",
        line3: "Cho tới năm 2, khi mình bắt đầu học về giao diện, học về HTML,CSS,Javascript và PHP. Mình bắt đầu có niềm đam mê học tập trở lại.",
        line4: "May mắn vào lúc đó, một người bạn của mình đã mở một server Minecraft và cần một trang web cho việc nạp thẻ, mình bắt tay vào làm project lớn đầu tiên bằng những gì mình học được. Sau khi hoàn thành bạn mình đã up lên host và hoạt động tại id.mineinus.com",
        line5: "Sau khoảng 6 tháng thì mình update website đó, giao diện mới và sử dụng AJAX. Trong cuộc hành trình đó mình đã học được rất nhiều điều mới mẻ",
        line6: "Cho tới Hè năm nay, 2022. Mình muốn bắt đầu một cái gì đó mới nên mình đã tạo ra website này bằng ReactJS, NodeJS và TailwindCSS, với mục đích thử nghiệm là chính.",
        line7: "Cảm ơn mọi người đã ghé trang web của mình!!"
    }
    function RenderAboutMe(props){
        return (
            <div className="container-fluid w-full z-10 bg-white inline-block">
            <div className="h-fit w-5/6 mx-auto">
            <hr className="mb-7 mt-8 w-full mx-auto border-rose-500"></hr>
            <div className="h-fit w-full md:w-2/6 md:float-left mb-9 inline-block bg-gradient-to-tr from-orange-600 via-red-500 to-rose-500 shadow-md">
                <div className="h-80 w-4/5 mt-8 bg-cover bg-center rounded mx-auto" style={{backgroundImage: `url('img/myAvatar.jpg')`}}></div>
                <div className="w-4/5 mx-auto">
                <hr className="bg-white mt-8 mx-auto"></hr>
                <h1 className="text-white mt-8 text-2xl text-center"><b>Xin chào, </b>mình là Nguyễn Lim Thái Hồ</h1>
                <p className="text-white mt-8 text-md text-center">Hiện tại mình đang là sinh viên năm 4 ngành Kỹ thuật phần mềm tại trường Đại Học Sài Gòn.</p>
                <hr className="bg-white mt-8 mx-auto"></hr>
                <div className="justify-items-center w-full mt-8 pb-32 mx-auto grid grid-cols-3">
                    <a href="https://www.facebook.com/tea.limho/" target="_blank" rel="noreferrer"><img className="h-full ..." src="img/icon/icon_fb.svg" alt="FBIcon"></img></a>
                    <a href="https://www.instagram.com/millohh_/" target="_blank" rel="noreferrer"><img clclassNameass="h-full ..." src="img/icon/icon_insta.svg" alt="InstagramIcon"></img></a>
                    <a href="https://github.com/holimm" target="_blank" rel="noreferrer"><img className="h-full ..." src="img/icon/icon_github.svg" alt="GitIcon"></img></a>
                </div>
                </div>
            </div>
            <div className="h-fit w-full md:w-4/6 md:float-left">
                <div className="container sm:ml-8">
                <h1 className="text-2xl text-rose-500 font-bold">{props.content.title}</h1>
                <p className="text-xl mt-3">{props.content.line1}</p>
                <p className="text-xl mt-3">{props.content.line2}</p>   
                <p className="text-xl mt-3">{props.content.line3}</p>
                <p className="text-xl mt-3">{props.content.line4}</p>
                <p className="text-xl mt-3">{props.content.line5}</p>
                <p className="text-xl mt-3">{props.content.line6}</p>
                <p className="text-xl mt-3">{props.content.line7}</p>
                <p className="text-xl mt-3 text-rose-500"><Link to="/">Quay lại...</Link></p>
                </div>
            </div>
            </div>
            </div>
        );
    }
    return(
        <>
        <RenderAboutMe content={content}/>
        <Footer/>
        </>
    );
}

export default AboutMe;
