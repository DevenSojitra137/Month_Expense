import React from 'react';
import { ArrowRightCircle, ChartBar, Calendar, DollarSign, BellRing } from 'lucide-react';


const FeatureCard = ({ icon: Icon, text }) => (
    <li className="flex items-center space-x-3 mb-4 p-3 rounded-lg hover:bg-purple-50 transition-all duration-300">
      <div className="bg-purple-100 p-2 rounded-full">
        <Icon className="text-purple-700" size={20} />
      </div>
      <span className="text-gray-700">{text}</span>
    </li>
  );

const Des = () => {
    return (
        <div>
            <main className="container mx-auto px-4 py-16">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto border border-purple-100">
                    <div className="flex items-center space-x-2 mb-6">
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent">
                            Welcome to MonthExpense
                        </h2>
                        <ArrowRightCircle className="text-purple-500 animate-pulse" size={32} />
                    </div>

                    <div className="mb-8">
                        <p className="text-gray-700 text-xl leading-relaxed mb-6 border-l-4 border-purple-500 pl-4">
                            Your personal finance tracking solution. Easily manage and monitor your monthly expenses to take control of your financial health.
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg p-6">
                        <h3 className="text-2xl font-semibold text-purple-700 mb-6">
                            Key Features
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FeatureCard
                                icon={Calendar}
                                text="Track your daily expenses with ease"
                            />
                            <FeatureCard
                                icon={ChartBar}
                                text="Categorize spending for better insights"
                            />
                            <FeatureCard
                                icon={BellRing}
                                text="Set budgets and receive alerts"
                            />
                            <FeatureCard
                                icon={DollarSign}
                                text="Generate reports to analyze your spending habits"
                            />
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Des
