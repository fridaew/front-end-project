import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import {useState } from "react";

const LoadingComponent = () => {

    let [loading, setLoading] = useState(true);

    return (
        <div className="sweet-loading text-center">
            <ClipLoader
                color={'#486349'}
                loading={loading}
                css=''
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default LoadingComponent