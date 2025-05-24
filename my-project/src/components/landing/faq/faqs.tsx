export default function FAQs() {
  return(
<section className="py-10 bg-white w-full">
  <h1 className="text-3xl font-semibold mb-8 text-center">FAQ</h1>

<div className="flex flex-col bg-pink-400 w-full md:w-2/3 lg:w-1/2 p-4 m-auto">

  <details className="mb-4 border rounded-md p-4">
    <summary className="cursor-pointer font-semibold">What is a FAQ?</summary>
    <p className="mt-2 text-gray-700">
      A FAQ is a list of frequently asked questions and answers on a particular topic.
    </p>
  </details>

  <details className="mb-4 border rounded-md p-4">
    <summary className="cursor-pointer font-semibold">What is the purpose of a FAQ?</summary>
    <p className="mt-2 text-gray-700">
      The purpose of a FAQ is to provide answers to common questions and help users find the information they need quickly and easily.
    </p>
  </details>

  <details className="mb-4 border rounded-md p-4">
    <summary className="cursor-pointer font-semibold">How do I create a FAQ?</summary>
    <p className="mt-2 text-gray-700">
      To create a FAQ, identify common questions related to your topic and provide clear, concise answers. Organize the questions in a logical order.
    </p>
    </details>

    </div>
  {/* Add more as needed */}
</section>
  );
}