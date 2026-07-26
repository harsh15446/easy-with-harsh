"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function AdminLogin(){

const router = useRouter();

const [password,setPassword]=useState("");

const [error,setError]=useState("");



const login=()=>{

if(password==="harsh@123"){

localStorage.setItem(
"adminLogin",
"true"
);

router.push("/admin");

}
else{

setError("Wrong Password");

}

};



return(

<main className="min-h-screen bg-gray-100 flex items-center justify-center p-5">


<div className="bg-white p-8 rounded-xl shadow w-full max-w-md">


<h1 className="text-3xl font-bold text-blue-700">
Admin Login
</h1>


<input

type="password"

placeholder="Password"

className="border p-3 w-full rounded mt-5"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>


{
error &&
<p className="text-red-600 mt-3">
{error}
</p>
}


<button

onClick={login}

className="bg-blue-700 text-white w-full p-3 rounded mt-5"

>

Login

</button>


</div>


</main>

)

}