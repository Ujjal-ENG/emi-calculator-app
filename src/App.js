import React, { useState } from 'react';
import { tenureData } from './utils/constant';

const App = () => {
    const [cost, setCost] = useState(0);
    const [interest, setInterest] = useState(10);
    const [free, setFree] = useState(1);
    const [downPayment, setDownPayment] = useState(0);
    const [tenure, setTenure] = useState(12);
    const [emi, setEmi] = useState(0);

    const calculateEmi = (downPayment) => {
        // P x R x (1+R)^N / [(1+R)^N-1]
        if (!cost) return;

        const loadAmt = cost - downPayment;
        const rateOfInterrest = interest / 100;
        const numOfYears = tenure / 12;

        const EMI = (loadAmt * rateOfInterrest * [(1 + rateOfInterrest) ** numOfYears]) / [(1 + rateOfInterrest) ** numOfYears - 1];

        return Number(EMI / 12).toFixed(0);
    };

    const updateEmi = (e) => {
        if (!cost) return;

        const dp = Number(e.target.value);
        setDownPayment(dp.toFixed(0));

        // calculate emi and update it also
        const emi = calculateEmi(dp);
        setEmi(emi);
    };
    const updateDownPayment = (e) => {
        if (!cost) return;

        const emi = Number(e.target.value);
        setEmi(emi.toFixed(0));

        // calculate downPayment and update it
    };

    return (
        <div className="flex justify-center items-center flex-col">
            <h1 className="text-5xl text-center font-semibold my-5">Emi Calculator</h1>

            <p className="text-xl font-bold">Total Cost of Asset</p>
            <input type="number" className="border rounded-md my-4 border-black focus:outline-orange-500" value={cost} onChange={(e) => setCost(e.target.value)} placeholder="Total Cost of Assets" />
            <p className="text-xl font-bold">Interest Rate (in %)</p>

            <input
                type="number"
                className="border rounded-md my-4 border-black focus:outline-orange-500"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                placeholder="Total Cost of Assets"
            />
            <p className="text-xl font-bold">Processing Fee (in %)</p>
            <input type="number" className="border rounded-md my-4 border-black focus:outline-orange-500" value={free} onChange={(e) => setFree(e.target.value)} placeholder="Total Cost of Assets" />

            {/* slider for downpayment */}
            <p className="text-xl font-bold">DownPayment</p>
            <div className="relative mb-10">
                <input type="range" min={0} max={cost} className="" value={downPayment} onChange={updateEmi} />

                <div className="absolute flex justify-between gap-6">
                    <label htmlFor="0%">0%</label>
                    <strong htmlFor="downPayment">{downPayment}tk</strong>
                    <label htmlFor="100%">100%</label>
                </div>
            </div>

            {/* slider for Loan per month */}

            <p className="text-xl font-bold">Loan Per Month</p>
            <div className="relative mb-5">
                <input type="range" min={calculateEmi(cost)} max={calculateEmi(0)} className="" value={emi} onChange={updateDownPayment} />

                <div className="absolute flex justify-between gap-6">
                    <label htmlFor="0%">{calculateEmi(cost)}</label>
                    <strong htmlFor="downPayment">{emi}tk</strong>
                    <label htmlFor="100%">{calculateEmi(0)}</label>
                </div>
            </div>

            <p className="text-xl font-bold my-5">Tenure</p>
            {tenureData.map((t, i) => {
                return (
                    <button
                        key={i}
                        type="button"
                        className={`${
                            t === tenure
                                ? 'px-4 py-1 border rounded-md flex mx-4 cursor-pointer bg-lime-400 text-white font-bold my-2'
                                : 'px-4 py-1 border rounded-md flex  mx-4 cursor-pointer active:bg-orange-500 my-2'
                        }`}
                        onClick={() => setTenure(t)}>
                        {t}
                    </button>
                );
            })}
        </div>
    );
};

export default App;
