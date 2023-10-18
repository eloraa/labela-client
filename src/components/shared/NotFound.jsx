import { useNavigate } from "react-router-dom"
import { Footer } from "./Footer"
import { Header } from "./Header"

export const NotFound = () => {

  const navigate = useNavigate()
  return (
    <>
    <Header></Header>
    <div className="h-[70vh] grid place-content-center text-center">
        <h1 className="mb-4 flex overflow-hidden w-full text-center items-center text-7xl font-black">
            <span>404</span>
            <span className="text-white [text-shadow:-1px_-1px_0_black,1px_-1px_0_black,-1px_1px_0_black,1px_1px_0_black]">404</span>
            <span>404</span>
            <span className="text-white [text-shadow:-1px_-1px_0_black,1px_-1px_0_black,-1px_1px_0_black,1px_1px_0_black]">404</span>
            <span>404</span>
            <span className="text-white [text-shadow:-1px_-1px_0_black,1px_-1px_0_black,-1px_1px_0_black,1px_1px_0_black]">404</span>
            <span>404</span>
            <span className="text-white [text-shadow:-1px_-1px_0_black,1px_-1px_0_black,-1px_1px_0_black,1px_1px_0_black]">404</span>
            <span>404</span>
            <span className="text-white [text-shadow:-1px_-1px_0_black,1px_-1px_0_black,-1px_1px_0_black,1px_1px_0_black]">404</span>
        </h1>
        <h2>Something isn&apos;t Found</h2>

        <button className="bg-black py-3 md:max-w-[500px] max-w-[90%] w-full mx-auto text-white mt-6 rounded font-bold" onClick={() => navigate(-1)}>Go Back</button>

    </div>
      <Footer></Footer>
      </>

  )
}
