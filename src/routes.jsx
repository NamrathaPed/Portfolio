import { Routes, Route } from "react-router-dom";
import { App } from "./App";
import { Projects } from "./components/Projects";


export const routing = (
        <Routes>
            <Route path="/" element={<App/>}></Route>
            <Route path="/projects" element={<Projects/>}></Route>
        </Routes>
)