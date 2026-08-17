import { useEffect, useState } from "react"

// export function LearnUseEffect() {
//     const [quantiy, setQuantity] = useState(0)

//     useEffect(() => {
//         document.title = `React ${quantiy}`
//     }, [quantiy])


//     function handleOrder() {
//         setQuantity((previous) => previous + 1)
//     }

//     return <div>
//         <button onClick={handleOrder}>Mua hang</button>
//     </div>
// }

export function LearnUseEffect() {
    const [search, setSearch] = useState("")
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!search.trim()) {
            setUsers([])
        }

        async function callApiAndSearchUsers() {
            setLoading(true);

            try {
                const response = await fetch(
                `/api/users?search=${encodeURIComponent(search)}`
                );
        
                if (!response.ok) {
                throw new Error("Failed to fetch users");
                }
        
                const data = await response.json();
                setUsers(data);
            } finally {
                setLoading(false);
            }
        }

        callApiAndSearchUsers()

    }, [search])


    function handleChange(event: any) {
        setSearch(event.target.value)
    }

    return <div>
        <input value={search} type="text" onChange={handleChange}/>
        <div>{users.toString()}</div>
    </div>
}

// export function LearnUseEffect() {
//     const [width, setWidth] = useState(window.innerWidth);

//     useEffect(() => {
//       function handleResize() {
//         setWidth(window.innerWidth);
//       }
  
//       window.addEventListener("resize", handleResize);

//       return () => {
//         window.removeEventListener("resize", handleResize);
//       };
//     }, []);
  
//     return <div>
//         <p>Window width: {width}px</p>
//         </div>
// }