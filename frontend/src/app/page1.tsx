import React, { useRef, useState } from 'react';
import useFetch from '../hooks/useFetch';
import Image from 'next/image';

const baseUrl = "http://127.0.0.1:5000/test?url="

const App: React.FC = ()=> {
    const [value, setValue] = useState("something");
    const { data, isLoading, error} = useFetch(baseUrl + value);

    const inputRef = useRef<HTMLInputElement>(null);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (inputRef.current) setValue(inputRef.current.value);
    }
    if (isLoading) return <div> Loading... </div>;
    if (error) return <div> {error.toString()} </div>;
    return (
        <div>
            {data && (
                <div>
                    <form onSubmit={handleSubmit}>
                        <input
                            ref={inputRef}
                            type='text'
                            placeholder='https://www.amazon.com'
                            required={true}
                        >
                        <button> Search </button>
                        </input>
                    </form>
                    <h1> {data.url} </h1>
                    <Image
                        src={data.img}
                        alt="Product Image"
                    ></Image>
                </div>
            )}
        </div>
    )


}