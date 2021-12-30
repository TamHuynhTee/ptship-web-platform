import React from 'react';
import { useParams } from 'react-router';
import { ContentWrapper } from '../../../../../components';

export const AddressDetail = () => {
    const { id } = useParams<any>();

    return <ContentWrapper>{id}</ContentWrapper>;
};
