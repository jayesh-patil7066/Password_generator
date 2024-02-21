import { useState, useCallback ,useEffect,useRef} from "react";

function App() {
  const [length, setlength] = useState(8);
  const [numAllow, setnumAllow] = useState(false);
  const [charAllow, setcharAllow] = useState(false);
  const [password, setPassword] = useState("");

//useRef Hook
const passwordRef=useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllow) str += "0123456789";
    if (charAllow) str += "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllow, charAllow, setPassword])

  const copypasswordtoClipboard=useCallback(()=>{
    passwordRef.current.select()
    //select range but copy all data
   // passwordRef.current.setSelectionRange(1,5)
    window.navigator.clipboard.writeText(password)
  },[password])

 const message=()=>{
    alert("password copy")
  }

  useEffect(()=>{
    passwordGenerator()
  },[length,numAllow,charAllow,passwordGenerator])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-900 text-orange-500">
        <h1 className="text-white text-center">password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />

          <button onClick={copypasswordtoClipboard} 
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap -x-1">
            <input
              type="range"
              min={6}
              max={150}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center ">
            <input
              type="checkbox"
              defaultChecked={numAllow}
              id="numinput"
              onChange={() => {
                setnumAllow((prev) => !prev);
              }}
            />
            <label htmlFor="numinput">Numbers</label>
          </div>

          <div className="flex items-center ">
            <input
              type="checkbox"
              defaultChecked={charAllow}
              id="charinput"
              onChange={() => {
                setcharAllow((prev) => !prev);
              }}
            />
            <label htmlFor="charinput">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
