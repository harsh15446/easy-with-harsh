"use client";

import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc
} from "firebase/firestore";


export default function AdminPage() {


const [orders,setOrders] = useState<any[]>([]);
const [loading,setLoading] = useState(true);



const getOrders = async()=>{

try{


const snap = await getDocs(
collection(db,"orders")
);



const data = snap.docs.map((item)=>({

id:item.id,
...item.data()

}));


setOrders(data);



}
catch(error){

console.log("Firebase Error:",error);

}


finally{

setLoading(false);

}


};





useEffect(()=>{

getOrders();

},[]);







const updateStatus = async(
id:string,
status:string
)=>{


try{


await updateDoc(

doc(db,"orders",id),

{
status:status
}

);


getOrders();


}
catch(error){

console.log(error);

}


};







if(loading){

return(

<div className="p-10 text-2xl font-bold">

Loading Orders...

</div>

)

}






return(


<main className="min-h-screen bg-gray-100 p-5">


<div className="max-w-6xl mx-auto">


<h1 className="text-4xl font-bold mb-6">

Admin Dashboard

</h1>




{

orders.length===0 ?


<div className="bg-white p-5 rounded-xl shadow">

No Orders Found

</div>


:


<div className="grid gap-5">


{

orders.map((order)=>(


<div

key={order.id}

className="bg-white p-5 rounded-2xl shadow"

>


<h2 className="text-2xl font-bold text-blue-700">

{order.service}

</h2>



<div className="mt-3 space-y-1">


<p>

👤 Name:
{" "}
{order.customerName || order.name || "N/A"}

</p>


<p>

📱 Mobile:
{" "}
{order.mobile || "N/A"}

</p>



<p>

🏠 Address:
{" "}
{order.address || "N/A"}

</p>



<p>

💰 Charge:
{" "}
₹{order.price || 0}

</p>



<p>

💳 Payment:
{" "}
{order.paymentStatus || "Pending"}

</p>



<p>

📌 Status:
{" "}
{order.status || "Pending"}

</p>


</div>





<div className="flex gap-3 mt-5 flex-wrap">


<a

href={`https://wa.me/91${order.mobile}`}

target="_blank"

className="bg-green-600 text-white px-4 py-2 rounded-xl"

>

WhatsApp

</a>





<a

href={`tel:${order.mobile}`}

className="bg-blue-600 text-white px-4 py-2 rounded-xl"

>

Call

</a>



</div>







<select

className="border p-3 rounded-xl mt-5"

value={order.status || "Pending"}

onChange={(e)=>
updateStatus(
order.id,
e.target.value
)
}

>


<option value="Pending">

Pending

</option>


<option value="Processing">

Processing

</option>


<option value="Completed">

Completed

</option>


<option value="Cancelled">

Cancelled

</option>


</select>





</div>


))


}


</div>


}



</div>


</main>


)


}