import { useRef } from "react";
import { useState, useCallback, useEffect } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [allowChar, setAllowChar] = useState(false);
  const [allowNum, setAllowNum] = useState(false);
  let [password, setPassword] = useState("");
  // const btn =document.querySelector(".mess")
  
// useRef uses
const passRef =useRef(null);

  // Callback Hook to memoize the changes in the variable.
  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (allowChar) str += "~`!@#$%^&*()-+><,.?/{}[]'";
    if (allowNum) str += "0123456789";
    // Generate Random Number
    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass); 
  }, [length,allowChar,allowNum,setPassword,btn]);

  
  // respond as per changes
  useEffect(() => {
    passGenerator();
  }, [length, allowChar, allowNum, passGenerator]);
  // to handle UX for attention
const copytoClipboard =useCallback(()=>{
  // use of UserRef
  passRef.current?.select();
  passRef.current?.setSelectionRange(0,99);

  window.navigator.clipboard.writeText(password);
  // btn.innerHTML = "Copied";
  btn.style.backgroundColor ="grey"


},[password,btn])

  
  return (
    // Password Generation  code inside Fragment
    <>
      <div className=" w-full  max-w-md mx-auto px-4 my-8  text-orange-500 rounded-lg bg-gray-700  ">
        <div className="mt-4" >
          <h1 className="text-center text-white ">Password Generator</h1>
          <div className="flex shadow rounded-lg overflow-hidden mx-auto">
            <input
              type="text"
              value={password}
              required
              placeholder="Password"
              readOnly
              ref={passRef}
              className="outline-none w-full py-1 px-2 rounded-xl "
            />
            
            <button  onClick={copytoClipboard} className= "mess bg-blue-600  w-15 rounded-xl text-black">
              Copy
            </button>
          </div>
          <div className=" flex text-white  justify-between">
            <input
              type="range"
              min={8}
              max={90}
              required
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="length" className="">
              Length :{length}
            </label>
          </div>
          <div className=" font-bold rounded-md ">
            <input
              type="checkbox"
              className="size-4 bottom-0 rounded-md"
              onChange={() => setAllowNum((prev)=>!prev)}
            />
            <label className="text-white font-bold size-4 pb-3">Number</label><br />
            <input
              type="checkbox"
              className="text-white size-4 rounded-md"
              onChange={() => setAllowChar((prev)=>!prev)}
            />
            <label htmlFor="" className="text-white font-bold ">
              Character
            </label>
          </div>
          
        </div>
      </div>
    </>
  );
}
export default App;