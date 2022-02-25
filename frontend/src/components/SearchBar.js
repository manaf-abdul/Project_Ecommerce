import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
    const navigate = useNavigate()
    const [keyword, setKeyword] = useState('')
  
    const submitHandler = (e) => {
      e.preventDefault()
      if (keyword.trim()) {
        navigate(`/search/${keyword}`)
      } else {
        navigate('/')
      }
    }
  
    return (
      <Form onSubmit={submitHandler} className="d-flex px-3 header-searchbox">
        <Form.Control
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search Products..."
          style={{height:'2 rem',paddingTop:'0.5rem'}}
          height='1rem'
        ></Form.Control>
        <Button type="submit" variant="outline-light" className="p-2" style={{height:'2.8rem',paddingTop:'0.5rem'}}>
          Search
        </Button>
      </Form>
    )
}

export default SearchBar