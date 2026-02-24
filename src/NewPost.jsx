const NewPost = ({postTitle, postBody, setPostTitle, setPostBody, addPost}) => {
  
  return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={addPost}>
        <label htmlFor="newPostTitle">Title</label>
        <input 
          required
          type="text"
          id="newPostTitle"
          placeholder="Add Title"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          />
        <label htmlFor="newPostBody">Description</label>
        <textarea
          required 
          type="text"
          id="newPostBody"
          placeholder="Add Title"
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default NewPost
