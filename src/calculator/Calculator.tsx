import React, { useState, useEffect } from "react";
import {metals, payment} from "../data/Data";
import s from './Calculator.module.scss'
import goldImg from '../assets/images/Gold.png'
import {Select} from "../components/ui/select/Select";

export const Calculator = () => {
    const [selectedMetal, setSelectedMetal] = useState<string>("");
    const [selectedFineness, setSelectedFineness] = useState<number | null>(null);
    const [selectedPayment, setSelectedPayment] = useState<string>("");
    const [weight, setWeight] = useState<string>("");
    const [result, setResult] = useState<number>(0);

    const handleCalculate = () => {
        if (selectedMetal && selectedFineness && selectedPayment && weight) {
            const metal = metals.find((m) => m.code === selectedMetal);
            if (metal) {
                const fineness = metal.finenessList.find((f) => f.value === selectedFineness);
                if (fineness) {
                    const pricePerGram = fineness[selectedPayment as keyof typeof fineness];
                    setResult(pricePerGram * Number(weight));
                    localStorage.setItem("lastCalculation", JSON.stringify({ selectedMetal, selectedFineness, selectedPaymentType: selectedPayment, weight, result: pricePerGram * Number(weight) }));
                }
            }
        }
    };

    const handleMetalChange = (code: string) => {
        setSelectedMetal(code);
        setSelectedFineness(null);
        setSelectedPayment("");
        setWeight("");
        setResult(0);
    };

    useEffect(() => {
        const savedCalculation = localStorage.getItem("lastCalculation");
        if (savedCalculation) {
            const { selectedMetal, selectedFineness, selectedPaymentType, weight, result } = JSON.parse(savedCalculation);
            setSelectedMetal(selectedMetal);
            setSelectedFineness(selectedFineness);
            setSelectedPayment(selectedPaymentType);
            setWeight(weight);
            setResult(result);
        } else {
            setSelectedMetal("gold");
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
                        <select
                            value={selectedFineness || ""}
                            onChange={(e) => setSelectedFineness(Number(e.target.value))}
                            disabled={!selectedMetal}

                        >
                            <option className={s.option} value="" hidden>Проба металла</option>
                            {selectedMetal &&
                                metals
                                    .find((metal) => metal.code === selectedMetal)
                                    ?.finenessList.map((fineness) => (
                                    <option key={fineness.id} value={fineness.value}>
                                        {fineness.value}
                                    </option>
                                ))}
                        </select>
                        <select
                            value={selectedPayment}
                            onChange={(e) => setSelectedPayment(e.target.value)}
                        >
                            <option value="" hidden>Способ выплаты</option>
                            {payment.map((type) => (
                                <option key={type.code} value={type.code}>
                                    {type.title}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="Вес металла (в граммах)"
                        />
                    </div>
                    <div className={s.costСalculation}>
                        {result !== 0 ? <div className={s.result}>ИТОГО: {result.toLocaleString('ru-RU')}</div> : <div></div>}
                        <button
                            onClick={handleCalculate}
                            disabled={!selectedFineness || !selectedPayment || !weight}
                        >
                            Рассчитать
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

