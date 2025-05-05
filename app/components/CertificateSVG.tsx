import React from "react";

interface CertificateSVGProps {
  studentName: string;
  courseName: string;
  instructorName: string;
  date: string;
}

export default function CertificateSVG({
  studentName,
  courseName,
  instructorName,
  date,
}: CertificateSVGProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 595.28 841.89"
    >
      {/* Background */}
      <rect width="595.28" height="841.89" fill="#f8f8f8" />

      {/* Border */}
      <rect
        x="20"
        y="20"
        width="555.28"
        height="801.89"
        fill="none"
        stroke="#4169E1"
        strokeWidth="2"
      />

      {/* Header */}
      <text
        x="297.64"
        y="100"
        textAnchor="middle"
        fontSize="32"
        fontWeight="bold"
        fill="#4169E1"
      >
        Certificate of Completion
      </text>

      {/* Content */}
      <text x="297.64" y="200" textAnchor="middle" fontSize="24" fill="#333">
        This is to certify that
      </text>

      <text
        x="297.64"
        y="250"
        textAnchor="middle"
        fontSize="28"
        fontWeight="bold"
        fill="#4169E1"
      >
        {studentName}
      </text>

      <text x="297.64" y="300" textAnchor="middle" fontSize="20" fill="#333">
        has successfully completed the course
      </text>

      <text
        x="297.64"
        y="350"
        textAnchor="middle"
        fontSize="24"
        fontWeight="bold"
        fill="#4169E1"
      >
        {courseName}
      </text>

      <text x="297.64" y="400" textAnchor="middle" fontSize="18" fill="#666">
        Instructor: {instructorName}
      </text>

      <text x="297.64" y="450" textAnchor="middle" fontSize="18" fill="#666">
        Date: {date}
      </text>

      {/* Footer */}
      <text x="297.64" y="750" textAnchor="middle" fontSize="14" fill="#666">
        This certificate is awarded as a recognition of achievement
      </text>
    </svg>
  );
}
