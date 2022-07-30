import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./page/layout";
import Home from "./page/home";
import AboutMe from "./page/aboutme";
import Login from "./page/login";
import DetailBlog from "./page/detail-blog";
import WriteBlog from "./page/write-blog";
import Blogs from "./page/blogs";
import BlogsManager from "./page/blogsmanager";
import EditBlog from "./page/edit-blog";

export default function App() {
    return (
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/page=:page" element={<Home />} />
            <Route path="/aboutme" element={<AboutMe />} />
          </Route>
        </Routes>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/detail-blog/:id" element={<DetailBlog />} />
            <Route path="/detail-blog/:id/page=:page" element={<DetailBlog />} />
            <Route path="/write-blog" element={<WriteBlog />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/page=:page" element={<Blogs />} />
            <Route path="/manage-blogs" element={<BlogsManager />} />
            <Route path="/manage-blogs/visibility=:visible" element={<BlogsManager />} />
            <Route path="/manage-blogs/visibility=:visible/page=:page" element={<BlogsManager />} />
            <Route path="/edit-blog/id=:id" element={<EditBlog />} />
        </Routes>
      </BrowserRouter>
    );
  }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// const header = ReactDOM.createRoot(document.getElementById('header'));
// header.render(<Layout />);
// const footer = ReactDOM.createRoot(document.getElementById('footer'));
// footer.render(<Footer />);