import React, { useState, useEffect } from 'react'
import copy from "../assets/copy.gif"
import copyS from "../assets/copy.png"
import add from "../assets/add.gif"
import addS from "../assets/add.png"
import del from "../assets/delete.gif"
import delS from "../assets/delete.png"
import edit from "../assets/edit.gif"
import editS from "../assets/edit.png"
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const [form, setform] = useState({ site: "", user: "", pass: "" })
    const [img, setimg] = useState("😵")
    const [pas, setPas] = useState("password")
    const [passArray, setpassArray] = useState([])
    // hoveredKey holds a unique string for the hovered element (e.g. "2-user-copy"); null means none
    const [hoveredKey, setHoveredKey] = useState(null)
    // separate hover state for the Add button
    const [isAddHovered, setIsAddHovered] = useState(false)
    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setpassArray(JSON.parse(passwords))
        }


    }, [])

    const showPass = () => {

        if (img === "😵") {
            setimg("🤨")
            setPas("text")

        }
        else {
            setimg("😵")
            setPas("password")
        }
    }
    // ensure hrefs open external sites — prepend protocol if missing
    const normalizeUrl = (url) => {
        if (!url) return ""
        try {
            const parsed = new URL(url)
            return parsed.href
        } catch (e) {
            // if URL constructor fails, try adding https://
            return `https://${url}`
        }
    }
    const webChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })//spread form and update the value of the input field
    }
    const savePass = () => {
        if (form.site === "" || form.user === "" || form.pass === "") {
            alert("Please fill all the fields")
            return
        }

        // Use functional update to avoid mutating state and to ensure we're working with latest value
        setpassArray(prev => {
            const next = [...prev, {...form,id:uuidv4()}]
            localStorage.setItem("passwords", JSON.stringify(next))
            return next
        })

        setform({ site: "", user: "", pass: "" })
         toast.success('Saved your 🗝️', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,

        });
    }
    const copyText = (e) => {
        navigator.clipboard.writeText(e)
        toast.success('Copied!', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,

        });
    }
    const handleEdit=(id)=>{
        let editFrom =passArray.filter((item)=>{
            return item.id===id
        })
     
        setform(...editFrom)
        handleDel(id)
        
    }
    const handleDel=(id)=>{
  
 setpassArray(passArray.filter((item)=>{
            return item.id!=id
        })
        
    )
     
        localStorage.setItem("passwords",JSON.stringify(passArray.filter((item)=>{
            return item.id!=id
        })))//direct  passarray nhi de skte kyunki update hone mien time lagta h
        
   
      
    }
    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="dark"
                transition="Bounce"
            />

            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(115%_145%_at_50%_20%,#000_40%,#63e_100%)]"></div>
            <div className='text-white container w-[95vw] sm:w-1/2 mx-auto'>
                <h1 className='flex text-center text-3xl items-center font-bold w-[200px] mx-auto '><span className='text-6xl mr-1.5'>&lt;</span><span className='font-extrabold text-violet-400 mr-1.5'>KeE</span>Ring/<span className='text-6xl'> &gt;</span></h1>
                <p className='text-center text-lg py-3'> Your own Password Manager 🔒</p>
                <div className=' flex flex-col items-center gap-2 py-5 '>

                    <input value={form.site} onChange={webChange} type="text" className='border border-[#848289] w-full  rounded-2xl p-1.5 text-center' name="site" placeholder='Enter Website URL' />
                    <div className="flex gap-2 py-2 w-full">
                        <input value={form.user} onChange={webChange} className='border border-[#848289]  rounded-2xl p-1.5 text-center w-full' type="text" name="user" placeholder='Username' />
                        <input value={form.pass} onChange={webChange} className='border border-[#848289]  rounded-2xl p-1.5 text-center w-full' type={pas} name="pass" placeholder='Password' />
                        <span className='border border-[#848289] p-1 text-xl text-center rounded-full cursor-pointer ' onClick={showPass}>{img}</span>
                    </div>
                    <button onClick={savePass} className='bg-violet-700 flex justify-center items-center gap-1 hover:bg-violet-500 rounded-2xl w-fit sm:w-[20vw] py-1 px-2 font-extrabold hover:font-semibold border border-white'>Save Password
                        <img className='w-8' src={isAddHovered ? add : addS}
                            onMouseEnter={() => setIsAddHovered(true)}
                            onMouseLeave={() => setIsAddHovered(false)}
                            alt="" /></button>
                </div>
                <div className='box-border py-5 px-10   rounded-b-full flex flex-col items-center justify-center overflow-y-scroll max-h-[200px] w-[90vw] sm:w-full util'>
                    <div className="h-[100px] w-[500px]  sm:w-[150px] m-10 opacity-0">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Au
                        t sequi libero voluptatum, dolor aspernatur atque consequuntur, s
                        imilique iusto plahil. Excepturi debitis ipsum cupiditate alia
                        s quidem minus, saepe dolore tempore reprehenderit distinctio vol
                        uptate.ajslkdh falh fljah uyfhlsdjh jh sluay jhksjlh f</div>
                    {passArray.length > 0 && <table className="w-[300px] sm:w-full text-center  ">

                        <thead >
                            <tr className='text-xl ' >
                                <th className='border-b p-1  '>Website</th>
                                <th className='border-b p-1 '>Username</th>
                                <th className='border-b p-1 '>Password</th>
                                <th className='border-b p-1 '>Actions</th>
                            </tr>
                        </thead>
                        <tbody className=''>
                            {passArray.map((item, idx) => {
                                const siteKey = `row-${idx}-site`
                                const userCopyKey = `row-${idx}-user-copy`
                                const passCopyKey = `row-${idx}-pass-copy`
                                const editKey = `row-${idx}-edit`
                                const delKey = `row-${idx}-del`
                                return <tr key={idx} className='' >
                                    <td className='border-y  p-1 '><a href={normalizeUrl(item.site)} target='_blank' rel='noreferrer'>{item.site}</a></td>
                                    <td className='border-y p-1 '><div className='flex justify-center items-center gap-2'>{item.user}  <img className='w-6 invert'
                                        onMouseEnter={() => setHoveredKey(userCopyKey)}
                                        onMouseLeave={() => setHoveredKey(null)}
                                        src={hoveredKey === userCopyKey ? copy : copyS} alt="" onClick={() => { copyText(item.user) }} /></div></td>
                                    <td className='border-y p-1 '><div className='flex justify-center items-center gap-2 '>{'•'.repeat(8)} <img className='w-6 invert'
                                        onMouseEnter={() => setHoveredKey(passCopyKey)}
                                        onMouseLeave={() => setHoveredKey(null)}
                                        src={hoveredKey === passCopyKey ? copy : copyS} alt="" onClick={() => { copyText(item.pass) }} /></div></td>
                                    <td className='border-y p-1 '><div className='flex justify-center items-center gap-2 '> <img className='w-6 invert'
                                        onMouseEnter={() => setHoveredKey(editKey)}
                                        onMouseLeave={() => setHoveredKey(null)}
                                        src={hoveredKey === editKey ? edit : editS} alt="" onClick={() => {handleEdit(item.id) }} /> <img className='w-6 invert'
                                            onMouseEnter={() => setHoveredKey(delKey)}
                                            onMouseLeave={() => setHoveredKey(null)}
                                            src={hoveredKey === delKey ? del : delS} alt="" onClick={() => {handleDel(item.id) }} /></div></td>
                                </tr>
                            })}


                        </tbody>

                    </table>}

                    <div className="h-[200px] w-[20px] opacity-0">Lorem ipsusto pia quodxcepts qureprehenderit distinctio voluptate.</div>
                </div>
            </div>
        </>

    )
}

export default Manager
