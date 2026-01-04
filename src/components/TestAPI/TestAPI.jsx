import { useEffect, useState } from "react";
import { movieAPI } from "../../services/api";
import "./TestAPI.css";

const TestAPI = () => {
    const [testResult, setTestResult] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const testAPIConnection = async () => {
            try {
                setLoading(true);
                console.log("Testing API connection...");
                const response = await movieAPI.testConnection();
                console.log("API Test Response:", response);
                setTestResult({
                    success: true,
                    data: response.data,
                    status: response.status,
                });
            } catch (error) {
                console.error("API Test Failed:", error);
                setTestResult({
                    success: false,
                    error: error.message,
                    response: error.response,
                });
            } finally {
                setLoading(false);
            }
        };

        testAPIConnection();
    }, []);

    return (
        <div className="test-api">
            <h3>API Connection Test</h3>
            {loading ? (
                <p>Testing connection...</p>
            ) : testResult?.success ? (
                <div className="success">
                    <p>✅ API Connection Successful!</p>
                    <p>Status: {testResult.status}</p>
                    <details>
                        <summary>Response Details</summary>
                        <pre>{JSON.stringify(testResult.data, null, 2)}</pre>
                    </details>
                </div>
            ) : (
                <div className="error">
                    <p>❌ API Connection Failed</p>
                    <p>Error: {testResult?.error}</p>
                    {testResult?.response && (
                        <details>
                            <summary>Error Details</summary>
                            <p>Status: {testResult.response.status}</p>
                            <pre>
                                {JSON.stringify(
                                    testResult.response.data,
                                    null,
                                    2
                                )}
                            </pre>
                        </details>
                    )}
                </div>
            )}
        </div>
    );
};

export default TestAPI;
