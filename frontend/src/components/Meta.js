import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = ({title,description,keywords}) => {
  return (
      <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}
Meta.defaultProps = {
    title: 'Welcome To MultiSore',
    description: 'Sample website created by Abdul Manaf',
    keywords: 'React,MERN stack,first project',
  }

export default Meta