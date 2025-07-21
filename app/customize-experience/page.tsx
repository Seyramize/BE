import { Suspense } from "react";
import CustomizeExperienceForm from "./CustomizeExperienceForm";

export default function CustomizeExperiencePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CustomizeExperienceForm />
    </Suspense>
  );
}
