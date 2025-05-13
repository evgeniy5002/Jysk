import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom'; 
import axios from 'axios';

import BodySection from "../components/BodySection";
import ProductCard from "../components/ProductCard";
import FilterList from "../components/FilterList";
import Paginator from "../components/Paginator";

import '../styles/pages/Search.scss';

import { SetCallback, GetReq } from '../components/Filters'

export default function Search() {
    var url = "https://localhost:7196/api/ProductFiltration";
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(10);
    const [pageSize, setPageSize] = useState(12);

    const GetAll = (c_sort = "IdAsc") => {
        var req = GetReq();
        axios.get(`${url}`, {
            params: {
                ...req,
                sort: c_sort
            }
        })
            .then(response => {
                setList(response.data)
                //console.log(response.data[1].Name);
                CountPages(response.data.length);
            })
            .catch(error => {
                console.error(`Error during axios request`, error);
            });
    };

    const CountPages = (length) => {
        const max = length / pageSize;
        alert(length);
        const rounded = Math.ceil(max);
        setMaxPage(rounded);
    }

    useEffect(() => {
        SetCallback((() => {
            GetAll();
        }));
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
