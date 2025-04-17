import FeatureCardsGroup from "./FeatureCardsGroup";

const FeatureSection = () => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-4xl font-bold mb-4">Features That Make Development Easier</h2>
        <p className="text-gray-600 max-w-2xl mx-auto ">
          LearnifAI combines voice reccognition screen awareness, and AI to create a seamless expreience for developers seeking quick explanations and code generation.
        </p>
      </div>

      <FeatureCardsGroup />
    </section>
  );
};

export default FeatureSection;
