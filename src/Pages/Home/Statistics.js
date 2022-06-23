import React from 'react';
import { Bounce, LightSpeed } from 'react-reveal';

const Statistics = () => {
    return (
        <>
            <LightSpeed top cascade>
                <h3 className='text-5xl font-bold text-primary text-center my-12'>Statistics</h3 >
            </LightSpeed>

            <div className="stats stats-vertical lg:stats-horizontal shadow flex flex-col md:flex-row">
                <Bounce right cascade>
                    <div className="stat place-items-center">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <div className="stat-title">Total Travelers</div>
                        <div className="stat-value text-primary">5.6K</div>
                        <div className="stat-desc">10% more than last month</div>
                    </div>
                </Bounce>
                <Bounce right cascade>
                    <div className="stat place-items-center">
                        <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <div className="stat-title">Page Views</div>
                        <div className="stat-value text-secondary">2.6M</div>
                        <div className="stat-desc">25% more than last month</div>
                    </div>
                </Bounce>
                <Bounce right cascade>
                    <div className="stat place-items-center">
                        <div className="stat-figure text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        </div>
                            <div className="stat-value">86%</div>
                            <div className="stat-title">Customer Satisfaction</div>
                    </div>   
                </Bounce>
            </div>
        </>
    );
};

export default Statistics;