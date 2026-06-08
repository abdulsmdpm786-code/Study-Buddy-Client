import { useState } from "react";
import axios from "axios";
import QalamAi from "./QalamAi";
import GeminiResultBox from "./geminiResult";
import { useAuth } from "../../../Auth/AuthContext";

export default function AiDashboard() {
  const { user, isLoading } = useAuth();
  const [Loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState("");
  const [error, setError] = useState(null);

  const handleSearchSubmit = async (queryText) => {
    setError(null)
    console.log("input in..", queryText);
    setLoading(true);
    setAiResult("");

    try {
      const response = await axios.post("/api/v3/gemini/chat", {
        message: queryText,
      });

      setAiResult(
        response?.data?.replay?.response?.candidates?.[0]?.content?.parts?.[0]
          ?.text,
      );
    } catch (error) {
      
        setError(
          "Study Buddy is currently helping too many students! Please try again in a minute.")
    } finally {
      setLoading(false);
    }
  };

  console.log("ai", aiResult);
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col gap-6 min-h-screen">
      <QalamAi onSearchSubmit={handleSearchSubmit} user={user} />
      {error && (
        <div className="p-3 mb-4 text-base text-center bg-rose-600 text-white  rounded-lg">
          {error}
        </div>
      )}

      <GeminiResultBox isLoading={Loading} resultText={aiResult} />
    </div>
  );
}
