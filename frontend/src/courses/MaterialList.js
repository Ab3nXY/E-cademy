import React, { useState, useEffect } from 'react';
import axios from '../components/axiosSetup';
import { useParams } from 'react-router-dom';

const MaterialList = () => {
  const { courseId } = useParams();
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get(`/api/courses/${courseId}/materials/`);
        setMaterials(response.data);
      } catch (error) {
        console.error('Error fetching materials:', error);
      }
    };

    fetchMaterials();
  }, [courseId]);

  return (
    <div className="material-list">
      <h2 className="text-2xl font-bold mb-4">Materials</h2>
      {materials.map(material => (
        <div key={material.id} className="bg-gray-100 p-4 mb-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">{material.title}</h3>
          <p>{material.content}</p>
          {material.file && (
            <a href={material.file} className="text-blue-500 underline">
              Download
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default MaterialList;
