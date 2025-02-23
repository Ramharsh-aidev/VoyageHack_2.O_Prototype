import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const LoginSignupPopup = ({ onSignIn, onSignUp, onSignInLater }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 500); // Delay of 500ms (0.5 seconds) before popup appears - adjust as needed

        return () => clearTimeout(timer); // Clear timeout if component unmounts
    }, []);

    return (
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="relative bg-white p-8 rounded shadow-lg max-w-sm transform transition-transform duration-500 ease-out origin-top ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}">
                <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">Welcome!</h2>
                <p className="text-gray-700 text-center mb-4">Sign up or log in to save your budget details.</p>
                <div className="flex justify-center space-x-4 mb-4">
                    <button
                        onClick={onSignUp}
                        className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
                    >
                        Sign Up
                    </button>
                    <button
                        onClick={onSignIn}
                        className="px-6 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none"
                    >
                        Log In
                    </button>
                </div>
                <button
                    onClick={onSignInLater}
                    className="block w-full text-center text-gray-500 hover:text-gray-600 focus:outline-none"
                >
                    Sign in later
                </button>
                {/* Removed the close button */}
            </div>
        </div>
    );
};

const ConfirmationPopup = ({ onClose, onConfirmSignIn }) => {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
            <div className="relative bg-white p-8 rounded shadow-lg max-w-sm">
                <h2 className="text-xl font-bold text-red-600 mb-4">Confirmation</h2>
                <p className="text-gray-700 mb-4">Your entered details will not be saved if you continue without signing in.</p>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={onConfirmSignIn}
                        className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none"
                    >
                        Sign In
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};


const BudgetTracker = () => {
    const [totalBudget, setTotalBudget] = useState('');
    const [expenses, setExpenses] = useState({
        transportation: { flights: 0, train: 0, taxi: 0, carRental: 0, fuel: 0, publicTransport: 0 },
        accommodation: { hotel: 0, Airbnb: 0, hostel: 0, camping: 0 },
        food: { restaurants: 0, snacks: 0, groceries: 0, coffee: 0 },
        activities: { tours: 0, events: 0, attractions: 0, sports: 0, entertainment: 0 },
        shopping: { souvenirs: 0, clothes: 0, gifts: 0, personalCare: 0 },
        miscellaneous: { visas: 0, insurance: 0, communication: 0, tips: 0, other: 0 },
    });

    const [currency, setCurrency] = useState('USD');
    const [convertedTotalBudget, setConvertedTotalBudget] = useState(totalBudget);
    const [exchangeRate, setExchangeRate] = useState(1);
    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [customCategory, setCustomCategory] = useState('');
    const [customSubcategories, setCustomSubcategories] = useState([{ name: '', amount: 0 }]);
    const [showExceedAlert, setShowExceedAlert] = useState(false);
    const [showOverBudgetModal, setShowOverBudgetModal] = useState(false);
    const [overBudgetAmount, setOverBudgetAmount] = useState(0);
    const [show80PercentAlert, setShow80PercentAlert] = useState(false);
    const [showLoginSignupPopup, setShowLoginSignupPopup] = useState(false); // set to false initially so popup will appear with delay
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);


    const exchangeRate_API_KEY=process.env.REACT_APP_EXCHANGE_RATE_API_KEY;

    // Fetch exchange rate for selected currency
    const fetchExchangeRate = useCallback(async (currencyCode) => {
        try {
            const response = await axios.get(`https://v6.exchangerate-api.com/v6/${exchangeRate_API_KEY}/latest/USD`);
            const rate = response.data.conversion_rates[currencyCode];
            setExchangeRate(rate);
            setConvertedTotalBudget(totalBudget ? totalBudget * rate : 0);
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
        }
    },[totalBudget, exchangeRate_API_KEY]);


    const handleCurrencyChange = (event) => {
        const newCurrency = event.target.value;
        setCurrency(newCurrency);
        fetchExchangeRate(newCurrency);
    };

    const handleTotalBudgetChange = (event) => {
        const newTotalBudget = event.target.value;
        setTotalBudget(newTotalBudget);
        setConvertedTotalBudget(newTotalBudget ? newTotalBudget * exchangeRate : 0);

    };

    const handleExpenseChange = (category, subcategory, event) => {
        const newAmount = parseFloat(event.target.value) || 0;
        const newExpenses = {
            ...expenses,
            [category]: {
                ...expenses[category],
                [subcategory]: newAmount,
            },
        };
        const totalExpenses = calculateTotalExpenses(newExpenses);
        if (totalExpenses > convertedTotalBudget) {
            setShowOverBudgetModal(true);
            setShowExceedAlert(false);
            setShow80PercentAlert(false);

        } else {
            setShowOverBudgetModal(false);
            setExpenses(newExpenses);
        }
    };

    const handleAddCustomField = () => {
        if (customCategory && customSubcategories.length > 0) {
            const newExpenses = {
                ...expenses,
                [customCategory]: customSubcategories.reduce(
                    (acc, subcat) => ({
                        ...acc,
                        [subcat.name]: subcat.amount,
                    }),
                    {}
                ),
            };

            const totalExpenses = calculateTotalExpenses(newExpenses);
            if (totalExpenses > convertedTotalBudget) {
                setShowOverBudgetModal(true);
                setShowExceedAlert(false);
                setShow80PercentAlert(false);
            } else {
                setShowOverBudgetModal(false);
                setExpenses(newExpenses);
                setCustomCategory('');
                setCustomSubcategories([{ name: '', amount: 0 }]);
            }

        }
    };

    const handleSubcategoryChange = (index, key, value) => {
        const updatedSubcategories = [...customSubcategories];
        updatedSubcategories[index][key] = value;
        setCustomSubcategories(updatedSubcategories);
    };

    const handleAddSubcategory = () => {
        setCustomSubcategories([...customSubcategories, { name: '', amount: 0 }]);
    };

    const handleRemoveSubcategory = (index) => {
        const updatedSubcategories = customSubcategories.filter((_, i) => i !== index);
        setCustomSubcategories(updatedSubcategories);
    };


    const calculateTotalExpenses = (expenseData) => {
        return Object.values(expenseData).reduce((total, category) => {
            return total + Object.values(category).reduce((catTotal, val) => catTotal + val, 0);
        }, 0);
    };
    const getTotalExpenses = useCallback(() => {
        return calculateTotalExpenses(expenses);
    },[expenses]);
    const remainingBudget = convertedTotalBudget ? convertedTotalBudget - getTotalExpenses() : 0;


    // Chart Data
    const chartData = {
        labels: Object.keys(expenses),
        datasets: [
            {
                label: 'Expenses by Category',
                data: Object.values(expenses).map((category) => Object.values(category).reduce((sum, val) => sum + val, 0)),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const generatePieChartData = useCallback(() => {
        const labels = [];
        const data = [];
        const backgroundColors = [];
        const categoryColors = ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#ffb3e6', '#c2c2f0', '#a1c9f4', '#ffdb58', '#8de5a1', '#cab2d6']; // Added more colors for more categories/subcategories
        let colorIndex = 0;

        Object.entries(expenses).forEach(([categoryName, subcategories]) => {
            Object.entries(subcategories).forEach(([subName, amount]) => {
                if (amount > 0) { // Only add if there's an amount
                    labels.push(`${categoryName} - ${subName}`);
                    data.push(amount);
                    backgroundColors.push(categoryColors[colorIndex % categoryColors.length]); // Cycle through colors
                }
            });
            colorIndex++; // Move to the next color for the next category
        });

        return {
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: backgroundColors,
                },
            ],
        };
    }, [expenses]);


    const pieChartData = generatePieChartData();
    const isOverBudget = getTotalExpenses() > convertedTotalBudget;

    useEffect(() => {
            const percentageSpent = (getTotalExpenses() / convertedTotalBudget) * 100;
            if (percentageSpent > 100) {
                setShowOverBudgetModal(true);
                setShowExceedAlert(false);
                setShow80PercentAlert(false);
            } else if (percentageSpent > 90) {
                setShowOverBudgetModal(false);
                setShowExceedAlert(true);
                setShow80PercentAlert(false);
            } else if (percentageSpent > 80) {
                setShowOverBudgetModal(false);
                setShowExceedAlert(false);
                setShow80PercentAlert(true);
            } else {
                setShowOverBudgetModal(false);
                setShowExceedAlert(false);
                setShow80PercentAlert(false);
            }


        }, [expenses, convertedTotalBudget, getTotalExpenses, isOverBudget]);



    // Fetch available currencies when component mounts
    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await axios.get(`https://v6.exchangerate-api.com/v6/${exchangeRate_API_KEY}/codes`);
                setCurrencyOptions(response.data.supported_codes);
            } catch (error) {
                console.error('Error fetching currencies:', error);
            }
        };

        fetchCurrencies();
        fetchExchangeRate(currency);
    }, [currency, fetchExchangeRate, exchangeRate_API_KEY]);

    const handleSignIn = () => {
        // Handle sign in logic here
        setShowLoginSignupPopup(false);
        alert('Sign In Clicked (Logic to be implemented)');
    };

    const handleSignUp = () => {
        // Handle sign up logic here
        setShowLoginSignupPopup(false);
        alert('Sign Up Clicked (Logic to be implemented)');
    };

    const handleSignInLater = () => {
        setShowLoginSignupPopup(false);
        setShowConfirmationPopup(true);
    };

    const handleCloseConfirmation = () => {
        setShowConfirmationPopup(false);
    };

    const handleConfirmSignInFromConfirmation = () => {
        setShowConfirmationPopup(false);
        setShowLoginSignupPopup(true); // Re-show the login popup
    };

    const handleCloseLoginSignupPopup = () => {
        setShowLoginSignupPopup(false);
    };

    useEffect(() => {
        const delayPopup = setTimeout(() => {
            setShowLoginSignupPopup(true);
        }, 1500); // Delay of 1.5 seconds before popup shows up on page load

        return () => clearTimeout(delayPopup);
    }, []);


    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-indigo-700 shadow">
                <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                    <div>
                        <a href="/" className="text-white font-bold text-xl">Home</a>
                    </div>
                    <div className="space-x-4">
                        <button onClick={() => setShowLoginSignupPopup(true)} className="text-white hover:text-indigo-200">Log In</button>
                        <button onClick={() => setShowLoginSignupPopup(true)} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">Sign Up</button>
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8 mt-8">
                {showExceedAlert && (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 mb-4" role="alert">
                        <p className="font-bold">Warning</p>
                        <p>You are about to spend 90% of your budget!</p>
                    </div>
                )}
                {show80PercentAlert && (
                    <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-3 mb-4" role="alert">
                        <p className="font-bold">Heads Up</p>
                        <p>You have spent 80% of your budget!</p>
                    </div>
                )}
                {showOverBudgetModal && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
                        <div className="relative bg-white p-5 rounded shadow-lg max-w-md">
                            <h2 className="text-xl font-bold mb-2 text-red-600">Over Budget Alert!</h2>
                            <p className="mb-4 text-gray-700">
                                You have exceeded your budget by <span className="font-semibold">{currency} {overBudgetAmount.toFixed(2)}</span>!
                                Please review your expenses.
                            </p>
                            <div className="flex justify-end">
                                <button onClick={() => setShowOverBudgetModal(false)} className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">
                                    Close
                                </button>
                            </div>

                        </div>
                    </div>
                )}

                <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Trip Budget Tracker</h2>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label htmlFor="currency" className="block text-lg font-medium text-gray-700">Select Currency</label>
                        <select
                            id="currency"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            value={currency}
                            onChange={handleCurrencyChange}
                        >
                            {currencyOptions.map((code) => (
                                <option key={code} value={code}>
                                    {code}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="total-budget" className="block text-lg font-medium text-gray-700">Total Budget</label>
                        <input
                            type="number"
                            id="total-budget"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            value={totalBudget}
                            onChange={handleTotalBudgetChange}
                            placeholder="Enter total budget"
                        />
                    </div>
                </div>


                <div className="space-y-6 mb-6">
                    {Object.keys(expenses).map((category) => (
                        <div key={category} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold text-indigo-600 capitalize">{category}</h3>
                            <div className="space-y-2 mt-2">
                                {Object.keys(expenses[category]).map((subcategory) => (
                                    <div key={subcategory} className="flex flex-col md:flex-row items-start md:items-center justify-between">
                                        <label className="text-gray-700 capitalize md:mb-0 mb-1">{subcategory}</label>
                                        <input
                                            type="number"
                                            className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md"
                                            value={expenses[category][subcategory]}
                                            onChange={(e) => handleExpenseChange(category, subcategory, e)}
                                            placeholder={`Enter ${subcategory} cost`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>


                <div className="mt-6 mb-6">
                    <h4 className="text-lg font-medium text-indigo-600 mb-4">Add Custom Category</h4>
                    <div className="space-y-4">
                        <div>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                value={customCategory}
                                onChange={(e) => setCustomCategory(e.target.value)}
                                placeholder="Custom Category Name"
                            />
                        </div>

                        {customSubcategories.map((subcat, index) => (
                            <div key={index} className="flex flex-col md:flex-row items-start md:items-center justify-between space-x-0 md:space-x-4">
                                <div className="w-full md:w-1/2 mb-2 md:mb-0">
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        value={subcat.name}
                                        onChange={(e) => handleSubcategoryChange(index, 'name', e.target.value)}
                                        placeholder="Subcategory Name"
                                    />
                                </div>
                                <div className="w-full md:w-1/3 mb-2 md:mb-0">
                                    <input
                                        type="number"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        value={subcat.amount}
                                        onChange={(e) => handleSubcategoryChange(index, 'amount', parseFloat(e.target.value) || 0)}
                                        placeholder="Amount"
                                    />
                                </div>
                                <button
                                    onClick={() => handleRemoveSubcategory(index)}
                                    className="text-red-600 p-2"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}

                        <div className="flex flex-col md:flex-row gap-2 mt-2">
                        <button
                            onClick={handleAddSubcategory}
                            className="p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Add Subcategory
                        </button>
                            <button
                                onClick={handleAddCustomField}
                                className="p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >
                                Add Custom Field
                            </button>
                        </div>


                    </div>
                </div>


                <div className="mt-6">
                    <div className="flex flex-col md:flex-row justify-between mb-2">
                        <h4 className="text-lg font-medium">Total Expenses:</h4>
                        <span className="text-lg font-semibold">{currency} {getTotalExpenses().toFixed(2)}</span>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between mb-2">
                        <h4 className="text-lg font-medium">Remaining Budget:</h4>
                        <span className="text-lg font-semibold">{currency} {remainingBudget.toFixed(2)}</span>
                    </div>

                    <div className="mt-4">
                        <div className="text-sm text-gray-700 mb-1">Budget Usage</div>
                        <div className="h-2 w-full bg-gray-200 rounded-full">
                            <div
                                className={`h-full rounded-full ${isOverBudget ? 'bg-red-500' : (getTotalExpenses() / convertedTotalBudget) * 100 > 80 ? 'bg-orange-500' : 'bg-green-500'}`}

                                style={{ width: `${Math.min(((getTotalExpenses() / convertedTotalBudget) * 100) || 0, 100)}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="text-xl font-medium text-indigo-600 text-center mb-4">Expenses by Category (Bar Graph)</h4>
                        <Bar data={chartData} options={{ responsive: true }} />
                    </div>
                    <div>
                        <h4 className="text-xl font-medium text-indigo-600 text-center mb-4">Budget Proportions (Detailed Pie Chart)</h4>
                        <Pie data={pieChartData} options={{ responsive: true }} />
                    </div>
                </div>
            </div>

            {showLoginSignupPopup && (
                <LoginSignupPopup
                    onSignIn={handleSignIn}
                    onSignUp={handleSignUp}
                    onSignInLater={handleSignInLater}
                />
            )}

            {showConfirmationPopup && (
                <ConfirmationPopup
                    onClose={handleCloseConfirmation}
                    onConfirmSignIn={handleConfirmSignInFromConfirmation}
                />
            )}
        </div>
    );
};

export default BudgetTracker;