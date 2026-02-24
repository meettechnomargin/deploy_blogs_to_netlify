import Header from "./Header";
import Footer from "./Footer";
import Nav from "./Nav";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import EditPost from "./EditPost";
import About from "./About";
import Missing from "./Missing";
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import {format} from "date-fns";
import api from "./api/posts";
import useWindowSize from "./hooks/useWindowSize";

function App() {
  // const API_URL = "http://localhost:2006/posts";
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { width } = useWindowSize();


  useEffect(() => {
    const fetchPosts = async () => {
      try{
        const response = await api.get("/posts");
        setPosts(response.data);
        setIsLoading(false);
      }catch(err){
        setFetchError(err.message);
      }
    }

    fetchPosts();
  }, [])



  useEffect(() => {
    const result = posts.filter(post => 
      ((post.title).toLowerCase().includes(search.toLowerCase())) || ((post.body).toLowerCase().includes(search.toLowerCase()))
    );

    setSearchResults(result.reverse());
    
  }, [posts, search])




  const editPost = async (id) => {
    const date = format(new Date(), "MMMM dd, yyyy pp");
    const editedPost = {id, title: editTitle, datetime: date, body: editBody}; 
    try{
      const response = await api.put(`/posts/${id}`, editedPost);
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post))
      setEditTitle("");
      setEditBody("");
      navigate("/");
    }catch(err){
      setFetchError(err.message);
    }
  }



  const deletePost = async (id) => {
    try{
      await api.delete(`/posts/${id}`);
      const deleted_Data = posts.filter(post => post.id !== id);
      setPosts(deleted_Data);
      navigate("/");
    }catch(err){
      setFetchError(err.message);
    }
  }



  const addPost = async (e) => {
    e.preventDefault();
    const id = posts.length ? (Number(posts[posts.length - 1].id) + 1).toString() : "1";
    const date = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = {id, title: postTitle, datetime: date, body: postBody}; 
    try{
      await api.post("/posts", newPost);
      const updatedPost = [...posts, newPost]
      setPosts(updatedPost);
      setPostTitle("");
      setPostBody("");
      navigate("/");
    }catch(err){
      setFetchError(err.message);
    }
  }

  return (
    <>
      <div className="App">

        <Header title="Blogs" width = {width} />
          {
            isLoading ? <p>data is Loading</p>
            :
            fetchError !== null ? <p>{fetchError}</p>
            :
            <>
              <Nav search = {search} setSearch = {setSearch}/>
              <Routes>
                <Route exact path="/" element={<Home posts={searchResults} />}/>
                <Route path="/edit/:id" element={<EditPost posts = {posts} editTitle = {editTitle} editBody = {editBody} setEditTitle = {setEditTitle} setEditBody = {setEditBody} editPost = {editPost}/>} />
                <Route exact path="/post" element={<NewPost postTitle = {postTitle} postBody = {postBody} setPostTitle = {setPostTitle} setPostBody = {setPostBody} addPost = {addPost}/>} />
                <Route path="/post/:id" element={<PostPage posts = {posts} deletePost = {deletePost} />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<Missing />} />
              </Routes>
            </>
          }
        <Footer/>
        
      </div>
    </>
  )
}

export default App
