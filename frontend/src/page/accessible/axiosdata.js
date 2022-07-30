import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export function GetBlogs(){
    const [blogs,setBlogs] = useState([{}]);
        useEffect(()=>{
            axios.get('/getblogs')
            .then(res => {
                setBlogs(res.data);
            })
            .catch(function(err){
                console.log(err);
            });
        },[]);   
    return blogs;
}
export function GetDeletedBlogs(){
    const [blogs,setBlogs] = useState([{}]);
        useEffect(()=>{
            axios.get('/getdeletedblogs')
            .then(res => {
                setBlogs(res.data);
            })
            .catch(function(err){
                console.log(err);
            });
        },[]);   
    return blogs;
}
export function GetBlogDetail(id){
    const [blogs,setBlogs] = useState([{}]);
        useEffect(()=>{
            axios.get('/getblogsdetail',{
                params:{
                    id: id
                },    
            })
            .then(res => {
                setBlogs(res.data);
            })
            .catch(function(err){
                console.log(err);
            })
        },[]);  
    return blogs;
}

