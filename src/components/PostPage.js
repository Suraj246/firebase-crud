import { useState, useEffect } from 'react'
import { db } from './firebase'
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import { auth, provider } from './firebase'
import { useNavigate } from "react-router-dom"


const PostPage = ({ user }) => {
    const navigate = useNavigate();
    const [fetchData, setFetchData] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [editPost, setEditPost] = useState([])
    const dataCollection = collection(db, 'crud')
    const [refresh, setRefresh] = useState(false)


    // getting data from database
    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(dataCollection)
            setFetchData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getUsers()
    }, [refresh])

    // creating post and saving in database
    const createPost = async () => {
        if (!title || !description) {
            toast.error("empty title or description",
                {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                }
            )
            return false
        }
        await addDoc(dataCollection, { title: title, body: description })
        toast.success("post created",
            {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
            }
        )
        setTitle('')
        setDescription('')
        setRefresh(!refresh)
    }

    // delete post
    const deletePost = async (id) => {
        const postDoc = doc(db, "crud", id)
        await deleteDoc(postDoc)
        setRefresh(!refresh)


    }

    // update post
    const updatePost = async (item) => {
        setEditPost(item)
        setTitle(item.title)
        setDescription(item.body)

        setShow(true)
    }

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        setTitle('')
        setDescription('')
    };

    const handleShow = async () => {
        setShow(false)
        setTitle(editPost.title)
        setDescription(editPost.body)
        const upDoc = doc(db, "crud", editPost.id)
        await updateDoc(upDoc, { title: title, body: description })
        setTitle('')
        setDescription('')
        toast.success("post updated successfully",
            {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
            }
        )
        setRefresh(!refresh)

    };
    const logout = () => {
        localStorage.removeItem("email")
        navigate("/login")

    }
    useEffect(() => {
        if (!localStorage.getItem("email")) {
            navigate("/login")
        }
    }, [refresh])
    return (
        <div>
            <div className="d-flex justify-content-end m-1 ">
                <Button className="bg-danger border-0" onClick={logout}>Logout</Button>
            </div>
            <ToastContainer />
            <div className="container mb-5 mt-2">
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="title" value={title} onChange={e => setTitle(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3 msg" >
                        <Form.Control as="textarea" rows={4} placeholder="description" value={description} onChange={e => setDescription(e.target.value)}
                            className="msg" />
                    </Form.Group>
                    <Button onClick={createPost} className="w-100 bg-success border-0">Create</Button>
                </Form>
            </div>
            <div className="container">
                {/* displaying the post from database */}
                {fetchData.map((item) => {
                    return (
                        <div className="d-flex align-items-center bg-dark m-2 text-white post-container " key={item.id}>
                            <div key={item.id} className="w-100 bg-dark m-2 text-white p-3 d-flex  justify-content-start align-items-start flex-wrap">
                                <h4 className="fs-5 w-100 text-start bg-dark">{item.title}</h4>
                                <span className="fs-6 w-100 text-start bg-dark">{item.body}</span>
                            </div>
                            <div className="d-flex gap-2 m-2 post-btns bg-dark">
                                <Button className="bg-primary border-0" onClick={() => updatePost(item)}>update</Button>
                                <Button className="bg-danger border-0" onClick={() => deletePost(item.id)}>delete</Button>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* code for update post */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title >Update Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="title" value={title} onChange={e => setTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3 msg" >
                            <Form.Control as="textarea" rows={4} placeholder="description" value={description} onChange={e => setDescription(e.target.value)}
                                className="msg" />
                        </Form.Group>
                        <Button onClick={
                            handleShow

                        }
                            className="w-100 bg-success border-0">Update</Button>
                    </Form>
                </Modal.Body>

            </Modal>

        </div>
    )
}

export default PostPage
