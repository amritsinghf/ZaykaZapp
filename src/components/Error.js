import { useRouteError } from "react-router"

const Error = () =>{
    const err = useRouteError();
    console.log(err)
    return (
        <>
            <h1>{err.statusText}</h1>
            <p>Not found</p>
        </>
    )
}

export default Error;