"use client";
import React, {useEffect, useState} from "react";

const sortingOptions = [
    {text: "Default"},
    {text: "Sort by Latest"},
    {text: "Sort by Oldest"},
    {text: "Sort by Name"},
    {text: "Sort by Price"},
];

export default function Sorting({setFinalSortedAction}: { setFinalSortedAction: (value: string) => void }) {
    const [selectedOptions, setSelectedOptions] = useState<string>(sortingOptions[0].text);

    useEffect(() => {
        setFinalSortedAction(selectedOptions);
    }, [setFinalSortedAction, selectedOptions]);

    return (
        <>
            {" "}
            <div className="btn-select">
                <span className="text-sort-value">{selectedOptions}</span>
                <span className="icon icon-arrow-down"/>
            </div>
            <div className="dropdown-menu">
                {sortingOptions.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedOptions(item.text)}
                        className={`select-item ${item.text == selectedOptions ? "active" : ""}`}
                    >
                        <span className="text-value-item">{item.text}</span>
                    </div>
                ))}
            </div>
        </>
    );
}
