function FrequentlyAsked() {
    return (
      <div className="text-white w-full flex flex-col items-center py-16">
        <div className="w-full flex flex-col gap-12 px-6">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-5xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400 text-lg">
              Answers to the most common questions about Collabify, so you can get started quickly.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="collapse collapse-arrow bg-white/10 backdrop-blur-lg border border-base-300">
              <input type="radio" name="faq-accordion" defaultChecked />
              <div className="collapse-title font-semibold">
                Is Collabify Open Source?
              </div>
              <div className="collapse-content text-sm text-orange-500">
                Yes, we are completely Open Source.
              </div>
            </div>
  
            <div className="collapse collapse-arrow bg-white/10 backdrop-blur-lg  border border-base-300">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title font-semibold">
                Is Collabify free to use?
              </div>
              <div className="collapse-content text-sm text-orange-500">
                Collabify is completely free to use.
              </div>
            </div>
  
            <div className="collapse collapse-arrow bg-white/10 backdrop-blur-lg  border border-base-300">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title font-semibold">
                Which editor does Collabify use?
              </div>
              <div className="collapse-content text-sm text-orange-500">
                We use the Monaco Editor for collaboration.
              </div>
            </div>
  
            <div className="collapse collapse-arrow bg-white/10 backdrop-blur-lg  border border-base-300">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title font-semibold">
                Is video chat coming to Collabify?
              </div>
              <div className="collapse-content text-sm text-orange-500">
                Yes, we're planning to integrate video chat soon
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default FrequentlyAsked;