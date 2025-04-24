import FeatureCardsGroup from "./FeatureCardsGroup";

const FeatureSection = () => {
  return (
    <section
      id="features"
      className="py-16 px-4 max-w-7xl mx-auto bg-white dark:bg-gray-900"
    >
      <div className="text-center mb-20">
        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Features That Make Development Easier
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          LearnifAI combines voice recognition, screen awareness, and AI to create a seamless experience for developers seeking quick explanations and code generation.
        </p>
      </div>

      <FeatureCardsGroup />
    </section>
  );
};

export default FeatureSection;
