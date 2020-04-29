import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook.";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const CreatePage = props => {
    const history = useHistory()
    const {request} = useHttp()
    const [link, setLink] = useState('')
    const auth = useContext(AuthContext)

    useEffect(() => {
        window.M.updateTextFields()
    }, [])


    const pressHandler = async event => {
        if(event.key === 'Enter') {
            try {
                const data = await request('/api/links/generate', 'POST', {from: link}, {authorization: 'Bearer ' + auth.token})
                history.push(`/description/${data.link._id}`)
            } catch (e) {}
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input
                        placeholder="Втавте ссылку"
                        id="link"
                        type="text"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Введите ссылку</label>
                </div>
            </div>
        </div>
    )
}