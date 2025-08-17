import React from "react";
import { useParams } from "react-router-dom";
import ClassGroups from "./ClassGroups";
import ClassStudents from "./ClassStudents";

const noGroupGrades = ["6", "7", "8"]; // grades without groups

export default function GradeHandler() {
  const { grade } = useParams();

  if (noGroupGrades.includes(grade)) {
    // For grades 6-8, show students directly
    return <ClassStudents group="all" />;
  } else {
    // For grades 9-10, show group selection
    return <ClassGroups />;
  }
}
