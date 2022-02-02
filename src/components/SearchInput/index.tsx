import React from 'react';

type Props = {
    handleSearch: (keyword: string) => void;
    placeholder?: string;
};

const SearchInput = (props: Props) => {
    const { handleSearch, placeholder = 'Tìm kiếm' } = props;
    const [keyword, setKeyword] = React.useState('');
    const typingTimeOutRef = React.useRef<any>(null);

    const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setKeyword(value);
        if (!handleSearch) return;

        if (typingTimeOutRef.current) clearTimeout(typingTimeOutRef.current);

        typingTimeOutRef.current = setTimeout(() => {
            handleSearch(value);
        }, 300);
    };

    return (
        <form className="my-3">
            <input
                type="text"
                className="form-control"
                onChange={handleSearchKeyword}
                placeholder={placeholder}
            />
        </form>
    );
};

export default SearchInput;
