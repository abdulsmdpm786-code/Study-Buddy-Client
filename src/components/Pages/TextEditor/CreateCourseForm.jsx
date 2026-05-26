import { useState } from 'react';
import TiptapEditor from './TiptapEditor';

export default function CreateCourseForm() {
  // This state will hold the HTML string from TipTap
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending to database:", description);
    // You will send 'description' to your backend via Axios here
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Course Description</h1>
      
      <TiptapEditor 
        value={description} 
        onChange={setDescription} 
      />

      <button type="submit" className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg">
        Save Course
      </button>
    </form>
  );
}