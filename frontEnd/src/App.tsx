// // importing Providers
// import { ThemeProvider } from "@/components/context/theme-provider"




// // importing Compoenents
// import Container from "./components/myUi/Container"
// function App() {
//   return (
//     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
//       <Container>

//       </Container>
//     </ThemeProvider>
//   )
// }

// export default App
import { useState, useEffect } from 'react'
import parse from 'html-react-parser';
const App = () => {

    const [data, setData] = useState(`<h3 className=" bg-red-600">Test<h1>`)
    useEffect(() => {

        getAboutUsInfo()


    }, [])

    async function getAboutUsInfo() {
        console.log("indside eomth")
        // const value = `<h1 className="bg-blue-500">From SErvr</h1>`
        // console.log(JSON.stringify(value));
        // const value="something"
        const value = {
            value:`<h1 className="bg-blue-500">From SErvr</h1>`
        }
        // what function is going to return
        interface JsonType {
            value: string
            msg: string
        }
        const baseUrl = import.meta.env.VITE_BaseUrl
        let res = await fetch(import.meta.env.VITE_BackendUrl + baseUrl + "/test", {
            body: JSON.stringify(value),
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },

        })
        let toJson: JsonType = await res.json()
        if (res.ok) {
            setData(toJson.value)
            return
        }

    }

    return (
        <div>{parse(data)}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum doloribus unde autem fuga praesentium non corrupti dignissimos tempore soluta dolore.
        </div>
    )
}

export default App