import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API from "../api/api"

export default function SyllabusViewer() {
  const { id } = useParams();
  const [syllabus, setSyllabus] = useState(null);

  useEffect(() => {
    API.get(`/nphs/syllabus/${id}/`)
      .then((res) => setSyllabus(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!syllabus) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="w-screen h-screen bg-white">
      <iframe
        src={syllabus.file} 
        title="Syllabus Viewer"
        className="w-full h-full border-none"
      />
    </div>
  );
}
