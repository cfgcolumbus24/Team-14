import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function Clinicians() {
  // Sample data as an array of objects
  const patientData = [
    { PatientID: "PAT0001", Age: 25, Gender: "Male", Diagnosis: "Asthma", Medication: "Albuterol", VisitDate: "2024-05-16", LabResult: 100.1, Insurance: "Uninsured" },
    { PatientID: "PAT0002", Age: 54, Gender: "Female", Diagnosis: "COPD", Medication: "Lisinopril", VisitDate: "2024-12-06", LabResult: 60.85, Insurance: "Medicare" },
    { PatientID: "PAT0003", Age: 62, Gender: "Female", Diagnosis: "COPD", Medication: "Lisinopril", VisitDate: "2024-07-30", LabResult: 50.98, Insurance: "Medicare" },
    { PatientID: "PAT0004", Age: 57, Gender: "Male", Diagnosis: "Hypertension", Medication: "Atorvastatin", VisitDate: "2024-07-09", LabResult: 115.3, Insurance: "Medicaid" },
    { PatientID: "PAT0005", Age: 58, Gender: "Female", Diagnosis: "COPD", Medication: "Metformin", VisitDate: "2024-04-01", LabResult: 70.92, Insurance: "Private" },
    { PatientID: "PAT0006", Age: 54, Gender: "Female", Diagnosis: "Asthma", Medication: "Albuterol", VisitDate: "2024-08-16", LabResult: 129.82, Insurance: "Uninsured" },
    { PatientID: "PAT0007", Age: 37, Gender: "Male", Diagnosis: "Diabetes", Medication: "Lisinopril", VisitDate: "2024-10-11", LabResult: 87.51, Insurance: "Uninsured" },
    { PatientID: "PAT0008", Age: 54, Gender: "Male", Diagnosis: "COPD", Medication: "Atorvastatin", VisitDate: "2024-06-09", LabResult: 101.15, Insurance: "Private" },
    { PatientID: "PAT0009", Age: 68, Gender: "Female", Diagnosis: "COPD", Medication: "Aspirin", VisitDate: "2024-08-22", LabResult: 68.27, Insurance: "Private" },
    { PatientID: "PAT0010", Age: 90, Gender: "Female", Diagnosis: "Hypertension", Medication: "Lisinopril", VisitDate: "2024-03-24", LabResult: 92.84, Insurance: "Medicaid" },
    { PatientID: "PAT0011", Age: 70, Gender: "Male", Diagnosis: "Heart Disease", Medication: "Lisinopril", VisitDate: "2024-05-14", LabResult: 103.81, Insurance: "Medicare" },
    { PatientID: "PAT0012", Age: 49, Gender: "Female", Diagnosis: "Asthma", Medication: "Lisinopril", VisitDate: "2024-03-08", LabResult: 90.42, Insurance: "Medicare" },
    { PatientID: "PAT0013", Age: 69, Gender: "Male", Diagnosis: "COPD", Medication: "Aspirin", VisitDate: "2024-12-02", LabResult: 111.9, Insurance: "Private" },
    { PatientID: "PAT0014", Age: 66, Gender: "Female", Diagnosis: "Diabetes", Medication: "Albuterol", VisitDate: "2024-03-04", LabResult: 81.0, Insurance: "Medicaid" },
    { PatientID: "PAT0015", Age: 81, Gender: "Female", Diagnosis: "Diabetes", Medication: "Lisinopril", VisitDate: "2024-01-05", LabResult: 130.47, Insurance: "Uninsured" },
    { PatientID: "PAT0016", Age: 39, Gender: "Male", Diagnosis: "Hypertension", Medication: "Aspirin", VisitDate: "2024-12-31", LabResult: 148.74, Insurance: "Medicaid" },
    { PatientID: "PAT0017", Age: 81, Gender: "Male", Diagnosis: "Hypertension", Medication: "Aspirin", VisitDate: "2024-12-01", LabResult: 110.41, Insurance: "Medicaid" },
    { PatientID: "PAT0018", Age: 23, Gender: "Male", Diagnosis: "COPD", Medication: "Atorvastatin", VisitDate: "2024-10-12", LabResult: 54.88, Insurance: "Medicaid" },
    { PatientID: "PAT0019", Age: 54, Gender: "Female", Diagnosis: "COPD", Medication: "Atorvastatin", VisitDate: "2024-09-20", LabResult: 130.22, Insurance: "Medicare" },
    { PatientID: "PAT0020", Age: 29, Gender: "Female", Diagnosis: "Hypertension", Medication: "Atorvastatin", VisitDate: "2024-01-07", LabResult: 65.11, Insurance: "Uninsured" },
    { PatientID: "PAT0021", Age: 64, Gender: "Male", Diagnosis: "COPD", Medication: "Aspirin", VisitDate: "2024-04-13", LabResult: 138.28, Insurance: "Medicaid" },
    { PatientID: "PAT0022", Age: 27, Gender: "Male", Diagnosis: "Asthma", Medication: "Atorvastatin", VisitDate: "2024-05-29", LabResult: 146.01, Insurance: "Medicare" },
    { PatientID: "PAT0023", Age: 78, Gender: "Female", Diagnosis: "Heart Disease", Medication: "Albuterol", VisitDate: "2024-02-05", LabResult: 64.72, Insurance: "Private" },
    { PatientID: "PAT0024", Age: 88, Gender: "Male", Diagnosis: "COPD", Medication: "Lisinopril", VisitDate: "2024-06-02", LabResult: 144.82, Insurance: "Uninsured" },
    { PatientID: "PAT0025", Age: 31, Gender: "Female", Diagnosis: "Asthma", Medication: "Aspirin", VisitDate: "2024-01-28", LabResult: 63.88, Insurance: "Private" }
  ];
   // data for the total patients chart
   const numPatients = [
     {
       name: "Total Patients",
       count: patientData.length,
     },
   ];

  // Data for the patients count by diagnosis chart
  const diagnosisCounts = patientData.reduce((acc, patient) => {
    acc[patient.Diagnosis] = (acc[patient.Diagnosis] || 0) + 1;
    return acc;
  }, {});

  const diagnosisData = Object.keys(diagnosisCounts).map(diagnosis => ({
    name: diagnosis,
    count: diagnosisCounts[diagnosis],
  }));
 
   return (
     <div>
       <h2>Clinicians Page</h2>
       <p>Welcome to the Clinicians dashboard section.</p>
       <div style={{ width: "600px", margin: "auto" }}>
         <BarChart width={600} height={300} data={numPatients}>
           <XAxis dataKey="name" />
           <YAxis />
           <Tooltip />
           <CartesianGrid strokeDasharray="3 3" />
           <Bar dataKey="count" fill="rgba(75, 192, 192, 0.6)" />
         </BarChart>
       </div>
        <div style={{ width: "600px", margin: "auto" }}>
          <BarChart width={600} height={300} data={diagnosisData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="count" fill="rgba(75, 192, 192, 0.6)" />
          </BarChart>
       </div>
     </div>
     
   );
}

export default Clinicians;
