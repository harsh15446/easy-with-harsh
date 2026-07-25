"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Login(){

const [password,setPassword] = useState("");

const router = useRouter();


const login = ()=>{


if(password === "harsh123"){

localStorage.setItem(
"admin",
"true"
);

router.push("/admin");


}else{

alert("Wrong Password");

}


};



return(

<div className="min-h-screen flex items-center justify-center bg-gray-100">


<div className="bg-white p-8 rounded-xl shadow w-96">


<h1 className="text-3xl font-bold text-blue-700 mb-5">

🔐 Admin Login

</h1>



<input

type="password"

placeholder="Enter Password"

className="border w-full p-3 rounded mb-4"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>



<button

onClick={login}

className="bg-blue-700 text-white w-full p-3 rounded"

>

Login

</button>


</div>


</div>

);


}