import { FAQSection } from 'components/landing/faq/faq-section';

export default function FAQPage() {
  return (
    <div className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center sm:mb-16">
          <h1 className="mb-4 font-bold text-3xl tracking-tight sm:mb-6 sm:text-4xl lg:text-5xl xl:text-6xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto max-w-3xl text-base text-muted-foreground sm:text-lg lg:text-xl">
            Everything you need to know about Obby and how it works.
          </p>
        </div>

        <FAQSection />
      </div>
    </div>
  );
}
