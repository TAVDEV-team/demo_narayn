import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../api/api";
import useAccountForm from "./BaseAccount/useAccountForm";
import AccountForm from "./BaseAccount/AccountForm";
import TextInput from "./BaseAccount/TextInput";

export default function AddTeacherForm() {
  const { form, handleChange, handleFileChange, handleSubmit } = useAccountForm(
    {
      last_educational_institute: "",
      base_subject: "",
      is_class_teacher: "",
      class_teacher_of: "",
    },
    "/user/teachers/"
  );

  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    API.get("/nphs/classes/").then((res) => setClasses(res.data));
    API.get("/nphs/subject/").then((res) => setSubjects(res.data));
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-sky-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-white w-full max-w-6xl rounded-xl shadow-xl p-6 md:p-10">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-950 text-center mb-10">
            Teacher Registration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ✅ Shared account fields in grid */}
            <AccountForm
              formData={form}
              handleChange={handleChange}
              handleFileChange={handleFileChange}
            />

            {/* ✅ Teacher-only fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-semibold mb-2">Base Subject</label>
                <select
                  name="base_subject"
                  value={form.base_subject}
                  onChange={handleChange}
                  className="border border-gray-300 px-3 py-2 rounded-md"
                >
                  <option value="">Select Subject</option>
                  {subjects.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold mb-2">Is Class Teacher?</label>
                <select
                  name="is_class_teacher"
                  value={form.is_class_teacher}
                  onChange={handleChange}
                  className="border border-gray-300 px-3 py-2 rounded-md"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {form.is_class_teacher === "yes" && (
                <div className="flex flex-col">
                  <label className="text-sm font-semibold mb-2">Class Teacher Of</label>
                  <select
                    name="class_teacher_of"
                    value={form.class_teacher_of}
                    onChange={handleChange}
                    className="border border-gray-300 px-3 py-2 rounded-md"
                  >
                    <option value="">Select a class</option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-blue-950 hover:bg-blue-900 text-white font-semibold py-4 rounded-lg shadow-md"
              >
                Register Teacher
              </button>
            </div>
          </form>

        </div>
      </div>
    </>
  );
}
