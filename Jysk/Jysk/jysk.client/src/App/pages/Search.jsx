import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

import BodySection from "../components/BodySection";
import FilterList from "../components/FilterList";
import ProductGrid from "../components/ProductGrid";

import '../styles/pages/Search.scss';

import { SetGetAllCallback, GetReq } from '../components/Filters'

export default function Search() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get("type") || "product";
    const query = queryParams.get("query") || "";

    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(10);
    const [pageSize, setPageSize] = useState(12);

    const url = "https://localhost:7196/api/ProductFiltration";

    const GetAll = (c_sort = "IdAsc") => {
        if (type !== "product") return; 
        const req = GetReq();
        axios.post(`${url}`, req, { params: { sort: c_sort } }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setList(response.data);
                CountPages(response.data.length);
            })
            .catch(error => {
                console.error(`Error during axios request`, error);
            });
    };

    const CountPages = (length) => {
        const max = length / pageSize;
        const rounded = Math.ceil(max);
        setMaxPage(rounded);
    }

    useEffect(() => {
        SetGetAllCallback((sort) => {
            GetAll(sort);
        });
        GetAll();
    }, [type]);

    useEffect(() => {
        if (!queryParams.has("type")) {
            queryParams.set("type", "product");
            navigate(`/search?${queryParams.toString()}`, { replace: true });
        }
    }, []);

    const handleTabClick = (newType) => {
        queryParams.set("type", newType);
        navigate(`/search?${queryParams.toString()}`);
    };

    const articleCount = list.length;
    const contentCount = 0;
    const totalCount = articleCount + contentCount;

    return (
        <div>
            <FilterList />
            <BodySection noBorder>
                <div className='tab-bar__container'>
                    <div className='tab-bar'>
                        <button
                            className={type === "product" ? "active" : ""}
                            onClick={() => handleTabClick("product")}
                        >
                            Articles({articleCount})
                        </button>
                        <button
                            className={type === "content" ? "active" : ""}
                            onClick={() => handleTabClick("content")}
                        >
                            Pages({contentCount})
                        </button>
                    </div>

                    <h1 className='tab-search-heading'>{totalCount} results for: {query}</h1>
                    {type === "product" ? (
                        <ProductGrid
                            items={list}
                            page={page}
                            maxPage={maxPage}
                            onPageChange={setPage}
                        />
                    ) : (
                        <span>Content</span>
                    )}
                </div>
            </BodySection>
            <Outlet />
        </div>
    );
}