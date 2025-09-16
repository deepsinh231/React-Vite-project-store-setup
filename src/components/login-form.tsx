import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm, Controller } from "react-hook-form"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const companies = [
    "Esteem Constructions Pvt Ltd",
    "ADANI NEW INDUSTRIES LIMITED",
    "GUJARAT ADANI INSTITUTE OF MEDICAL SCIENCES",
    "Throns Infrastructure Private Limited",
    "ADANI BRAHMA SYNERGY PVT. LTD.",
    "KUTCH COPPER LIMITED",
    "KHAVDA II-A TRANSMISSION LIMITED",
    "HALVAD TRANSMISSION LIMITED",
    "BUILDCAST SOLUTIONS PRIVATE LIMITED",
    "JAI HIND OIL MILLS COMPANY",
]

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [selectedCompany, setSelectedCompany] = useState(null)
    const navigate = useNavigate()

    const onSubmit = (data: any) => {
        console.log("Form submitted:", data)
        setIsLoggedIn(true)
    }

    const handleCompanySubmit = () => {
        if (selectedCompany) {
            console.log("Selected company:", selectedCompany)
            navigate("/")
        } else {
            alert("Please select a company first")
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          
            {isLoggedIn ? (
                <Card>
                    <CardHeader>
                        <CardTitle>Select Company / Customer</CardTitle>
                        <CardDescription>
                            Choose a company from the list below
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Select onValueChange={(val) => setSelectedCompany(val)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a company" />
                            </SelectTrigger>
                            <SelectContent>
                                {companies.map((company, idx) => (
                                    <SelectItem key={idx} value={company}>
                                        {company}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Button onClick={handleCompanySubmit} className="w-full mt-6">
                            Submit
                        </Button>
                        {selectedCompany && (
                            <p className="mt-3 text-sm text-muted-foreground">
                                Selected: <span className="font-medium">{selectedCompany}</span>
                            </p>
                        )}
                    </CardContent>
                </Card>
            ):(  <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Controller
                                    name="email"
                                    control={control}
                                    rules={{
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Enter a valid email",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                        />
                                    )}
                                />
                                {errors.email && (
                                    <span className="text-sm text-red-500">
                                        {errors.email.message as string}
                                    </span>
                                )}
                            </div>

                            {/* Password */}
                            <div className="grid gap-3">

                                <Controller
                                    name="password"
                                    control={control}
                                    rules={{ required: "Password is required" }}
                                    render={({ field }) => (
                                        <Input {...field} id="password" type="password" placeholder="Enter Password" />
                                    )}
                                />
                                {errors.password && (
                                    <span className="text-sm text-red-500">
                                        {errors.password.message as string}
                                    </span>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                            </div>
                        </div>

                    </form>
                </CardContent>
            </Card>
)}
        </div>
    )
}
