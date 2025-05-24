import { ChevronDown } from "lucide-react";

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
    question: " What kind of pet info can I track? " ,
    answer: "You can track general details like name, breed, age, and key health notes. More features are coming soon as we grow!"
  }
];

export default function FAQs() {
  return (
    <section className="py-10 bg-white w-full">
      <h1 className="text-5xl font-semibold mb-12 text-center">FAQ</h1>
      <div className="flex flex-col gap-4 bg-gradient-to-r from-pink-200 to-pink-300 border rounded-lg w-full md:w-2/3 lg:w-1/2 p-4 m-auto">
        {FAQsData.map((faq, index) => (
          <details key={index} className="group bg-slate-50 transition-all mb-4 border rounded-lg p-4">
            <summary className="cursor-pointer font-semibold flex flex-row justify-between">
              <span className="group-open:text-blue-500 text-2xl p-4 ">{faq.question}</span>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <ChevronDown />
              </span>
            </summary>
            <p className="text-base font-medium transition-all duration-300 origin-top scale-95 opacity-0 group-open:opacity-100 group-open:scale-100">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
  {/* Add more as needed */}
</section>
  );
}