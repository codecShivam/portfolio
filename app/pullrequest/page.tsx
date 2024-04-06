'use client'
import { useState, useEffect } from "react"

export default function Page() {
    const [pullRequests, setPullRequests] = useState([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/users");
                if (!response.ok) {
                    throw new Error("Failed to fetch pull requests");
                }
                const data = await response.json();
                setPullRequests(data.pullRequests);
            } catch (error) {
                console.log("Error fetching data", error);
                setError("An unexpected error occurred");
            }
        };
        fetchData();
    }, []);
    
    console.log("Pull Requests:", pullRequests);
    return (
        <div>
            <h1>Pull Requests</h1>
            <ul className="text-white">
                {pullRequests.map((pr) => (
                    <li key={pr.number}>
                        <a href={pr.html_url}>{pr.title}</a>
                    </li>
                ))}
            </ul>
            {error && <p>{error}</p>}
        </div>

    )
}