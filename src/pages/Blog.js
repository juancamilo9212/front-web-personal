import React from 'react';
import {Row, Col} from 'antd';
import {withRouter, useParams} from 'react-router-dom';
import PostInfo from '../components/Web/Blog/PostInfo';
import PostList from '../components/Web/Blog/PostList';
import {Helmet} from 'react-helmet';

function Blog(props) {
    console.log(props);
    
    const {location, history}=props;
    const {url} = useParams();
    
    return (
        <>
            <Helmet>
                <title>Blogs | Juan Camilo Camargo</title>
                <meta 
                name="description" 
                content="Blog | Blogs sobre tecnología"
                data-react-helmet="true"
            />
            </Helmet>
        <Row>
            <Col md={4}/>
            <Col md={16}>
                {url ? 
                <PostInfo 
                url={url}
                /> 
                : 
                <PostList
                location={location}
                history={history}
                />}
            </Col>
            <Col md={4}/>
        </Row>
        </>
    )
}

export default withRouter(Blog);
