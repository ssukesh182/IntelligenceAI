
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is Educreate?",
      answer: "ImagiQuest is a platform that helps you discover and create DIY projects using the Instructables API and AI-powered image recognition.",
    },
    {
      question: "How does the image search work?",
      answer: "Upload an image or take a photo, and our AI will analyze it to find similar DIY projects and tutorials on Instructables.",
    },
    {
      question: "Can I save my searches?",
      answer: "Yes! Sign up for an account to save your search history and favorite projects for easy access later.",
    },
  ];

  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-2xl font-semibold mb-4 text-[#FEF7CD]">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-gray-700">
            <AccordionTrigger className="text-[#D6BCFA] hover:text-[#D6BCFA]/80">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;
