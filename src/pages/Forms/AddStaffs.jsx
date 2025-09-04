import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AccountForm from "./BaseAccount/AccountForm";
import TextInput from "./BaseAccount/TextInput";
import useAccountForm from "./BaseAccount/useAccountForm";

export default function AddStaffs() {
  const { form, handleChange, handleFileChange, handleSubmit } = useAccountForm(
    { designation: "" }, // ✅ extra field
    "/user/office-helpers/" // ✅ endpoint
  );

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-sky-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 mt-20 overflow-x-hidden">
        <div className="bg-white w-full max-w-6xl rounded-xl shadow-xl p-6 sm:p-8 md:p-12">
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-950 text-center mb-10">
            Staff Registration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* ✅ Shared account fields */}
          <AccountForm
            formData={form}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
          />

    
            {/* ✅ Staff-only field */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <TextInput
                label="Designation"
                name="designation"
                type="text"
                value={form.designation}
                onChange={handleChange}
                placeholder="Enter designation"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-950 hover:bg-blue-900 text-white font-semibold py-3 sm:py-4 rounded-lg shadow-md text-base sm:text-lg transition duration-200"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
