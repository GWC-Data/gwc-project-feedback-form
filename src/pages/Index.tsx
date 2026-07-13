import React, { useState } from "react";
import backgroundImage from "../assets/bg3.png";
import logo from "../assets/logo.svg";
import backgroundMainImage from "../assets/freepik__talk__90356.jpeg";
import { Loader2 } from "lucide-react";

interface FormData {
  client_name: string;
  company_name: string;
  project_name: string;
  feedback_datetime: string;
  overall_experience: string;
  communication: string;
  quality: string;
  timeline: string;
  timeline_comments: string;
  tech_stack_understanding: string;
  tech_suggestions: string;
  data_understanding: string;
  data_suggestions: string;
  dashboard_satisfaction: string;
  dashboard_feedback: string;
  app_development_rating: string;
  app_feedback: string;
  liked_most: string;
  improvements: string;
  recommend: string;
  social_consent: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function Index() {
  const SUPABASE_URL = "https://ppnkxalvbgxvpveylbfu.supabase.co";
  const SUPABASE_KEY = "sb_publishable_S2c4D8LrXNhZ_68AtRZJLA_E3_QTX3f";

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    client_name: "",
    company_name: "",
    project_name: "",
    feedback_datetime: "",
    overall_experience: "",
    communication: "",
    quality: "",
    timeline: "",
    timeline_comments: "",
    tech_stack_understanding: "",
    tech_suggestions: "",
    data_understanding: "",
    data_suggestions: "",
    dashboard_satisfaction: "",
    dashboard_feedback: "",
    app_development_rating: "",
    app_feedback: "",
    liked_most: "",
    improvements: "",
    recommend: "",
    social_consent: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

 const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.client_name.trim())
      newErrors.client_name = "Your name is required";
    if (!formData.company_name.trim())
      newErrors.company_name = "Company name is required";
    if (!formData.project_name.trim())
      newErrors.project_name = "Project name is required";
    if (!formData.feedback_datetime)
      newErrors.feedback_datetime = "Feedback date is required";
    if (!formData.overall_experience)
      newErrors.overall_experience = "Please rate your overall experience";
    if (!formData.communication)
      newErrors.communication = "Please rate communication";
    if (!formData.quality)
      newErrors.quality = "Please rate quality of deliverables";
    if (!formData.timeline)
      newErrors.timeline = "Please indicate timeline adherence";
    if (formData.timeline === "No" && !formData.timeline_comments.trim())
      newErrors.timeline_comments = "Please elaborate on timeline issues";
    if (!formData.tech_stack_understanding)
      newErrors.tech_stack_understanding = "Please rate tech stack understanding";
    if (!formData.tech_suggestions)
      newErrors.tech_suggestions = "Please rate tech suggestions";
    if (!formData.data_understanding)
      newErrors.data_understanding = "Please rate data understanding";
    if (!formData.data_suggestions)
      newErrors.data_suggestions = "Please rate data suggestions";
    if (!formData.liked_most.trim())
      newErrors.liked_most = "Please tell us what you liked most";
    if (!formData.improvements.trim())
      newErrors.improvements = "Please tell us what we could improve";
    if (!formData.recommend)
      newErrors.recommend = "Please indicate if you would recommend us";
    if (!formData.social_consent)
      newErrors.social_consent =
        "Please indicate your social media consent preference";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      const firstErrorField = document.querySelector(".border-red-400");
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setLoading(true);

    // Convert feedback date to timestamp (if needed)
    const payload = {
      ...formData,
      feedback_datetime: formData.feedback_datetime
        ? new Date(formData.feedback_datetime).toISOString()
        : null,
    };

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/client_feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Prefer: "return=minimal", // faster insert
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Supabase error:", error);
        alert("Error saving data. Please try again.");
        setLoading(false);
        return;
      }

      setSubmitted(true);
      setLoading(false);

      // Reset form
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          client_name: "",
          company_name: "",
          project_name: "",
          feedback_datetime: "",
          overall_experience: "",
          communication: "",
          quality: "",
          timeline: "",
          timeline_comments: "",
          tech_stack_understanding: "",
          tech_suggestions: "",
          data_understanding: "",
          data_suggestions: "",
          dashboard_satisfaction: "",
          dashboard_feedback: "",
          app_development_rating: "",
          app_feedback: "",
          liked_most: "",
          improvements: "",
          recommend: "",
          social_consent: "",
        });
      }, 3000);
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        style={{
          backgroundImage: `url(${backgroundMainImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
        }}
        className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4"
      >
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-14 h-14 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Thank You!
            </h2>
            <p className="text-lg text-gray-600 mb-2">
              Your feedback has been submitted successfully.
            </p>
            <p className="text-sm text-gray-500">
              We truly appreciate you taking the time to share your thoughts.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const RatingSection = ({ label, name, options, color, description, required = true }) => (
    <div className="mb-8 bg-gray-50 rounded-md p-6">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {description && (
        <p className="text-xs text-gray-500 mb-4">{description}</p>
      )}
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <label key={option} className="flex-1 min-w-fit">
            <input
              type="radio"
              name={name}
              value={option}
              checked={formData[name] === option}
              onChange={handleInputChange}
              className="peer sr-only"
            />
            <div
              className={`px-4 py-3 text-center text-sm font-medium rounded-md border-2 cursor-pointer transition-all duration-200 ${
                formData[name] === option
                  ? `border-[#550199] bg-[#550199] text-white shadow-lg scale-105`
                  : "border-gray-300 bg-white text-gray-700 hover:border-[#550199] hover:bg-[#550199] hover:text-white"
              }`}
            >
              {option}
            </div>
          </label>
        ))}
      </div>
      {errors[name] && (
        <p className="text-red-500 text-xs mt-3 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div
      className="py-10 px-4"
      style={{
        backgroundImage: `url(${backgroundMainImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%",
      }}
    >
      <img
        src={logo}
        alt="Logo"
        className="max-w-xs mx-auto md:object-cover object-contain object-top mb-10"
      />

      <div className="mb-8 ">
        <div className="w-full flex items-center justify-center flex-col">
          <h1 className="text-[36px] font-bold text-[#FFC107]">
            Project Feedback Form
          </h1>
          <p className="text-[#FAFAFA] text-[18px] mt-2">
            Thank you for partnering with us. Your feedback helps us improve and
            serve you better.
          </p>
        </div>
      </div>

      <div
        className="max-w-3xl mx-auto border border-[#550199] rounded-md p-4"
        style={{
          boxShadow:
            " rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        }}
      >
        <div
          className="bg-white rounded-md shadow-sm relative p-5 mb-5"
          style={{
            boxShadow:
              " rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
          }}
        >
          <h3 className="text-[20px] font-bold text-gray-800 mb-6">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="client_name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Client Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="client_name"
                name="client_name"
                value={formData.client_name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className={`w-full px-4 py-3 text-sm rounded-md border-2 ${
                  errors.client_name
                    ? "border-red-400 bg-red-50"
                    : "border-gray-200 bg-gray-50"
                } focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200`}
              />
              {errors.client_name && (
                <p className="text-red-500 text-xs mt-2 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.client_name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="company_name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="company_name"
                name="company_name"
                value={formData.company_name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className={`w-full px-4 py-3 text-sm rounded-md border-2 ${
                  errors.company_name
                    ? "border-red-400 bg-red-50"
                    : "border-gray-200 bg-gray-50"
                } focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200`}
              />
              {errors.company_name && (
                <p className="text-red-500 text-xs mt-2 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.company_name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="project_name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Project Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="project_name"
                name="project_name"
                value={formData.project_name}
                onChange={handleInputChange}
                placeholder="Enter project name"
                className={`w-full px-4 py-3 text-sm rounded-md border-2 ${
                  errors.project_name
                    ? "border-red-400 bg-red-50"
                    : "border-gray-200 bg-gray-50"
                } focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200`}
              />
              {errors.project_name && (
                <p className="text-red-500 text-xs mt-2 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.project_name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="feedback_datetime"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Feedback Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="feedback_datetime"
                name="feedback_datetime"
                value={formData.feedback_datetime}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 text-sm rounded-md border-2 ${
                  errors.feedback_datetime
                    ? "border-red-400 bg-red-50"
                    : "border-gray-200 bg-gray-50"
                } focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200`}
              />
              {errors.feedback_datetime && (
                <p className="text-red-500 text-xs mt-2 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.feedback_datetime}
                </p>
              )}
            </div>
          </div>

        </div>

        <div
          className=" bg-white rounded-md shadow-sm relative p-5 mb-5"
          style={{
            boxShadow:
              " rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
          }}
        >
          <h3 className="text-[20px] font-bold text-gray-800 mb-6">
            Project Ratings
          </h3>

          <RatingSection
            label="Overall project experience"
            name="overall_experience"
            options={["Excellent", "Good", "Average", "Below Average", "Poor"]}
            color="blue"
            description="How satisfied are you with the overall delivery of the project?"
          />

          <RatingSection
            label="Communication & responsiveness"
            name="communication"
            options={["Excellent", "Good", "Average", "Below Average", "Poor"]}
            color="blue"
            description=""
          />

          <RatingSection
            label="Quality of deliverables"
            name="quality"
            options={[
              "Very Satisfied",
              "Satisfied",
              "Neutral",
              "Unsatisfied",
              "Very Unsatisfied",
            ]}
            color="blue"
            description=""
          />

          <div className="mb-8 bg-gray-50 rounded-md p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Timeline adherence <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-3">
              {["Yes", "Minor delays", "No"].map((option) => (
                <label key={option} className="flex-1 min-w-fit">
                  <input
                    type="radio"
                    name="timeline"
                    value={option}
                    checked={formData.timeline === option}
                    onChange={handleInputChange}
                    className="peer sr-only"
                  />
                  <div
                    className={`px-4 py-3 text-center text-sm font-medium rounded-md border-2 cursor-pointer transition-all duration-200 ${
                      formData.timeline === option
                        ? "border-[#550199] bg-[#550199] text-white shadow-lg scale-105"
                        : "border-gray-300 bg-white text-gray-700 hover:border-[#550199] hover:bg-[#550199] hover:text-white"
                    }`}
                  >
                    {option}
                  </div>
                </label>
              ))}
            </div>
            {errors.timeline && (
              <p className="text-red-500 text-xs mt-3 flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.timeline}
              </p>
            )}

            {formData.timeline === "No" && (
              <div className="mt-4">
                <label
                  htmlFor="timeline_comments"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Please elaborate <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="timeline_comments"
                  name="timeline_comments"
                  value={formData.timeline_comments}
                  onChange={handleInputChange}
                  placeholder="Tell us more about the timeline issues..."
                  rows={3}
                  className={`w-full px-4 py-3 text-sm rounded-md border-2 ${
                    errors.timeline_comments
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 bg-white"
                  } focus:outline-none focus:border-emerald-500 transition-all duration-200`}
                />
                {errors.timeline_comments && (
                  <p className="text-red-500 text-xs mt-2 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.timeline_comments}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div
          className=" bg-white rounded-md shadow-sm relative p-5 mb-5"
          style={{
            boxShadow:
              " rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
          }}
        >
          <h3 className="text-[20px] font-bold text-gray-800 mb-6">
            Technical & Data Understanding
          </h3>

          <RatingSection
            label="Did our team clearly understand your tech stack and overall architecture?"
            name="tech_stack_understanding"
            options={["Yes, Completely", "Mostly", "Partially", "No"]}
            color="blue"
            description=""
            required={true}
          />

          <div className="mb-6">
            <label
              htmlFor="tech_suggestions"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Any technical suggestions to improve our understanding?{" "}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              id=""
              name="tech_suggestions"
              value={formData.tech_suggestions}
              onChange={handleInputChange}
              placeholder="Share what you appreciated most about our collaboration..."
              rows={4}
              className={`w-full px-4 py-3 text-sm rounded-md border-2 ${
                errors.tech_suggestions
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200 bg-gray-50"
              } focus:outline-none focus:border-purple-500 focus:bg-white transition-all duration-200`}
            />
            {errors.tech_suggestions && (
              <p className="text-red-500 text-xs mt-2 flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.tech_suggestions}
              </p>
            )}
          </div>

          <RatingSection
            label="How easy or challenging was it for our team to understand your data?"
            name="data_understanding"
            options={[
              "Very Easy",
              "Easy",
              "Moderate",
              "Challenging",
              "Very Challenging",
            ]}
            color="blue"
            description="Consider structure, quality, availability, and documentation."
            required={true}
          />

          <div className="mb-6">
            <label
              htmlFor="data_suggestions"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
             Any suggestions to help us understand your data better?{" "}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              id=""
              name="data_suggestions"
              value={formData.data_suggestions}
              onChange={handleInputChange}
              placeholder="Share what you appreciated most about our collaboration..."
              rows={4}
              className={`w-full px-4 py-3 text-sm rounded-md border-2 ${
                errors.data_suggestions
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200 bg-gray-50"
              } focus:outline-none focus:border-purple-500 focus:bg-white transition-all duration-200`}
            />
            {errors.data_suggestions && (
              <p className="text-red-500 text-xs mt-2 flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.data_suggestions}
              </p>
            )}
          </div>

        </div>

        <div
          className=" bg-white rounded-md shadow-sm relative p-5 mb-5"
          style={{
            boxShadow:
              " rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
          }}
        >
          <h3 className="text-[20px] font-bold text-gray-800 mb-1">
            Domain-Specific Feedback
          </h3>
          <p className="text-sm text-gray-500 mb-4">Please answer the sections relevant to the work we did (e.g., dashboards or application development). If something doesn’t apply, you may skip it.</p>

          <RatingSection
            label="Data Visualization / Dashboards (if applicable)"
            name="dashboard_satisfaction"
            options={["Very Satisfied", "Satisfied", "Neutral", "Unsatisfied", "Very Unsatisfied"]}
            color="blue"
            description="How satisfied are you with the dashboards or reports?"
            required={false}
          />

          <div className="mb-6">
            <label
              htmlFor="dashboard_feedback"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
             Any feedback on visual clarity, insights, or usability?{" "}
            </label>
            <textarea
              id=""
              name="dashboard_feedback"
              value={formData.dashboard_feedback}
              onChange={handleInputChange}
              placeholder="Share what you appreciated most about our collaboration..."
              rows={4}
              className={`w-full px-4 py-3 text-sm rounded-md border-2 ${
                errors.dashboard_feedback
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200 bg-gray-50"
              } focus:outline-none focus:border-purple-500 focus:bg-white transition-all duration-200`}
            />
            {errors.dashboard_feedback && (
              <p className="text-red-500 text-xs mt-2 flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.dashboard_feedback}
              </p>
            )}
          </div>

           <RatingSection
            label="Application Development (if applicable)"
            name="app_development_rating"
            options={["Excellent", "Good", "Average", "Below Average", "Poor"]}
            color="blue"
            description="How would you rate the application in terms of functionality, performance, and UX?"
            required={false}
          />

          <div className="">
            <label
              htmlFor="app_feedback"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
             Any feedback on user experience or features?{" "}
            </label>
            <textarea
              id=""
              name="app_feedback"
              value={formData.app_feedback}
              onChange={handleInputChange}
              placeholder="Share what you appreciated most about our collaboration..."
              rows={4}
              className={`w-full px-4 py-3 text-sm rounded-md border-2 ${
                errors.app_feedback
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200 bg-gray-50"
              } focus:outline-none focus:border-purple-500 focus:bg-white transition-all duration-200`}
            />
            {errors.app_feedback && (
              <p className="text-red-500 text-xs mt-2 flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.app_feedback}
              </p>
            )}
          </div>
          
        </div>

        <div
          className=" bg-white rounded-md shadow-sm relative p-5"
          style={{
            boxShadow:
              " rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
          }}
        >
          <h3 className="text-[20px] font-bold text-gray-800 mb-6">
            Final Questions
          </h3>

          <div className="mb-6">
            <label
              htmlFor="liked_most"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              What did you like most about working with us?{" "}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              id="liked_most"
              name="liked_most"
              value={formData.liked_most}
              onChange={handleInputChange}
              placeholder="Share what you appreciated most about our collaboration..."
              rows={4}
              className={`w-full px-4 py-3 text-sm rounded-md border-2 ${
                errors.liked_most
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200 bg-gray-50"
              } focus:outline-none focus:border-purple-500 focus:bg-white transition-all duration-200`}
            />
            {errors.liked_most && (
              <p className="text-red-500 text-xs mt-2 flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.liked_most}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="improvements"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              What could we improve in future projects? <span className="text-red-500">*</span>
            </label>
            <textarea
              id="improvements"
              name="improvements"
              value={formData.improvements}
              onChange={handleInputChange}
              placeholder="Help us get better by sharing areas for improvement..."
              rows={4}
              className={`w-full px-4 py-3 text-sm rounded-md border-2 ${
                errors.improvements
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200 bg-gray-50"
              } focus:outline-none focus:border-purple-500 focus:bg-white transition-all duration-200`}
            />
            {errors.improvements && (
              <p className="text-red-500 text-xs mt-2 flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.improvements}
              </p>
            )}
          </div>

          <RatingSection
            label="Would you recommend us for similar projects?"
            name="recommend"
            options={["Yes", "Maybe", "No"]}
            color="emerald"
            description=""
          />

          <div className="bg-gray-50 rounded-md p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Can we share your feedback on our social media (e.g., LinkedIn)
              with your company name? <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              {[
                "Yes, with company name",
                "Yes, but keep it anonymous",
                "No, please keep it private",
              ].map((option) => (
                <label key={option} className="flex items-start">
                  <input
                    type="radio"
                    name="social_consent"
                    value={option}
                    checked={formData.social_consent === option}
                    onChange={handleInputChange}
                    className="mt-1 mr-3"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
            {errors.social_consent && (
              <p className="text-red-500 text-xs mt-3 flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.social_consent}
              </p>
            )}
          </div>
        </div>

        <div className="pt-6 flex justify-end">
          {loading ? (
            <button
              disabled
              className="w-full px-8 py-4 text-base font-semibold rounded-md bg-[#FFC107]/80 text-black shadow-lg hover:shadow-xl transition-all duration-20 opacity-50 cursor-not-allowed"
            >
              <Loader2 className="animate-spin mr-2 h-5 w-5 inline-block" />
              Loading...
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="w-full px-8 py-4 text-base font-semibold rounded-md bg-[#FFC107]/80 text-black shadow-lg hover:shadow-xl  transition-all duration-200"
            >
              Submit Feedback
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
