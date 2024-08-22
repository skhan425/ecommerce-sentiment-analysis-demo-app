import useFetch from '@/hooks/useFetch';
import React, { Fragment, useRef, useState } from 'react';


const validateUrl = (url: HTMLInputElement) => {
  const amazonUrlPattern = /^(https?:\/\/)?(www\.)?amazon\.(com)\/.*$/;
  return amazonUrlPattern.test(url.innerText);
};

export default function Search() {
  const [endpoint, setEndpoint] = useState<string | null>(null);
  const url = `http://127.0.0.1:5000/result?url=${endpoint}`;
  const { data, isLoading, error } = useFetch(url);
  
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (inputRef.current) {
      setEndpoint(inputRef.current.value);
    }
  }
  if (isLoading) <div> Loading... </div>;
  if (error) <div> {error.toString()} </div>
  return <>
    <div className="z-50 container mx-auto px-4 mt-7">
    <div className="max-w-6xl mx-auto">
        <form action="/search" method="get" onSubmit={handleSubmit} className="mx-auto max-w-5xl px-10">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="default-search" ref= {inputRef} className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg " placeholder={"Enter valid Amazon URL"} required={true} />
            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-gray-800 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 light:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Search</button>
          </div>
        </form>

        <div>
          {isLoading == false && data && <>
            <div className="grid grid-cols-2 gap-10 ml-10 my-5">
              <h1 className="font-bold text-4xl mt-7 mx-auto justify-center"> {data["title"]} </h1>
              <div></div>
              <div>
                <img src={data["image"]} width="400" height="400" className="mx-auto"></img>
              </div>
              <div>
                <p>{data["description"]}</p>
              </div>
              <div className="col-span-2 mx-auto">
                <p>{data["reviews"]}</p>
              </div>
            </div>
          </>}
        </div>
      </div>
    </div>
  </>
}

