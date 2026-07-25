"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";


export default function Admin(){

const router = useRouter();

const [orders,setOrders] = useState<any[]>([]);
const [search,setSearch] = useState("");
const [loading,setLoading] = useState(true);



useEffect(()=>{

const admin = localStorage.getItem("admin");


if(admin !== "true"){

router.push("/admin/login");

return;

}


fetchOrders();


},[]);





const fetchOrders = async()=>{

const snap = await getDocs(
collection(db,"orders")
);


const data = snap.docs.map((item)=>({

id:item.id,
...item.data()

}));


setOrders(data);

setLoading(false);

};





const updateStatus = async(
id:string,
status:string
)=>{


await updateDoc(

doc(db,"orders",id),

{
status:status
}

);



setOrders((old)=>

old.map((order)=>

order.id===id

?

{
...order,
status:status
}

:

order

)

);


};






const logout = ()=>{

localStorage.removeItem("admin");

router.push("/admin/login");

};





const openWhatsApp = (mobile:string,name:string,orderID:string)=>{


const number = "91" + mobile;


const message =
`Hello ${name},
Your Order ID: ${orderID}

Thank you for using EASY WITH HARSH.`;


window.open(

`https://wa.me/${number}?text=${encodeURIComponent(message)}`,

"_blank"

);


};





if(loading){

return(

<div className="p-10 text-2xl">

Loading...

</div>

);

}





const filteredOrders = orders.filter((order)=>

order.name?.toLowerCase()
.includes(search.toLowerCase())

||

order.mobile?.includes(search)

);





return(

<main className="min-h-screen bg-gray-100 p-6">



<div className="flex justify-between items-center mb-6">


<h1 className="text-3xl font-bold text-blue-700">

💻 EASY WITH HARSH ADMIN

</h1>



<button

onClick={logout}

className="bg-red-600 text-white px-5 py-2 rounded"

>

Logout

</button>


</div>





<input

placeholder="Search Name or Mobile"

className="w-full p-3 border rounded mb-6"

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>






<div className="grid gap-5">


{

filteredOrders.map((order)=>(


<div

key={order.id}

className="bg-white p-5 rounded-xl shadow"

>



<p className="font-bold">

🆔 Order ID: {order.orderID || "Old Order"}

</p>



<h2 className="text-xl font-bold mt-2">

👤 {order.name}

</h2>




<p>

📱 {order.mobile}

</p>




<div className="flex gap-3 mt-3">


<a

href={`tel:${order.mobile}`}

className="bg-blue-600 text-white px-4 py-2 rounded"

>

📞 Call

</a>




<button

onClick={()=>openWhatsApp(

order.mobile,

order.name,

order.orderID

)}

className="bg-green-600 text-white px-4 py-2 rounded"

>

💬 WhatsApp

</button>


</div>





<p className="mt-3">

🛠 {order.service}

</p>


<p>

💰 {order.price}

</p>




{

order.document &&

<a

href={order.document}

target="_blank"

className="text-blue-600 underline block mt-3"

>

📂 Open Document

</a>

}





<p className="font-bold mt-3">

Status: {order.status}

</p>





<div className="flex gap-3 mt-3">


<button

onClick={()=>updateStatus(order.id,"Processing")}

className="bg-blue-600 text-white px-4 py-2 rounded"

>

Processing

</button>




<button

onClick={()=>updateStatus(order.id,"Completed")}

className="bg-green-700 text-white px-4 py-2 rounded"

>

Completed

</button>


</div>




</div>


))

}


</div>


</main>

);


}