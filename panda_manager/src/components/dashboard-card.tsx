import { Card, CardContent } from "@/components/ui/card"
import { Users, DollarSign } from "lucide-react"

interface DashboardCardProps {
    title: string;
    value?: number;
    percentageChange: number;
    comparisonPeriod?: string;
    backgroundColor?: string;
    textColor?: string;
    type?: 'currency' | 'number';
    currencySymbol?: string;
    icon?: React.ElementType;
}

export default function DashboardCard({
    title = "Metric",
    value,
    percentageChange,
    comparisonPeriod = "from last month",
    backgroundColor = "bg-red-700",
    textColor = "text-white",
    type = 'number',
    icon: Icon
}: DashboardCardProps) {
    const formattedValue = (() => {
        if (value === undefined) return 'N/A';
        if (type === 'currency') {
            return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
            }).format(value);
        }
        return type === 'number' && value >= 0 
            ? `+${value.toLocaleString()}`
            : value.toLocaleString();
    })();

    const isPositive = percentageChange >= 0;
    const percentageColor = isPositive ? "text-green-300" : "text-red-300";

    // Determine which icon to use
    const IconComponent = Icon || (type === 'currency' ? DollarSign : Users);

    return (
        <Card className={`w-full max-w-3xl p-6 sm:p-8 ${backgroundColor} shadow-lg`}>
            <CardContent className={`p-0 space-y-2 sm:space-y-3 ${textColor}`}>
                <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base font-medium">{title}</span>
                    <IconComponent className="h-5 w-5 opacity-75" />
                </div>
                <div className="text-4xl sm:text-5xl font-bold tracking-tight">
                    {formattedValue}
                </div>
                <div className="text-sm sm:text-base">
                    <span className={percentageColor}>
                    {isPositive ? "+" : "-"}{Math.abs(percentageChange).toFixed(1)}%
                    </span>
                    {" "}{comparisonPeriod}
                </div>
            </CardContent>
        </Card>
    ) 
}