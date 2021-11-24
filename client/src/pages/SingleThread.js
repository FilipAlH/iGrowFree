import React from "react";

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_THREAD } from '../utils/queries';

// const SingleThread = () => {
//     const {threadId} = useParams();

//     const { loading, data } = useQuery(QUERY_SINGLE_THREAD, {
//         variables: { threadId: threadId },
//     });

//     const thread = data?.thread || {};

//     if (loading) {
//       return <div>Loading...</div>;
//     }
//     return (
//         // format
//     )
//}