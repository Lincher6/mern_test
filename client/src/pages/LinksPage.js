import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook.";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import LinksList from "../components/LinksList";

export const LinksPage = props => {
    const {request, loading} = useHttp()
    const {token} = useContext(AuthContext)
    const [links, setLinks] = useState([])

    const fetchLinks = useCallback(async () => {
        try {
            const fetchedLinks = await request('/api/links', 'GET', null, {
                authorization: 'Bearer ' + token
            })
            setLinks(fetchedLinks)
        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    if (loading) {
        return <Loader/>
    }

    return (
        <div>
            {!loading && <LinksList links={links}/>}
        </div>
    )
}