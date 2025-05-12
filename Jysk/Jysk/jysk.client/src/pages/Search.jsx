import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom'; 
import axios from 'axios';

import BodySection from "../components/BodySection";
import ProductCard from "../components/ProductCard";
import FilterList from "../components/FilterList";
import Paginator from "../components/Paginator";

import '../styles/pages/Search.scss';

export default function Search() {
    var url = "https://localhost:7196/api/Product";
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(10);
    const [pageSize, setPageSize] = useState(12);

    const GetAll = (c_sort = "IdAsc", c_page = 1, c_pageSize = 12) => {
        axios.get(`${url}`, { params: { sort: c_sort, page: c_page, pageSize: c_pageSize } })
            .then(response => {
                setList(response.data)
                //console.log(response.data[1].Name);
            })
            .catch(error => {
                console.error(`Error during axios request`, error);
            });
    };

    useEffect(() => {
        GetAll();
    }, []);
    //const products = Array.from({ length: 12 }, (_, i) => i + 1);

    return (
        <div>
            <FilterList />
            <BodySection noBorder>
                <div className='search-grid'>
                    {list.map((item, index) => (
                        <ProductCard item={item} key={index} index={index} />
                    ))}
                </div>
                
                <Paginator 
                    currentPage={page} 
                    maxPage={maxPage} 
                />
            </BodySection>
            <Outlet />
        </div>
    );
}   
