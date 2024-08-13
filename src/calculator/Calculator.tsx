import React, { useState, useEffect } from "react";
import {metals, payment} from "../data/Data";
import s from './Calculator.module.scss'
import goldImg from '../assets/images/Gold.png'
import {Select} from "../components/ui/select/Select";

export const Calculator = () => {
    const [selectedMetal, setSelectedMetal] = useState<string>("");
    const [selectedFineness, setSelectedFineness] = useState<number | null>(null);
    const [selectedPaymentType, setSelectedPaymentType] = useState<string>("");
    const [weight, setWeight] = useState<string>("");
    const [result, setResult] = useState<number>(0);

    const handleCalculate = () => {
        if (selectedMetal && selectedFineness && selectedPaymentType && weight) {
            const metal = metals.find((m) => m.code === selectedMetal);
            if (metal) {
                const fineness = metal.finenessList.find((f) => f.value === selectedFineness);
                if (fineness) {
                    const pricePerGram = fineness[selectedPaymentType as keyof typeof fineness];
                    setResult(pricePerGram * parseFloat(weight));
                    localStorage.setItem("lastCalculation", JSON.stringify({ selectedMetal, selectedFineness, selectedPaymentType, weight, result: pricePerGram * parseFloat(weight) }));
                }
            }
        }
    };

    const handleMetalChange = (code: string) => {
        setSelectedMetal(code);
        setSelectedFineness(null);
        setSelectedPaymentType("");
        setWeight("");
        setResult(0);
    };

    useEffect(() => {
        const savedCalculation = localStorage.getItem("lastCalculation");
        if (savedCalculation) {
            const { selectedMetal, selectedFineness, selectedPaymentType, weight, result } = JSON.parse(savedCalculation);
            setSelectedMetal(selectedMetal);
            setSelectedFineness(selectedFineness);
            setSelectedPaymentType(selectedPaymentType);
            setWeight(weight);
            setResult(result);
        }
    }, []);

    return (
        <div className={s.calculator}>
            <div className={s.header}>
                КАЛЬКУЛЯТОР
            </div>
            <div className={s.contentWrapper}>
                <img src={goldImg} alt='gold'/>
                <div className={s.content}>
                    <div className={s.tabs}>
                        {metals.map((metal) => (
                            <button
                                key={metal.code}
                                onClick={() => handleMetalChange(metal.code)}
                                className={selectedMetal === metal.code ? s.active : ""}
                            >
                                {metal.title}
                            </button>
                        ))}
                    </div>
                    <div className={s.title}>
                        Укажите следующие параметры:
                    </div>
                    <div className={s.parameters}>
                        <Select
                            options={selectedMetal ? metals.find(m => m.code === selectedMetal)?.finenessList.map(f => ({ label: `${f.value}`, value: f.value })) || [] : []}
                            value={selectedFineness}
                            onChange={value => setSelectedFineness(value as number)}
                            placeholder="Проба металла"
                        />
                        <Select
                            options={payment.map(type => ({ label: type.title, value: type.code }))}
                            value={selectedPaymentType}
                            onChange={value => setSelectedPaymentType(value as string)}
                            placeholder="Способ выплаты"
                        />
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="Вес металла (в граммах)"
                            disabled={!selectedMetal || !selectedFineness || !selectedPaymentType}
                        />
                    </div>
                    <div className={s.costСalculation}>
                        {result !== null && <div className={s.result}>ИТОГО: {result}</div>}
                        <button
                            onClick={handleCalculate}
                            disabled={!selectedMetal || !selectedFineness || !selectedPaymentType || !weight}
                        >
                            Рассчитать
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

