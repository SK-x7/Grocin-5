import { NavLink } from "react-router-dom"

function PageNotFound() {
    return (
        <main className="h-screen flex justify-center items-center bg-blue-300">
            <section className="relative w-4/6  h-5/6 !rounded-3xl bg-[url('src/images/PageNotFound.png')] bg-contain bg-center bg-no-repeat"></section>
            <div className="absolute w-1/5 bg-blue-500 text-white flex justify-center py-3 rounded-xl bottom-36 font-medium text-[18px]">
                <NavLink className="capitalize text-center">return to home page</NavLink>
            </div>
        </main>
    )
}

export default PageNotFound
