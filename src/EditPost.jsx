import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const EditPost = ({ posts, editPost, editTitle, setEditTitle, editBody, setEditBody }) => {
    const {id} = useParams();
    const post = posts.find(post => (post.id).toString() === id);

    useEffect(() => {
        if(post){
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody])
        
    return (
        <main className="NewPost">
            {editTitle &&
                <>
                    <h2>New Post</h2>
                    <form className="newPostForm" onSubmit={e => (e.preventDefault())}>
                        <label htmlFor="newPostTitle">Title</label>
                        <input 
                        required
                        type="text"
                        id="newPostTitle"
                        placeholder="Add Title"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor="newPostBody">Description</label>
                        <textarea
                        required 
                        type="text"
                        id="newPostBody"
                        placeholder="Add Body"
                        value={editBody}
                        onChange={(e) => setEditBody(e.target.value)}
                        ></textarea>
                        <button type="submit" onClick={() => editPost(post.id)}>Submit</button>
                    </form>
                </>
            }
            {!editTitle &&
                <>
                    <h1>No Post Found</h1>
                    <p>Go to Home</p>
                    <Link to="/">Home</Link>
                </>
            }
        </main>
    )
}

export default EditPost
