import { Route, BrowserRouter, Routes } from "react-router-dom"
import {Navbar, Footer} from "./components"
import Home from './pages/Home.jsx'
import Contact from './pages/Contact.jsx'
import About from "./pages/About.jsx"
import RecentProjects from "./pages/RecentProjects.jsx";

export const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route
                    path='/*'
                    element={
                        <>
                            <Routes>
                                <Route path='/about' element={<About />} />
                                <Route path='/projects' element={<RecentProjects />} />
                                <Route path='/contact' element={<Contact />} />
                            </Routes>
                            <Footer />
                        </>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}