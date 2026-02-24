import { useParams, Link } from "react-router-dom";

const PostPage = ({posts, deletePost}) => {
  const {id} = useParams();
  const post = posts.find(post => ((post.id).toString() === id));
  return (
    <main className="PostPage">
      <article className="post">
        {post &&
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/edit/${post.id}`}><button className="editButton">Edit Post</button></Link>
            <button className="deleteButton" onClick={() => {deletePost(post.id)}}>Delete Post</button>
          </>
        }
        {!post &&
          <>
            <h2>Post not found</h2>
            <p>Go to Home Page</p>
            <p>
              <Link to="/">
                Go to Home
              </Link>
            </p>
          </>
        }
      </article>
    </main>
  )
}

export default PostPage
