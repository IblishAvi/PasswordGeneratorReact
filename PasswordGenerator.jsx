import { useState, useCallback, useEffect ,useRef} from "react";

function App() {
  const [length, setLength] = useState(8);
  const [allowChar, setAllowChar] = useState(false);
  const [allowNum, setAllowNum] = useState(false);
  let [password, setPassword] = useState("");
  const btn =document.querySelector(".mess")

// useRef uses for reference of the Input Field.
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
  }, [length,allowChar,allowNum,setPassword]);

  const reset =() =>{
    passGenerator()
    btn.innerHTML ="Copy";
    btn.style.backgroundColor ="gray";

  }
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
  btn.innerHTML = "Copied";
  btn.style.backgroundColor ="olive";


},[password,btn])

  
  return (
    // Password Generation  code inside Fragment
    <>
      <div className="bg-olive h-full">
        <div className="w-full  max-w-md mx-auto translate-y-28   px-4  text-orange-500 rounded-lg bg-gray-700" >
          <h1 className="text-center text-white  p-6 font-bold underline text-2xl">Password Generator</h1>
          <div className="flex shadow rounded-lg overflow-hidden py-4 mx-auto">
            <input
              type="text"
              value={password}
              required
              placeholder="Password"
              readOnly
              ref={passRef}
              className="outline-none w-full  px-2 py-1 rounded-xl "
            />
            
            <button  onClick={copytoClipboard} className= "mess bg-gray-600  w-20 rounded-xl text-black">
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
          <div className="flex justify-end m-3 p-4">
          <button
          className="bg-stone-800 w-20 p-2  text-white  rounded-md "
          type="Reset" onClick={reset}> Reset</button>
          </div>
        
        </div>
      </div>
    </>
  );
}
export default App; 
