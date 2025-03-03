import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProductDetails } from "./pages/ProductDetails";
import { ProductList } from "./pages/ProductList";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

const Router = () => {
  
    return (
        <Routes>
            <Route 
                path='/' 
                element={
                    <>
                        <Header />
                        <ProductList />
                        <Sidebar />
                        <Footer />
                    </>
                }
            />
            <Route 
                path='/product/:id' 
                element={
                    <>
                        <Header />
                        <ProductDetails />
                        <Sidebar />
                        <Footer />
                    </>
                } 
            />
        </Routes>
    )
}

export default Router;
