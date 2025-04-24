import FeatureHighlights from "./FeatureHighlights";
import QueryList from "./QueryList";

const QueryHistorySection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-25 px-6 py-12 bg-white dark:bg-gray-900 dark:text-white">
      <FeatureHighlights />
      <QueryList />
    </section>
  );
};

export default QueryHistorySection;
