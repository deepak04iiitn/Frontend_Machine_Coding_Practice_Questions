// import React, { useState } from 'react'

// export default function App() {

//   const [open , setOpen] = useState(false);
//   const [open1 , setOpen1] = useState(false);
//   const [open2 , setOpen2] = useState(false);

//   return (
//     <div>

//       <div className='border-2 w-80'>
//         <div>
//           <span>What is your name?</span>
//           {open && (
//             <>
//               <button className='ml-30 cursor-pointer' onClick={() => setOpen(false)}>Hide</button>
//             </>
//           )}

//           {!open && (
//             <>
//               <button className='ml-30 cursor-pointer' onClick={() => setOpen(true)}>Show</button>
//             </>
//           )}
//         </div>
//         {open && (
//           <>
//             <div className='mt-10'>
//               <span>Hello sir , my name is Deepak Kumar Yadav</span>
//             </div>
//           </>
//         )}
//       </div>

//       <div className='border-2 w-80'>
//         <div>
//           <span>What is your education?</span>
//           {open1 && (
//             <>
//               <button className='ml-30 cursor-pointer' onClick={() => setOpen1(false)}>Hide</button>
//             </>
//           )}

//           {!open1 && (
//             <>
//               <button className='ml-30 cursor-pointer' onClick={() => setOpen1(true)}>Show</button>
//             </>
//           )}
//         </div>
//         {open1 && (
//           <>
//             <div className='mt-10'>
//               <span>I am currently in my 4th year of B.Tech in Electronics and Communication enginnering at IIIT Nagpur.</span>
//             </div>
//           </>
//         )}
//       </div>

//       <div className='border-2 w-80'>
//         <div>
//           <span>Where do you live?</span>
//           {open2 && (
//             <>
//               <button className='ml-30 cursor-pointer' onClick={() => setOpen2(false)}>Hide</button>
//             </>
//           )}

//           {!open2 && (
//             <>
//               <button className='ml-30 cursor-pointer' onClick={() => setOpen2(true)}>Show</button>
//             </>
//           )}
//         </div>
//         {open2 && (
//           <>
//             <div className='mt-10'>
//               <span>Actually I belong from Basti , Uttar Pradesh.</span>
//             </div>
//           </>
//         )}
//       </div>

//     </div>
//   )
// }



// Modular and Scalable Code

import React, { useState } from 'react';

function AccordionItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='border-2 w-80 p-4 mb-4 rounded shadow'>
      <div className='flex justify-between items-center'>
        <span>{question}</span>
        <button
          className='ml-4 cursor-pointer text-blue-500 underline'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Hide' : 'Show'}
        </button>
      </div>
      {isOpen && (
        <div className='mt-4 text-gray-700'>
          <span>{answer}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='flex flex-col items-center'>
        <AccordionItem
          question="What is your name?"
          answer="Hello sir, my name is Deepak Kumar Yadav."
        />
        <AccordionItem
          question="What is your education?"
          answer="I am currently in my 4th year of B.Tech in Electronics and Communication Engineering at IIIT Nagpur."
        />
        <AccordionItem
          question="Where do you live?"
          answer="Actually, I belong from Basti, Uttar Pradesh."
        />
      </div>
    </div>
  );
}

