"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { db } from "../firebase";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc
} from "firebase/firestore";


export default function Admin(){
  const router = useRouter();


const [orders,setOrders]=useState<any[]>([]);



const loadOrders=async()=>{


const snapshot = await getDocs(
collection(db,"orders")
);


const data:any[]=[];


snapshot.forEach((item)=>{


data.push({

id:item.id,

...item.data()

});


});


setOrders(data);


};





useEffect(()=>{


const checkLogin = async()=>{


const token = localStorage.getItem("adminToken");


if(!token){

router.push("/admin-login");

return;

}



const snap = await getDoc(

doc(db,"adminSession","current")

);



if(!snap.exists()){

router.push("/admin-login");

return;

}


if(!snap.exists()){

router.push("/admin-login");

return;

}



if(snap.data().token !== token){
  if(snap.data().token !== token){

alert("Another device logged in");

localStorage.removeItem("adminToken");

router.push("/admin-login");

return;

}

localStorage.removeItem("adminToken");

router.push("/admin-login");

return;

}



loadOrders();


};



checkLogin();


const interval = setInterval(checkLogin, 2000);


return () => clearInterval(interval);


},[]);






const completeOrder=async(id:string)=>{


await updateDoc(

doc(db,"orders",id),

{

status:"Completed"

}

);


loadOrders();


};








const deleteOrder=async(id:string)=>{


await deleteDoc(

doc(db,"orders",id)

);


loadOrders();


};







const deleteAllOrders=async()=>{


const check=confirm(
"Kya aap saare orders delete karna chahte hain?"
);



if(!check)return;



const snapshot=await getDocs(
collection(db,"orders")
);



for(const item of snapshot.docs){


await deleteDoc(

doc(db,"orders",item.id)

);


}



loadOrders();


};







const totalOrders=orders.length;



const pendingOrders=orders.filter(

(order)=>

order.status?.toLowerCase()==="pending"

).length;





const completedOrders=orders.filter(

(order)=>

order.status==="Completed"

).length;







const totalAmount=orders.reduce(

(sum,order)=>

sum + Number(order.price || 0),

0

);







return (

<main className="min-h-screen bg-gray-100 p-5">


<div className="max-w-6xl mx-auto">





<div className="bg-blue-700 text-white p-6 rounded-2xl shadow text-center">


<img

src="/logo.png"

className="w-24 h-24 mx-auto rounded-full"

/>



<h1 className="text-3xl font-bold mt-3">

💻 EASY WITH HARSH

</h1>



<p>

Digital Service Center | Jaunpur

</p>



<h2 className="text-xl mt-2">

ADMIN PANEL

</h2>


</div>







<div className="grid md:grid-cols-4 gap-5 mt-6">



<div className="bg-white p-5 rounded-xl shadow text-center">

<h2 className="font-bold">

📦 Total Orders

</h2>

<p className="text-4xl font-bold text-blue-700">

{totalOrders}

</p>

</div>





<div className="bg-white p-5 rounded-xl shadow text-center">

<h2 className="font-bold">

⏳ Pending

</h2>

<p className="text-4xl font-bold text-orange-600">

{pendingOrders}

</p>

</div>





<div className="bg-white p-5 rounded-xl shadow text-center">

<h2 className="font-bold">

✅ Completed

</h2>

<p className="text-4xl font-bold text-green-600">

{completedOrders}

</p>

</div>





<div className="bg-white p-5 rounded-xl shadow text-center">

<h2 className="font-bold">

💰 Revenue

</h2>

<p className="text-4xl font-bold">

₹{totalAmount}

</p>

</div>



</div>






<button

onClick={deleteAllOrders}

className="mt-6 bg-red-600 text-white px-6 py-3 rounded-xl font-bold"

>

🗑 Delete All Orders

</button>
<h2 className="text-3xl font-bold mt-8 mb-5">

📋 Customer Orders

</h2>





{

orders.length===0 ?


<div className="bg-white p-5 rounded-xl shadow">

No Orders Found

</div>



:


orders.map((order)=>(



<div

key={order.id}

className="bg-white p-6 rounded-xl shadow mb-5"

>




<h3 className="text-xl font-bold text-blue-700">

🆕 {order.service}

</h3>





<p className="mt-3">

👤 Name : {order.customerName || "Not Available"}

</p>





<p>

📱 Mobile : {order.mobile || "Not Available"}

</p>
<div className="flex gap-3 mt-3">

<a
href={`tel:${order.mobile}`}
className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold"
>
📞 Call Customer
</a>


<a
href={`https://wa.me/91${order.mobile}?text=Hello%20${order.customerName},%20EASY%20WITH%20HARSH%20se%20aapka%20order%20mil%20gaya%20hai.`}
target="_blank"
rel="noopener noreferrer"
className="bg-green-600 text-white px-5 py-2 rounded-xl font-bold"
>
📲 WhatsApp
</a>

</div>





<p>

📍 Address : {order.address || "Not Available"}

</p>





<p>

💰 Price : ₹{order.price || 0}

</p>





<p>

🧾 Transaction : {order.transaction || "Not Available"}

</p>





<p>

📌 Status : {order.status}

</p>







{

order.createdAt && (


<p className="mt-2 font-bold text-blue-700">

🕒 Order Date & Time :{" "}

{

order.createdAt.toDate().toLocaleString("en-IN")

}


</p>


)

}






<div className="mt-5">


<h3 className="font-bold text-lg">

📂 Customer Documents

</h3>




<div className="flex flex-wrap gap-3 mt-3">





{

order.documents?.aadhaarFront &&

<a

href={order.documents.aadhaarFront}

target="_blank"

rel="noopener noreferrer"

className="bg-blue-600 text-white px-4 py-2 rounded-xl"

>

🪪 Aadhaar Front

</a>

}







{

order.documents?.aadhaarBack &&

<a

href={order.documents.aadhaarBack}

target="_blank"

rel="noopener noreferrer"

className="bg-blue-600 text-white px-4 py-2 rounded-xl"

>

🪪 Aadhaar Back

</a>

}






{

order.documents?.photo &&

<a

href={order.documents.photo}

target="_blank"

rel="noopener noreferrer"

className="bg-purple-600 text-white px-4 py-2 rounded-xl"

>

📷 Photo

</a>

}






{

order.documents?.signature &&

<a

href={order.documents.signature}

target="_blank"

rel="noopener noreferrer"

className="bg-green-600 text-white px-4 py-2 rounded-xl"

>

✍️ Signature

</a>

}






{

order.documents?.proofOfBirth &&

<a

href={order.documents.proofOfBirth}

target="_blank"

rel="noopener noreferrer"

className="bg-orange-600 text-white px-4 py-2 rounded-xl"

>

📄 Birth Proof

</a>

}




</div>


</div>
<div className="flex gap-3 mt-6">



<button

onClick={()=>completeOrder(order.id)}

className="bg-green-600 text-white px-5 py-2 rounded-xl"

>

✅ Complete

</button>





<button

onClick={()=>deleteOrder(order.id)}

className="bg-red-600 text-white px-5 py-2 rounded-xl"

>

🗑 Delete

</button>



</div>





</div>



))


}



</div>


</main>


);


}