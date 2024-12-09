import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function HeroCard() {
    return (
        <Card className="bg-gradient-to-r from-red-500 to-red-700 text-white">
            <CardContent className="p-8 flex flex-col items-center text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to the Panda Express Manager</h1>
                <p className="text-xl mb-6 max-w-2xl">
                    Discover the power of efficient management and streamlined operations. 
                    Our dashboard provides you with all the tools you need to succeed.
                </p>
                <div className="flex gap-4">
                <Button variant="outline" size="lg" className="text-black border-white hover:bg-white hover:text-red-700">
                    Get Started
                </Button>
                <Button variant="outline" size="lg" className="text-black border-white hover:bg-white hover:text-red-700">
                    Learn More
                </Button>
                </div>
            </CardContent>
        </Card>
    )
}

