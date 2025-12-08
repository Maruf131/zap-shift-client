import React from 'react';

const FrequentlyQuestion = () => {
    return (
        <div className='flex flex-col space-y-2 mb-18 shadow-xl p-10 rounded-2xl'>
            <div className='max-w-4xl mx-auto text-center'>
                <h1 className='text-4xl font-bold'>Frequently Asked Question (FAQ)</h1>
                <p className='text-gray-400 mt-4'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
            </div>
            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" defaultChecked />
                <div className="collapse-title font-semibold">How long should I wear the posture corrector each day?</div>
                <div className="collapse-content text-sm">It’s recommended to start with 15–30 minutes per day and gradually increase the time as your body adjusts. Consistent, moderate use helps improve posture without causing discomfort.</div>
            </div>
            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold">Can I wear it under my clothes?</div>
                <div className="collapse-content text-sm">Yes! The posture corrector is designed with a slim, lightweight profile that can be comfortably worn beneath most clothing. It stays discreet while still providing effective support.</div>
            </div>
            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold">Is it adjustable for different shoulder and chest sizes?</div>
                <div className="collapse-content text-sm">Absolutely. The straps are fully adjustable to fit a wide range of sizes, ensuring a snug and personalized fit for optimal posture alignment.</div>
            </div>
            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold">Can I use it while exercising or working out?</div>
                <div className="collapse-content text-sm">It’s best used during light activity or daily routines. For workouts, we recommend removing it to allow full mobility, then putting it back on afterward to help reinforce proper posture.</div>
            </div>
            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold">How soon will I notice improvements in my posture?</div>
                <div className="collapse-content text-sm">Many users feel a difference in just a few days, while visible improvements typically appear after 2–4 weeks of consistent use. Results vary depending on usage and individual posture habits.</div>
            </div>
            <div className='text-center mt-5'>
                <button className='btn bg-primary text-black font-bold rounded-4xl'>See More FAQ’s</button>
            </div>
        </div>
    );
};

export default FrequentlyQuestion;