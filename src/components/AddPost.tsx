import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

import { createPost } from "../redux/fetures/Posts/postSlice";
import { useAppDispatch, useAppSelector } from "../redux/app/store";

interface PostData {
  title: string;
  description: string;
}
const AddPost = () => {
  const [postData, setPostData] = useState<PostData>({
    title: "",
    description: "",
  });
  
  const [image, setImage] = useState<string>("");
  const [url, setUrl] = useState("");

  const { user } = useAppSelector((state) => state.auth);
  
  const { title, description } = postData;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = user?.token;

  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "instaclon");
    data.append("cloud_name", "dkaxbb8gz");
    // Make a request to cloudinary
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dkaxbb8gz/image/upload",
      data
    );
    setUrl(res.data.url);
  };

  useEffect(() => {
    if (url) {
      dispatch(
        createPost({ title, description, image: url, token, toast, navigate })
      );
    }
  }, [url, dispatch, navigate, postData, token, title, description]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files![0] as any);
  };

  return (
    <div
      className='card input-filed'
      style={{
        margin: "30px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='title'
          value={title}
          name='title'
          onChange={handleChange}
          required
        />
        <input
          type='text'
          placeholder='description'
          value={description}
          name='description'
          required
          onChange={handleChange}
        />
        <div className='file-field input-field'>
          <div className='btn #64b5f6 blue darken-1'>
            <span>Upload Image</span>

            <input type='file' onChange={handleImageChange} required />
          </div>
          <div className='file-path-wrapper'>
            <input className='file-path validate' type='text' />
          </div>
        </div>
        <button
          type='submit'
          className='btn waves-effect waves-light #64b5f6 blue darken-1'
        >
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
