import { ChevronDown } from "lucide-react";
import { ChevronUp } from "lucide-react";

// FAQ content array — easily extendable
const FAQsData = [
  {
    question: "Do I need to install anything to use the app?",
    answer: "No, you do not need to install anything to use the app. It is a web-based application that can be accessed through your browser."
  },
  {
    question: "Can I use the app without signing up?",
    answer: "Yes, you can use the app without signing up. However, signing up allows you to save your preferences and access additional features."
  },
  {
    question: "What kind of pet info can I track?",
    answer: "You can track general details like name, breed, age, and key health notes. More features are coming soon as we grow!"
  }
];

export default function FAQs() {
  return (
    <section className="py-10 bg-purple-100 w-full">

      {/* Container for FAQ items */}
      <div className="flex flex-col gap-4 bg-white border rounded-lg w-full md:w-2/3 lg:w-1/2 p-4 m-auto">
      <h1 className="text-5xl font-semibold my-10 ml-12">FAQs</h1>

        {FAQsData.map((faq, index) => (
          <details
            key={index}
            className="group bg-slate-50 transition-all mb-4 border rounded-lg p-4"
          >
            {/* Clickable question header */}
            <summary className="cursor-pointer font-semibold flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md">
              <span className="group-open:text-blue-500 text-2xl p-4">
                {faq.question}
              </span>

              {/* Chevron icon toggles */}
              <span className="relative inline-block">
                <ChevronDown
                  className="group-open:hidden bg-purple-600 text-white rounded-full p-1"
                  aria-hidden="true"
                  focusable="false"
                />
                <ChevronUp
                  className="hidden group-open:inline-block bg-slate-700 text-white rounded-full p-1"
                  aria-hidden="true"
                  focusable="false"
                />
              </span>
            </summary>

            {/* Answer shown on open */}
            <p className="text-base font-medium transition-all duration-300 origin-top scale-95 opacity-0 group-open:opacity-100 group-open:scale-100">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
