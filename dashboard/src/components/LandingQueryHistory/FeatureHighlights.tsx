const FeatureHighlights = () => {
    return (
      <div className="max-w-md space-y-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-900 text-green-300 text-sm font-medium">
          <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
          Built-in Dashboard
        </span>
        <h2 className="text-3xl font-bold text-gray-100">Track Your Learning Journey</h2>
        <p className="text-gray-400">
          Keep track of all your queries and their responses in one place. The dashboard provides a chronological
          history of everything you've asked, making it easy to revisit important explanations.
        </p>
        <ul className="space-y-2 mt-4">
          {[
        "Timestamp and date for every query",
        "Searchable history for easy reference",
        "Categorized by content type (code or documentation)",
        "One-click to replay voice explanations",
          ].map((item, index) => (
        <li key={index} className="flex items-start">
          <span className="text-green-500 mr-2">✔</span>
          <span className="text-gray-300">{item}</span>
        </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default FeatureHighlights;
  