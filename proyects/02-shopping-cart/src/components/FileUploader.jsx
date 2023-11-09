import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { firestore } from "../firebase.js";
import { collection, addDoc } from "@firebase/firestore";
import * as XLSX from "xlsx";
import { getDocs, deleteDoc } from "@firebase/firestore";


export function FileUploader({ onUploadComplete }) {
  const [uploadedData, setUploadedData] = useState(null);

  const parseExcel = function(file) {
  var reader = new FileReader();

  reader.onload = function(e) {
    var data = e.target.result;
    var workbook = XLSX.read(data, {
      type: 'binary'
    });

    workbook.SheetNames.forEach(async function(sheetName) {
      const headers = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 })[0];

      var XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      var json_object = JSON.stringify(XL_row_object);
      console.log(json_object);

      // Filtra las filas que tengan todas las celdas vacías
      const jsonData = XL_row_object.filter(row => Object.values(row).some(cell => cell !== undefined && typeof cell !== "object"));

      setUploadedData(jsonData);
      onUploadComplete(jsonData);

      // Actualiza Firestore con los nuevos datos
      await updateFirestore(jsonData);
    });
  };

  reader.onerror = function(ex) {
    console.log(ex);
  };

  reader.readAsBinaryString(file);
};

  const updateFirestore = async (jsonData) => {
    try {
      const librosCollectionRef = collection(firestore, "libro");

      // Borra todos los documentos existentes en la colección antes de añadir los nuevos
      const querySnapshot = await getDocs(librosCollectionRef);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      // Añade los nuevos documentos a Firestore
      jsonData.forEach(async (libro) => {
        await addDoc(librosCollectionRef, libro);
      });
    } catch (error) {
      console.error("Error al actualizar Firestore:", error);
    }
  };

  const onDrop = async (acceptedFiles) => {
    const xlsFile = acceptedFiles[0];

    try {
      // Llama a la función de conversión a JSON aquí
      parseExcel(xlsFile);
    } catch (error) {
      console.error("Error al procesar el archivo:", error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-uploader">
      <input {...getInputProps()} />
      <p>Arrastra y suelta un archivo aquí o haz clic para seleccionar uno.</p>
      {uploadedData && (
        <div>
          <h4>Datos subidos:</h4>
          <pre>{JSON.stringify(uploadedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
