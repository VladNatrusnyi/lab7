import './App.css';
import {useState} from "react";
import axios from "axios";

function App() {
  const [postId, setPostId] = useState(null)

  const [post, setPost] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)


  function generateRandomNumber() {
    if (postId) {
      setPostId(null)
      setPost(null)
    }
    setPostId(Math.floor(Math.random() * 100) + 1)
  }

  const fetchData = async () => {
    if (postId) {
      try {
        setIsLoading(true)
        setIsError(false)
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        setIsLoading(false)
        if (response.data)  setPost(response.data);
        console.log(response.data);
      } catch (error) {
        setIsLoading(false)
        setIsError(true)
        console.error(error);
      }
    }
  };

  return (
    <div className="App">
      <button onClick={generateRandomNumber}>{postId ? 'Повторно згенерувати число' : 'Згенерувати випадкове число'} </button>
      { postId
        &&
        <>
          <h1>Згенероване число {postId}</h1>
          <button disabled={!!post} onClick={fetchData}>Отримати пост</button>
        </>
      }
      <br/>

      { isLoading && <h3>Завантаження...</h3> }

      {
        post &&
        <div>
          <div className='wrapper'>
            <div className='title'>ID поста</div>
            <div>{post.id}</div>
          </div>
          <div>
            <div className='title'>Заголовок</div>
            <div>{post.title}</div>
          </div>
          <div>
            <div className='title'>Текст поста</div>
            <div>{post.body}</div>
          </div>
        </div>
      }

      {
        isError && <h3 style={{color: 'red'}}>Помилка завантаження</h3>
      }

    </div>
  );
}

export default App;
