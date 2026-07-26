"use client";

import Image from "next/image";
import Link from "next/link";

import { services } from "./data/services";


export default function Home(){


return(

<main className="min-h-screen bg-gray-100 p-5">


<div className="max-w-6xl mx-auto">



<div className="bg-blue-700 text-white p-8 rounded-2xl shadow text-center">


<Image

src="/logo.png"

width={120}

height={120}

alt="logo"

className="mx-auto rounded-full"

/>



<h1 className="text-4xl font-bold mt-4">

EASY WITH HARSH

</h1>


<p className="text-xl mt-2">

Digital Service Portal

</p>


<p>

Fast & Secure Online Services

</p>


</div>





<h2 className="text-3xl font-bold mt-8 mb-5">

🛠 Select Service

</h2>





<div className="grid md:grid-cols-3 gap-5">



{

services.map((item)=>(



<Link

key={item.slug}

href={`/services/${item.slug}`}

className="bg-white p-5 rounded-xl shadow hover:shadow-lg"

>


<h3 className="font-bold text-lg">

📄 {item.name}

</h3>



<p className="text-blue-700 mt-2">

Charge: ₹{item.price}

</p>



<button

className="mt-3 bg-blue-700 text-white px-4 py-2 rounded-xl"

>

Open Service

</button>



</Link>


))


}



</div>





</div>





<div className="fixed bottom-5 left-5 right-5 md:left-auto md:right-5 md:w-96 bg-green-600 text-white p-4 rounded-2xl shadow-xl z-50">


<div className="flex items-center justify-between gap-3">


<div>

<h3 className="font-bold text-lg">

More Information?

</h3>


<p className="text-sm">

Contact us on WhatsApp

</p>


</div>



<a

href="https://wa.me/916306623917"

target="_blank"

className="bg-white text-green-600 px-4 py-2 rounded-xl font-bold"

>

WhatsApp

</a>


</div>


</div>



</main>

);


}