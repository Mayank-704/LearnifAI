import FeatureCard from "./FeatureCard";
import { featuresData, Feature } from "./featuresData";

const FeatureCardsGroup = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuresData.map((feature: Feature, index: number) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
};

export default FeatureCardsGroup;
