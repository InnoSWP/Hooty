import React from "react";
import APIPlayground from "./APIPlayground";

export default function APIPlaygroundPage(props) {
    
    
    return (
        <>
            <APIPlayground name={"sample post"} url={"/api/sampleapi"} details={{
                method: "POST",
                body: {
                    message: "aaa"
                },
                contentType: "text/html"
            }} />

            <APIPlayground name={"sample get"} url={"/api/sampleapi"} details={{
                method: "GET"
            }} />
        </>
    )
}